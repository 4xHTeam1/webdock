import { PrismaClient, User, FeatureRequest } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Querys the database for all users and feature requests that match the query
 * @param query The given query we want to search by
 * @returns A json object with users as an array of user objects and features as an array of feature requests that matches the query
 */
export const searchAll = async (query: string) => {
  const resultFeatures: FeatureRequest[] = await prisma.featureRequest.findMany(
    {
      where: {
        OR: [
          {
            comments:{
              some:{
                comment:{
                  contains:query
                },
                commentReplys:{
                  some:{
                    comment:{
                      contains:query
                    }
                  }
                }
              }
            }
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
    }
  );

  const result = {
    features: resultFeatures,
  };

  return result;
};

/**
 * Querys the database for all users by their name.
 * @param query the name we want to search for
 * @returns an array of users that match the query
 */
export const searchUserByName = async (query: string) => {
  const result: User[] = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  return result;
};

/**
 * Querys the database for all users by their email.
 * @param query the email we want to search for
 * @returns
 */
export const searchUserByEmail = async (query: string) => {
  const result: User[] = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  return result;
};

/**
 * Querys the database for all feature requests matching the user who made the request's name
 * @param query The name we want to search for
 * @returns an array of all feature requests that match the users name
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
 * Querys the database for all the feature request matching the user who made the request's email
 * @param query The email we want to search for
 * @returns an array of all features that match the users email
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
 * Querys the database for all the feature requests matching the category name
 * @param query the category name we want to search for
 * @returns an array of all features that match the category name
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
 * Querys the database for all the feature requests matching the title
 * @param query the title we want to search for
 * @returns an array of all features that match the title
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
 * Querys the database for all the feature requests matching the description
 * @param query the description we want to search for
 * @returns an array of all features that match the description
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
