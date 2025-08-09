import type { TableRowGridProps } from "./ApiTable.props";

export function TableRowGrid({
  children,
  gridTemplateColumns,
}: TableRowGridProps) {
  return (
    <div
      className="grid [&:not(:last-child)]:border-b"
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
}
