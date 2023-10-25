import { SocketTypes } from "./ESockets";

export interface ISocketUpvote {
  type: SocketTypes.UPVOTE;
  postId: string;
  userId: string;
}

export interface ISocketComment {
  type: SocketTypes.COMMENT;
  postId: string;
  userId: string;
}

export interface ISocketReply {
  type: SocketTypes.REPLY;
  postId: string;
  userId: string;
}
