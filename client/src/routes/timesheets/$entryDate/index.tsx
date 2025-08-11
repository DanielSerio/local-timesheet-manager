import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/layout";
import { TimesheetListPage } from "@/pages/TimesheetListPage";

export const Route = createFileRoute("/timesheets/$entryDate/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { entryDate } = Route.useParams();

  return (
    <Page>
      <PageHeader />
      <TimesheetListPage entryDate={entryDate} />
    </Page>
  );
}
