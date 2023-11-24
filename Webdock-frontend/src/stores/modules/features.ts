import {
  getAllFeatures,
  getFeatureById,
  getAllComments,
  unvoteFeature,
  upvoteFeature,
  getAllCategories,
  createFeature,
} from "../../services/featureService";
import { upvoteValidator } from "../validators/featureValidator";

export default {
  namespaced: true,
  state: {
    allFeatures: [] as any[],
    selectedFeature: null,
    selectedFeatureComments: [],
    categories: [],
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
    pushFeature(state: any, feature: any) {
      state.allFeatures.push(feature);
    },
    setCategories(state: any, categories: any) {
      state.categories = categories;
    },
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

      /**
       * Checks if the feature returned by the backend is undefined. If so it returns out of the function.
       */
      if (typeof feature === "undefined") return;

      /**
       * Gets the feature from the state and updates it with the new feature returned from the backend
       * if its not null.
       */
      let featureToUpdate = null;
      state.allFeatures.forEach((f: any) => {
        if (f.id === feature.id) {
          featureToUpdate = f;
        }
      });
      if (featureToUpdate === null) return;
      state.allFeatures[state.allFeatures.indexOf(featureToUpdate)] = feature;

      return;
    },
  },
  actions: {
    async createPost({ commit }: any, feature:any) {
      const post = await createFeature(feature);
      commit("pushFeature", post);
    },
    async getAllCategories({ commit }: any) {
      const categories = await getAllCategories();
      commit("setCategories", categories);
    },
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
    async test({ commit }: any, id: number) {
      console.log(id);
    },
    async upvoteFeature({ commit }: any, info: any) {
      try {
        upvoteValidator(info);
        const feature = await upvoteFeature({
          id: info.featureId,
          userId: info.userId,
        });
        commit("toggleUpvote", feature);
      } catch (error) {
        console.log(error);
      }
    },
    async downvoteFeature({ commit }: any, info: any) {
      try {
        upvoteValidator(info);
        const feature = await unvoteFeature({
          id: info.featureId,
          userId: info.userId,
        });
        await commit("toggleUpvote", feature);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
