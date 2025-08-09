import type { CellContext, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

export function CountCell<TRow extends RowData, TValue = unknown>(
  props: CellContext<TRow, TValue>
) {
  const node = props.renderValue() as ReactNode;

  return <div>{node}</div>;
}
