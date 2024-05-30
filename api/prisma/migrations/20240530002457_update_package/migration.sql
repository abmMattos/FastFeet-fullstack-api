/*
  Warnings:

  - You are about to drop the column `deliveryMan_id` on the `package` table. All the data in the column will be lost.
  - Added the required column `deliveryman_id` to the `package` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `package_deliveryMan_id_fkey`;

-- AlterTable
ALTER TABLE `package` DROP COLUMN `deliveryMan_id`,
    ADD COLUMN `deliveryman_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `package` ADD CONSTRAINT `package_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
