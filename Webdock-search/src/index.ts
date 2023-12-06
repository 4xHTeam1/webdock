import { Elysia } from "elysia";
import {
  searchAll,
  searchFeatureByDescription,
  searchFeatureByTitle,
  searchFeaturesByCategory,
  searchFeaturesByUserEmail,
  searchFeaturesByUserName,
  searchUserByEmail,
  searchUserByName,
} from "./querys/querys";
import swagger from "@elysiajs/swagger";
import { SearchValidation } from "../shared/services/SearchValidation";

const app = new Elysia()
  .use(
    swagger({
      autoDarkMode: true,
      path: "/v2/swagger",
    })
  )
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 400,
    });
  })
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .group("/search", (app) =>
    app
      .get("/all", async ({ query: { query } }) => {
        SearchValidation(query);

        const searched = await searchAll(query);
        return searched;
      })
      /* ENDPOINT */
      .group("/user", (app) =>
        app
          .get("/name", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchUserByName(query);
            return result;
          })
          .get("/email", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchUserByEmail(query);
            return result;
          })
      )
      .group("/feature", (app) =>
        app
          .get("/user/name", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchFeaturesByUserName(query);
            return result;
          })
          .get("/user/email", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchFeaturesByUserEmail(query);
            return result;
          })
          .get("/category", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchFeaturesByCategory(query);
            return result;
          })
          .get("/title", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchFeatureByTitle(query);
            return result;
          })
          .get("/description", async ({ query: { query } }) => {
            SearchValidation(query);
            const result = await searchFeatureByDescription(query);
            return result;
          })
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
