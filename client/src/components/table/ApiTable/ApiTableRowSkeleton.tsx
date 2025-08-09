import { Skeleton } from "@/components/ui/skeleton";
import type { ApiTableRowProps } from "./ApiTable.props";
import { TableRowGrid } from "./TableRowGrid";
import { TableCell } from "./TableCell";

export function ApiTableRowSkeleton({ gridTemplateColumns }: ApiTableRowProps) {
  const count = gridTemplateColumns.split(/\s+/g).length;

  return (
    <TableRowGrid gridTemplateColumns={gridTemplateColumns}>
      {[...new Array(count)].map((_, i) => (
        <TableCell label="Loading..." key={`skel:${i}`}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRowGrid>
  );
}
