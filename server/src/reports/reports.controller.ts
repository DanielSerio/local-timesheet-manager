import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { getPagingPropertyFromURLQueryString } from '#/shared/utilities';
import { SortDirection, Sorting } from '#/shared/services/related-entity.service';
import { Report } from './entities/report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  private getValidLimit = (limitQuery?: string) => getPagingPropertyFromURLQueryString('limit', limitQuery);
  private getValidOffset = (offsetQuery?: string) => getPagingPropertyFromURLQueryString('offset', offsetQuery);
  private getValidSorting = (sortQuery?: string): null | Sorting<Report> => {
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
    const sorting = {} as Sorting<Report>;

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


  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll(
    @Query('limit') qLimit?: string,
    @Query('offset') qOffset?: string,
    @Query('sort') qSort?: string
  ) {
    const limit = this.getValidLimit(qLimit);
    const offset = this.getValidOffset(qOffset);
    const sorting = this.getValidSorting(qSort);

    return this.reportsService.findAll({
      paging: {
        limit,
        offset
      },
      sorting
    });
  }

  @Put('delete')
  remove(@Body() body: number[]) {
    return this.reportsService.remove(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }
}
