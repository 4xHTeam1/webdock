-- CreateTable
CREATE TABLE `FeatureRequestMerge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mergedIntoId` INTEGER NOT NULL,
    `mergedFromId` INTEGER NOT NULL,

    INDEX `mergedIntoId`(`mergedIntoId`),
    INDEX `mergedFromId`(`mergedFromId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeatureRequestMerge` ADD CONSTRAINT `FeatureRequestMerge_mergedIntoId_fkey` FOREIGN KEY (`mergedIntoId`) REFERENCES `FeatureRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeatureRequestMerge` ADD CONSTRAINT `FeatureRequestMerge_mergedFromId_fkey` FOREIGN KEY (`mergedFromId`) REFERENCES `FeatureRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
