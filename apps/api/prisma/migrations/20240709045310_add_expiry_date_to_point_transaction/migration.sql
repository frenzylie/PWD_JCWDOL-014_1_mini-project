/*
  Warnings:

  - You are about to drop the column `isExpired` on the `coupons` table. All the data in the column will be lost.
  - Added the required column `expiryDate` to the `point_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coupons` DROP COLUMN `isExpired`;

-- AlterTable
ALTER TABLE `point_transactions` ADD COLUMN `expiryDate` TIMESTAMP DEFAULT '2024-10-07 23:59:59';

UPDATE `point_transactions` SET `expiryDate` = '2024-10-07 23:59:59' WHERE `expiryDate` IS NULL;

ALTER TABLE `point_transactions` MODIFY COLUMN `expiryDate` TIMESTAMP NOT NULL;

ALTER TABLE `point_transactions` ALTER COLUMN `expiryDate` DROP DEFAULT;