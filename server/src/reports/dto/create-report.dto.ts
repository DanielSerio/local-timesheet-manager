import { ReportValidator } from "#/shared/validators/report.validator";
import z from "zod";


type Schema = z.infer<typeof ReportValidator.create>;

export class CreateReportDto implements Schema {
  name: string;
  timesheetIds: number[];
}
