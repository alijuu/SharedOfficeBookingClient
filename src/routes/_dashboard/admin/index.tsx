import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
