import z from "zod";

const nameSchema = z.string().trim().min(1).max(64);
const idSchema = z.number().int().positive();

export class ReportValidator {
  static create = z.object({
    name: nameSchema,
    timesheetIds: z.array(idSchema).min(1, `A timesheet is required`)
  });

  static update = z.object({
    name: nameSchema.optional(),
    timesheetIds: z.array(idSchema).optional()
  });

  static delete = idSchema;
}