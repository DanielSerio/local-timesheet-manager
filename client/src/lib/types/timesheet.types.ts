import type { ComputedTimesheetLine, TimesheetLine, TimesheetLineCreate } from "./timesheet-line.types";
import type { Pretty } from "./utility.types";

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

  Lines?: (TimesheetLine | ComputedTimesheetLine | TimesheetLineCreate)[];
}

export type Timesheet = Pretty<TimesheetBasis> & {
  Lines?: (TimesheetLine | ComputedTimesheetLine)[];
};

type UpdateLine = TimesheetLine | ComputedTimesheetLine;

export type TimesheetUpdate = Omit<Pretty<TimesheetBasis>, 'lastUpdateAt' | 'id' | 'createdAt'> & {
  id?: number | null;
  lastUpdateAt?: Date;
  createdAt?: Date;
  Lines?: (Omit<UpdateLine, 'lastUpdateAt' | 'timesheetId' | 'createdAt' | 'id'>)[];
  RemoveLines?: number[];
};