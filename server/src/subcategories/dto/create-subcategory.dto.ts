import { createZodDto } from "nestjs-zod";
import { SubcategoryValidator } from "src/shared/validators/subcategory.validator";

export class CreateSubcategoryDto extends createZodDto(SubcategoryValidator.create) {
  name: string;
}
