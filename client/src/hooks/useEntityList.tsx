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
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            paging: {
              limit: 25,
              offset: 0,
              total: {
                records: 4,
                pages: 1,
              },
            },
            records: [
              {
                id: -1,
                name: `Test ${entity}`,
              },
              {
                id: 1,
                name: `${entity} 1`,
              },
              {
                id: 2,
                name: `${entity} 2`,
              },
              {
                id: 3,
                name: `${entity} 3`,
              },
            ],
          });
        }, 600);
      });
      if (entity === "subcategories") {
        return await SubcategoryService.list({ limit, offset });
      }

      return await CategoryService.list({ limit, offset });
    },
  });
}
