-- AlterTable
ALTER TABLE `Comment` MODIFY `comment` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `CommentReply` MODIFY `comment` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `FeatureRequest` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(500) NOT NULL;
