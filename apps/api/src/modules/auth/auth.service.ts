import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import type { LoginInput } from "./auth.schemas.js";
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
    include: { role: { include: { rolePermissions: { include: { permission: true } } } } }
  });
}

function toPublicUser(user: NonNullable<Awaited<ReturnType<typeof loadUserWithPermissions>>>) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.key,
    permissions: user.role.rolePermissions.map((rp) => rp.permission.key)
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

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: { role: { include: { rolePermissions: { include: { permission: true } } } } }
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
