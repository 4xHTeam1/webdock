import { ISocketUpvote } from "../../../shared/interfaces/ISockets";

export const upvote = ({ type, postId, userId }: ISocketUpvote) => {
    console.log("upvote");
};
