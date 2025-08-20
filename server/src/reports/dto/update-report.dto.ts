import { ReportValidator } from '#/shared/validators/report.validator';
import z from 'zod';

type Schema = z.infer<typeof ReportValidator.update>;

export class UpdateReportDto implements Schema {
  name?: string;
  timesheetIds?: number[];
}
