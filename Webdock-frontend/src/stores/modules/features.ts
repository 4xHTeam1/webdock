import {
  getAllFeatures,
  getFeatureById,
  getAllComments,
} from "../../services/featureService";

export default {
  namespaced: true,
  state: {
    allFeatures: [] as any[],
    selectedFeature: null,
    selectedFeatureComments: [],
  },
  getters: {
    getAllFeatures(state: any) {
      return state.allFeatures;
    },
    getSelectedFeature(state: any) {
      return state.selectedFeature;
    },
    getSelectedFeatureComments(state: any) {
      return state.selectedFeatureComments;
    },
    getFeaturesForStatus: (state: any) => (status: string) => {
      return state.allFeatures.filter(
        (feature: any) => feature.status.id === status
      );
    },
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
    async getAllFeatures({ commit }: any) {
      const features = await getAllFeatures();
      commit("setAllFeatures", features.features);
    },
    async getFeatureById({ commit }: any, id: number) {
      const feature = await getFeatureById(id);
      commit("setSelectedFeature", feature);
    },
    async getCommentsForFeature({ commit }: any, id: number) {
      const comments = await getAllComments(id);
      commit("setSelectedFeatureComments", comments);
    },
  },
};
