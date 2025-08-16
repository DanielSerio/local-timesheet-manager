import { PageTitle } from "@/components/layout/Page/PageTitile";
import { TimesheetTable } from "@/components/table";

export function TimesheetPage({ timesheetId }: { timesheetId?: number }) {
  return (
    <>
      <PageTitle text="Edit Timesheet" />
      <TimesheetTable timesheetId={timesheetId} />
    </>
  );
}
