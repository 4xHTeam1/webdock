import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", async () => {
    return "Hello World!";
  })
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
