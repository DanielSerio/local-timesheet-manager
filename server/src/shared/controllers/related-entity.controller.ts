import { ObjectLiteral } from "typeorm";
import { RelatedEntityService, SortDirection, Sorting } from "../services/related-entity.service";
import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { getPagingPropertyFromURLQueryString } from "../utilities";
import { DeleteManyDto } from "../dto/delete-many.dto";

type BaseType = ObjectLiteral & {
  id: number;
  name: string;
};

export abstract class RelatedEntityController<Entity extends BaseType, UpdateDto, Service extends RelatedEntityService<Entity, UpdateDto>> {
  constructor(protected readonly service: Service) { }

  private getValidLimit = (limitQuery?: string) => getPagingPropertyFromURLQueryString('limit', limitQuery);
  private getValidOffset = (offsetQuery?: string) => getPagingPropertyFromURLQueryString('offset', offsetQuery);
  private getValidSorting = (sortQuery?: string): null | Sorting<Entity> => {
    if (sortQuery === undefined || sortQuery === '') {
      return null;
    }

    const matchRe = /(\w|\d)+[,]((a|de)sc)(?=;)/g;
    const validColumns = [
      'id',
      'name',
      'createdAt',
      'lastUpdateAt'
    ];
    let matches = sortQuery.match(matchRe) ?? [];
    const sorting = {} as Sorting<Entity>;

    if (matches.length) {
      for (const match of matches) {
        const [column, sort] = match.split(/[,]/g) as [string, SortDirection];

        if (validColumns.includes(column)) {
          (sorting as { [k: string]: SortDirection; })[column] = sort;
        }
      }

      if (Object.keys(sorting).length > 0) {
        return sorting;
      }
    }

    return null;
  };

  @Get()
  findAll(
    @Query('limit') qLimit?: string,
    @Query('offset') qOffset?: string,
    @Query('sort') qSort?: string
  ) {
    const limit = this.getValidLimit(qLimit);
    const offset = this.getValidOffset(qOffset);
    const sorting = this.getValidSorting(qSort);

    return this.service.findAll({
      paging: {
        limit,
        offset
      },
      sorting
    });
  }

  @Patch('/remove')
  removeMany(@Body() dto: DeleteManyDto) {
    return this.service.removeMany(dto.ids);
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