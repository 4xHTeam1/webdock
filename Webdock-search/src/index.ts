import { Elysia } from "elysia";
import querys from "./querys";

const app = new Elysia()
  .get("/", async () => {
    return querys.a();
  })
  .post("/search", async () => {
    return querys.a();
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
