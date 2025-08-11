import { TimesheetTable } from "@/components/table";

export function TimesheetPage({ timesheetId }: { timesheetId?: number }) {
  return <TimesheetTable timesheetId={timesheetId} />;
}
