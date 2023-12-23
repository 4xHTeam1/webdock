import { PrismaClient } from "@prisma/client";
import {
  ICreateStatus,
  IDeleteStatus,
  IGetStatus,
  IUpdateStatus,
} from "../interfaces/IStatus";

const prisma = new PrismaClient();

/**
 * Retrieves all statuses from the database.
 * @returns {Promise<Status[]>} A promise that resolves to an array of Status objects.
 * @throws {Error} If there was an error retrieving the statuses.
 */
export const GetAllStatuses = async () => {
  try {
    const result = await prisma.status.findMany({
      where: {
        NOT: {
          name: "Merged",
        },
      },
    });
    return result;
  } catch (error) {
    //TODO: Add error handling
  }
};

/**
 * Retrieves a status record from the database by its ID.
 * @param {IGetStatus} params - The parameters for the query.
 * @param {number} params.id - The ID of the status record to retrieve.
 * @returns {Promise<Status>} - A promise that resolves to the retrieved status record.
 */
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

/**
 * Creates a new status with the given name.
 * @param {ICreateStatus} - An object containing the name of the status to be created.
 * @returns {Promise<Status>} - A Promise that resolves to the newly created status.
 */
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

/**
 * Updates the status with the given ID with the provided name.
 * @param {Object} params - The parameters for updating the status.
 * @param {number} params.id - The ID of the status to update.
 * @param {string} params.name - The new name for the status.
 * @returns {Promise<Object>} - The updated status object.
 */
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

/**
 * Deletes a status from the database.
 * @param {Object} param - The parameter object.
 * @param {number} param.id - The ID of the status to delete.
 * @returns {Promise<Object>} The deleted status object.
 */
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
