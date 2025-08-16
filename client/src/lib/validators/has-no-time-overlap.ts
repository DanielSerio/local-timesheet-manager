import type { TimesheetLine, TimesheetLineCreate } from "../types/timesheet-line.types";
import { areIntervalsOverlapping } from 'date-fns/fp';

type Line = TimesheetLineCreate | TimesheetLine;

const stamp = (time: string) => {
  const baseDate = '2024-12-12';

  return `${baseDate}T${time}`;
};

function getSortedClone(lines: Line[]) {
  return structuredClone(lines).sort((a, b) => {
    const aTime = new Date(stamp(a.startTime)).getTime();
    const bTime = new Date(stamp(b.startTime)).getTime();

    return aTime - bTime;
  });
}

export function hasNoTimeOverlap(lines: Line[]): { success: true; failureRows?: never; } | { success: false; failureRows: [number, number]; } {
  if (lines.length < 2) {
    return {
      success: true
    };
  }

  const sorted = getSortedClone(lines);

  for (let i = 1; i < sorted.length; i += 1) {
    const previousLine = sorted[i - 1];
    const line = sorted[i];

    const previousLineInterval = {
      start: new Date(stamp(previousLine.startTime)),
      end: new Date(stamp(previousLine.endTime))
    };

    const lineInterval = {
      start: new Date(stamp(line.startTime)),
      end: new Date(stamp(line.endTime))
    };

    if (areIntervalsOverlapping(previousLineInterval, lineInterval)) {
      return {
        success: false,
        failureRows: [i - 1, i]
      };
    }
  }

  return {
    success: true
  };
}