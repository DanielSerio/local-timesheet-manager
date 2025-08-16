import { PageTitle } from "@/components/layout/Page/PageTitile";
import { TimesheetTable } from "@/components/table";

export function CreateTimesheetPage() {
  return (
    <>
      <PageTitle text="Create Timesheet" />
      <TimesheetTable isCreateMode />
    </>
  );
}
