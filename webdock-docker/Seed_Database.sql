USE Webdock_Feature;
GO

/* Seed Categories */
INSERT INTO Categories (Category_Name)
VALUES ('Feature Request'), ('Bug'), ('Documentation'), ('Training'), ('Other');
GO

/* Seed Status */
INSERT INTO Status (Status_Name)
VALUES ('Planned'), ('In Progress'), ('Completed'), ('Not Planned'), ('Declined');
GO

/* Seed Users */
INSERT INTO Users (UserID, AvatarURL, Email, Name)
VALUES ('1', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'mikehovedskov@gmail.com', 'Mike Hovedskov');
GO

/* Seed Feature Requests */
INSERT INTO Feature_Requsts (UserID, CategoryID, StatusID, Title, Description, DateSubmitted)
VALUES ('1', 1, 1, 'Feature Request 1', 'Description 1', GETDATE()),
       ('1', 2, 2, 'Feature Request 2', 'Description 2', GETDATE()),
       ('1', 3, 3, 'Feature Request 3', 'Description 3', GETDATE()),
       ('1', 4, 4, 'Feature Request 4', 'Description 4', GETDATE()),
       ('1', 5, 5, 'Feature Request 5', 'Description 5', GETDATE());
GO

/* Seed Comments */
INSERT INTO Comments (FeatureID, UserID, Comment, DateSubmitted)
VALUES (1, '1', 'Comment 1', GETDATE()),
       (2, '1', 'Comment 2', GETDATE()),
       (3, '1', 'Comment 3', GETDATE()),
       (4, '1', 'Comment 4', GETDATE()),
       (5, '1', 'Comment 5', GETDATE());
GO

/* Seed Comment Replies */
INSERT INTO Comment_Reply (CommentID, UserID, Reply, DateSubmitted)
VALUES (1, '1', 'Reply 1',  GETDATE()),
       (2, '1', 'Reply 2',  GETDATE()),
       (3, '1', 'Reply 3',  GETDATE()),
       (4, '1', 'Reply 4',  GETDATE()),
       (5, '1', 'Reply 5',  GETDATE());
GO

/* Seed Feature Upvotes */
INSERT INTO Feature_Upvote (FeatureID, UserID)
VALUES (1, '1'),
       (2, '1'),
       (3, '1'),
       (4, '1'),
       (5, '1');
GO
