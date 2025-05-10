import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/workspace/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/admin/workspace/$id/edit"!</div>
}
