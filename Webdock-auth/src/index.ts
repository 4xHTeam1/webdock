import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { getUserByUUID, addUser, getUserByID } from "./querys/querys";
import { User } from "@prisma/client";
import { IToken } from "./interfaces/IToken";
import { BodyValidation } from "../shared/services/BodyValidation";
import { TokenValidation } from "../shared/services/TokenValidation";
import cors from "@elysiajs/cors";

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
  .use(cors())
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 401,
    });
  })
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .post("/verify", async ({ jwt, body }) => {
    BodyValidation(body, "token");
    /* Gets token from body, and ensures that is has the field Token on it */
    const { token } = body as IToken;

    /* Verifies the token, with the given secret as described on line 12 */
    /* Returns the object from the jwt, or throws an error if the jwt is not valid */
    const verification = await TokenValidation(jwt, token);

    /* Else we take the id from the verified user */
    const { id } = verification as User;

    /* Query the database for the exisiting user. As if it doesn't exist, we need to add it */
    /* For backwards compatibility with the already existing user base from Webdock */
    let dbUser = await getUserByID(id);
    /* If the dbUser doesnt exist, add it. If it does exist, do nothing. */
    dbUser ?? (dbUser = await addUser(verification as User));

    /* Returns the user */
    return dbUser;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
