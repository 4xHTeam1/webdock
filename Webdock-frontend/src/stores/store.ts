import { createStore } from "vuex";
import features from "./modules/features";
import admin from "./modules/admin";
import auth from "./modules/auth";
import search from "./modules/search";
import socket from "./modules/socket";

export default createStore({
  modules: {
    features,
    admin,
    auth,
    search,
    socket,
  },
});
