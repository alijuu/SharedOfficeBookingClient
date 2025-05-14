import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/faq"!</div>
}
