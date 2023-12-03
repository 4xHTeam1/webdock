import { ISocketUpvote } from "../../../shared/interfaces/ISockets";
import { getFeatureById, getUserNameById } from "../querys/querys";

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
