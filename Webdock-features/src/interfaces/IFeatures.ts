import { upvoteFeature } from "../querys/querys";

export interface CreateFeature {
  title: string;
  description: string;
  userId: string;
  categoryId: number;
  statusId: number;
}

export interface UpdateFeature {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  statusId: number;
}

export interface FeatureById {
  id: number;
}

export interface DeleteFeature {
  id: number;
}

export interface CreateComment {
  id: number;
  userId: string;
  comment: string;
}

export interface UpdateComment {
  id: number;
  comment: string;
}

export interface CreateReply {
  id: number;
  userId: string;
  comment: string;
}

export interface UpdateReply {
  id: number;
  comment: string;
}

export interface DeleteComment {
  id: number;
}

export interface DeleteReply {
  id: number;
}

export interface GetAllComments {
  id: number;
}

export interface UpvoteFeature {
  id: number;
  userId: string;
}

export interface DownvoteFeature {
  id: number;
  userId: string;
}
