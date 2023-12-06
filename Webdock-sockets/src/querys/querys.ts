import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

/**
 * Retrieves a feature by its ID.
 * @param id - The ID of the feature to retrieve.
 * @returns A promise that resolves to the retrieved feature.
 */
export const getFeatureById = async (id: number) => {
  const feature = await prisma.featureRequest.findUnique({
    where: {
      id,
    },
  });
  return feature;
};

/**
 * Retrieves the user's name and avatar URL by their ID.
 * @param id - The ID of the user.
 * @returns A Promise that resolves to an object containing the user's name and avatar URL.
 */
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

/**
 * Retrieves the owner of a feature request based on its ID.
 * @param id - The ID of the feature request.
 * @returns A Promise that resolves to the owner's user ID.
 */
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
