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
  private getBuilder(table: 'timesheet' | 'report') {
    return this.source.createQueryBuilder(table === 'timesheet' ? Timesheet : Report, table);
  }

  constructor(private source: DataSource) { }

  async searchCollection<Name extends CollectionName>({
    collection,
    searchQuery,
    limit: qLimit
  }: SearchCollectionParams<Name>) {
    const limit = qLimit ? ~~qLimit : 5;
    const tableName = collection === 'entry-date' ? 'timesheet' : 'report';
    const builder = this.getBuilder(tableName);
    const fieldName = collection === 'entry-date' ? 'date' : 'generatedon';

    const recordsQuery = await builder.select(`count(id) as count,${tableName}.${fieldName}`)
      .where(searchQuery.trim().length ? `${fieldName} LIKE('%${searchQuery}%')` : '1=1')
      .groupBy(`${tableName}.${fieldName}`)
      .limit(limit);

    console.info('recordsQuery',);

    const records = await recordsQuery.execute() as CollectionEnt<Name>[];

    console.info({
      query: recordsQuery.getQuery(),
      result: records
    });

    return {
      paging: {
        limit
      },
      searchQuery,
      records
    };

  }
}
