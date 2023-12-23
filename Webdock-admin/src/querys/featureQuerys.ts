import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateFeatureStatus = async (id: number, statusId: number) => {
  try {
    const result = await prisma.featureRequest.update({
      where: {
        id,
      },
      data: {
        statusId,
      },
      include: {
        category: true,
        status: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        user: true,
        featureUpvotes: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            featureUpvotes: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const mergeFeatures = async (id: number, mergePostsIds: number[]) => {
  try {
    console.log(typeof mergePostsIds);
    console.log(mergePostsIds);

    await prisma.featureRequestMerge.createMany({
      data: mergePostsIds.map((mergePostId) => ({
        mergedIntoId: id,
        mergedFromId: mergePostId,
      })),
    });

    await prisma.featureRequest.updateMany({
      where: {
        id: {
          in: mergePostsIds,
        },
      },
      data: {
        statusId: 4,
      },
    });
    const result = await prisma.featureRequest.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        status: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        user: true,
        FeatureRequestMergeFrom: {
          include: {
            mergedFrom: true,
          },
        },
        FeatureRequestMergeInto: {
          include: {
            mergedInto: true,
          },
        },
        featureUpvotes: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            featureUpvotes: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
