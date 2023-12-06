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
  const features = await prisma.featureRequest.findMany({
    where: {
      dateSubmitted: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
    include: {
      user: true,
    },
  });

  features.forEach((feature) => {
    feature.link = `http://server4xh.vps.webdock.cloud/feature-request/${feature.id}`; //TODO: Fix this link to be the actual link of server
  });

  return features;
};

export const getDaysComments = async () => {
  const comments = await prisma.comment.findMany({
    where: {
      dateSubmitted: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
    include: {
      user: true,
      featureRequest: true,
      commentReplys: {
        where: {
          dateSubmitted: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
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
