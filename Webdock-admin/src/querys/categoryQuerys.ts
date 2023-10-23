import { PrismaClient } from "@prisma/client";
import {
  ICreateCategory,
  IDeleteCategory,
  IGetCategory,
  IUpdateCategory,
} from "../interfaces/ICategory";

const prisma = new PrismaClient();

export const GetAllCategories = async () => {
  try {
    const result = await prisma.category.findMany();
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const GetCategory = async ({ id }: IGetCategory) => {
  try {
    const result = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const CreateCategory = async ({ name }: ICreateCategory) => {
  try {
    const result = await prisma.category.create({
      data: {
        name,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

export const UpdateCategory = async ({ id, name }: IUpdateCategory) => {
  try {
    const result = await prisma.category.update({
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

export const DeleteCategory = async ({ id }: IDeleteCategory) => {
  try {
    const result = await prisma.category.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};
