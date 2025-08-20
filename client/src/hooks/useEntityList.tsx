import {
  CategoryService,
  SubcategoryService,
} from "@/lib/services/entity.service";
import { useQuery } from "@tanstack/react-query";

export interface UseEntityListParams {
  limit: number;
  offset: number;
  entity: "categories" | "subcategories";
}
export function useEntityList({ entity, limit, offset }: UseEntityListParams) {
  return useQuery({
    queryKey: [entity, "list", limit, offset],
    async queryFn() {
      if (entity === "subcategories") {
        return await SubcategoryService.list({ limit, offset });
      }

      return await CategoryService.list({ limit, offset });
    },
  });
}
