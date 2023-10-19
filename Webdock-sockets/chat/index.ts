import { Elysia } from "elysia";
import {
  activeConnections,
  sendMessageToAll,
  sendMessageToUser,
  sendPingToUser,
} from "./functions/chatFunctions";
import { ChatConsole, ChatMessage } from "./interfaces/chatInterfaces";
import { ChatTypes } from "./interfaces/chatTypes";

const commandDescriptions: Record<string, string> = {
  "/pm": "Send a private message to a user. Usage: /pm <user id> <message>",
  "/list": "List all online users",
  "/ping": "Ping a user. Usage: /ping <user id>",
  "/help": "List all commands",
};

const app = new Elysia()
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .ws("/ws", {
    close: (ws) => {
      const { uuid } = ws.data.query || {};

      if (uuid) {
        delete activeConnections[uuid];
        console.log(`Client disconnected: ${uuid}`);
        const msg: ChatConsole = {
          type: ChatTypes.CONSOLE,
          message: "Server: user has left the chat",
        };
        ws.unsubscribe("test");
        ws.publish("test", msg);
      }
    },
    open: (ws) => {
      const { uuid } = ws.data.query || {};

      if (uuid) {
        activeConnections[uuid] = ws;
        console.log(`Client connected: ${uuid}`);
        const msg: ChatMessage = {
          type: ChatTypes.MESSAGE,
          message: "Server: A new user has entered the chat",
        };
        ws.subscribe("test");
        ws.publish("test", msg);
      }
    },

    message(ws, message) {
      const { uuid } = ws.data.query || {};
      if (!uuid) {
        return;
      }

      let msg = message as string;
      msg = ""+msg;

      console.log(`Message received: ${msg}`);
      console.log(Object.keys(commandDescriptions).includes(msg));

      if (msg.startsWith("/pm")) {
        const [_, user, ...message] = msg.split(" ");
        sendMessageToUser(uuid, user, message.join(" "));
        return;
      }

      if (msg.startsWith("/list")) {
        const users = Object.keys(activeConnections).filter(
          (user) => user !== uuid
        );
        const msg: ChatConsole = {
          type: ChatTypes.CONSOLE,
          message: `Online users: ${users.join(", ")}`,
        };
        ws.send(msg);
        return;
      }

      if (msg.startsWith("/ping")) {
        const [_, user] = msg.split(" ");
        sendPingToUser(uuid, user);
        return;
      }

      if (msg.startsWith("@")) {
        const user = msg.split(" ")[0].slice(1);
        sendPingToUser(uuid, user);
        sendMessageToAll(uuid, msg, ws);
        return;
      }

      if (msg.startsWith("/help")) {
        const msg: ChatConsole = {
          type: ChatTypes.CONSOLE,
          message: `Available commands: ${Object.keys(commandDescriptions)
            .map((command) => `${command} - ${commandDescriptions[command]}`)
            .join(", ")}`,
        };
        ws.send(msg);
        return;
      }

      if (
        msg.startsWith("/") &&
        !Object.keys(commandDescriptions).includes(msg)
      ) {
        const m: ChatConsole = {
          type: ChatTypes.CONSOLE,
          message: `Unknown command: ${msg}`,
        };
        ws.send(m);
        return;
      }
      sendMessageToAll(uuid, msg, ws);
      return;
    },
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
