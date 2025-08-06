import type { UseQueryResult } from "@tanstack/react-query";
import type { AreaHTMLAttributes } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@/lib/types/category.types";
import type { ListResponse } from "@/lib/types/response.types";
import type { Subcategory } from "@/lib/types/subcategory.types";
import type {
  TimesheetLine,
  TimesheetLineCreate,
} from "@/lib/types/timesheet-line.types";

export type TimesheetTableGrouping = "by-category" | "by-subcategory" | "none";

export interface TimesheetTableProps
  extends AreaHTMLAttributes<HTMLAreaElement> {
  timesheetId?: number;
  isReadOnly?: boolean;
  grouping?: TimesheetTableGrouping;
  lines?: (TimesheetLineCreate | TimesheetLine)[];
}

export interface TimesheetTableRowProps
  extends AreaHTMLAttributes<HTMLAreaElement> {
  isReadOnly: boolean;
  grouping: TimesheetTableGrouping;
  runningTotal: number;
  line?: TimesheetLineCreate | TimesheetLine;
  gridTemplateColumns: string;
  categoriesQuery: UseQueryResult<ListResponse<Category>, Error>;
  subcategoriesQuery: UseQueryResult<ListResponse<Subcategory>, Error>;
}

export type TimesheetRow = (TimesheetLineCreate | TimesheetLine) & {
  lineTime: number;
  totalTime: number;
  actions: number; // row id
};

export type TimesheetTableColumnDef<ColID extends keyof TimesheetRow> =
  ColumnDef<TimesheetRow, TimesheetRow[ColID]> & {
    id: ColID;
    accessorKey?: ColID;
    size: number;
    header: string;
  };
