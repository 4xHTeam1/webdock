import { SocketComment } from "../../../shared/interfaces/SocketInterfaces";
import { SocketReply } from "../../../shared/interfaces/SocketInterfaces";

export const comment = ({ type, postId, userId }: SocketComment) => {
  console.log("comment");
};

export const reply = ({ type, postId, userId }: SocketReply) => {
  console.log("reply");
};
