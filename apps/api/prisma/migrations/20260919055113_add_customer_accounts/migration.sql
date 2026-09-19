-- Customer accounts: a login row may point at the customer record its orders
-- hang off. Null for staff accounts, and for customers who never register.
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "customer_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_customer_id_key" ON "users"("customer_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
