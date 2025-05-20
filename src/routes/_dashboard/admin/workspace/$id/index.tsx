import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/admin/workspace/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/admin/workspace/$id/"!</div>
}
