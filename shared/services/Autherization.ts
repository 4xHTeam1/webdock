import { PrismaClient, Role } from "@prisma/client";
import { IAdmin } from "./interfaces/IAdministrator";

const prisma = new PrismaClient();

export const IsAdministrator = async ({ requesterId }: IAdmin) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
      select: {
        role: true,
      },
    });
    return user?.role === Role.ADMIN;
  } catch (error) {
    return false;
  }
};
