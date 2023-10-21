-- DropForeignKey
ALTER TABLE `CommentReply` DROP FOREIGN KEY `CommentReply_commentId_fkey`;

-- AddForeignKey
ALTER TABLE `CommentReply` ADD CONSTRAINT `CommentReply_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
