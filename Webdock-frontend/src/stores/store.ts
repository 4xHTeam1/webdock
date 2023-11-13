import { createStore } from "vuex";
import features from "./modules/features";
import admin from "./modules/admin";
import auth from "./modules/auth";
import search from "./modules/search";

export default createStore({
  modules: {
    features,
    admin,
    auth,
    search,
  },
});
