import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/workspace/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/workspace/$id"!</div>
}
