import { ReportValidator } from "#/shared/validators/report.validator";
import { createZodDto } from "nestjs-zod";

export class CreateReportDto extends createZodDto(ReportValidator.create) {
  name: string;
  timesheetIds: number[];
}
