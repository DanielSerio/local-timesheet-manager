import type { ListResponse } from "@/lib/types/response.types";
import { useQuery } from "@tanstack/react-query";

export interface EntryDateItem {
  entryDate: string | Date;
  count: number;
}
export function useEntryDateList(searchQuery?: string) {
  return useQuery({
    queryKey: ["entry-date", "list", searchQuery],
    async queryFn() {
      return await new Promise<ListResponse<EntryDateItem>>((resolve) => {
        setTimeout(() => {
          resolve({
            paging: {
              limit: 25,
              offset: 0,
              total: {
                pages: 1,
                records: 2,
              },
            },
            sorting: {
              entryDate: "desc",
            },
            records: [
              {
                entryDate: "2025-08-09",
                count: 3,
              },
              {
                entryDate: "2025-08-08",
                count: 2,
              },
            ],
          });
        }, 600);
      });
    },
  });
}
