/*
  Warnings:

  - You are about to drop the `delivery` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryMan_id` to the `package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `package` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_deliveryman_id_fkey`;

-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_package_id_fkey`;

-- AlterTable
ALTER TABLE `deliveryman` ADD COLUMN `location` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package` ADD COLUMN `deliveryMan_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `delivery`;

-- AddForeignKey
ALTER TABLE `package` ADD CONSTRAINT `package_deliveryMan_id_fkey` FOREIGN KEY (`deliveryMan_id`) REFERENCES `deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
