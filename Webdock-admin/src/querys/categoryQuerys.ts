import { PrismaClient } from "@prisma/client";
import {
  ICreateCategory,
  IDeleteCategory,
  IGetCategory,
  IUpdateCategory,
} from "../interfaces/ICategory";

const prisma = new PrismaClient();

/**
 * Retrieves all categories from the database.
 * @returns {Promise<Category[]>} A promise that resolves to an array of Category objects.
 */
export const GetAllCategories = async () => {
  try {
    const result = await prisma.category.findMany();
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

/**
 * Retrieves a category by its ID.
 * @param {Object} param - The parameter object.
 * @param {number} param.id - The ID of the category to retrieve.
 * @returns {Promise<Object>} - A Promise that resolves to the retrieved category object.
 */
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

/**
 * Creates a new category with the given name.
 * @param {ICreateCategory} param - An object containing the name of the category to be created.
 * @returns {Promise<Category>} - A Promise that resolves to the newly created Category object.
 */
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

/**
 * Updates a category in the database.
 * @param {Object} params - The parameters for updating a category.
 * @param {string} params.id - The ID of the category to update.
 * @param {string} params.name - The new name for the category.
 * @returns {Promise<Object>} - The updated category object.
 */
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

/**
 * Deletes a category from the database.
 * @param {Object} param - The parameter object.
 * @param {number} param.id - The ID of the category to delete.
 * @returns {Promise<Object>} - The deleted category object.
 */
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
