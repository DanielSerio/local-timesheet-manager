import { createZodDto } from "nestjs-zod";
import { CategoryValidator } from "src/shared/validators/category.validator";

export class CreateCategoryDto extends createZodDto(CategoryValidator.create) {
  name: string;
}
