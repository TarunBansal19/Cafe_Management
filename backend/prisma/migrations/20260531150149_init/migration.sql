/*
  Warnings:

  - The `discountType` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `inventoryItemId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENT', 'FIXED');

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_inventoryItemId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "discountType",
ADD COLUMN     "discountType" "DiscountType";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "inventoryItemId",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
