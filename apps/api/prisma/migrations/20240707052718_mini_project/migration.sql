-- AlterTable
ALTER TABLE `users` MODIFY `ownReferralNum` VARCHAR(191) NOT NULL,
    MODIFY `referredByNum` VARCHAR(191) NOT NULL DEFAULT '';
