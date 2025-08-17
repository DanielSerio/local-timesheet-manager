import { CollectionService } from "@/lib/services/collection.service";
import { useQuery } from "@tanstack/react-query";

export interface ReportListItem {
  generatedOn: string | Date;
  count: number;
}

export function useReportsList(searchQuery: string) {
  return useQuery({
    queryKey: ["report", "list", searchQuery],
    async queryFn() {
      return await CollectionService.search({
        collection: "report",
        searchQuery,
        limit: 5,
      });
    },
  });
}
