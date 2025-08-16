import { Skeleton } from "@/components/ui/skeleton";
import { Cell, TableRow } from "./subcomponents/TimesheetRow";

export function TimesheetTableSkeletonRow({
  gridTemplateColumns,
}: {
  gridTemplateColumns: string;
}) {
  return (
    <TableRow gridTemplateColumns={gridTemplateColumns}>
      <Cell label="Category">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
      <Cell label="Subcategory">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
      <Cell label="Start Time">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
      <Cell label="End Time">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
      <Cell label="Line Time">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
      <Cell label="Total Time">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
      <Cell label="Actions">
        <Skeleton className="h-4 my-1 w-full" />
      </Cell>
    </TableRow>
  );
}
