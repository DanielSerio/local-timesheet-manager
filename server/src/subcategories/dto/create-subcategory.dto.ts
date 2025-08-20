import { SubcategoryValidator } from "src/shared/validators/subcategory.validator";
import z from "zod";

type Schema = z.infer<typeof SubcategoryValidator.create>;

export class CreateSubcategoryDto implements Schema {
  name: string;
}
