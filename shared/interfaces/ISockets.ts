//Importen af 'ESocketTypes' fra 'ESockets'-filen giver adgang til specifikke handlingstyper såsom opstemning, 
//kommentar eller svar, der kan forekomme på kanalen.
import { ESocketTypes } from "./ESockets";

export interface ISocketUpvote {
  //Denne kode definerer en grænseflade (interface) i TypeScript, der repræsenterer datastrukturen for en opstemning på en socket-kommunikationskanal.
  //Grænsefladen 'ISocketUpvote' specificerer de nødvendige felter: 'postId', 'userId' og 'ownerId', der kræves for at udføre en opstemning på kanalen.
  postId: number;
  userId: number;
  ownerId: number;
}

export interface ISocketComment {
  //beskriver strukturen af data, der kræves for at repræsentere en kommentarhandling på en socket-kommunikationskanal. 
  //ISocketComment angiver specifikke datafelter såsom 'type', 'postId' og 'userId', der er nødvendige for at repræsentere en kommentarhandling på kanalen.
  type: ESocketTypes.COMMENT;
  postId: string;
  userId: string;
}

export interface ISocketReply {
  //beskriver strukturen af data, der kræves for at repræsentere en svarhandling på en socket-kommunikationskanal. 
  //ISocketReply angiver specifikke datafelter såsom 'type', 'postId' og 'userId', der er nødvendige for at repræsentere en svarhandling på kanalen.
  type: ESocketTypes.REPLY;
  postId: string;
  userId: string;
}

//Denne kode definerer grænseflader (interfaces) i TypeScript, der repræsenterer forskellige handlinger på en socket-kommunikationskanal.
//Hver interface definerer specifikke datastrukturer for forskellige socket-handlinger: 'upvote', 'comment' og 'reply'.
//De bruger ESocketTypes fra ESockets-filen til at specificere typerne af handlinger, der udføres på kanalen."