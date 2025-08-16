import { PageTitle } from "@/components/layout/Page/PageTitile";
import { TimesheetList } from "@/components/modules/Timesheet";
import { useTimesheetList } from "@/hooks";

export function TimesheetListPage({ entryDate }: { entryDate: string }) {
  const timesheetListQuery = useTimesheetList(entryDate);
  return (
    <>
      <PageTitle text={`${entryDate} > Timesheets`} />
      <TimesheetList entryDate={entryDate} query={timesheetListQuery} />
    </>
  );
}
