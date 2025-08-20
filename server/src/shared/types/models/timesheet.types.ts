import type { ComputedTimesheetLine, TimesheetLineCreate, TimesheetLineRecord } from "./timesheet-line.types";
import type { Pretty } from "../utility.types";

interface TimesheetCreateBasis {
  name: string;
  date: Date;
  Lines?: TimesheetLineCreate[];
}

export type TimesheetCreate = Pretty<TimesheetCreateBasis>;

interface TimesheetBasis extends TimesheetCreateBasis {
  id: number;
  lastUpdateAt: Date;
  name: string;
  date: Date;

  Lines?: (TimesheetLineRecord | ComputedTimesheetLine)[];
}

export type TimesheetRecord = Pretty<TimesheetBasis>;