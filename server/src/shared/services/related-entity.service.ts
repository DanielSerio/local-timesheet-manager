import { NotFoundException } from "@nestjs/common";
import { DataSource, EntityTarget, FindOneOptions, FindOptionsOrder, FindOptionsWhere, In, ObjectLiteral } from "typeorm";

type BaseType = ObjectLiteral & {
  id: number;
  name: string;
};

export interface Paging {
  limit: number;
  offset: number;
}
export interface PagingTotals {
  records: number;
  pages: number;
}
export interface PagingResponse extends Paging {
  total: PagingTotals;
}
export type SortDirection = 'asc' | 'desc';
export type Sorting<Entity> = Record<keyof Entity, SortDirection>;
export interface RelatedEntityListParams<Entity> {
  paging: Paging;
  sorting: Sorting<Entity> | null;
}

export abstract class RelatedEntityService<Entity extends BaseType, UpdateDto> {
  protected get repo() {
    return this.source.getRepository(this.target);
  }

  constructor(private source: DataSource, private target: EntityTarget<Entity>) { }

  async findAll({ paging, sorting }: RelatedEntityListParams<Entity>) {
    const totalRecords = await this.repo.count();
    const records = await this.repo.find({
      take: paging.limit,
      skip: paging.offset,
      order: sorting as FindOptionsOrder<Entity>
    });

    return {
      paging: {
        ...paging,
        total: {
          records: totalRecords,
          pages: Math.ceil(totalRecords / paging.limit)
        }
      },
      sorting,
      records
    };
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } as FindOneOptions['where'] });
  }

  async update(id: number, dto: UpdateDto) {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    Object.assign(dto as Partial<Entity>, found);

    return await this.repo.save(found);
  }

  async remove(id: number) {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return this.repo.remove(found);
  }


  async removeMany(ids: number[]) {
    const found = await this.repo.find({
      where: {
        id: In(ids)
      } as FindOptionsWhere<Entity>
    });

    if (!found || found.length === 0) {
      throw new NotFoundException();
    }

    return this.repo.remove(found);
  }
}