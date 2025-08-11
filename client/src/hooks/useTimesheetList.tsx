import type { ListResponse } from "@/lib/types/response.types";
import { useQuery } from "@tanstack/react-query";

export function useTimesheetList(entryDate: string) {
  return useQuery({
    queryKey: ["timesheet", "list", entryDate],
    async queryFn() {
      return new Promise<
        ListResponse<{ id: number; name: string; totalTime: number }>
      >((resolve) => {
        setTimeout(() => {
          resolve({
            paging: {
              limit: 25,
              offset: 0,
              total: {
                records: 2,
                pages: 1,
              },
            },
            sorting: null,
            records: [
              {
                id: 1,
                name: `Timesheet ${entryDate} #1`,
                totalTime: 480,
              },
              {
                id: 2,
                name: `Timesheet ${entryDate} #2`,
                totalTime: 450,
              },
            ],
          });
        }, 400);
      });
    },
  });
}
