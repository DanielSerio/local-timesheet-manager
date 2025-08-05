import z from "zod";

const nameSchema = z.string().trim().min(1).max(64);
const dateSchema = z.date();

export class TimesheetValidator {
  static create = z.object({
    name: nameSchema.optional().nullable(),
    date: dateSchema.optional().nullable()
  })
    .optional()
    .nullable();
}