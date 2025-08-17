import { CollectionService } from "@/lib/services/collection.service";
import { useQuery } from "@tanstack/react-query";

export interface EntryDateItem {
  entryDate: string | Date;
  count: number;
}
export function useEntryDateList(searchQuery?: string) {
  return useQuery({
    queryKey: ["entry-date", "list", searchQuery],
    async queryFn() {
      return await CollectionService.search({
        collection: "entry-date",
        searchQuery: searchQuery ?? "",
        limit: 5,
      });
    },
  });
}
