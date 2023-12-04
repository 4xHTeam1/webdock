import { ESocketTypes } from "./ESockets";

export interface ISocketUpvote {
  postId: number;
  userId: number;
  ownerId: number;
}

export interface ISocketComment {
  type: ESocketTypes.COMMENT;
  postId: string;
  userId: string;
}

export interface ISocketReply {
  type: ESocketTypes.REPLY;
  postId: string;
  userId: string;
}
