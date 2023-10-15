import {
  PrismaClient,
  Category,
  Status,
  User,
  FeatureRequest,
  Comment,
  CommentReply,
  FeatureUpvote,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function seed() {
  const category1: Category = await prisma.category.create({
    data: {
      name: "Category 1",
    },
  });

  const category2: Category = await prisma.category.create({
    data: {
      name: "Category 2",
    },
  });

  const status1: Status = await prisma.status.create({
    data: {
      name: "Status 1",
    },
  });

  const status2: Status = await prisma.status.create({
    data: {
      name: "Status 2",
    },
  });

  const user1: User = await prisma.user.create({
    data: {
      name: "User 1",
      email: "user1@test.com",
      avatarUrl: "https://via.placeholder.com/150",
    },
  });

  const user2: User = await prisma.user.create({
    data: {
      name: "User 2",
      email: "user2@test.com",
      avatarUrl: "https://via.placeholder.com/150",
    },
  });

  const featureRequest1: FeatureRequest = await prisma.featureRequest.create({
    data: {
      title: "Feature Request 1",
      description: "Feature Request 1 Description",
      categoryId: category1.id,
      statusId: status1.id,
      userId: user1.id,
    },
  });

  const featureRequest2: FeatureRequest = await prisma.featureRequest.create({
    data: {
      title: "Feature Request 2",
      description: "Feature Request 2 Description",
      categoryId: category2.id,
      statusId: status2.id,
      userId: user2.id,
    },
  });

  const comment1: Comment = await prisma.comment.create({
    data: {
      comment: "Comment 1",
      featureRequestId: featureRequest1.id,
      userId: user1.id,
    },
  });

  const comment2: Comment = await prisma.comment.create({
    data: {
      comment: "Comment 2",
      featureRequestId: featureRequest2.id,
      userId: user2.id,
    },
  });

  const commentReply1: CommentReply = await prisma.commentReply.create({
    data: {
      comment: "Comment Reply 1",
      commentId: comment1.id,
      userId: user1.id,
    },
  });

  const commentReply2: CommentReply = await prisma.commentReply.create({
    data: {
      comment: "Comment Reply 2",
      commentId: comment2.id,
      userId: user2.id,
    },
  });

  const upvote1: FeatureUpvote = await prisma.featureUpvote.create({
    data: {
      featureRequestId: featureRequest1.id,
      userId: user1.id,
    },
  });

  const upvote2: FeatureUpvote = await prisma.featureUpvote.create({
    data: {
      featureRequestId: featureRequest2.id,
      userId: user2.id,
    },
  });

  const upvote3: FeatureUpvote = await prisma.featureUpvote.create({
    data: {
      featureRequestId: featureRequest1.id,
      userId: user2.id,
    },
  });

  console.log("Sample data seeded successfully!");
}

seed()
  .catch((e) => {
    console.log("test")
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
