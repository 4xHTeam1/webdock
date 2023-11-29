import { Category, Status } from "@prisma/client";
import { http } from "../http-common";

export const GetUsers = async (requesterId: number) => {
  console.log(requesterId);
  let users = await http
    .get("/admin/users", {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    })
    .then((response) => {
      console.log(response.data.result);
      return response.data.result;
    });

  return users;
};

export const GetUser = async (requesterId: string, userId: string) => {
  let user = await http
    .get("/admin/users/" + userId, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return user.data;
};

export const UpdateUserRole = async ({ requesterId, userId, role }: any) => {
  let user = await http
    .put(
      "/admin/users/role/" + userId,
      { role: role.toUpperCase() },
      {
        headers: {
          requesterId: requesterId,
        },
      }
    )
    .catch((error) => {
      console.log(error);
    });

  return user.data;
};

export const GetUserRoles = async (requesterId: string, userId: string) => {
  let roles = await http
    .get("admin/users/role/" + userId, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return roles;
};

export const GetCategories = async (requesterId: string) => {
  let categories = await http
    .get("/admin/categories", {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return categories;
};

export const GetCategory = async (requesterId: string, categoryId: string) => {
  let category = await http
    .get("/admin/categories/" + categoryId, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return category;
};

export const CreateCategory = async (
  requesterId: string,
  category: Category
) => {
  let newCategory = await http
    .post("/admin/categories", category, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return newCategory;
};

export const UpdateCategory = async (
  requesterId: string,
  category: Category
) => {
  let updatedCategory = await http
    .put("/admin/categories/" + category.id, category, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return updatedCategory;
};

export const DeleteCategory = async (
  requesterId: string,
  categoryId: string
) => {
  let deletedCategory = await http
    .delete("/admin/categories/" + categoryId, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return deletedCategory;
};

export const GetStatuses = async (requesterId: string) => {
  let statuses = await http
    .get("/admin/statuses", {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return statuses;
};

export const GetStatus = async (requesterId: string, statusId: string) => {
  let status = await http
    .get("/admin/statuses/" + statusId, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return status;
};

export const CreateStatus = async (requesterId: string, status: Status) => {
  let newStatus = await http
    .post("/admin/statuses", status, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return newStatus;
};

export const UpdateStatus = async (requesterId: string, status: Status) => {
  let updatedStatus = await http
    .put("/admin/statuses/" + status.id, status, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return updatedStatus;
};

export const DeleteStatus = async (requesterId: string, statusId: string) => {
  let deletedStatus = await http
    .delete("/admin/statuses/" + statusId, {
      headers: {
        requesterId: requesterId,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return deletedStatus;
};
