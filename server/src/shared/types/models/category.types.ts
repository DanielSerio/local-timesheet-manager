export interface CategoryCreate {
  name: string;
}

export interface Category extends CategoryCreate {
  id: number;
  createdAt: Date;
  lastUpdateAt: Date;
}