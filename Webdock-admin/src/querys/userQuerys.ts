import { PrismaClient } from "@prisma/client";
import { IGetUser, IUpdateUserRole } from "../interfaces/IUser";

const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 * @throws {Error} If there was an error retrieving the users.
 */
export const GetAllUsers = async () => {
  try {
    const result = await prisma.user.findMany();
    return { result };
  } catch (error) {
    //TODO: Add error handling
  }
};

/**
 * Retrieves a user by their ID.
 * @param {Object} param - The parameter object.
 * @param {number} param.id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved user object.
 */
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

/**
 * Updates the role of a user in the database.
 * @param {Object} params - The parameters for updating the user role.
 * @param {number} params.id - The ID of the user to update.
 * @param {string} params.role - The new role of the user.
 * @returns {Promise<Object>} - The updated user object.
 */
export const UpdateUserRole = async ({ id, role }: IUpdateUserRole) => {
  try {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};
