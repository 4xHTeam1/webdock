import {
  searchAll,
  searchUserName,
  searchUserEmail,
  searchFeatureByUserName,
  searchFeatureByUserEmail,
  searchFeatureByCategory,
  searchFeatureByTitle,
  searchFeatureByDescription,
} from "../../services/searchService";

export default {
  namespaced: true,
  state: {
    searchResults: [],
  },
  mutations: {
    setSearchResults(state: any, searchResults: any) {
      state.searchResults = searchResults;
    },
  },
  actions: {
    async searchAll({ commit }: any, query: string) {
      let searchResults = await searchAll(query);
      commit("setSearchResults", searchResults);
    },

    async searchUserName({ commit }: any, query: string) {
      let searchResults = await searchUserName(query);
      commit("setSearchResults", searchResults);
    },

    async searchUserEmail({ commit }: any, query: string) {
      let searchResults = await searchUserEmail(query);
      commit("setSearchResults", searchResults);
    },

    async searchFeatureByUserName({ commit }: any, query: string) {
      let searchResults = await searchFeatureByUserName(query);
      commit("setSearchResults", searchResults);
    },

    async searchFeatureByUserEmail({ commit }: any, query: string) {
      let searchResults = await searchFeatureByUserEmail(query);
      commit("setSearchResults", searchResults);
    },

    async searchFeatureByCategory({ commit }: any, query: string) {
      let searchResults = await searchFeatureByCategory(query);
      commit("setSearchResults", searchResults);
    },

    async searchFeatureByTitle({ commit }: any, query: string) {
      let searchResults = await searchFeatureByTitle(query);
      commit("setSearchResults", searchResults);
    },

    async searchFeatureByDescription({ commit }: any, query: string) {
      let searchResults = await searchFeatureByDescription(query);
      commit("setSearchResults", searchResults);
    },
  },
};
