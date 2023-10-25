export interface ICreateFeature {
  title: string;
  description: string;
  userId: string;
  categoryId: number;
  statusId: number;
}

export interface IUpdateFeature {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  statusId: number;
}

export interface IFeatureById {
  id: number;
}

export interface IDeleteFeature {
  id: number;
}

export interface ICreateComment {
  id: number;
  userId: string;
  comment: string;
}

export interface IUpdateComment {
  id: number;
  comment: string;
}

export interface ICreateReply {
  id: number;
  userId: string;
  comment: string;
}

export interface IUpdateReply {
  id: number;
  comment: string;
}

export interface IDeleteComment {
  id: number;
}

export interface IDeleteReply {
  id: number;
}

export interface IGetAllComments {
  id: number;
}

export interface IUpvoteFeature {
  id: number;
  userId: string;
}

export interface IDownvoteFeature {
  id: number;
  userId: string;
}
