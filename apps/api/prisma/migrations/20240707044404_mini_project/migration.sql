/*
  Warnings:

  - You are about to drop the `referrals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `referrals` DROP FOREIGN KEY `referrals_refereeId_fkey`;

-- DropForeignKey
ALTER TABLE `referrals` DROP FOREIGN KEY `referrals_referrerId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `referralNum` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `referrals`;
