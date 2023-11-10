import { createStore } from "vuex";
import features from "./modules/features";

export default createStore({
  modules: {
    features,
  },
});
