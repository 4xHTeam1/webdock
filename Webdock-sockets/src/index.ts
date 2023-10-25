import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const activeConnections: Record<string, any> = {};

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
      const { uuid } = ws.data.query || {};

      if (uuid) {
      }
    },
    open: (ws) => {
      const { uuid } = ws.data.query || {};

      if (uuid) {
      }
    },

    message(ws, message: any) {
      const { uuid } = ws.data.query || {};
      if (!uuid) {
        return;
      }
    },
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
