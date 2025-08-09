import { Page, PageHeader } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$entryDate/$timesheetId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <PageHeader />
      <div>Hello "/$entryDate/$timesheetId"!</div>
    </Page>
  );
}
