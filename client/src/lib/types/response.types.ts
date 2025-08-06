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

export type Sorting<Type> = Partial<{
  [k in keyof Type]: 'asc' | 'desc'
}>;

export interface ListResponse<Type> {
  paging: PagingResponse;
  sorting: null | Sorting<Type>;
  records: Type[];
}