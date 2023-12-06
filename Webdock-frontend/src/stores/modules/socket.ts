import {
  getAllNotifications,
  postNotification,
  removeAllNotifications,
  removeNotification,
} from "../../services/featureService";
import { createSocket } from "../../services/socketService";

export default {
  namespaced: true,
  state: {
    socket: null,
    notifications: [],
  },
  mutations: {
    setSocket(state: any, socket: any) {
      state.socket = socket;
    },
    addNotification(state: any, notification: any) {
      state.notifications.push(notification);
    },
    setNotifications(state: any, notifications: any) {
      state.notifications = notifications;
    },
    removeNotification(state: any, id: number) {
      state.notifications = state.notifications.filter((n: any) => n.id !== id);
    },
  },
  actions: {
    async connect({ commit, state }: any, userId: any) {
      if (state.socket) {
        return;
      }
      const socket = await createSocket(userId);
      commit("setSocket", socket);

      state.socket.addEventListener("message", (event: any) => {
        const { type, data } = JSON.parse(event.data);
        if (type === "notification") {
          commit("addNotification", data);
        }
      });
    },
    async disconnect({ state, commit }: any) {
      if (state.socket) {
        state.socket.close();
        commit("setSocket", null);
      }
    },
    async connectDummy({ commit, state }: any, userId: any) {
      if (state.socket) {
        return;
      }
      const socket = await createSocket(userId);
      commit("setSocket", socket);

      state.socket.addEventListener("message", (event: any) => {
        const { type, data } = JSON.parse(event.data);
        if (type === "notification") {
          commit("addNotification", data);
        }
      });
    },
    async sendUpvote({ state }: any, { postId, userId, ownerId }: any) {
      if (state.socket) {
        state.socket.send(
          JSON.stringify({
            type: "upvote",
            data: { postId, userId, ownerId },
          })
        );
      }
      const notification = {
        ownerId,
        userId,
        featureRequestId: postId,
        type: "upvote",
      };

      await postNotification(notification);
    },
    async markAllAsRead({ state }: any, ownerId: number) {
      try {
        await removeAllNotifications(ownerId);
        state.notifications = [];
      } catch (error) {
        console.error(error);
      }
    },
    async GetNotifications({ commit }: any, userId: number) {
      const notifications = await getAllNotifications(userId);
      commit("setNotifications", notifications);
    },
    async PostNotification({ commit }: any, data: any) {
      await postNotification(data);
    },
    async RemoveNotification({ commit }: any, id: number) {
      await removeNotification(id);
      commit("removeNotification", id);
    },
  },
  getters: {
    notifications: (state: any) => state.notifications,
  },
};
