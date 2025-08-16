import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reports/create/"!</div>
}
