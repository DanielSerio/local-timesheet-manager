import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$entryDate/$timesheetId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/[entry_date]/[timesheet_id]/"!</div>;
}
