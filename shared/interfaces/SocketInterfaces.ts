import { SocketTypes } from "./SocketTypes";

export interface SocketUpvote {
  type: SocketTypes.UPVOTE;
  postId: string;
  userId: string;
}

export interface SocketComment {
  type: SocketTypes.COMMENT;
  postId: string;
  userId: string;
}

export interface SocketReply {
  type: SocketTypes.REPLY;
  postId: string;
  userId: string;
}
