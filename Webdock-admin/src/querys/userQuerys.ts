import { PrismaClient } from "@prisma/client";
import { IGetUser } from "../interfaces/IUser";

const prisma = new PrismaClient();

export const GetAllUsers = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const GetUser = async ({ id }: IGetUser) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};
