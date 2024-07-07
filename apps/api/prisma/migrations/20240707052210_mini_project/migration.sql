-- AlterTable
ALTER TABLE `users` MODIFY `ownReferralNum` BIGINT NOT NULL,
    MODIFY `referredByNum` BIGINT NOT NULL DEFAULT 0;
