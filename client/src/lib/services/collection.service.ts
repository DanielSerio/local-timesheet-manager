import type { ListResponse } from "../types/response.types";
import type { Pretty } from "../types/utility.types";
import { ApiService } from "./api.service";
import type { EntityListApiParams } from "./entity.service";

type CollectionName = 'entry-date' | 'report';

interface CollectionSearchParams extends Omit<EntityListApiParams, 'offset'> {
  collection: CollectionName;
  searchQuery: string;
}

export type EntryDateRecord = {
  date: Date;
  count: number;
};

export type TimesheetReportRecord = {
  generatedOn: Date;
  count: number;
};

export type CollectionRecord<Name extends CollectionName> = Name extends 'entry-date' ? EntryDateRecord : TimesheetReportRecord;

class CollectionApiService extends ApiService {
  constructor() {
    super({
      ENDPOINT: '/collections'
    });
  }

  public async search<Name extends CollectionName>({ collection, searchQuery, limit }: CollectionSearchParams) {
    const params = new URLSearchParams({
      search: searchQuery,
      limit: `${~~limit}`,
    });
    const response = await fetch(`${this._URL}/${collection}?${params}`);

    if (response.status >= 400) {
      throw await response.json();
    }

    return await response.json() as Pretty<ListResponse<CollectionRecord<Name>>>;
  }
}

export const CollectionService = new CollectionApiService();