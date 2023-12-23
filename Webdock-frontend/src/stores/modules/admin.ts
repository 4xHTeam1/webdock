import {
  GetUsers,
  GetUser,
  GetCategories,
  GetCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  GetStatuses,
  GetStatus,
  CreateStatus,
  UpdateStatus,
  DeleteStatus,
  UpdateUserRole,
  MergePosts,
} from "../../services/adminService";

export default {
  namespaced: true,
  state: {
    users: [],
    selectedUser: null,
    categories: [],
    selectedCategory: null,
    statuses: [],
    selectedStatus: null,
  },
  mutations: {
    setUsers(state: any, users: any) {
      state.users = users;
    },
    replaceUpdatedUser(state: any, user: any) {
      state.users.forEach((element: any) => {
        if (element.id == user.id) {
          element = user;
        }
      });
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
    async getUsers({ commit }: any, requesterId: number) {
      let users = await GetUsers(requesterId);
      commit("setUsers", users);
    },

    async getUser(
      { commit }: any,
      payload: { requesterId: string; userId: string }
    ) {
      let user = await GetUser(payload.requesterId, payload.userId);
      commit("setSelectedUser", user);
    },

    async updateRole(
      { commit }: any,
      payload: { requesterId: string; userId: string; role: string }
    ) {
      let user = await UpdateUserRole({
        requesterId: payload.requesterId,
        userId: payload.userId,
        role: payload.role,
      });
      commit("replaceUpdatedUser", user);
    },
    async getCategories({ commit }: any, requesterId: string) {
      let categories = await GetCategories(requesterId);
      commit("setCategories", categories);
    },

    async getCategory(
      { commit }: any,
      payload: { requesterId: string; categoryId: string }
    ) {
      let category = await GetCategory(payload.requesterId, payload.categoryId);
      commit("setSelectedCategory", category);
    },
    async createCategory(
      { commit }: any,
      payload: { requesterId: string; category: any }
    ) {
      let category = await CreateCategory(
        payload.requesterId,
        payload.category
      );
      commit("setSelectedCategory", category);
    },
    async updateCategory(
      { commit, state }: any,
      payload: { requesterId: string; category: any }
    ) {
      let category = await UpdateCategory(
        payload.requesterId,
        payload.category
      );
      commit("setSelectedCategory", category);

      state.categories.forEach((element: any) => {
        if (element.id == category.id) {
          element = category;
        }
      });
    },

    async deleteCategory(
      { commit, state }: any,
      payload: { requesterId: string; categoryId: string }
    ) {
      let category = await DeleteCategory(
        payload.requesterId,
        payload.categoryId
      );
      commit("setSelectedCategory", category);

      state.categories.filter((element: any) => {
        return element.id != category.id;
      });
    },

    async getStatuses({ commit }: any, requesterId: string) {
      let statuses = await GetStatuses(requesterId);
      commit("setStatuses", statuses);
    },

    async getStatus(
      { commit }: any,
      payload: { requesterId: string; statusId: string }
    ) {
      let status = await GetStatus(payload.requesterId, payload.statusId);
      commit("setSelectedStatus", status);
    },

    async createStatus(
      { commit }: any,
      payload: { requesterId: string; status: any }
    ) {
      let status = await CreateStatus(payload.requesterId, payload.status);
      commit("setSelectedStatus", status);
    },

    async updateStatus(
      { commit, state }: any,
      payload: { requesterId: string; status: any }
    ) {
      let status = await UpdateStatus(payload.requesterId, payload.status);
      commit("setSelectedStatus", status);

      state.statuses.forEach((element: any) => {
        if (element.id == status.id) {
          element = status;
        }
      });
    },

    async deleteStatus(
      { commit, state }: any,
      payload: { requesterId: string; statusId: string }
    ) {
      let status = await DeleteStatus(payload.requesterId, payload.statusId);
      commit("setSelectedStatus", status);

      state.statuses.filter((element: any) => {
        return element.id != status.id;
      });
    },

    async mergePosts(
      {}: any,
      payload: { requesterId: string; id: number; mergePostsIds: number[] }
    ) {
      console.log(payload.mergePostsIds);
      await MergePosts(payload.requesterId, payload.id, payload.mergePostsIds);
    },
  },
};
