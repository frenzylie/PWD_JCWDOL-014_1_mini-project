-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_couponId_fkey`;

-- AlterTable
ALTER TABLE `coupons` ADD COLUMN `transactionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `coupons` ADD CONSTRAINT `coupons_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
