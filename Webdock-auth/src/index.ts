import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET!,
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "Webdock Auth",
          description: "API Documentation",
          version: "0.0.1",
        },
      },

      path: "/v2/swagger",
    })
  )
  .get("/", () => `${process.env.SECRET}`)
  .post("/verify", async ({ jwt, body }) => {
    console.log(body);

    const { token } = body as { token: string };

    const verification = await jwt.verify(token);

    return verification;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
