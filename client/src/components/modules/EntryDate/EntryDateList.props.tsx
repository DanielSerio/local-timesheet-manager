import type { useEntryDateList } from "@/hooks/useEntryDateList";

type QueryType = ReturnType<typeof useEntryDateList>;

export interface EntryDateListProps {
  query: QueryType;
}
