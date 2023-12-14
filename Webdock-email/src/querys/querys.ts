import { PrismaClient, User, FeatureRequest } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves the email of a user by their ID.
 * @param id - The ID of the user.
 * @returns The email of the user, or undefined if the user does not exist.
 */
export const getEmailByUserId = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      email: true,
    },
  });
  return user?.email;
};

export const getDaysFeatureRequests = async () => {
  const today = new Date();
  const yesterdayStart = new Date(today.setDate(today.getDate() - 1)).setHours(
    0,
    0,
    0,
    0
  );
  const yesterdayEnd = new Date(today.setDate(today.getDate())).setHours(
    23,
    59,
    59,
    999
  );

  const features = await prisma.featureRequest.findMany({
    where: {
      dateSubmitted: {
        gte: new Date(yesterdayStart),
        lt: new Date(yesterdayEnd),
      },
    },
    include: {
      user: true,
    },
  });

  features.forEach((feature) => {
    feature.link = `http://server4xh.vps.webdock.cloud/feature-request/${feature.id}`;
  });

  return features;
};

export const getDaysComments = async () => {
  const today = new Date();
  const yesterdayStart = new Date(today.setDate(today.getDate() - 1)).setHours(
    0,
    0,
    0,
    0
  );
  const yesterdayEnd = new Date(today.setDate(today.getDate())).setHours(
    23,
    59,
    59,
    999
  );

  const comments = await prisma.comment.findMany({
    where: {
      dateSubmitted: {
        gte: new Date(yesterdayStart),
        lt: new Date(yesterdayEnd),
      },
    },
    include: {
      user: true,
      featureRequest: true,
      commentReplys: {
        where: {
          dateSubmitted: {
            gte: new Date(yesterdayStart),
            lt: new Date(yesterdayEnd),
          },
        },
        include: {
          user: true,
        },
      },
    },
  });

  comments.forEach((comment) => {
    comment.link = `http://server4xh.vps.webdock.cloud/feature-request/${comment.featureRequestId}#${comment.id}`;
  });
  return comments;
};
