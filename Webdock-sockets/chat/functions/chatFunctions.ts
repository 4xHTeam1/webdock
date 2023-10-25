import { ChatMessage, ChatPing } from "../interfaces/chatInterfaces";
import { ChatTypes } from "../interfaces/chatTypes";


export const activeConnections: Record<string, any> = {};

export const addConnection = (uuid: string, ws: any) => {
  activeConnections[uuid] = ws;
};

export const removeConnection = (uuid: string) => {
  delete activeConnections[uuid];
};

export const sendMessageToUser = (
  sender: string,
  uuid: string,
  message: string
) => {
  const ws = activeConnections[uuid];
  if (ws) {
    message = `Private message from ${sender}: ${message}`;
    const privateMessage: ChatMessage = {
      type: ChatTypes.MESSAGE,
      message: message,
    };
    ws.send(privateMessage);
  }
};

export const sendPingToUser = (sender: string, uuid: string) => {
  const ws = activeConnections[uuid];
  console.log("asdasdas",uuid)
  console.log(activeConnections[uuid]);
  if (ws) {
    const ping: ChatPing = {
      type: ChatTypes.PING,
    };

    ws.send(ping);
  }
};

export const sendMessageToAll = (sender: string, message: string, ws: any) => {
  const msg: ChatMessage = {
    type: ChatTypes.MESSAGE,
    message: `${sender}: ${message}`,
  };

  ws.publish("test", msg);
};
