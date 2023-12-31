import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const testuser1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      avatarURL: "https://avatars.githubusercontent.com/u/8186664?v=4",
      email: "test1@example.com",
      name: "Test User",
    },
  });

  const testuser2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      avatarURL: "https://avatars.githubusercontent.com/u/8186664?v=4",
      email: "test2@example.com",
      name: "Test User",
    },
  });

  const testuser3 = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      avatarURL: "https://avatars.githubusercontent.com/u/8186664?v=4",
      email: "test3@example.com",
      name: "Test User",
      role: "ADMIN",
    },
  });

  const testCategory1 = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Test Category1",
    },
  });

  const testCategory2 = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Test Category2",
    },
  });

  const testCategory3 = await prisma.category.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Test Category3",
    },
  });

  const testStatus1 = await prisma.status.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Status 1",
      color: "#1FA0FF",
    },
  });

  const testStatus2 = await prisma.status.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Status 2",
      color: "#C17AFF",
    },
  });

  const testStatus3 = await prisma.status.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Status 3",
      color: "#6CD345",
    },
  });

  const testFeatureRequest1 = await prisma.featureRequest.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Support for security keys",
      description:
        "It would be nice to have support for security keys like Yubikey for 2FA or as a passwordless sign-in option",
      userId: 1,
      statusId: 1,
      categoryId: 1,
    },
  });

  const testFeatureRequest2 = await prisma.featureRequest.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Auto-deploy one or more ssh keys on provision",
      description:
        "Add the ability to mark one or more SSH Public Keys as 'auto deploy' which will then be automatically added to the default LAMP/LEMP stack admin user, or in the case of clean OS installs a default user is created with a random password set.",
      userId: 2,
      statusId: 2,
      categoryId: 2,
    },
  });

  const testFeatureRequest3 = await prisma.featureRequest.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Add Features to customize server package",
      description:
        "Could you kindly add more features that enable users to fully customize their server package according to their specific needs and preferences like upgrade RAM, upgrading Disk, and more ? This would greatly enhance the user experience and provide greater flexibility in choosing the right server package for their needs.",
      userId: 3,
      statusId: 3,
      categoryId: 3,
    },
  });

  const testComment1 = await prisma.comment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      comment: "Test Comment 1",
      userId: 1,
      featureRequestId: 1,
    },
  });

  const testComment2 = await prisma.comment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      comment: "Test Comment 2",
      userId: 2,
      featureRequestId: 2,
    },
  });

  const testComment3 = await prisma.comment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      comment: "Test Comment 3",
      userId: 3,
      featureRequestId: 3,
    },
  });

  const testCommentReply1 = await prisma.commentReply.upsert({
    where: { id: 1 },
    update: {},
    create: {
      comment: "Test Comment Reply 1",
      userId: 1,
      commentId: 1,
    },
  });

  const testCommentReply2 = await prisma.commentReply.upsert({
    where: { id: 2 },
    update: {},
    create: {
      comment: "Test Comment Reply 2",
      userId: 2,
      commentId: 2,
    },
  });

  const testCommentReply3 = await prisma.commentReply.upsert({
    where: { id: 3 },
    update: {},
    create: {
      comment: "Test Comment Reply 3",
      userId: 3,
      commentId: 3,
    },
  });

  console.log({ testuser1, testuser2, testuser3 });
  console.log({ testCategory1, testCategory2, testCategory3 });
  console.log({ testStatus1, testStatus2, testStatus3 });
  console.log({
    testFeatureRequest1,
    testFeatureRequest2,
    testFeatureRequest3,
  });
  console.log({ testComment1, testComment2, testComment3 });
  console.log({ testCommentReply1, testCommentReply2, testCommentReply3 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
