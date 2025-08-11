import type { useTimesheetList } from "@/hooks";

type QueryType = ReturnType<typeof useTimesheetList>;

export interface TimesheetListProps {
  entryDate: string;
  query: QueryType;
}