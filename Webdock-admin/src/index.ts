import { Elysia } from "elysia";
import { GetAllUsers, GetUser, UpdateUserRole } from "./querys/userQuerys";
import { IGetUser, IUpdateUserRole } from "./interfaces/IUser";
import {
  CreateCategory,
  DeleteCategory,
  GetAllCategories,
  GetCategory,
  UpdateCategory,
} from "./querys/categoryQuerys";
import {
  ICreateCategory,
  IDeleteCategory,
  IGetCategory,
  IUpdateCategory,
} from "./interfaces/ICategory";
import {
  IGetStatus,
  ICreateStatus,
  IUpdateStatus,
  IDeleteStatus,
} from "./interfaces/IStatus";
import {
  GetAllStatuses,
  GetStatus,
  CreateStatus,
  UpdateStatus,
  DeleteStatus,
} from "./querys/statusQuerys";
import { IsAdministrator } from "../shared/services/AutherizationValidation";
import { IAdmin } from "../shared/services/interfaces/IAdministrator";
import { ParamValidation } from "../shared/services/ParamValidation";
import { BodyValidation } from "../shared/services/BodyValidation";
import cors from "@elysiajs/cors";
import { GetUsers } from "../../Webdock-frontend/src/services/adminService";
import { mergeFeatures, updateFeatureStatus } from "./querys/featureQuerys";

const app = new Elysia()
  .get("/status", async ({ request: { headers } }) => {
    return await GetAllUsers();
  })
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 401,
    });
  })
  .group("/users", (app) =>
    app
      .get("/", async ({ request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);
        return await GetAllUsers();
      })
      .get("/:id", async ({ params: { id }, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);
        ParamValidation(id);
        const userId = Number(id);
        return await GetUser({ id: userId } as IGetUser);
      })

      .put(
        "/role/:id",
        async ({ params: { id }, body, request: { headers } }) => {
          await IsAdministrator({
            requesterId: headers.get("requesterId"),
          } as IAdmin);
          BodyValidation(body, "role");
          const { role } = body as IUpdateUserRole;
          const userId = Number(id);
          return await UpdateUserRole({ id: userId, role } as IUpdateUserRole);
        }
      )
  )

  .group("/categories", (app) =>
    app
      .get("/", async ({ request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        return await GetAllCategories();
      })
      .get("/:id", async ({ params: { id }, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        ParamValidation(Number(id));

        return await GetCategory({ id: Number(id) } as IGetCategory);
      })
      .post("/", async ({ body, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        const { name } = body as ICreateCategory;
        return await CreateCategory({ name } as ICreateCategory);
      })
      .put("/:id", async ({ params: { id }, body, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);
        ParamValidation(Number(id));
        BodyValidation(body, "name");

        const { name } = body as IUpdateCategory;
        const update = {
          id: Number(id),
          name,
        } as IUpdateCategory;

        return await UpdateCategory(update as IUpdateCategory);
      })
      .delete("/:id", async ({ params: { id }, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        ParamValidation(Number(id));

        return await DeleteCategory({ id: Number(id) } as IDeleteCategory);
      })
  )
  .group("/statuses", (app) =>
    app
      .get("/", async ({ request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        return await GetAllStatuses();
      })
      .get("/:id", async ({ params: { id }, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        ParamValidation(Number(id));

        return await GetStatus({ id: Number(id) } as IGetStatus);
      })
      .post("/", async ({ body, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        const { name } = body as ICreateStatus;
        return await CreateStatus({ name } as ICreateStatus);
      })
      .put("/:id", async ({ params: { id }, body, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        ParamValidation(Number(id));
        BodyValidation(body, "name");

        const { name } = body as IUpdateStatus;
        const update = {
          id: Number(id),
          name,
        } as IUpdateStatus;

        return await UpdateStatus(update as IUpdateStatus);
      })
      .delete("/:id", async ({ params: { id }, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        ParamValidation(Number(id));

        return await DeleteStatus({ id: Number(id) } as IDeleteStatus);
      })
  )
  .group("/features", (app) =>
    app
      .put(
        "/status/:id/:statusId",
        async ({ params: { id, statusId }, headers: { requesterId } }) => {
          IsAdministrator({
            requesterId: requesterId,
          } as IAdmin);
          ParamValidation(Number(id));
          ParamValidation(Number(statusId));

          return await updateFeatureStatus(Number(id), Number(statusId));
        }
      )
      .put(
        "/merge/:id",
        async ({
          params: { id },
          query: { mergePostIds },
          headers: { requesterid },
        }) => {
          IsAdministrator({
            requesterId: requesterid,
          } as IAdmin);
          ParamValidation(Number(id));
          const ids = mergePostIds!.split(",").map(Number);
          console.log(ids);
          return await mergeFeatures(Number(id), ids);
        }
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
