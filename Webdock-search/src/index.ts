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
import { Query } from "./interfaces/searchInterfaces";

const app = new Elysia()
  .group("/search", (app) =>
    app
      .post("/all", async ({ body }) => {
        const { query } = body as Query;

        const searched = await searchAll(query);
        return searched;
      })
      .group("/user", (app) =>
        app
          .post("/name", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchUserByName(query);
            return result;
          })
          .post("/email", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchUserByEmail(query);
            return result;
          })
      )
      .group("/feature", (app) =>
        app
          .post("/user/name", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchFeaturesByUserName(query);
            return result;
          })
          .post("/user/email", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchFeaturesByUserEmail(query);
            return result;
          })
          .post("/category", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchFeaturesByCategory(query);
            return result;
          })
          .post("/title", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchFeatureByTitle(query);
            return result;
          })
          .post("/description", async ({ body }) => {
            const { query } = body as Query;

            const result = await searchFeatureByDescription(query);
            return result;
          })
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
