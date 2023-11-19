import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export const getFeatureById = async (id: number) => {
  const feature = await prisma.featureRequest.findUnique({
    where: {
      id,
    },
  });
  return feature;
};

export const getUserNameById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      avatarURL: true,
    },
  });
  return user;
};

export const getFeatureOwner = async (id: number) => {
  const feature = await prisma.featureRequest.findUnique({
    where: {
      id: id,
    },
    select: {
      userId: true,
    },
  });
  return feature;
};
