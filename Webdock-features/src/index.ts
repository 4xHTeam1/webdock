import { Elysia } from "elysia";
import { seed } from "./querys";

const app = new Elysia()
  .get("/", async () => {
    await seed();
    return "Hello World!";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
