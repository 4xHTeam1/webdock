import { Elysia } from "elysia";
import {
  createFeature,
  deleteFeature,
  getFeature,
  getFeatures,
  updateFeature,
} from "./querys/querys";
import {
  CreateFeature,
  FeatureById,
  UpdateFeature,
} from "./interfaces/IFeatures";

const app = new Elysia()
  .get("/", async () => {
    return "Hello World!";
  })
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .get("/features", async () => {
    return await getFeatures();
  })
  .get("/features/:id", async ({ params: { id } }) => {
    console.log(id);
    return await getFeature({ id: Number(id) } as FeatureById);
  })
  .post("/features", async ({ body }) => {
    return await createFeature(body as CreateFeature);
  })
  .put("/features/:id", async ({ params: { id }, body }) => {
    const { title, description, categoryId, statusId } = body as UpdateFeature;
    const update = {
      id: Number(id),
      title,
      description,
      categoryId,
      statusId,
    };
    return await updateFeature(update as UpdateFeature);
  })
  .delete("/features/:id", async ({ params: { id } }) => {
    return await deleteFeature(Number(id));
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
