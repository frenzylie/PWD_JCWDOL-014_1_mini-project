/*
  Warnings:

  - You are about to drop the column `transactionId` on the `point_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `pointsUsed` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `point_transactions` DROP FOREIGN KEY `point_transactions_transactionId_fkey`;

-- DropIndex
DROP INDEX `transactions_couponId_key` ON `transactions`;

-- AlterTable
ALTER TABLE `point_transactions` DROP COLUMN `transactionId`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `pointsUsed`,
    MODIFY `couponId` INTEGER NULL;
