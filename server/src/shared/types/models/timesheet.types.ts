import type { ComputedTimesheetLine, TimesheetLine } from "./timesheet-line.types";
import type { Pretty } from "../utility.types";

interface TimesheetCreateBasis {
  name?: string;
  date?: Date;
}

export type TimesheetCreate = Pretty<TimesheetCreateBasis>;

interface TimesheetBasis extends TimesheetCreateBasis {
  id: number;
  lastUpdateAt: Date;
  name: string;
  date: Date;

  Lines?: (TimesheetLine | ComputedTimesheetLine)[];
}

export type Timesheet = Pretty<TimesheetBasis>;