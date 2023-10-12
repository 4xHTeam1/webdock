BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[FeatureUpvote] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [featureRequestId] INT NOT NULL,
    CONSTRAINT [FeatureUpvote_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[FeatureUpvote] ADD CONSTRAINT [FeatureUpvote_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FeatureUpvote] ADD CONSTRAINT [FeatureUpvote_featureRequestId_fkey] FOREIGN KEY ([featureRequestId]) REFERENCES [dbo].[FeatureRequest]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
