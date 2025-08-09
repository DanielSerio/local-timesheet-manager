import type { RowData } from "@tanstack/react-table";
import type { ApiTableColumnDef } from "./ApiTable.props";

export function calculateApiTableGridTemplateColumns<TData extends RowData, TValue = unknown>(
  columns: ApiTableColumnDef<TData, TValue>[]
) {
  const total = columns.reduce((sum, column) => sum + column.size, 0);

  return columns
    .map((col) => `${((col.size / total) * 100).toFixed(2)}%`)
    .join(" ");
}