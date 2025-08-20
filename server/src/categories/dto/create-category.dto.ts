import { CategoryValidator } from "src/shared/validators/category.validator";
import z from "zod";

type Schema = z.infer<typeof CategoryValidator.create>;

export class CreateCategoryDto implements Schema {
  name: string;
}
