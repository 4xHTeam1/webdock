//ESocketTypes importeres fra en anden fil. denne import bruges til at få adgang til de definerede socket-typer
import { ESocketTypes } from "./ESockets";

export interface ISocketUpvote {
  //definerer attributterne 'type', 'postId' og 'userId' til brug i en 'upvote'
  type: SocketTypes.UPVOTE;
  postId: string;
  userId: string;
}

export interface ISocketComment {
  //definerer attributterne 'type', 'postId' og 'userId' til brug i en 'comment'
  type: SocketTypes.COMMENT;
  postId: string;
  userId: string;
}

export interface ISocketReply {
  //definerer attributterne 'type', 'postId' og 'userId' til brug i en 'Reply'
  type: SocketTypes.REPLY;
  postId: string;
  userId: string;
}






