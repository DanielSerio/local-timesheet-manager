import z from "zod";
import { TimesheetLineValidator } from "./timesheet-line.validator";

const nameSchema = z.string().trim().min(1).max(64);
const dateSchema = z.coerce.date();

export class TimesheetValidator {
  static create = z.object({
    name: nameSchema,
    date: dateSchema,
    Lines: z.array(TimesheetLineValidator.create).optional().nullable()
  });

  static update = z.object({
    name: nameSchema.optional(),
    Lines: z.array(z.discriminatedUnion('id', [TimesheetLineValidator.create, TimesheetLineValidator.update])).optional(),
    RemoveLines: z.array(TimesheetLineValidator.delete).optional()
  }).partial();

  static delete = z.number().int().positive();
}