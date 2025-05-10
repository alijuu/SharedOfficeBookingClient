import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/user/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/user/settings"!</div>
}
