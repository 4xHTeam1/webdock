import { createStore } from "vuex";
import { Authenticate } from "../services/authService";

const authStore = createStore({
  state() {
    return {
      user: null,
    };
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
});

export default authStore;
