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
import type { Control, FormState } from "react-hook-form";

export type TimesheetTableGrouping = "by-category" | "by-subcategory" | "none";

type TimesheetFormState = {
  name: string;
  date: unknown;
  id?: number | null | undefined;
  Lines?:
    | {
        categoryId: number;
        subcategoryId: number | null;
        startTime: string;
        endTime: string;
        note: string | null;
        id?: number | null | undefined;
      }[]
    | undefined;
};

export interface TimesheetTableProps
  extends AreaHTMLAttributes<HTMLAreaElement> {
  timesheetId?: number;
  isReadOnly?: boolean;
  isCreateMode?: boolean;
  grouping?: TimesheetTableGrouping;
  lines?: (TimesheetLineCreate | TimesheetLine)[];
}
export type LineTimes = {
  lineTime: number;
  totalTime: number;
};
export interface TimesheetTableRowProps
  extends AreaHTMLAttributes<HTMLAreaElement> {
  isReadOnly: boolean;
  grouping: TimesheetTableGrouping;
  index: number;
  line?: TimesheetLineCreate | TimesheetLine;
  lineTimes: LineTimes;
  errors:
    | NonNullable<FormState<TimesheetFormState>["errors"]["Lines"]>[number]
    | undefined;
  gridTemplateColumns: string;
  categoriesQuery: UseQueryResult<ListResponse<Category>, Error>;
  subcategoriesQuery: UseQueryResult<ListResponse<Subcategory>, Error>;
  control: Control<TimesheetFormState>;
  remove: (id: number) => void;
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
