import z from "zod";
import { TimesheetLineValidator } from "./timesheet-line.validator";

const nameSchema = z.string().trim().min(1).max(64);
const dateSchema = z.date();

export class TimesheetValidator {
  static create = z.object({
    name: nameSchema.nullable(),
    date: dateSchema.nullable(),
    Lines: z.array(TimesheetLineValidator.create).optional().nullable()
  })
    .nullable();

  static update = z.object({
    name: nameSchema.optional().nullable(),
    Lines: z.array(z.discriminatedUnion('id', [TimesheetLineValidator.create, TimesheetLineValidator.update])).optional(),
    RemoveLines: z.array(TimesheetLineValidator.delete).optional()
  });

  static delete = z.number().int().positive();
}