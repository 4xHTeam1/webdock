import { ISocketUpvote } from "../../../shared/interfaces/ISockets";
import { getFeatureById, getUserNameById } from "../querys/querys";

export const upvote = async ({ postId, userId }: ISocketUpvote) => {
  let featureRequest = await getFeatureById(postId);
  let user = await getUserNameById(userId);
  if (!featureRequest || !user) {
    return;
  }

  return {
    type: "notification",
    data: {
      message: `${user!.name} upvoted your feature request`,
      data: featureRequest,
    },
  };
};
