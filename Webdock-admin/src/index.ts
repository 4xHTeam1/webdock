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

const app = new Elysia()
  .get("/status", async ({ request: { headers } }) => {
    await IsAdministrator({
      requesterId: headers.get("requesterId"),
    } as IAdmin);

    return await GetAllUsers();
  })
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 401,
    });
  })
  .group("/Users", (app) =>
    app
      .get("/", async ({ request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        const test = {
          users: await GetAllUsers(),
        };
        console.log(test);
        return test;
      })
      .get("/:id", async ({ params: { id }, request: { headers } }) => {
        await IsAdministrator({
          requesterId: headers.get("requesterId"),
        } as IAdmin);

        ParamValidation(Number(id));

        return await GetUser({ id } as IGetUser);
      })
      .put(
        "/role/:id",
        async ({ params: { id }, body, request: { headers } }) => {
          await IsAdministrator({
            requesterId: headers.get("requesterId"),
          } as IAdmin);

          ParamValidation(Number(id));
          BodyValidation(body, "role");

          const { role } = body as IUpdateUserRole;
          return await UpdateUserRole({ id, role } as IUpdateUserRole);
        }
      )
  )
  .group("/Categories", (app) =>
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
  .group("/Statuses", (app) =>
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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
