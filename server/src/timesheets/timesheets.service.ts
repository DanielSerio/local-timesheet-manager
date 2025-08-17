import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { DataSource, FindOptionsOrder } from 'typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetLine } from './entities/timesheet-line.entity';
import { RelatedEntityListParams } from '#/shared/services/related-entity.service';

type TimesheetBreakdownRecord = Pick<Timesheet, 'id' | 'name'> & {
  // time in minutes
  totalTime: number;
};

@Injectable()
export class TimesheetsService {
  private get repo() {
    return this.source.getRepository(Timesheet);
  }

  private get lineRepo() {
    return this.source.getRepository(TimesheetLine);
  }

  constructor(private source: DataSource) { }

  private async upsertLines(timesheetId: number, lines?: UpdateTimesheetDto['Lines']) {
    if (!lines || lines.length < 1) {
      return null;
    }

    const entities = lines.map((line) => ({ timesheetId, ...line }));

    await this.lineRepo.upsert(entities, { 'conflictPaths': { id: true } });

    return null;
  }

  private async removeLines(lines?: UpdateTimesheetDto['RemoveLines']) {
    if (!lines || lines.length < 1) {
      return null;
    }

    await this.lineRepo.delete(lines);

    return null;
  }


  private getLines(timesheetId: number) {
    return this.lineRepo.find({ where: { timesheetId } });
  }

  async create(createTimesheetDto: CreateTimesheetDto) {
    const timesheet = new Timesheet();

    timesheet.name = createTimesheetDto.name;
    timesheet.date = createTimesheetDto.date;

    const savedTimesheet = await this.repo.save(timesheet);
    const timesheetId = savedTimesheet.id;

    await this.upsertLines(timesheetId, createTimesheetDto.Lines);

    const lines = await this.getLines(timesheetId);

    return {
      ...savedTimesheet,
      Lines: lines ?? null
    };
  }

  findOne(id: number, relations: { Lines: boolean; } = { Lines: true }) {
    return this.repo.findOne({ where: { id }, relations });
  }

  async update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    const found = await this.findOne(id, { Lines: false });

    if (!found) {
      throw new NotFoundException(`Timesheet with ID '${id}' not found`);
    }

    if (updateTimesheetDto.name) {
      found.name = updateTimesheetDto.name;
    }

    const timesheetId = found.id;

    try {
      if (updateTimesheetDto.Lines && updateTimesheetDto.Lines.length) {
        await this.upsertLines(timesheetId, updateTimesheetDto.Lines);
      }
    } catch (err) {
      throw new InternalServerErrorException(`Could not save lines for timesheet '${found.name}'`);
    }

    try {
      if (updateTimesheetDto.RemoveLines && updateTimesheetDto.RemoveLines.length) {
        await this.removeLines(updateTimesheetDto.RemoveLines);
      }
    } catch (err) {
      throw new InternalServerErrorException(`Could not remove lines for timesheet '${found.name}'`);
    }

    const refreshedLines = await this.getLines(timesheetId);

    return {
      ...found,
      Lines: refreshedLines
    };
  }

  remove(ids: number[]) {
    return this.repo.delete(ids);
  }

  async findAll({ paging, sorting }: RelatedEntityListParams<Timesheet>) {
    const totalRecords = await this.repo.count();
    const records = await this.repo.find({
      take: paging.limit,
      skip: paging.offset,
      order: sorting as FindOptionsOrder<Timesheet>
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

  async findForDate(date: string) {
    const repo = this.repo;

    const builder = repo.createQueryBuilder('timesheet');
    const count = await repo.count({
      where: {
        date: new Date(Date.parse(date))
      }
    });

    const queryBasis = builder
      .select([
        'timesheet.id AS id',
        'timesheet.name AS name',
        `COALESCE(SUM(unixepoch(concat('2025-01-07', ' ', line.endTime)) - unixepoch(concat('2025-01-07', ' ', line.endTime)) / 60), 0) AS "totalTime"`
      ])
      .leftJoin('timesheet.Lines', 'line')
      .where('timesheet.date = :date', { date: new Date(Date.parse(date)) })
      .groupBy('timesheet.id')
      .addGroupBy('timesheet.name')
      .orderBy('timesheet.createdAt', 'DESC')
      .limit(5)
      .offset(0);

    const results = await queryBasis.getRawMany<TimesheetBreakdownRecord>();

    const totalPages = Math.ceil(count / 5);
    const records = results;

    return {
      paging: {
        limit: 5,
        offset: 0,
        total: {
          records: count,
          pages: totalPages
        }
      },
      order: {
        createdAt: 'DESC'
      },
      records
    };
  }
}
