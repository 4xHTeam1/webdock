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
        featureUpvotes: true,
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
