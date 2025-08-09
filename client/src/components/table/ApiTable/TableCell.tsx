import { forwardRef, type ForwardedRef } from "react";
import type { TableCellProps } from "./ApiTable.props";

function TableCellComponent(
  { label, children }: TableCellProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="[&:not(:last-child)]:border-r" ref={ref} title={label}>
      <div className="value px-1 py-1">{children}</div>
    </div>
  );
}

export const TableCell = forwardRef(TableCellComponent);
