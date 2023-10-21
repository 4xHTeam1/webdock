import { PrismaClient } from "@prisma/client";
import {
  CreateFeature,
  FeatureById,
  UpdateFeature,
} from "../interfaces/IFeatures";

const prisma = new PrismaClient();

export const getFeatures = async () => {
  const features = await prisma.featureRequest.findMany();
  return features;
};

export const getFeature = async ({ id }: FeatureById) => {
  const feature = await prisma.featureRequest.findUnique({
    where: { id },
  });
  return feature;
};

export const createFeature = async ({
  title,
  description,
  userId,
  categoryId,
  statusId,
}: CreateFeature) => {
  if (!categoryId) categoryId = 1;
  if (!statusId) statusId = 1;

  const feature = await prisma.featureRequest.create({
    data: {
      title,
      description,
      userId,
      categoryId,
      statusId,
    },
  });
  return feature;
};

export const updateFeature = async ({
  id,
  title,
  description,
  statusId,
  categoryId,
}: UpdateFeature) => {
  const feature = await prisma.featureRequest.update({
    where: { id },
    data: {
      title,
      description,
      statusId,
      categoryId,
    },
  });
  return feature;
};

export const deleteFeature = async (id: number) => {
  const feature = await prisma.featureRequest.delete({
    where: { id },
  });
  return feature;
};
