import { TimesheetService } from "@/lib/services/timesheet.service";
import { useQuery } from "@tanstack/react-query";

export function useTimesheetList(entryDate: string) {
  return useQuery({
    queryKey: ["timesheet", "list", entryDate],
    async queryFn() {
      return await TimesheetService.listTimesheetsForDate(entryDate);
    },
  });
}
