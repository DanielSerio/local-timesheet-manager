import { CategoryValidator } from '#/shared/validators/category.validator';
import z from 'zod';

type Schema = z.infer<typeof CategoryValidator.update>;

export class UpdateCategoryDto implements Schema {
  name: string;
}
