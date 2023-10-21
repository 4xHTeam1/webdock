-- DropForeignKey
ALTER TABLE `FeatureRequest` DROP FOREIGN KEY `FeatureRequest_userId_fkey`;

-- AddForeignKey
ALTER TABLE `FeatureRequest` ADD CONSTRAINT `FeatureRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
