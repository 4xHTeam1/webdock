import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Finds the first user in the database with the given uuid.
 * @param uuid The given uuid, we search for.
 * @returns The user object, or null.
 */
export const getUserByUUID = async (uuid: string) => {
  console.log(uuid);
  const user = await prisma.user.findFirst({
    where: {
      id: uuid,
    },
  });

  return user;
  //test
};

/**
 * Adds a user to the database.
 * @param user The user that needs to be created.
 * @returns The created user.
 */
export const addUser = async (user: User) => {
  try {
    const created = await prisma.user.create({
      data: user,
    });

    return created;
  } catch (e) {
    throw new Error(
      `Something went wrong creating a user with these inputs ${JSON.stringify(
        user
      )}`
    );
  }
};
