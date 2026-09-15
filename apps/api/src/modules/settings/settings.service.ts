import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

export async function listSettings() {
  const settings = await prisma.storeSetting.findMany();
  return Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
}

export async function getPublicSettings() {
  const storeProfile = await prisma.storeSetting.findUnique({ where: { key: "store_profile" } });
  return { store_profile: storeProfile?.value ?? null };
}

export async function updateSetting(key: string, value: unknown) {
  return prisma.storeSetting.upsert({
    where: { key },
    update: { value: value as Prisma.InputJsonValue },
    create: { key, value: value as Prisma.InputJsonValue }
  });
}
