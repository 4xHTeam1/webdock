/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Comment] DROP CONSTRAINT [Comment_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CommentReply] DROP CONSTRAINT [CommentReply_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FeatureRequest] DROP CONSTRAINT [FeatureRequest_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FeatureUpvote] DROP CONSTRAINT [FeatureUpvote_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Comment] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[CommentReply] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[FeatureRequest] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[FeatureUpvote] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'User'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_User] (
    [id] NVARCHAR(1000) NOT NULL,
    [avatarUrl] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[User])
    EXEC('INSERT INTO [dbo].[_prisma_new_User] ([avatarUrl],[email],[id],[name]) SELECT [avatarUrl],[email],[id],[name] FROM [dbo].[User] WITH (holdlock tablockx)');
DROP TABLE [dbo].[User];
EXEC SP_RENAME N'dbo._prisma_new_User', N'User';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[FeatureRequest] ADD CONSTRAINT [FeatureRequest_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CommentReply] ADD CONSTRAINT [CommentReply_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FeatureUpvote] ADD CONSTRAINT [FeatureUpvote_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
