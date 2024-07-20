/*
  Warnings:

  - You are about to drop the column `Price` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `price` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `Price`,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `subtotal` INTEGER NOT NULL;
