import { http } from "../http-common";

export const getAllFeatures = async () => {
  try {
    const response = await http.get("/features");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFeatureById = async (id: number) => {
  try {
    const response = await http.get(`/features/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createFeature = async (feature: any) => {
  try {
    const response = await http.post("/features", feature);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFeature = async (feature: any) => {
  try {
    const response = await http.put(`/features/${feature.id}`, feature);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFeature = async (id: number) => {
  try {
    const response = await http.delete(`/features/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllComments = async (id: number) => {
  try {
    const response = await http.get(`/features/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createComment = async (comment: any) => {
  try {
    const response = await http.post("/features/comment", comment);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (id: number) => {
  try {
    const response = await http.delete(`/features/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateComment = async (comment: any) => {
  try {
    const response = await http.put(`/features/comment/${comment.id}`, comment);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const replyToComment = async (reply: any) => {
  try {
    const response = await http.post("/features/comment/reply", reply);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCommentReply = async (id: number) => {
  try {
    const response = await http.delete(`/features/comment/reply/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCommentReply = async (reply: any) => {
  try {
    const response = await http.put(
      `/features/comment/reply/${reply.id}`,
      reply
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const upvoteFeature = async (upvote: any) => {
  try {
    const response = await http.post("/features/upvote", upvote);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const unvoteFeature = async (downvote: any) => {
  try {
    const response = await http.delete("/features/upvote", downvote);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * TODO: make this endpoint
 */
export const getAllCategories = async () => {
  try {
    const response = await http.get("/features/categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
