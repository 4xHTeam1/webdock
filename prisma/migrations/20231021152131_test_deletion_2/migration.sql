-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_featureRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `FeatureUpvote` DROP FOREIGN KEY `FeatureUpvote_featureRequestId_fkey`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_featureRequestId_fkey` FOREIGN KEY (`featureRequestId`) REFERENCES `FeatureRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeatureUpvote` ADD CONSTRAINT `FeatureUpvote_featureRequestId_fkey` FOREIGN KEY (`featureRequestId`) REFERENCES `FeatureRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
