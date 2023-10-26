-- Create some users
INSERT INTO User (id, avatarUrl, email, name, role)
VALUES ('1', 'https://example.com/avatar1.png', 'johndoe@example.com', 'John Doe', 'USER'),
       ('2', 'https://example.com/avatar2.png', 'janedoe@example.com', 'Jane Doe', 'USER'),
       ('3', 'https://example.com/avatar3.png', 'bobsmith@example.com', 'Bob Smith', 'ADMIN');

-- Create some categories
INSERT INTO Category (name)
VALUES ('Category 1'),
       ('Category 2'),
       ('Category 3');

-- Create some statuses
INSERT INTO Status (name)
VALUES ('Status 1'),
       ('Status 2'),
       ('Status 3');

-- Create some feature requests
INSERT INTO FeatureRequest (id, title, description, dateSubmitted, userId, categoryId, statusId)
VALUES (1, 'Feature Request 1', 'Description for Feature Request 1', NOW(), '1', 1, 1),
       (2, 'Feature Request 2', 'Description for Feature Request 2', NOW(), '2', 2, 2),
       (3, 'Feature Request 3', 'Description for Feature Request 3', NOW(), '3', 3, 3);

-- Create some comments
INSERT INTO Comment (id, comment, dateSubmitted, userId, featureRequestId)
VALUES (1, 'Comment 1 for Feature Request 1', NOW(), '1', 1),
       (2, 'Comment 2 for Feature Request 1', NOW(), '2', 1),
       (3, 'Comment 1 for Feature Request 2', NOW(), '3', 2),
       (4, 'Comment 1 for Feature Request 3', NOW(), '1', 3),
       (5, 'Comment 2 for Feature Request 3', NOW(), '2', 3);

-- Create some comment replies
INSERT INTO CommentReply (id, comment, dateSubmitted, userId, commentId)
VALUES (1, 'Reply 1 for Comment 1', NOW(), '2', 1),
       (2, 'Reply 2 for Comment 1', NOW(), '3', 1),
       (3, 'Reply 1 for Comment 2', NOW(), '1', 2),
       (4, 'Reply 1 for Comment 3', NOW(), '2', 3),
       (5, 'Reply 2 for Comment 3', NOW(), '3', 3);

-- Create some feature upvotes
INSERT INTO FeatureUpvote (userId, featureRequestId)
VALUES ('1', 1),
       ( '2', 1),
       ( '3', 2),
       ( '1', 3),
       ( '2', 3);