BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [avatarUrl] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Status] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Status_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FeatureRequest] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [dateSubmitted] DATETIME2 NOT NULL CONSTRAINT [FeatureRequest_dateSubmitted_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    [categoryId] INT NOT NULL,
    [statusId] INT NOT NULL,
    CONSTRAINT [FeatureRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [comment] NVARCHAR(1000) NOT NULL,
    [dateSubmitted] DATETIME2 NOT NULL CONSTRAINT [Comment_dateSubmitted_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    [featureRequestId] INT NOT NULL,
    CONSTRAINT [Comment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CommentReply] (
    [id] INT NOT NULL IDENTITY(1,1),
    [comment] NVARCHAR(1000) NOT NULL,
    [dateSubmitted] DATETIME2 NOT NULL CONSTRAINT [CommentReply_dateSubmitted_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    [commentId] INT NOT NULL,
    CONSTRAINT [CommentReply_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[FeatureRequest] ADD CONSTRAINT [FeatureRequest_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeatureRequest] ADD CONSTRAINT [FeatureRequest_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeatureRequest] ADD CONSTRAINT [FeatureRequest_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[Status]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_featureRequestId_fkey] FOREIGN KEY ([featureRequestId]) REFERENCES [dbo].[FeatureRequest]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CommentReply] ADD CONSTRAINT [CommentReply_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CommentReply] ADD CONSTRAINT [CommentReply_commentId_fkey] FOREIGN KEY ([commentId]) REFERENCES [dbo].[Comment]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
