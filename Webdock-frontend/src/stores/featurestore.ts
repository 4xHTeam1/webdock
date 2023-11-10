import { createStore } from "vuex";
import { Authenticate } from "../services/authService";
import { getAllComments, getAllFeatures, getFeatureById } from "../services/featureService";

const authStore = createStore({
  state() {
    return {
      allFeatures: [],
      selectedFeature: null,
      selectedFeatureComments: [],
    };
  },
  mutations: {
    setAllFeatures(state: any, features: any) {
      state.allFeatures = features;
    },
    setSelectedFeature(state: any, feature: any) {
      state.selectedFeature = feature;
    },
    setSelectedFeatureComments(state: any, comments: any) {
      state.selectedFeatureComments = comments;
    },
  },
  actions: {
    async getAllFeatures(context: any) {
    const features = await getAllFeatures();
      context.commit("setAllFeatures", features);
    },
    async getFeatureById(context: any, id: number) {
      const feature = await getFeatureById(id);
      context.commit("setSelectedFeature", feature);
    },
    async getCommentsForFeature(context: any, id: number) {
      const comments = await getAllComments(id);
      context.commit("setSelectedFeatureComments", comments);
    },
  },
  },
});

export default authStore;
