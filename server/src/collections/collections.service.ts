import { Report } from '#/reports/entities/report.entity';
import { Timesheet } from '#/timesheets/entities/timesheet.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export type CollectionName = 'entry-date' | 'report';

interface SearchCollectionParams<Name extends CollectionName> {
  collection: Name;
  searchQuery: string;
  limit?: number;
}

type CollectionEnt<Name extends CollectionName> = Name extends 'entry-date' ?
  Timesheet :
  Report;

@Injectable()
export class CollectionsService {
  private getBuilder() {
    return this.source.createQueryBuilder();
  }

  constructor(private source: DataSource) { }

  async searchCollection<Name extends CollectionName>({
    collection,
    searchQuery,
    limit: qLimit
  }: SearchCollectionParams<Name>) {
    const limit = qLimit ? ~~qLimit : 5;

    const builder = this.getBuilder();
    const tableName = collection === 'entry-date' ? 'timesheets' : 'reports';
    const fieldName = collection === 'entry-date' ? 'date' : 'generatedon';

    const records = await builder.select(`count(id),${fieldName}`)
      .from(collection === 'entry-date' ? Timesheet : Report, `${tableName}`)
      .where(`${fieldName} LIKE('%${searchQuery}%')`)
      .groupBy(`${fieldName}`)
      .limit(limit)
      .getMany() as CollectionEnt<Name>[];

    return {
      paging: {
        limit
      },
      searchQuery,
      records
    };

  }
}
