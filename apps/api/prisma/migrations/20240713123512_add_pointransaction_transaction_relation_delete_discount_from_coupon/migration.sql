/*
  Warnings:

  - You are about to drop the column `discount` on the `coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `coupons` DROP COLUMN `discount`;

-- AlterTable
ALTER TABLE `point_transactions` ADD COLUMN `transactionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `point_transactions` ADD CONSTRAINT `point_transactions_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
