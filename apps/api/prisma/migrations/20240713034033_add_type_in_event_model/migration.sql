/*
  Warnings:

  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `type` ENUM('Music', 'Nightlife', 'Arts', 'Holidays', 'Dating', 'Hobbies', 'Bussiness', 'Foods', 'Others') NOT NULL;
