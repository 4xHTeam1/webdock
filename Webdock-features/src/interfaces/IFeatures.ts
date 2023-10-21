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
