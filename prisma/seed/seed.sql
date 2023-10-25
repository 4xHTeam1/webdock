USE features

-- Seed Users
INSERT INTO User (id, avatarUrl, email, name, role)
VALUES (
        '1',
        'https://example.com/avatar1.png',
        'user1@example.com',
        'User 1',
        'USER'
    ),
    (
        '2',
        'https://example.com/avatar2.png',
        'user2@example.com',
        'User 2',
        'USER'
    ),
    (
        '3',
        'https://example.com/avatar3.png',
        'user3@example.com',
        'User 3',
        'USER'
    ),
    (
        '4',
        'https://example.com/avatar4.png',
        'user4@example.com',
        'User 4',
        'USER'
    ),
    (
        '5',
        'https://example.com/avatar5.png',
        'user5@example.com',
        'User 5',
        'USER'
    ),
    (
        '6',
        'https://example.com/avatar6.png',
        'user6@example.com',
        'User 6',
        'USER'
    ),
    (
        '7',
        'https://example.com/avatar7.png',
        'user7@example.com',
        'User 7',
        'USER'
    ),
    (
        '8',
        'https://example.com/avatar8.png',
        'user8@example.com',
        'User 8',
        'USER'
    ),
    (
        '9',
        'https://example.com/avatar9.png',
        'user9@example.com',
        'User 9',
        'USER'
    ),
    (
        '10',
        'https://example.com/avatar10.png',
        'user10@example.com',
        'User 10',
        'USER'
    );
-- Seed Categories
INSERT INTO Category (name)
VALUES ('Category 1'),
    ('Category 2'),
    ('Category 3'),
    ('Category 4'),
    ('Category 5');
-- Seed Statuses
INSERT INTO Status (name)
VALUES ('Status 1'),
    ('Status 2'),
    ('Status 3'),
    ('Status 4'),
    ('Status 5');
-- Seed FeatureRequests
INSERT INTO FeatureRequest (
        title,
        description,
        dateSubmitted,
        userId,
        categoryId,
        statusId
    )
VALUES (
        'Feature Request 1',
        'Description for Feature Request 1',
        NOW(),
        '1',
        '1',
        '1'
    ),
    (
        'Feature Request 2',
        'Description for Feature Request 2',
        NOW(),
        '2',
        '2',
        '2'
    ),
    (
        'Feature Request 3',
        'Description for Feature Request 3',
        NOW(),
        '3',
        '3',
        '3'
    ),
    (
        'Feature Request 4',
        'Description for Feature Request 4',
        NOW(),
        '4',
        '4',
        '4'
    ),
    (
        'Feature Request 5',
        'Description for Feature Request 5',
        NOW(),
        '5',
        '5',
        '5'
    ),
    (
        'Feature Request 6',
        'Description for Feature Request 6',
        NOW(),
        '6',
        '1',
        '2'
    ),
    (
        'Feature Request 7',
        'Description for Feature Request 7',
        NOW(),
        '7',
        '2',
        '3'
    ),
    (
        'Feature Request 8',
        'Description for Feature Request 8',
        NOW(),
        '8',
        '3',
        '4'
    ),
    (
        'Feature Request 9',
        'Description for Feature Request 9',
        NOW(),
        '9',
        '4',
        '5'
    ),
    (
        'Feature Request 10',
        'Description for Feature Request 10',
        NOW(),
        '10',
        '5',
        '1'
    );
-- Seed Comments
INSERT INTO Comment (comment, dateSubmitted, userId, featureRequestId)
VALUES (
        'Comment 1 for Feature Request 1',
        NOW(),
        '1',
        '1'
    ),
    (
        'Comment 2 for Feature Request 1',
        NOW(),
        '2',
        '1'
    ),
    (
        'Comment 3 for Feature Request 1',
        NOW(),
        '3',
        '1'
    ),
    (
        'Comment 4 for Feature Request 2',
        NOW(),
        '4',
        '2'
    ),
    (
        'Comment 5 for Feature Request 2',
        NOW(),
        '5',
        '2'
    ),
    (
        'Comment 6 for Feature Request 3',
        NOW(),
        '6',
        '3'
    ),
    (
        'Comment 7 for Feature Request 3',
        NOW(),
        '7',
        '3'
    ),
    (
        'Comment 8 for Feature Request 4',
        NOW(),
        '8',
        '4'
    ),
    (
        'Comment 9 for Feature Request 5',
        NOW(),
        '9',
        '5'
    ),
    (
        'Comment 10 for Feature Request 5',
        NOW(),
        '10',
        '5'
    );
-- Seed CommentReplies
INSERT INTO CommentReply (comment, dateSubmitted, userId, commentId)
VALUES ('Reply 1 for Comment 1', NOW(), '2', '1'),
    ('Reply 2 for Comment 1', NOW(), '3', '1'),
    ('Reply 1 for Comment 2', NOW(), '4', '2'),
    ('Reply 2 for Comment 2', NOW(), '5', '2'),
    ('Reply 1 for Comment 3', NOW(), '6', '3'),
    ('Reply 2 for Comment 3', NOW(), '7', '3'),
    ('Reply 1 for Comment 4', NOW(), '8', '4'),
    ('Reply 1 for Comment 5', NOW(), '9', '5'),
    ('Reply 2 for Comment 5', NOW(), '10', '5');
-- Seed FeatureUpvotes
INSERT INTO FeatureUpvote (userId, featureRequestId)
VALUES ('1', '1'),
    ('2', '1'),
    ('3', '1'),
    ('4', '2'),
    ('5', '2'),
    ('6', '3'),
    ('7', '3'),
    ('8', '4'),
    ('9', '5'),
    ('10', '5');