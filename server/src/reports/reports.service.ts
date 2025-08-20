import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { DataSource, FindOptionsOrder, In } from 'typeorm';
import { Timesheet } from '#/timesheets/entities/timesheet.entity';
import { RelatedEntityListParams } from '#/shared/services/related-entity.service';

@Injectable()
export class ReportsService {
  private get repo() {
    return this.source.getRepository(Report);
  }

  private get timesheetsRepo() {
    return this.source.getRepository(Timesheet);
  }

  constructor(private source: DataSource) { }

  async create(createReportDto: CreateReportDto) {
    const report = new Report();

    report.name = createReportDto.name;

    const foundTimesheets = await this.timesheetsRepo.find({
      where: {
        id: In(createReportDto.timesheetIds)
      }
    });

    report.Timesheets = foundTimesheets;

    return await this.repo.save(report);
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const found = await this.repo.findOne({
      where: { id }
    });

    if (!found) {
      throw new NotFoundException(`Report with ID '${id}' not found`);
    }

    const existingIds = (found.Timesheets ?? []).map(({ id }) => id);
    const newIds = updateReportDto.timesheetIds ?? [];
    const ids = Array.from(new Set([...existingIds, ...newIds]));
    const foundTimesheets = await this.timesheetsRepo.find({
      where: {
        id: In(ids)
      }
    });

    found.Timesheets = foundTimesheets;

    return await this.repo.save(found);
  }

  remove(ids: number[]) {
    return this.repo.delete(ids);
  }

  async findOne(id: number) {
    const found = await this.repo.findOne({
      where: { id },
      relations: {
        Timesheets: {
          Lines: true
        }
      }
    });

    if (!found) {
      throw new NotFoundException(`Report with ID '${id}' not found`);
    }

    return found;
  }

  async findAll({ paging, sorting }: RelatedEntityListParams<Report>) {
    const totalRecords = await this.repo.count();
    const records = await this.repo.find({
      take: paging.limit,
      skip: paging.offset,
      order: sorting as FindOptionsOrder<Report>
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
}
