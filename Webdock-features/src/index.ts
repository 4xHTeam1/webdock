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
  .group("/features", (app) =>
    app
      .get("/", async () => {
        try {
          return await getFeatures();
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .get("/:id", async ({ params: { id } }) => {
        try {
          return await getFeature({ id: Number(id) } as FeatureById);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .post("/", async ({ body }) => {
        try {
          return await createFeature(body as CreateFeature);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .put("/:id", async ({ params: { id }, body }) => {
        try {
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
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .delete("/:id", async ({ params: { id } }) => {
        try {
          return await deleteFeature({ id: Number(id) } as FeatureById);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
  )
  .group("/comment", (app) =>
    app
      .get("/:id", async ({ params: { id } }) => {
        try {
          return await getAllComments({ id: Number(id) } as GetAllComments);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .post("/", async ({ body }) => {
        try {
          return await commentOnFeature(body as CreateComment);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .post("/reply", async ({ body }) => {
        try {
          return await replyToComment(body as CreateReply);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .delete("/:id", async ({ params: { id } }) => {
        try {
          return await deleteComment({ id: Number(id) } as DeleteComment);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .delete("/reply/:id", async ({ params: { id } }) => {
        try {
          return await deleteCommentReply({ id: Number(id) } as DeleteReply);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .put("/:id", async ({ params: { id }, body }) => {
        try {
          const { comment } = body as UpdateComment;
          const update = {
            id: Number(id),
            comment,
          } as UpdateComment;
          return await updateComment(update);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .put("/reply/:id", async ({ params: { id }, body }) => {
        try {
          const { comment } = body as UpdateReply;
          const update = {
            id: Number(id),
            comment,
          } as UpdateReply;
          return await updateReply(update);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
  )
  .group("/upvote", (app) =>
    app
      .post("/:id", async ({ params: { id }, body }) => {
        try {
          const { userId } = body as UpvoteFeature;

          const upvote = {
            id: Number(id),
            userId,
          } as UpvoteFeature;

          return await upvoteFeature(upvote);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
      .delete("/:id", async ({ params: { id }, body }) => {
        try {
          const { userId } = body as DownvoteFeature;

          const unvote = {
            id: Number(id),
            userId,
          } as DownvoteFeature;

          return await unvoteFeature(unvote);
        } catch (err) {
          //TODO: THROW PROPPER ERROR
        }
      })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
