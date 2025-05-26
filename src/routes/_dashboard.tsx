import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "../components/Layout/AdminLayout.tsx";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
