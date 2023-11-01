import { http } from "../http-common";

export const searchAll = async (query: string) => {
  const response = await http.get(`/search/all`, {
    params: { query },
  });
  return response.data;
};

export const searchUserName = async (query: string) => {
  const response = await http.get(`/search/user/name`, {
    params: { query },
  });
  return response.data;
};

export const searchUserEmail = async (query: string) => {
  const response = await http.get(`/search/user/email`, {
    params: { query },
  });
  return response.data;
};

export const searchFeatureByUserName = async (query: string) => {
  const response = await http.get(`/search/feature/user/name`, {
    params: { query },
  });
  return response.data;
};

export const searchFeatureByUserEmail = async (query: string) => {
  const response = await http.get(`/search/feature/user/email`, {
    params: { query },
  });
  return response.data;
};

export const searchFeatureByCategory = async (query: string) => {
  const response = await http.get(`/search/feature/category`, {
    params: { query },
  });
  return response.data;
};

export const searchFeatureByTitle = async (query: string) => {
  const response = await http.get(`/search/feature/title`, {
    params: { query },
  });
  return response.data;
};

export const searchFeatureByDescription = async (query: string) => {
  const response = await http.get(`/search/feature/description`, {
    params: { query },
  });
  return response.data;
};
