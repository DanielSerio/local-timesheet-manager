import { TimesheetTableSkeletonRow } from "./TimesheetTableSkeletonRow";

export function TimesheetTableBodyLoading({
  gridTemplateColumns,
}: {
  gridTemplateColumns: string;
}) {
  return (
    <>
      <TimesheetTableSkeletonRow gridTemplateColumns={gridTemplateColumns} />
      <TimesheetTableSkeletonRow gridTemplateColumns={gridTemplateColumns} />
      <TimesheetTableSkeletonRow gridTemplateColumns={gridTemplateColumns} />
      <TimesheetTableSkeletonRow gridTemplateColumns={gridTemplateColumns} />
      <TimesheetTableSkeletonRow gridTemplateColumns={gridTemplateColumns} />
    </>
  );
}
