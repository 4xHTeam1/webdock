import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//funktionen bruger Prisma til at opdatere statussen for en feature-anmodning i databasen ved hjælp af 'id' for anmodningen og den nye 'statusId'
export const updateFeatureStatus = async (id: number, statusId: number) => {
  try {
    //inkludere også de specifikke relationer nedenfor om er knyttet til anmodningen
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
