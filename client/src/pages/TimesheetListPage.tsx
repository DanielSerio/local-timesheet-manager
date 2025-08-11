import { TimesheetList } from "@/components/modules/Timesheet";
import { useTimesheetList } from "@/hooks";

export function TimesheetListPage({ entryDate }: { entryDate: string }) {
  const timesheetListQuery = useTimesheetList(entryDate);
  return (
    <>
      <TimesheetList entryDate={entryDate} query={timesheetListQuery} />
    </>
  );
}
