-- DropForeignKey
ALTER TABLE `FeatureUpvote` DROP FOREIGN KEY `FeatureUpvote_userId_fkey`;

-- AddForeignKey
ALTER TABLE `FeatureUpvote` ADD CONSTRAINT `FeatureUpvote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
