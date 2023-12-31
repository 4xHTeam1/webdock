import { Elysia } from "elysia";
import {
  commentOnFeature,
  createFeature,
  deleteComment,
  deleteCommentReply,
  deleteFeature,
  getAllComments,
  getCategories,
  getFeature,
  getFeatureUpvoteCount,
  getFeatures,
  getNotifications,
  getStatuses,
  postNotification,
  removeAllNotifications,
  removeNotification,
  replyToComment,
  unvoteFeature,
  updateComment,
  updateFeature,
  updateReply,
  upvoteFeature,
} from "./querys/querys";
import {
  ICreateComment,
  ICreateFeature,
  ICreateReply,
  IDeleteComment,
  IDeleteReply,
  IDownvoteFeature,
  IFeatureById,
  IGetAllComments,
  INotification,
  IUpdateComment,
  IUpdateFeature,
  IUpdateReply,
  IUpvoteFeature,
} from "./interfaces/IFeatures";
import swagger from "@elysiajs/swagger";
import { ParamValidation } from "../shared/services/ParamValidation";
import { BodyValidation } from "../shared/services/BodyValidation";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(
    swagger({
      path: "/v1/swagger",
    })
  )
  .use(cors())
  .get("/status", () => {
    try {
      return {
        status: "ok",
      };
    } catch (err) {
      //TODO: THROW PROPPER ERROR
    }
  })
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 401,
    });
  })
  .group("/features", (app) =>
    app
      .get("/", async () => {
        const features = {
          features: await getFeatures(),
        };
        return features;
      })
      .get("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await getFeature({ id: Number(id) } as IFeatureById);
      })
      .post("/", async ({ body }) => {
        BodyValidation(body, ["title", "description", "userId", "category"]);
        return await createFeature(body as ICreateFeature);
      })
      .put("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, [
          "title",
          "description",
          "categoryId",
          "statusId",
        ]);

        const { title, description, categoryId, statusId } =
          body as IUpdateFeature;
        const update = {
          id: Number(id),
          title,
          description,
          categoryId,
          statusId,
        };
        return await updateFeature(update as IUpdateFeature);
        //test
      })
      .delete("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await deleteFeature({ id: Number(id) } as IFeatureById);
      })
  )
  .group("/comment", (app) =>
    app
      .get("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await getAllComments({ id: Number(id) } as IGetAllComments);
      })
      .post("/", async ({ body }) => {
        BodyValidation(body, ["id", "userId", "comment"]);
        return await commentOnFeature(body as ICreateComment);
      })
      .post("/reply", async ({ body }) => {
        BodyValidation(body, ["id", "userId", "comment"]);
        return await replyToComment(body as ICreateReply);
      })
      .delete("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await deleteComment({ id: Number(id) } as IDeleteComment);
      })
      .delete("/reply/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await deleteCommentReply({ id: Number(id) } as IDeleteReply);
      })
      .put("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["comment"]);
        const { comment } = body as IUpdateComment;
        const update = {
          id: Number(id),
          comment,
        } as IUpdateComment;
        return await updateComment(update);
      })
      .put("/reply/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["comment"]);
        const { comment } = body as IUpdateReply;
        const update = {
          id: Number(id),
          comment,
        } as IUpdateReply;
        return await updateReply(update);
      })
  )
  /*Grouping allows you to combine multiple prefixes into one.*/
  .group("/upvote", (app) =>
    app
      /*async promise return the data after the code has excicuted */
      .post("/", async ({ body }) => {
        BodyValidation(body, ["id", "userId"]);
        return await upvoteFeature(body as IUpvoteFeature);
      })
      .delete("/:id/:userId", async ({ params: { id, userId } }) => {
        //BodyValidation(body, ["id", "userId"]);
        const params = {
          id: Number(id),
          userId: Number(userId),
        };
        return await unvoteFeature(params as IDownvoteFeature);
      })
      .get("/upvoteCount/:id", async ({ params: { id } }) => {
        ParamValidation(id);
        return await getFeatureUpvoteCount(Number(id));
      })
  )
  .group("/notification", (app) =>
    app
      .get("/:id", async ({ params: { id } }) => {
        ParamValidation(id);
        return await getNotifications(Number(id));
      })
      .post("/", async ({ body }) => {
        BodyValidation(body, ["ownerId", "userId", "featureRequestId", "type"]);
        return await postNotification(body as INotification);
      })
      .delete("/:id", async ({ params: { id } }) => {
        ParamValidation(id);
        return await removeNotification(Number(id));
      })
      .delete("/markAllAsRead/:id", async ({ params: { id } }) => {
        ParamValidation(id);
        return await removeAllNotifications(Number(id));
      })
  )
  .get("/categories", async () => {
    return await getCategories();
  })
  .get("/statuses", async () => {
    return await getStatuses();
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
