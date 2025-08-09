import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowData,
} from "@tanstack/react-table";
import type { ApiTableProps } from "./ApiTable.props";
import { calculateApiTableGridTemplateColumns } from "./ApiTable.utils";
import { TableAlert } from "./TableAlert";
import { ApiTableRowSkeleton } from "./ApiTableRowSkeleton";
import { ApiTableRow } from "./ApiTableRow";
import { TableCell } from "./TableCell";
import type { ReactNode } from "react";

const BLANK: any[] = [];

export function ApiTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  error,
  isLoading,
}: ApiTableProps<TData, TValue>) {
  const gridTemplateColumns = calculateApiTableGridTemplateColumns(columns);
  const table = useReactTable<TData>({
    columns,
    data: data?.records ?? (BLANK as TData[]),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border">
      <div className="grid border-b" style={{ gridTemplateColumns }}>
        {columns.map(({ id, header }) => (
          <div className="p-1 text-xs font-bold text-gray-500" key={id}>
            {header}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {!!error && (
          <TableAlert mode="destructive">
            <p>{error.message}</p>
          </TableAlert>
        )}
        {!error && !isLoading && (!data || data?.records.length === 0) && (
          <TableAlert mode="subtle">
            <p>No Records</p>
          </TableAlert>
        )}
        {isLoading && (
          <>
            <ApiTableRowSkeleton gridTemplateColumns={gridTemplateColumns} />
            <ApiTableRowSkeleton gridTemplateColumns={gridTemplateColumns} />
            <ApiTableRowSkeleton gridTemplateColumns={gridTemplateColumns} />
            <ApiTableRowSkeleton gridTemplateColumns={gridTemplateColumns} />
            <ApiTableRowSkeleton gridTemplateColumns={gridTemplateColumns} />
          </>
        )}

        {!isLoading &&
          !error &&
          !!data?.records &&
          data.records.length > 0 &&
          table.getRowModel().flatRows.map((row) => (
            <ApiTableRow gridTemplateColumns={gridTemplateColumns} key={row.id}>
              {row.getAllCells().map((cell) => {
                return (
                  <TableCell label="Loading..." key={`${row.id}:${cell.id}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </ApiTableRow>
          ))}
      </div>
    </div>
  );
}
