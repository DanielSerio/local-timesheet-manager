import { TimesheetLineCreate } from '#/shared/types/models/timesheet-line.types';
import { TimesheetLine } from '../entities/timesheet-line.entity';
import { TimesheetValidator } from '#/shared/validators/timesheet.validator';
import z from 'zod';

type Schema = z.infer<typeof TimesheetValidator.update>;

export class UpdateTimesheetDto implements Schema {
  name?: string;
  date?: Date;
  Lines?: (TimesheetLineCreate | TimesheetLine)[];
  RemoveLines?: number[];
}
