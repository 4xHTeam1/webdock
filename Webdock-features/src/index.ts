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
  CreateComment,
  CreateFeature,
  CreateReply,
  DeleteComment,
  DeleteReply,
  DownvoteFeature,
  FeatureById,
  GetAllComments,
  UpdateComment,
  UpdateFeature,
  UpdateReply,
  UpvoteFeature,
} from "./interfaces/IFeatures";
import { ParamValidation } from "../../shared/services/ParamValidation";
import { BodyValidation } from "../../shared/services/BodyValidation";

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
        return await getFeature({ id: Number(id) } as FeatureById);
      })
      .post("/", async ({ body }) => {
        BodyValidation(body, [
          "title",
          "description",
          "userId",
          "categoryId",
          "statusId",
        ]);
        return await createFeature(body as CreateFeature);
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
          body as UpdateFeature;
        const update = {
          id: Number(id),
          title,
          description,
          categoryId,
          statusId,
        };
        return await updateFeature(update as UpdateFeature);
      })
      .delete("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await deleteFeature({ id: Number(id) } as FeatureById);
      })
  )
  .group("/comment", (app) =>
    app
      .get("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await getAllComments({ id: Number(id) } as GetAllComments);
      })
      .post("/", async ({ body }) => {
        BodyValidation(body, ["id", "userId", "comment"]);
        return await commentOnFeature(body as CreateComment);
      })
      .post("/reply", async ({ body }) => {
        BodyValidation(body, ["id", "userId", "comment"]);
        return await replyToComment(body as CreateReply);
      })
      .delete("/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await deleteComment({ id: Number(id) } as DeleteComment);
      })
      .delete("/reply/:id", async ({ params: { id } }) => {
        ParamValidation(Number(id));
        return await deleteCommentReply({ id: Number(id) } as DeleteReply);
      })
      .put("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["comment"]);
        const { comment } = body as UpdateComment;
        const update = {
          id: Number(id),
          comment,
        } as UpdateComment;
        return await updateComment(update);
      })
      .put("/reply/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["comment"]);
        const { comment } = body as UpdateReply;
        const update = {
          id: Number(id),
          comment,
        } as UpdateReply;
        return await updateReply(update);
      })
  )
  .group("/upvote", (app) =>
    app
      .post("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["userId"]);
        const { userId } = body as UpvoteFeature;

        const upvote = {
          id: Number(id),
          userId,
        } as UpvoteFeature;

        return await upvoteFeature(upvote);
      })
      .delete("/:id", async ({ params: { id }, body }) => {
        ParamValidation(Number(id));
        BodyValidation(body, ["userId"]);
        const { userId } = body as DownvoteFeature;

        const unvote = {
          id: Number(id),
          userId,
        } as DownvoteFeature;

        return await unvoteFeature(unvote);
      })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


