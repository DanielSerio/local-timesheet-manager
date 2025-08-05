import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

type BaseType = ObjectLiteral & {
  id: number;
  name: string;
};

export abstract class RelatedEntityService<Entity extends BaseType, UpdateDto> {
  protected get repo() {
    return this.source.getRepository(this.target);
  }

  constructor(private source: DataSource, private target: EntityTarget<Entity>) { }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, dto: UpdateDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}