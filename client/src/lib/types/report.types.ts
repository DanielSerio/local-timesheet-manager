import type { TimesheetLine } from "./timesheet-line.types";
import type { Timesheet } from "./timesheet.types";

export interface ReportCreate {
  name: string;
  timesheetIds: number[];
}

export interface ReportMinimal extends Omit<ReportCreate, 'timesheetIds'> {
  id: number;
  generatedOn: Date;
}

export interface Report extends ReportMinimal {
  Timesheets: (Timesheet & { Lines: TimesheetLine[]; })[];
}