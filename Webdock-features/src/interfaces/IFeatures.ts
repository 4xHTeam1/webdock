export interface ICreateFeature {
  id: number;
  title: string;
  description: string;
  userId: number;
  category: {
    id: number;
    name: string;
  };
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
  userId: number;
  comment: string;
}

export interface IUpdateComment {
  id: number;
  comment: string;
}

export interface ICreateReply {
  id: number;
  userId: number;
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
  userId: number;
}

export interface IDownvoteFeature {
  id: number;
  userId: number;
}
