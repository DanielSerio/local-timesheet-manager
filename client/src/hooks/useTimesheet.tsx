import { useQuery } from "@tanstack/react-query";

export function useTimesheet(timesheetId?: number) {
  return useQuery({
    enabled: !!timesheetId,
    queryKey: ["timesheet", timesheetId],
  });
}
