import type { TimesheetLineCreate } from "@/lib/types/timesheet-line.types";
import type { Timesheet } from "@/lib/types/timesheet.types";
import { useQuery } from "@tanstack/react-query";

function createLines() {
  function createLine(index: number) {
    const [startTime, endTime] = ranges[index];

    return {
      categoryId: 1,
      subcategoryId: 1,
      startTime,
      endTime,
      note: null,
    };
  }

  const ranges = [
    ["07:45", "08:45"],
    ["08:45", "09:00"],
    ["09:00", "10:30"],
    ["10:30", "11:15"],
  ];

  const lines: TimesheetLineCreate[] = [];

  for (let i = 0; i < ranges.length; i += 1) {
    lines.push(createLine(i));
  }

  return lines;
}

export function useTimesheet(timesheetId?: number) {
  return useQuery({
    enabled: !!timesheetId,
    queryKey: ["timesheet", timesheetId],
    async queryFn() {
      return await new Promise<Timesheet>((resolve) => {
        setTimeout(() => {
          resolve({
            id: -1,
            name: "Test Timesheet",
            date: new Date(),
            lastUpdateAt: new Date(),
            Lines: createLines(),
          });
        }, 600);
      });
    },
  });
}
