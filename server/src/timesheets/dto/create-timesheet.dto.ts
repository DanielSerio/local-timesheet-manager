import { TimesheetLineCreate } from '#/shared/types/models/timesheet-line.types';
import { TimesheetCreate } from '#/shared/types/models/timesheet.types';

export class CreateTimesheetDto implements TimesheetCreate {
  name: string;
  date: Date;
  Lines: TimesheetLineCreate[];
}
