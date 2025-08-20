import { Controller, Get, Post, Body, Patch, Param, Put, Query, BadRequestException, HttpCode, BadGatewayException } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { getPagingPropertyFromURLQueryString } from '#/shared/utilities';
import { SortDirection, Sorting } from '#/shared/services/related-entity.service';
import { Timesheet } from './entities/timesheet.entity';
import { isValid } from 'date-fns';
import { TimesheetValidator } from '#/shared/validators/timesheet.validator';
import z from 'zod';

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
    const parsed = TimesheetValidator.create.parse(createTimesheetDto);

    if (!parsed) {
      throw new BadRequestException(`Could not parse timesheet`);
    }

    return this.timesheetsService.create({
      ...parsed,
      Lines: parsed.Lines ?? []
    });
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
    const parsed = z.array(TimesheetValidator.delete).parse(body);

    return this.timesheetsService.remove(parsed);
  }

  @HttpCode(200)
  @Get('for-date')
  forDate(@Query('date') date?: string) {
    if (!date) {
      throw new BadRequestException(`date query is required`);
    }

    if (!isValid(new Date(Date.parse(date)))) {
      throw new BadRequestException(`'${date}' is not a valid date`);
    }

    return this.timesheetsService.findForDate(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    const parsed = TimesheetValidator.update.parse(updateTimesheetDto);

    if (!parsed) {
      throw new BadRequestException(`Could not parse timesheet`);
    }

    return this.timesheetsService.update(+id, {
      ...parsed,
      Lines: parsed.Lines ?? undefined
    });
  }
}
