import { ObjectLiteral } from "typeorm";
import { RelatedEntityService } from "../services/related-entity.service";
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common";

type BaseType = ObjectLiteral & {
  id: number;
  name: string;
};

export abstract class RelatedEntityController<Entity extends BaseType, UpdateDto, Service extends RelatedEntityService<Entity, UpdateDto>> {
  constructor(protected readonly service: Service) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}