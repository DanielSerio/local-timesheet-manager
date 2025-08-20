import z from "zod";
import { SubcategoryValidator } from '#/shared/validators/subcategory.validator';

type Schema = z.infer<typeof SubcategoryValidator.update>;

export class UpdateSubcategoryDto implements Schema {
  name: string;
}
