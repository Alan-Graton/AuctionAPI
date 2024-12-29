/*
  Warnings:

  - You are about to alter the column `price` on the `bids` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `refresh_token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bids` MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `items` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL,
    MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `refresh_token` VARCHAR(155) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;
