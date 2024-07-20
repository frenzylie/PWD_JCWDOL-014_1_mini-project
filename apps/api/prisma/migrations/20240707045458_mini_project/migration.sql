/*
  Warnings:

  - You are about to drop the column `refferedByNum` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `refferedByNum`,
    ADD COLUMN `referredByNum` INTEGER NOT NULL DEFAULT 0;
