import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { upvote } from "./functions/rateFunctions";
import { get } from "http";
import { getFeatureOwner } from "./querys/querys";

const prisma = new PrismaClient();
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
  .get("/metrics", async () => {
    let prismaMetrics = await prisma.$metrics.prometheus();
    return prismaMetrics;
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
