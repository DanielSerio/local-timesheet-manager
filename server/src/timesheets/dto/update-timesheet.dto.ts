import { TimesheetLineCreate } from '#/shared/types/models/timesheet-line.types';
import { TimesheetLine } from '../entities/timesheet-line.entity';
import { createZodDto } from 'nestjs-zod';
import { TimesheetValidator } from '#/shared/validators/timesheet.validator';

export class UpdateTimesheetDto extends createZodDto(TimesheetValidator.update) {
  Lines: (TimesheetLineCreate | TimesheetLine)[];
  RemoveLines?: number[];
}
