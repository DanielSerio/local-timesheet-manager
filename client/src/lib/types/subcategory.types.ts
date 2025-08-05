export interface SubcategoryCreate {
  name: string;
}

export interface Subcategory extends SubcategoryCreate {
  id: number;
  createdAt: Date;
  lastUpdateAt: Date;
}