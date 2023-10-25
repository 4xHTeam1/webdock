import { PrismaClient, Role } from "@prisma/client";
import { IAdmin } from "./interfaces/IAdministrator";

const prisma = new PrismaClient();

export const IsAdministrator = async ({ requesterId }: IAdmin) => {
  try {
    if (requesterId === undefined || requesterId === null) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
      select: {
        role: true,
      },
    });
    if (user?.role !== Role.ADMIN) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error("Something went wrong validating the requesterId");
  }
};
