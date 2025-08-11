import { Page, PageHeader } from "@/components/layout";
import { TimesheetPage } from "@/pages/TimesheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timesheets/$entryDate/$timesheetId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <PageHeader />
      <TimesheetPage />
    </Page>
  );
}
