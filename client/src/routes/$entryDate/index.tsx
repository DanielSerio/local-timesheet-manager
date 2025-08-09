import { Page, PageHeader } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$entryDate/")({
  component: RouteComponent,
});
//TODO: route should include list of timesheets, listing using columns:
// [id, name, totalTime]
function RouteComponent() {
  return (
    <Page>
      <PageHeader />
      <div>Hello "/[entry_date]/"!</div>
    </Page>
  );
}
