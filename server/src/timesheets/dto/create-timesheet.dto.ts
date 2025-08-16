import { TimesheetLineCreate } from '#/shared/types/models/timesheet-line.types';
import { TimesheetCreate } from '#/shared/types/models/timesheet.types';
import { TimesheetValidator } from '#/shared/validators/timesheet.validator';
import { createZodDto } from 'nestjs-zod';

export class CreateTimesheetDto extends createZodDto(TimesheetValidator.create) implements TimesheetCreate {
  Lines: TimesheetLineCreate[];
}
