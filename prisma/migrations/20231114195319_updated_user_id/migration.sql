/*
  Warnings:

  - You are about to alter the column `userId` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `CommentReply` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `FeatureRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `FeatureUpvote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `userId` on the `FeatureUpvote` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CommentReply` DROP FOREIGN KEY `CommentReply_userId_fkey`;

-- DropForeignKey
ALTER TABLE `FeatureRequest` DROP FOREIGN KEY `FeatureRequest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `FeatureUpvote` DROP FOREIGN KEY `FeatureUpvote_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CommentReply` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FeatureRequest` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FeatureUpvote` DROP PRIMARY KEY,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `featureRequestId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `FeatureRequest` ADD CONSTRAINT `FeatureRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CommentReply` ADD CONSTRAINT `CommentReply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `FeatureUpvote` ADD CONSTRAINT `FeatureUpvote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
