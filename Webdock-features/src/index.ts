import { Elysia } from "elysia";
import {
  commentOnFeature,
  createFeature,
  deleteComment,
  deleteCommentReply,
  deleteFeature,
  getAllComments,
  getFeature,
  getFeatures,
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
  IUpdateComment,
  IUpdateFeature,
  IUpdateReply,
  IUpvoteFeature,
} from "./interfaces/IFeatures";
import { ParamValidation } from "../shared/services/ParamValidation";
import { BodyValidation } from "../shared/services/BodyValidation";

const app = new Elysia()
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
        return await getFeatures();
      })
      .get("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await getFeature({ id: Number(id) } as IFeatureById);
      })
      .post("/", async ({ body }) => {
        BodyValidation(body, [
          "title",
          "description",
          "userId",
          "categoryId",
          "statusId",
        ]);
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
  .group("/upvote", (app) =>
    app
      .post("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["userId"]);
        const { userId } = body as IUpvoteFeature;

        const upvote = {
          id: Number(id),
          userId,
        } as IUpvoteFeature;

        return await upvoteFeature(upvote);
      })
      .delete("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["userId"]);
        const { userId } = body as IDownvoteFeature;

        const unvote = {
          id: Number(id),
          userId,
        } as IDownvoteFeature;

        return await unvoteFeature(unvote);
      })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
