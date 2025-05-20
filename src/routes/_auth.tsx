import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "../util/client.ts";
import { BaseLayout } from "../components/Layout/BaseLayout.tsx";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
  );
}