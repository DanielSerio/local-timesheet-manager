import { Page, PageHeader } from "@/components/layout";
import { CollectionsListPage } from "@/pages/CollectionsListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});
// Search for entry dates
function Index() {
  return (
    <Page>
      <PageHeader />
      <CollectionsListPage />
    </Page>
  );
}
