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
  },
  actions: {
    async connect({ commit, state }: any, userId: any) {
      if (state.socket) {
        return;
      }
      const socket = await createSocket(userId);
      console.log(new URL(socket.url).searchParams.get("userId"));
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
      console.log(socket);
      commit("setSocket", socket);

      state.socket.addEventListener("message", (event: any) => {
        const { type, data } = JSON.parse(event.data);
        console.log(data);
        if (type === "notification") {
          commit("addNotification", data);
        }
      });
    },
    sendUpvote({ state }: any, { postId, userId }: any) {
      if (state.socket) {
        console.log(postId, userId);
        state.socket.send(
          JSON.stringify({
            type: "upvote",
            data: { postId, userId },
          })
        );
      }
    },
  },
  getters: {
    notifications: (state: any) => state.notifications,
  },
};
