import { PrismaClient } from "@prisma/client";
import {
  CreateComment,
  CreateFeature,
  CreateReply,
  DeleteComment,
  DeleteFeature,
  DeleteReply,
  DownvoteFeature,
  FeatureById,
  GetAllComments,
  UpdateComment,
  UpdateFeature,
  UpdateReply,
  UpvoteFeature,
} from "../interfaces/IFeatures";

const prisma = new PrismaClient();

/**
 * Retrieves all feature requests from the database.
 * @returns {Promise<FeatureRequest[]>} A promise that resolves to an array of FeatureRequest objects.
 */
export const getFeatures = async () => {
  try {
    const features = await prisma.featureRequest.findMany();
    return features;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Retrieves a feature request by its ID.
 * @param {FeatureById} - An object containing the ID of the feature request to retrieve.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the retrieved feature request.
 */
export const getFeature = async ({ id }: FeatureById) => {
  try {
    const feature = await prisma.featureRequest.findUnique({
      where: { id },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Creates a new feature request.
 * @param {CreateFeature} featureData - The data for the new feature request.
 * @returns {Promise<Feature>} - A promise that resolves with the newly created feature request.
 */
export const createFeature = async ({
  title,
  description,
  userId,
  categoryId,
  statusId,
}: CreateFeature) => {
  try {
    if (!categoryId) categoryId = 1;
    if (!statusId) statusId = 1;

    const feature = await prisma.featureRequest.create({
      data: {
        title,
        description,
        userId,
        categoryId,
        statusId,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Updates a feature request in the database.
 * @param {UpdateFeature} - An object containing the id, title, description, statusId, and categoryId of the feature to be updated.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the updated feature request object.
 */
export const updateFeature = async ({
  id,
  title,
  description,
  statusId,
  categoryId,
}: UpdateFeature) => {
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
 * @param {DeleteFeature} - An object containing the ID of the feature request to be deleted.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the deleted feature request.
 */
export const deleteFeature = async ({ id }: DeleteFeature) => {
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
 * @param {CreateComment} - An object containing the id of the feature request, the user id of the commenter, and the comment text.
 * @returns {Promise<FeatureRequest>} - A Promise that resolves to the updated feature request object.
 */
export const commentOnFeature = async ({
  id,
  userId,
  comment,
}: CreateComment) => {
  try {
    const feature = await prisma.comment.create({
      data: {
        featureRequestId: id,
        userId,
        comment,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Creates a reply to a comment.
 * @param {CreateReply} - An object containing the id of the comment being replied to, the user id of the person making the reply, and the content of the reply.
 * @returns {Promise<Feature>} - A promise that resolves to the updated comment feature.
 */
export const replyToComment = async ({ id, userId, comment }: CreateReply) => {
  try {
    const feature = await prisma.commentReply.create({
      data: {
        commentId: id,
        userId,
        comment,
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

/**
 * Updates a comment in the database.
 * @param {UpdateComment} - An object containing the ID of the comment to update and the new comment text.
 * @returns {Promise<Comment>} - A promise that resolves to the updated comment object.
 */
export const updateComment = async ({ id, comment }: UpdateComment) => {
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
 * @param {UpdateReply} - An object containing the id of the comment reply to update and the new comment.
 * @returns {Promise<CommentReply>} - A promise that resolves to the updated comment reply object.
 */
export const updateReply = async ({ id, comment }: UpdateReply) => {
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
 * @param {DeleteComment} - An object containing the ID of the comment to delete.
 * @returns {Promise<Comment>} - A promise that resolves to the deleted comment.
 */
export const deleteComment = async ({ id }: DeleteComment) => {
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
 * @param {DeleteReply} - An object containing the ID of the comment reply to delete.
 * @returns {Promise<Feature>} - A promise that resolves to the deleted comment reply.
 */
export const deleteCommentReply = async ({ id }: DeleteReply) => {
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
 * @param {GetAllComments} - An object containing the ID of the feature request.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the feature request object with all its comments and replies.
 */
export const getAllComments = async ({ id }: GetAllComments) => {
  try {
    const feature = await prisma.featureRequest.findUnique({
      where: { id },
      select: {
        comments: {
          include: {
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
 * @param {UpvoteFeature} - An object containing the feature request ID and the user ID.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the updated feature request object.
 */
export const upvoteFeature = async ({ id, userId }: UpvoteFeature) => {
  try {
    const feature = await prisma.featureRequest.update({
      where: { id },
      data: {
        featureUpvotes: {
          create: {
            userId,
          },
        },
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};

//remove upvote from featureUpvote table for a given user and feature request

/**
 * Removes an upvote from a feature request for a given user.
 * @param {DownvoteFeature} - An object containing the feature request ID and the user ID.
 * @returns {Promise<FeatureRequest>} - A promise that resolves to the updated feature request object.
 */

export const unvoteFeature = async ({ id, userId }: DownvoteFeature) => {
  try {
    const feature = await prisma.featureUpvote.delete({
      where: {
        userId_featureRequestId: {
          userId,
          featureRequestId: id,
        },
      },
    });
    return feature;
  } catch (err) {
    //TODO: THROW PROPPER ERROR
  }
};
