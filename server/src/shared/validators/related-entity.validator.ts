import z from "zod";

export class RelatedEntityValidator {
  static deleteMany = z.object({
    ids: z.array(z.number().int().positive())
  });
}