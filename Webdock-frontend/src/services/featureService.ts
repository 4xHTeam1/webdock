import { http } from "../http-common";
import { webdockHttp } from "../webdockHttp";

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
    /*
    const webdockResponse = await webdockHttp.post("/feature_requests/new", {
      userID: feature.userId,
      title: feature.title,
      description: feature.description,
      category: feature.category.name,
    });
    console.log(webdockResponse.data);
    */
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
    return response.data.comments;
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
    const response = await http.delete(
      `/features/upvote/${downvote.id}/${downvote.userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await http.get("/features/categories");
    return response.data.categories;
  } catch (error) {
    console.error(error);
  }
};

export const getAllNotifications = async (userId: number) => {
  try {
    const response = await http.get(`/features/notification/${userId}`);
    return response.data.notifications;
  } catch (error) {
    console.error(error);
  }
};

export const postNotification = async (notification: any) => {
  try {
    const response = await http.post("/features/notification", notification);
    return response.data.notification;
  } catch (error) {
    console.error(error);
  }
};

export const removeNotification = async (id: number) => {
  try {
    const response = await http.delete(`/features/notification/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeAllNotifications = async (userId: number) => {
  try {
    const response = await http.delete(
      `/features/notification/markAllAsRead/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllStatuses = async () => {
  try {
    const response = await http.get("/features/statuses");
    return response.data.statuses;
  } catch (error) {
    console.error(error);
  }
};

export const updateFeatureStatus = async (id: number, statusId: number, requesterId: number) => {
  try {
    const response = await http.put(
      `/admin/features/status/${id}/${statusId}`,
      {
        headers: {
          requesterId
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
