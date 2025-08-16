import { Page, PageHeader } from "@/components/layout";
import { CreateTimesheetPage } from "@/pages/CreateTimesheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timesheets/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <PageHeader />
      <CreateTimesheetPage />
    </Page>
  );
}
