import { createStore } from "vuex";
import {
  CreateCategory,
  CreateStatus,
  DeleteCategory,
  DeleteStatus,
  GetCategories,
  GetCategory,
  GetStatus,
  GetStatuses,
  GetUser,
  GetUsers,
  UpdateCategory,
  UpdateStatus,
} from "../services/adminService";

const adminStore = createStore({
  state() {
    return {
      users: [],
      selectedUser: null,
      categories: [],
      selectedCategory: null,
      statuses: [],
      selectedStatus: null,
    };
  },
  mutations: {
    setUsers(state: any, users: any) {
      state.users = users;
    },
    setCategories(state: any, categories: any) {
      state.categories = categories;
    },
    setStatuses(state: any, statuses: any) {
      state.statuses = statuses;
    },
    setSelectedUser(state: any, user: any) {
      state.selectedUser = user;
    },
    setSelectedCategory(state: any, category: any) {
      state.selectedCategory = category;
    },
    setSelectedStatus(state: any, status: any) {
      state.selectedStatus = status;
    },
  },
  actions: {
    async getUsers(context: any, requesterId: string) {
      let users = await GetUsers(requesterId);
      console.log(users.data.users);
      context.commit("setUsers", users.data.users);
      console.log(context.state.users);
    },

    async getUser(
      context: any,
      payload: { requesterId: string; userId: string }
    ) {
      let user = await GetUser(payload.requesterId, payload.userId);

      context.commit("setSelectedUser", user);
    },

    async getCategories(context: any, requesterId: string) {
      let categories = await GetCategories(requesterId);
      context.commit("setCategories", categories);
    },

    async getCategory(
      context: any,
      payload: { requesterId: string; categoryId: string }
    ) {
      let category = await GetCategory(payload.requesterId, payload.categoryId);
      context.commit("setSelectedCategory", category);
    },

    async createCategory(
      context: any,
      payload: { requesterId: string; category: any }
    ) {
      let category = await CreateCategory(
        payload.requesterId,
        payload.category
      );
      context.commit("setSelectedCategory", category);
    },

    async updateCategory(
      context: any,
      payload: { requesterId: string; category: any }
    ) {
      let category = await UpdateCategory(
        payload.requesterId,
        payload.category
      );
      context.commit("setSelectedCategory", category);

      context.state.categories.forEach((element: any) => {
        if (element.id == category.id) {
          element = category;
        }
      });
    },

    async deleteCategory(
      context: any,
      payload: { requesterId: string; categoryId: string }
    ) {
      let category = await DeleteCategory(
        payload.requesterId,
        payload.categoryId
      );
      context.commit("setSelectedCategory", category);

      context.state.categories.filter((element: any) => {
        return element.id != category.id;
      });
    },

    async getStatuses(context: any, requesterId: string) {
      let statuses = await GetStatuses(requesterId);
      context.commit("setStatuses", statuses);
    },

    async getStatus(
      context: any,
      payload: { requesterId: string; statusId: string }
    ) {
      let status = await GetStatus(payload.requesterId, payload.statusId);
      context.commit("setSelectedStatus", status);
    },

    async createStatus(
      context: any,
      payload: { requesterId: string; status: any }
    ) {
      let status = await CreateStatus(payload.requesterId, payload.status);
      context.commit("setSelectedStatus", status);
    },

    async updateStatus(
      context: any,
      payload: { requesterId: string; status: any }
    ) {
      let status = await UpdateStatus(payload.requesterId, payload.status);
      context.commit("setSelectedStatus", status);

      context.state.statuses.forEach((element: any) => {
        if (element.id == status.id) {
          element = status;
        }
      });
    },

    async deleteStatus(
      context: any,
      payload: { requesterId: string; statusId: string }
    ) {
      let status = await DeleteStatus(payload.requesterId, payload.statusId);
      context.commit("setSelectedStatus", status);

      context.state.statuses.filter((element: any) => {
        return element.id != status.id;
      });
    },
  },
});

export default adminStore;
