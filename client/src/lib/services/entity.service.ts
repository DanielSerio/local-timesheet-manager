import type { Category } from "../types/category.types";
import type { ListResponse } from "../types/response.types";
import type { Subcategory } from "../types/subcategory.types";
import { ApiService } from "./api.service";

export interface EntityListApiParams {
  limit: number;
  offset: number;
}

class EntityApiService extends ApiService {
  constructor(ENDPOINT: string) {
    super({
      ENDPOINT
    });
  }

  public async list<Type extends Category | Subcategory>({ limit, offset }: EntityListApiParams) {
    const params = new URLSearchParams({
      limit: `${~~limit}`,
      offset: `${~~offset}`
    });
    const response = await fetch(`${this._URL}?${params}`);

    return await response.json() as ListResponse<Type>;
  }
}

export const CategoryService = new EntityApiService('/categories');
export const SubcategoryService = new EntityApiService('/subcategories');