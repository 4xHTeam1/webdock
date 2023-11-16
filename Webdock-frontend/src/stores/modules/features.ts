import {
  getAllFeatures,
  getFeatureById,
  getAllComments,
  unvoteFeature,
  upvoteFeature,
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
        (feature: any) =>
          feature.status.name.toLowerCase() === status.toLowerCase()
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
    toggleUpvote(state: any, feature: any) {
      //remove upvote from featureUpvote table for a given user and feature request
      /*       const feature = state.allFeatures.find(
        (feature: any) => feature.id === info.featureId
      );
      const upvote = feature.featureUpvotes.find(
        (upvote: any) => upvote.userId === info.userId
      );

      if (upvote) {
        feature.featureUpvotes = feature.featureUpvotes.filter(
          (upvote: any) => upvote.userId !== info.userId
        );
        feature._count.featureUpvotes--;
      } else {
        feature.featureUpvotes.push({
          featureRequestId: info.featureId,
          userId: info.userId,
        });
        feature._count.featureUpvotes++;
      } */

      if(typeof feature === "undefined") return;

      const featureToUpdate = state.allFeatures.find(
        (feature: any) => feature.id === feature.id
      );
      console.log(state.allFeatures.indexOf(featureToUpdate));
      state.allFeatures[state.allFeatures.indexOf(featureToUpdate)] = feature;
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
    async upvoteFeature({ commit }: any, info: any) {
      const feature = await upvoteFeature({
        id: info.featureId,
        userId: info.userId,
      });
      commit("toggleUpvote", feature);
    },
    async downvoteFeature({ commit }: any, info: any) {
      console.log({
        id: info.featureId,
        userId: info.userId,
      });
      const feature = await unvoteFeature({
        id: info.featureId,
        userId: info.userId,
      });
      commit("toggleUpvote", feature);
    },
  },
};
