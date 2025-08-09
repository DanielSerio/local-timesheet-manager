import type { ListResponse } from "@/lib/types/response.types";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { AreaHTMLAttributes, PropsWithChildren } from "react";

export type TextAlignment = 'left' | 'center' | 'right';
export type ApiTableColumnDef<TData extends RowData, TValue = unknown> = {
  id: string;
  size: number;
  header: string;
  align?: TextAlignment;
} & ColumnDef<TData, TValue>;

export interface ApiTableProps<TData extends RowData, TValue = unknown> extends AreaHTMLAttributes<HTMLAreaElement> {
  columns: ApiTableColumnDef<TData, TValue>[];
  error: UseQueryResult<ListResponse<TData>>['error'];
  data: UseQueryResult<ListResponse<TData>>['data'];
  isLoading: UseQueryResult<ListResponse<TData>>['isLoading'];
}

export interface ApiTableRowProps extends PropsWithChildren {
  gridTemplateColumns: string;
}

export interface TableRowGridProps extends PropsWithChildren {
  gridTemplateColumns: string;
}

export interface TableCellProps extends PropsWithChildren {
  label: string;
}