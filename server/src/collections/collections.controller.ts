import { getPagingPropertyFromURLQueryString } from '#/shared/utilities';
import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { CollectionName, CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  private validCollectionNames = ['entry-date', 'report'] as CollectionName[];

  private getValidLimit = (limitQuery?: string) => getPagingPropertyFromURLQueryString('limit', limitQuery, 5);

  private isCollectionName(value: string): value is CollectionName {
    return this.validCollectionNames.includes(value as CollectionName);
  }

  constructor(
    private service: CollectionsService
  ) { }

  @Get(':collection')
  search(
    @Param('collection') collection: string,
    @Query('limit') qLimit?: string,
    @Query('search') qSearch?: string
  ) {
    const limit = this.getValidLimit(qLimit);
    const searchQuery = qSearch ?? '';

    if (!this.isCollectionName(collection)) {
      throw new BadRequestException(`'${collection}' is not a valid collection name`);
    }

    return this.service.searchCollection({
      collection,
      searchQuery,
      limit
    });
  }
}
