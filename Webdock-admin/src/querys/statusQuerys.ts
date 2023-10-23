import { PrismaClient } from "@prisma/client";
import {
  ICreateStatus,
  IDeleteStatus,
  IGetStatus,
  IUpdateStatus,
} from "../interfaces/IStatus";

const prisma = new PrismaClient();

export const GetAllStatuses = async () => {
  try {
    const result = await prisma.status.findMany();
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const GetStatus = async ({ id }: IGetStatus) => {
  try {
    const result = await prisma.status.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const CreateStatus = async ({ name }: ICreateStatus) => {
  try {
    const result = await prisma.status.create({
      data: {
        name,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const UpdateStatus = async ({ id, name }: IUpdateStatus) => {
  try {
    const result = await prisma.status.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const DeleteStatus = async ({ id }: IDeleteStatus) => {
  try {
    const result = await prisma.status.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};
