-- Staff WhatsApp number, and whether new orders should be forwarded to them.
-- Held per user rather than in store settings so the recipient list stays
-- correct as people join and leave.
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "receives_order_notifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "whatsapp_number" TEXT;
