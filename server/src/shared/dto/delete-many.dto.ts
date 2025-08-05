import { createZodDto } from "nestjs-zod";
import { RelatedEntityValidator } from "../validators/related-entity.validator";

export class DeleteManyDto extends createZodDto(RelatedEntityValidator.deleteMany) { }