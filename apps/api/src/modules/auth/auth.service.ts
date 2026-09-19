import bcrypt from "bcryptjs";
import { ConflictError, UnauthorizedError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { effectivePermissions, permissionInclude } from "../users/permissions.js";
import type { LoginInput, RegisterInput } from "./auth.schemas.js";
import {
  getTokenExpiryDate,
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "./token.service.js";

async function loadUserWithPermissions(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: permissionInclude
  });
}

function toPublicUser(user: NonNullable<Awaited<ReturnType<typeof loadUserWithPermissions>>>) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.key,
    // Present only for customers; the storefront uses it to decide whether to
    // offer an account area, and the dashboard to reject non-staff.
    customerId: user.customerId,
    permissions: effectivePermissions(user)
  };
}

async function issueSession(userId: string) {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashToken(refreshToken),
      expiresAt: getTokenExpiryDate(refreshToken)
    }
  });

  return { accessToken, refreshToken };
}

/**
 * Registers a customer. Customers live in the same table as staff so there is
 * one login form and one session mechanism; the role decides what they reach.
 *
 * If the phone already belongs to a guest who has ordered before, the account
 * attaches to that existing customer record, so registering reveals the order
 * history they already had rather than starting them from nothing.
 */
export async function register(input: RegisterInput) {
  const customerRole = await prisma.role.findUnique({ where: { key: "customer" } });
  if (!customerRole) {
    throw new Error("The 'customer' role is missing — run the database seed.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
  if (existingUser) {
    throw new ConflictError("An account with this email already exists");
  }

  const user = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({
      where: { phone: input.phone },
      update: { name: input.name },
      create: { phone: input.phone, name: input.name }
    });

    // One login per customer record: a second person cannot claim a phone
    // number that has already been registered.
    const claimed = await tx.user.findUnique({ where: { customerId: customer.id } });
    if (claimed) {
      throw new ConflictError("An account already exists for this phone number");
    }

    return tx.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: await bcrypt.hash(input.password, 10),
        roleId: customerRole.id,
        customerId: customer.id
      },
      include: permissionInclude
    });
  });

  const { accessToken, refreshToken } = await issueSession(user.id);

  return { accessToken, refreshToken, user: toPublicUser(user) };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: permissionInclude
  });

  if (!user || !user.isActive) throw new UnauthorizedError("Invalid email or password");

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) throw new UnauthorizedError("Invalid email or password");

  const { accessToken, refreshToken } = await issueSession(user.id);

  return { accessToken, refreshToken, user: toPublicUser(user) };
}

export async function refresh(refreshToken: string | undefined) {
  if (!refreshToken) throw new UnauthorizedError("Invalid refresh token");

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new UnauthorizedError("Invalid refresh token");
  }

  const tokenHash = hashToken(refreshToken);
  const stored = await prisma.refreshToken.findFirst({
    where: { userId: payload.sub, tokenHash, revokedAt: null }
  });

  if (!stored || stored.expiresAt < new Date()) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });

  const user = await loadUserWithPermissions(payload.sub);
  if (!user || !user.isActive) throw new UnauthorizedError("Invalid refresh token");

  const session = await issueSession(user.id);

  return { ...session, user: toPublicUser(user) };
}

export async function logout(refreshToken: string | undefined) {
  if (!refreshToken) return;
  const tokenHash = hashToken(refreshToken);
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() }
  });
}

export async function getCurrentUser(userId: string) {
  const user = await loadUserWithPermissions(userId);
  if (!user) throw new UnauthorizedError("Not authenticated");
  return toPublicUser(user);
}
