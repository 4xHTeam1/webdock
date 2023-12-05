import { sendUpvoteEmail } from "../../services/emailService";
import {
  getAllFeatures,
  getFeatureById,
  getAllComments,
  unvoteFeature,
  upvoteFeature,
  getAllCategories,
  createFeature,
  createComment,
  replyToComment,
  getAllStatuses,
  updateFeatureStatus,
} from "../../services/featureService";
import { upvoteValidator } from "../validators/featureValidator";

export default {
  namespaced: true,
  state: {
    allFeatures: [] as any[],
    selectedFeature: null,
    selectedFeatureComments: [],
    categories: [],
    statuses: [],
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
    pushComment(state: any, comment: any) {
      state.selectedFeatureComments.push(comment);
    },
    pushReplyComment(state: any, comment: any) {
      let commentToUpdate = state.selectedFeatureComments.find(
        (c: any) => c.id === comment.comment_relation.id
      );
      if (commentToUpdate) {
        commentToUpdate.commentReplys.push(comment);
      }
    },
    replaceUpdatedFeature(state: any, feature: any) {
      state.allFeatures.forEach((element: any) => {
        if (element.id == feature.id) {
          element = feature;
        }
      });
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
    setStatuses(state: any, statuses: any) {
      state.statuses = statuses;
    },
    toggleUpvote(state: any, feature: any) {
      /**
       * Checks if the feature returned by the backend is undefined. If so it returns out of the function.
       */
      if (typeof feature === "undefined") return;

      if (
        state.selectedFeature !== null &&
        state.selectedFeature.id === feature.id
      ) {
        state.selectedFeature = { ...state.selectedFeature, ...feature };
      }
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
    async createPost({ commit }: any, feature: any) {
      const post = await createFeature(feature);
      commit("pushFeature", post);
    },
    async createComment({ commit }: any, comment: any) {
      const newComment = await createComment(comment);
      commit("pushComment", newComment);
    },
    async createReplyComment({ commit, state }: any, comment: any) {
      let selectedFeatureComments = state.selectedFeatureComments.find(
        (c: any) => c.id === comment.id
      );

      let reply = null;

      if (selectedFeatureComments !== undefined) {
        reply = await replyToComment(comment);
      } else {
        let selectedFeatureComments = state.selectedFeatureComments.find(
          (c: any) => c.commentReplys.find((r: any) => r.id === comment.id)
        );

        reply = await replyToComment({
          ...comment,
          id: selectedFeatureComments.id,
        });
      }

      if (reply === null) return;
      commit("pushReplyComment", reply);
    },
    async getAllCategories({ commit }: any) {
      const categories = await getAllCategories();
      commit("setCategories", categories);
    },
    async getAllStatuses({ commit }: any) {
      const statuses = await getAllStatuses();
      commit("setStatuses", statuses);
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
    async sendUpvoteEmail({ commit }: any, info: any) {
      try {
        await sendUpvoteEmail(info);
      } catch (error) {
        console.log(error);
      }
    },
    async updateFeatureStatus({ commit }: any, info: any) {
      try {
        const feature = await updateFeatureStatus(info.id, info.statusId, info.requesterId);
        await commit("setSelectedFeature", feature);
        await commit("replaceUpdatedFeature", feature);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
