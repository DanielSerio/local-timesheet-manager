import type { CellContext, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

export function TimeCell<TRow extends RowData, TValue = unknown>(
  props: CellContext<TRow, TValue>
) {
  return <div>{props.renderValue() as ReactNode}</div>;
}
