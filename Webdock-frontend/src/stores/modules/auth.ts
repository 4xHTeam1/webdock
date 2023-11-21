import { Authenticate } from "../../services/authService";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state: any, user: any) {
      state.user = user;
    },
  },
  actions: {
    async login(context: any, token: string) {
      let user = await Authenticate(token);
      localStorage.setItem("token", token);
      context.commit("setUser", user);
    },
    async logout(context: any) {
      localStorage.removeItem("token");
      context.commit("setUser", null);
      window.location.href = window.location.pathname;
    },
  },
};
