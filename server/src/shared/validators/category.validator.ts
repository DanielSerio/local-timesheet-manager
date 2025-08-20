import z from "zod";

const nameSchema = z.string().trim().min(1).max(64);

export class CategoryValidator {
  static create = z.object({
    name: nameSchema,
  });

  static update = z.object({
    name: nameSchema,
  });
}