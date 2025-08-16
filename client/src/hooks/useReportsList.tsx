import type { ListResponse } from "@/lib/types/response.types";
import { useQuery } from "@tanstack/react-query";
export interface ReportListItem {
  generatedOn: string | Date;
  count: number;
}
export function useReportsList(searchQuery: string) {
  return useQuery({
    queryKey: ["report", "list", searchQuery],
    async queryFn() {
      return await new Promise<ListResponse<ReportListItem>>((resolve) => {
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
              generatedOn: "desc",
            },
            records: [
              {
                generatedOn: "2025-08-09",
                count: 3,
              },
              {
                generatedOn: "2025-08-08",
                count: 2,
              },
            ],
          });
        }, 600);
      });
    },
  });
}
