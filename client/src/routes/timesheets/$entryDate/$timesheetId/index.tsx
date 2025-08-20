import { Page, PageHeader } from "@/components/layout";
import { TimesheetPage } from "@/pages/TimesheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timesheets/$entryDate/$timesheetId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { timesheetId } = Route.useParams();
  return (
    <Page>
      <PageHeader />
      <TimesheetPage timesheetId={+timesheetId} />
    </Page>
  );
}
