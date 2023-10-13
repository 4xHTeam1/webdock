IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Webdock_Feature')
BEGIN
  CREATE DATABASE Webdock_Feature;
END;
GO

USE Webdock_Feature;
GO

CREATE TABLE Categories
(
  CategoryID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Category_Name varchar(100) NOT NULL,
);

CREATE TABLE Status (
    StatusID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Status_Name varchar(100) NOT NULL,
);

CREATE TABLE Users (
    UserID VARCHAR(255) NOT NULL PRIMARY KEY,
    AvatarURL varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Name varchar(255) NOT NULL,    
);

CREATE TABLE Feature_Requsts(
    FeatureID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    UserID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    CategoryID int NOT NULL FOREIGN KEY REFERENCES Categories(CategoryID),
    StatusID int NOT NULL FOREIGN KEY REFERENCES Status(StatusID),
    Title varchar(255) NOT NULL,
    Description varchar(255) NOT NULL,
    DateSubmitted DATE NOT NULL,
)

CREATE TABLE Comments(
    CommentID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FeatureID int NOT NULL FOREIGN KEY REFERENCES Feature_Requsts(FeatureID),
    UserID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    Comment varchar(255) NOT NULL,
    DateSubmitted DATE NOT NULL,
)

CREATE TABLE Comment_Reply(
    ReplyID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CommentID int NOT NULL FOREIGN KEY REFERENCES Comments(CommentID),
    UserID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    Reply varchar(255) NOT NULL,
    DateSubmitted DATE NOT NULL,
)

CREATE TABLE Feature_Upvote(
    UpvoteID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FeatureID int NOT NULL FOREIGN KEY REFERENCES Feature_Requsts(FeatureID),
    UserID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Users(UserID)
)
