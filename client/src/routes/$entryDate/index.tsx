import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$entryDate/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/[entry_date]/"!</div>;
}
