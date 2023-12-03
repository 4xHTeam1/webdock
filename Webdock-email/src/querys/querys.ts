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
