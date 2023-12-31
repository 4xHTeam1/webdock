import { PrismaClient } from "@prisma/client";
import {
  ICreateComment,
  ICreateFeature,
  ICreateReply,
  IDeleteComment,
  IDeleteFeature,
  IDeleteReply,
  IDownvoteFeature,
  IFeatureById,
  IGetAllComments,
  INotification,
  IUpdateComment,
  IUpdateFeature,
  IUpdateReply,
  IUpvoteFeature,
} from "../interfaces/IFeatures";

const prisma = new PrismaClient();

/**
 * Retrieves all feature requests from the database.
 * @returns {Promise<FeatureRequest[]>} A promise that resolves to an array of FeatureRequest objects.
 */
export const getFeatures = async () => {
  try {
    const features = await prisma.featureRequest.findMany({
      include: {
        category: true,
        status: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        featureUpvotes: true,
        _count: {
          select: {
            featureUpvotes: true,
          },
        },
      },
    });
    return features;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Retrieves a feature request by its ID.
 * @param {IFeatureById} - An object containing the ID of the feature request to retrieve.
 * @returns {Promise<Feature>} - A promise that resolves to the retrieved feature request.
 */
export const getFeature = async ({ id }: IFeatureById) => {
  try {
    const feature = await prisma.featureRequest.findUnique({
      where: { id },
      include: {
        category: true,
        status: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
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
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Creates a new feature request.
 * @param {ICreateFeature} featureData - The data for the new feature request.
 * @returns {Promise<FeatureRequest>} - A promise that resolves with the newly created feature request.
 */
export const createFeature = async ({
  title,
  description,
  userId,
  category,
}: ICreateFeature) => {
  try {
    if (!category.id) category.id = 1;

    const feature = await prisma.featureRequest.create({
      data: {
        title,
        description,
        userId,
        categoryId: category.id,
        statusId: 1,
      },
      include: {
        category: true,
        status: true,
        featureUpvotes: true,
        _count: {
          select: {
            featureUpvotes: true,
          },
        },
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Updates a feature request in the database.
 * @param {IUpdateFeature} - An object containing the id, title, description, statusId, and categoryId of the feature to be updated.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the updated feature request object.
 */
export const updateFeature = async ({
  id,
  title,
  description,
  statusId,
  categoryId,
}: IUpdateFeature) => {
  try {
    const feature = await prisma.featureRequest.update({
      where: { id },
      data: {
        title,
        description,
        statusId,
        categoryId,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Deletes a feature request from the database.
 * @param {IDeleteFeature} - An object containing the ID of the feature request to be deleted.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the deleted feature request.
 */
export const deleteFeature = async ({ id }: IDeleteFeature) => {
  try {
    const feature = await prisma.featureRequest.delete({
      where: { id },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Creates a comment on a feature request.
 * @param {ICreateComment} - An object containing the id of the feature request, the user id of the commenter, and the comment text.
 * @returns {Promise<FeatureRequest>} - A Promise that resolves to the updated feature request object.
 */
export const commentOnFeature = async ({
  id,
  userId,
  comment,
}: ICreateComment) => {
  try {
    const feature = await prisma.comment.create({
      data: {
        featureRequestId: id,
        userId,
        comment,
      },
      include: {
        user: true,
        commentReplys: {
          include: {
            user: true,
          },
        },
      },
    });

    return feature;
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * Creates a reply to a comment.
 * @param {ICreateReply} - An object containing the id of the comment being replied to, the user id of the person making the reply, and the content of the reply.
 * @returns {Promise<commentReply>} - A promise that resolves to the updated comment feature.
 */
export const replyToComment = async ({ id, userId, comment }: ICreateReply) => {
  try {
    const feature = await prisma.commentReply.create({
      data: {
        commentId: id,
        userId,
        comment,
      },
      include: {
        comment_relation: true,
        user: true,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Updates a comment in the database.
 * @param {IUpdateComment} - An object containing the ID of the comment to update and the new comment text.
 * @returns {Promise<Comment>} - A promise that resolves to the updated comment object.
 */
export const updateComment = async ({ id, comment }: IUpdateComment) => {
  try {
    const feature = await prisma.comment.update({
      where: { id },
      data: {
        comment,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Updates a comment reply in the database.
 * @param {IUpdateReply} - An object containing the id of the comment reply to update and the new comment.
 * @returns {Promise<CommentReply>} - A promise that resolves to the updated comment reply object.
 */
export const updateReply = async ({ id, comment }: IUpdateReply) => {
  try {
    const feature = await prisma.commentReply.update({
      where: { id },
      data: {
        comment,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Deletes a comment from the database.
 * @param {IDeleteComment} - An object containing the ID of the comment to delete.
 * @returns {Promise<Comment>} - A promise that resolves to the deleted comment.
 */
export const deleteComment = async ({ id }: IDeleteComment) => {
  try {
    const feature = await prisma.comment.delete({
      where: { id },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Deletes a comment reply from the database.
 * @param {IDeleteReply} - An object containing the ID of the comment reply to delete.
 * @returns {Promise<Feature>} - A promise that resolves to the deleted comment reply.
 */
export const deleteCommentReply = async ({ id }: IDeleteReply) => {
  try {
    const feature = await prisma.commentReply.delete({
      where: { id },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Retrieves all comments for a given feature request.
 * @param {IGetAllComments} - An object containing the ID of the feature request.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the feature request object with all its comments and replies.
 */
export const getAllComments = async ({ id }: IGetAllComments) => {
  try {
    const feature = await prisma.featureRequest.findUnique({
      where: { id },
      select: {
        comments: {
          include: {
            user: true,
            commentReplys: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Adds an upvote to a feature request for a given user.
 * @param {IUpvoteFeature} - An object containing the feature request ID and the user ID.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the updated feature request object.
 */
export const upvoteFeature = async ({ id, userId }: IUpvoteFeature) => {
  try {
    await prisma.featureRequest.update({
      where: { id },
      data: {
        featureUpvotes: {
          create: {
            userId,
          },
        },
      },
    });
    const feature = await prisma.featureRequest.findUnique({
      where: { id },
      include: {
        category: true,
        status: true,
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
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Removes an upvote from a feature request for a given user.
 * @param {IDownvoteFeature} - An object containing the feature request ID and the user ID.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the updated feature request object.
 */

export const unvoteFeature = async ({ id, userId }: IDownvoteFeature) => {
  try {
    await prisma.featureUpvote.delete({
      where: {
        userId_featureRequestId: {
          userId,
          featureRequestId: id,
        },
      },
    });
    const feature = await prisma.featureRequest.findUnique({
      where: { id },
      include: {
        category: true,
        status: true,
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
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Retrieves the upvote count for a specific feature request.
 * @param id - The ID of the feature request.
 * @returns The number of upvotes for the feature request.
 */
export const getFeatureUpvoteCount = async (id: number) => {
  try {
    const feature = await prisma.featureUpvote.count({
      where: {
        featureRequestId: id,
      },
    });
    return feature;
  } catch (e) {}
};

/**
 * Retrieves all categories from the database.
 * @returns {Promise<{ categories: Category[] }>} A promise that resolves to an object containing the categories.
 */
export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({});
    return {
      categories,
    };
  } catch (err) {}
};

/**
 * Retrieves notifications for a given owner ID.
 * @param ownerId - The ID of the owner.
 * @returns An object containing the retrieved notifications.
 */
export const getNotifications = async (ownerId: number) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        ownerId,
      },
      include: {
        user: true,
        owner: true,
        featureRequest: true,
      },
    });
    return {
      notifications,
    };
  } catch (err) {}
};

/**
 * Creates a new notification and returns the created notification object.
 * @param {INotification} notificationData - The data for creating the notification.
 * @returns {Promise<{ notification: Notification }>} - The created notification object.
 */
export const postNotification = async ({
  ownerId,
  userId,
  featureRequestId,
  type,
}: INotification) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        ownerId,
        userId,
        featureRequestId,
        type,
      },
      include: {
        user: true,
        owner: true,
        featureRequest: true,
      },
    });
    return {
      notification,
    };
  } catch (err) {}
};

/**
 * Removes a notification from the database.
 * @param id - The ID of the notification to be removed.
 * @returns An object containing the removed notification.
 */
export const removeNotification = async (id: number) => {
  try {
    const notification = await prisma.notification.delete({
      where: {
        id,
      },
    });
    return {
      notification,
    };
  } catch (err) {}
};

/**
 * Removes all notifications for a given owner.
 * @param ownerId - The ID of the owner.
 * @returns An object containing the deleted notifications.
 */
export const removeAllNotifications = async (ownerId: number) => {
  try {
    const notifications = await prisma.notification.deleteMany({
      where: {
        ownerId,
      },
    });
    return {
      notifications,
    };
  } catch (err) {}
};

/**
 * Retrieves all statuses from the database.
 * @returns {Promise<{ statuses: Status[] }>} A promise that resolves to an object containing the retrieved statuses.
 */
export const getStatuses = async () => {
  try {
    const statuses = await prisma.status.findMany({});
    return {
      statuses,
    };
  } catch (err) {}
};
