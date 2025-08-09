import type { CellContext, RowData } from "@tanstack/react-table";

export function NameCell<TRow extends RowData, TValue = unknown>(
  props: CellContext<TRow, TValue>
) {
  const { name, href } = props.renderValue() as { href: string; name: string };

  return <a href={href}>{name}</a>;
}
