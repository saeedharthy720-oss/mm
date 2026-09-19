import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PERMISSIONS = [
  { key: "products:manage", description: "Create, edit, delete, hide/show products" },
  { key: "categories:manage", description: "Create, edit, delete, reorder categories" },
  { key: "orders:manage", description: "Change order status, cancel orders" },
  { key: "orders:view", description: "View orders" },
  { key: "users:manage", description: "Manage staff users and roles" },
  { key: "settings:manage", description: "Edit store settings" },
  { key: "orders:view_own", description: "View one's own orders as a customer" }
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  // Staff roles. admin gets everything except the customer-only permission,
  // which would be meaningless without a linked customer record.
  admin: PERMISSIONS.map((p) => p.key).filter((key) => key !== "orders:view_own"),
  employee: ["orders:view", "orders:manage"],
  // Customers register themselves. They can see their own orders and nothing
  // else; having them in the same table as staff keeps one login form and one
  // session mechanism, with the role deciding what they reach.
  customer: ["orders:view_own"]
};

const UNITS = [
  { key: "piece", labelEn: "Piece", labelAr: "قطعة", isCustom: false },
  { key: "box", labelEn: "Box", labelAr: "صندوق", isCustom: false },
  { key: "bag", labelEn: "Bag", labelAr: "كيس", isCustom: false },
  { key: "meter", labelEn: "Meter", labelAr: "متر", isCustom: false },
  { key: "kilogram", labelEn: "Kilogram", labelAr: "كيلوغرام", isCustom: false },
  { key: "roll", labelEn: "Roll", labelAr: "لفة", isCustom: false },
  { key: "set", labelEn: "Set", labelAr: "طقم", isCustom: false },
  { key: "liter", labelEn: "Liter", labelAr: "لتر", isCustom: false },
  { key: "custom", labelEn: "Custom", labelAr: "مخصص", isCustom: true }
];

const ORDER_STATUSES = [
  { key: "new", labelEn: "New", labelAr: "جديد", sortOrder: 0 },
  { key: "processing", labelEn: "Processing", labelAr: "قيد المعالجة", sortOrder: 1 },
  { key: "ready_for_delivery", labelEn: "Ready for Delivery", labelAr: "جاهز للتوصيل", sortOrder: 2 },
  { key: "out_for_delivery", labelEn: "Out for Delivery", labelAr: "قيد التوصيل", sortOrder: 3 },
  { key: "delivered", labelEn: "Delivered", labelAr: "تم التوصيل", sortOrder: 4 },
  { key: "cancelled", labelEn: "Cancelled", labelAr: "ملغى", sortOrder: 5 }
];

async function main() {
  for (const permission of PERMISSIONS) {
    await prisma.permission.upsert({ where: { key: permission.key }, update: {}, create: permission });
  }

  for (const [roleKey, permissionKeys] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.role.upsert({
      where: { key: roleKey },
      update: {},
      create: { key: roleKey, name: roleKey[0].toUpperCase() + roleKey.slice(1) }
    });

    for (const permissionKey of permissionKeys) {
      const permission = await prisma.permission.findUniqueOrThrow({ where: { key: permissionKey } });
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id }
      });
    }
  }

  for (const unit of UNITS) {
    await prisma.unit.upsert({ where: { key: unit.key }, update: {}, create: unit });
  }

  for (const status of ORDER_STATUSES) {
    await prisma.orderStatus.upsert({ where: { key: status.key }, update: {}, create: status });
  }

  await prisma.storeSetting.upsert({
    where: { key: "delivery_charge_rule" },
    update: {},
    create: { key: "delivery_charge_rule", value: { strategy: "sum" } }
  });

  await prisma.storeSetting.upsert({
    where: { key: "store_profile" },
    update: {},
    create: {
      key: "store_profile",
      value: {
        nameEn: "Building Materials Store",
        nameAr: "متجر مواد البناء",
        whatsappNumber: "+968XXXXXXXX",
        currency: "OMR"
      }
    }
  });

  const adminRole = await prisma.role.findUniqueOrThrow({ where: { key: "admin" } });
  const employeeRole = await prisma.role.findUniqueOrThrow({ where: { key: "employee" } });

  // Deployments should set SEED_ADMIN_* / SEED_EMPLOYEE_* so the well-known
  // local dev credentials never end up on a public site. Existing users are
  // left untouched (update: {}), so re-running this never resets a password.
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";
  const employeeEmail = process.env.SEED_EMPLOYEE_EMAIL ?? "employee@example.com";
  const employeePassword = process.env.SEED_EMPLOYEE_PASSWORD ?? "Employee123!";

  if (process.env.NODE_ENV === "production" && !process.env.SEED_ADMIN_PASSWORD) {
    throw new Error(
      "Refusing to seed the default admin password in production. Set SEED_ADMIN_PASSWORD (and ideally SEED_ADMIN_EMAIL)."
    );
  }

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin User",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      roleId: adminRole.id
    }
  });

  await prisma.user.upsert({
    where: { email: employeeEmail },
    update: {},
    create: {
      name: "Employee User",
      email: employeeEmail,
      passwordHash: await bcrypt.hash(employeePassword, 10),
      roleId: employeeRole.id
    }
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
