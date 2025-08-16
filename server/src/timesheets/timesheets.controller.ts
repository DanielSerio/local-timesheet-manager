import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { getPagingPropertyFromURLQueryString } from '#/shared/utilities';
import { SortDirection, Sorting } from '#/shared/services/related-entity.service';
import { Timesheet } from './entities/timesheet.entity';

@Controller('timesheets')
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) { }

  private getValidLimit = (limitQuery?: string) => getPagingPropertyFromURLQueryString('limit', limitQuery);
  private getValidOffset = (offsetQuery?: string) => getPagingPropertyFromURLQueryString('offset', offsetQuery);
  private getValidSorting = (sortQuery?: string): null | Sorting<Timesheet> => {
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
    const sorting = {} as Sorting<Timesheet>;

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
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetsService.create(createTimesheetDto);
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

    return this.timesheetsService.findAll({
      paging: {
        limit,
        offset
      },
      sorting
    });
  }

  @Put('delete')
  remove(@Body() body: number[]) {
    return this.timesheetsService.remove(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetsService.update(+id, updateTimesheetDto);
  }


}
