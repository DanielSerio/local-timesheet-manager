import { createZodDto } from 'nestjs-zod';
import { ReportValidator } from '#/shared/validators/report.validator';

export class UpdateReportDto extends createZodDto(ReportValidator.update) { }
