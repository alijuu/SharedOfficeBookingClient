import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/admin/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/home"!</div>
}
