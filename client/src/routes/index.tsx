import { Page, PageHeader } from "@/components/layout";
import { EntryDateListPage } from "@/pages/EntryDateListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});
// Search for entry dates
function Index() {
  return (
    <Page>
      <PageHeader />
      <EntryDateListPage />
    </Page>
  );
}
