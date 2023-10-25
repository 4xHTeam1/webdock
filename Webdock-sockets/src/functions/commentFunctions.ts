import { ISocketComment } from "../../../shared/interfaces/ISockets";
import { ISocketReply } from "../../../shared/interfaces/ISockets";

export const comment = ({ type, postId, userId }: ISocketComment) => {
  console.log("comment");
};

export const reply = ({ type, postId, userId }: ISocketReply) => {
  console.log("reply");
};
