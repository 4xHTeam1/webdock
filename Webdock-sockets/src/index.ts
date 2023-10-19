import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      console.log("Client disconnected");
    },
    open: (ws) => {
      console.log("Client connected");
    },
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
