import { ISocketUpvote } from "../../../shared/interfaces/ISockets";
import { getFeatureById, getUserNameById } from "../querys/querys";

/**
 * Returns a notification object.
 * @param {string} params.postId - The ID of the feature request.
 * @param {string} params.userId - The ID of the user upvoting the feature request.
 * @param {string} params.ownerId - The ID of the owner of the feature request.
 * @returns {Promise<{ type: string, data: { ownerId: string, featureRequestId: string, type: string, featureRequest: any, user: any } }>} - The notification object.
 */
export const upvote = async ({ postId, userId, ownerId }: ISocketUpvote) => {
  let featureRequest = await getFeatureById(postId);
  let user = await getUserNameById(userId);
  if (!featureRequest || !user) {
    return;
  }

  return {
    type: "notification",
    data: {
      ownerId,
      featureRequestId: postId,
      type: "upvote",
      featureRequest,
      user,
    },
  };
};
