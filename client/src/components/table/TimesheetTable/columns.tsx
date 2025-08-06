import type { TimesheetTableColumnDef } from "./TimesheetTable.props";

export const COLUMNS = [
  {
    id: "categoryId",
    accessorKey: "categoryId",
    size: 140,
    header: "Category",
  } satisfies TimesheetTableColumnDef<"categoryId">,
  {
    id: "subcategoryId",
    accessorKey: "subcategoryId",
    size: 160,
    header: "Subcategory",
  } satisfies TimesheetTableColumnDef<"subcategoryId">,
  {
    id: "startTime",
    accessorKey: "startTime",
    size: 110,
    header: "Start Time",
  } satisfies TimesheetTableColumnDef<"startTime">,
  {
    id: "endTime",
    accessorKey: "endTime",
    size: 110,
    header: "End Time",
  } satisfies TimesheetTableColumnDef<"endTime">,
  {
    id: "lineTime",
    accessorKey: "lineTime",
    size: 50,
    header: "Line",
  } satisfies TimesheetTableColumnDef<"lineTime">,
  {
    id: "totalTime",
    accessorKey: "totalTime",
    size: 50,
    header: "Total",
  } satisfies TimesheetTableColumnDef<"totalTime">,
  {
    id: "actions",
    size: 60,
    header: "Actions",
  } satisfies TimesheetTableColumnDef<"actions">,
];
