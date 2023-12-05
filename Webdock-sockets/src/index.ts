import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { upvote } from "./functions/rateFunctions";
import { getFeatureOwner } from "./querys/querys";

const activeConnections: Record<number, any> = {};

const app = new Elysia()
  .use(
    swagger({
      autoDarkMode: true,
      path: "/v2/swagger",
    })
  )
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .ws("/ws", {
    close: (ws) => {
      const { userId } = ws.data.query || {};

      if (userId) {
        delete activeConnections[Number(userId)];
        console.log(`User ${userId} disconnected`);
      }
    },
    open: (ws) => {
      const { userId } = ws.data.query || {};

      if (userId) {
        activeConnections[Number(userId)] = ws;
        console.log(`User ${userId} connected`);
      }
    },

    async message(ws, message: any) {
      console.log(message);
      const { userId } = ws.data.query || {};
      if (!userId) {
        return;
      }
      switch (message.type) {
        case "upvote":
          const { postId, userId, ownerId } = message.data;
          const postOwner = await getFeatureOwner(postId);
          const ownerSocket = activeConnections[Number(ownerId)];
          if (ownerSocket) {
            let data = await upvote({ postId, userId, ownerId });
            console.log(data);
            ownerSocket.send(JSON.stringify(data));
          }
      }
    },
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
