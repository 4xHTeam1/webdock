import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Finds the first user in the database with the given id.
 * @param id The given id, we search for.
 * @returns The user object, or null.
 */
export const getUserByID = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarURL: true,
      role: true,
    },
  });

  return user;
};

/**
 * Adds a user to the database.
 * @param user The user that needs to be created.
 * @returns The created user.
 */
export const addUser = async (user: User) => {
  try {
    console.log(user);
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
