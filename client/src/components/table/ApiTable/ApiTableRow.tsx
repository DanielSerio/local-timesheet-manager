import { TableRowGrid } from "./TableRowGrid";
import type { ApiTableRowProps } from "./ApiTable.props";

export function ApiTableRow({
  gridTemplateColumns,
  children,
}: ApiTableRowProps) {
  return (
    <TableRowGrid gridTemplateColumns={gridTemplateColumns}>
      {children}
    </TableRowGrid>
  );
}
