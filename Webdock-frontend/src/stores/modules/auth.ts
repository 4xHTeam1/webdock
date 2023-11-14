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
      context.commit("setUser", user);
    },
  },
};
