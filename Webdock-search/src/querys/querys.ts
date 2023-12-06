import { PrismaClient, User, FeatureRequest } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Searches for feature requests, comments, users, categories, titles, and descriptions that contain the specified query.
 * @param query - The search query.
 * @returns An object containing the search results.
 */
export const searchAll = async (query: string) => {
  const resultFeatures: FeatureRequest[] = await prisma.featureRequest.findMany(
    {
      where: {
        OR: [
          {
            comments: {
              some: {
                comment: {
                  contains: query,
                },
                commentReplys: {
                  some: {
                    comment: {
                      contains: query,
                    },
                  },
                },
              },
            },
          },
          {
            user: {
              OR: [
                {
                  name: {
                    contains: query,
                  },
                },
                {
                  email: {
                    contains: query,
                  },
                },
              ],
            },
          },
          {
            category: {
              name: {
                contains: query,
              },
            },
          },
          {
            title: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        category: true,
        status: true,
        user: true,
        featureUpvotes: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            featureUpvotes: true,
          },
        },
      },
    }
  );

  const result = {
    features: resultFeatures,
  };

  return result;
};

/**
 * Queries the database for all users by their name.
 * @param query The name we want to search for
 * @returns An array of users that match the query
 */
export const searchUserByName = async (query: string) => {
  const result: User[] = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });

  return {result};
};
/* Fungere så result søger i tabellen "User" fra SQL foresepørgelsen bliver lavet af prisma, der bliver 
printet alt i tabellen "User" som der matcher det man har søgt, "hvor navn indeholder det du har søgt på"*/

/**
 * Queries the database for all users by their email.
 * @param query The email we want to search for
 * @returns An array of users that match the query
 */
export const searchUserByEmail = async (query: string) => {
  const result: User[] = await prisma.user.findMany({
    where: {
      email: {
        contains: query,
      },
    },
  });
  return {result};;
};

/**
 * Queries the database for all feature requests matching the user who made the request's name.
 * @param query The name we want to search for
 * @returns An array of feature requests that match the user's name
 */
export const searchFeaturesByUserName = async (query: string) => {
  const result: FeatureRequest[] = await prisma.featureRequest.findMany({
    where: {
      user: {
        name: {
          contains: query,
        },
      },
    },
  });
  return result;
};

/**
 * Queries the database for all feature requests matching the user who made the request's email.
 * @param query The email we want to search for
 * @returns An array of feature requests that match the user's email
 */
export const searchFeaturesByUserEmail = async (query: string) => {
  const result: FeatureRequest[] = await prisma.featureRequest.findMany({
    where: {
      user: {
        email: {
          contains: query,
        },
      },
    },
  });

  return result;
};

/**
 * Queries the database for all feature requests matching the category name.
 * @param query The category name we want to search for
 * @returns An array of feature requests that match the category name
 */
export const searchFeaturesByCategory = async (query: string) => {
  const result: FeatureRequest[] = await prisma.featureRequest.findMany({
    where: {
      category: {
        name: {
          contains: query,
        },
      },
    },
  });

  return result;
};

/**
 * Queries the database for all feature requests matching the title.
 * @param query The title we want to search for
 * @returns An array of feature requests that match the title
 */
export const searchFeatureByTitle = async (query: string) => {
  const result: FeatureRequest[] = await prisma.featureRequest.findMany({
    where: {
      title: {
        contains: query,
      },
    },
  });

  return result;
};

/**
 * Queries the database for all feature requests matching the description.
 * @param query The description we want to search for
 * @returns An array of feature requests that match the description
 */
export const searchFeatureByDescription = async (query: string) => {
  const result: FeatureRequest[] = await prisma.featureRequest.findMany({
    where: {
      description: {
        contains: query,
      },
    },
  });

  return result;
};
