import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports/$generatedOn/$reportId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reports/$generatedOn/$reportId/"!</div>
}
