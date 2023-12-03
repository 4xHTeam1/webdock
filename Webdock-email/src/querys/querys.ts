import { PrismaClient, User, FeatureRequest } from "@prisma/client";

const prisma = new PrismaClient();

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

  //add a link attribute to each feature request where the key is "link" and the value is "http://localhost:5173/feature-request/feature.id"
  features.forEach((feature) => {
    feature.link = `http://localhost:5173/feature-request/${feature.id}`;
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
    comment.link = `http://localhost:5173/feature-request/${comment.featureRequestId}#${comment.id}`;
  });
  return comments;
};
