import { ChatTypes } from "./chatTypes";

export interface ChatMessage {
  type: ChatTypes.MESSAGE;
  message: string;
}

export interface ChatPing {
  type: ChatTypes.PING;
}

export interface ChatPong {
  type: ChatTypes.PONG;
}

export interface ChatJoin {
  type: ChatTypes.JOIN;
  room: string;
}

export interface ChatLeave {
  type: ChatTypes.LEAVE;
  room: string;
}

export interface ChatError {
  type: ChatTypes.ERROR;
  error: string;
}

export interface ChatConsole {
  type: ChatTypes.CONSOLE;
  message: string;
}

export interface ChatCommand {
  type: ChatTypes.COMMAND;
  command: string;
}