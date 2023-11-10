import { createStore } from "vuex";
import {
  searchAll,
  searchUserName,
  searchUserEmail,
  searchFeatureByCategory,
  searchFeatureByDescription,
  searchFeatureByTitle,
  searchFeatureByUserEmail,
  searchFeatureByUserName,
} from "../services/searchService";

const searchStore = createStore({
  state() {
    return {
      searchResults: [],
    };
  },
  mutations: {
    setSearchResults(state: any, searchResults: any) {
      state.searchResults = searchResults;
    },
  },
  actions: {
    async searchAll(context: any, query: string) {
      let searchResults = await searchAll(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchUserName(context: any, query: string) {
      let searchResults = await searchUserName(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchUserEmail(context: any, query: string) {
      let searchResults = await searchUserEmail(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchFeatureByUserName(context: any, query: string) {
      let searchResults = await searchFeatureByUserName(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchFeatureByUserEmail(context: any, query: string) {
      let searchResults = await searchFeatureByUserEmail(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchFeatureByCategory(context: any, query: string) {
      let searchResults = await searchFeatureByCategory(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchFeatureByTitle(context: any, query: string) {
      let searchResults = await searchFeatureByTitle(query);
      context.commit("setSearchResults", searchResults);
    },

    async searchFeatureByDescription(context: any, query: string) {
      let searchResults = await searchFeatureByDescription(query);
      context.commit("setSearchResults", searchResults);
    },
  },
});

export default searchStore;
