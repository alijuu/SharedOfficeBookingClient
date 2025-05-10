import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/auth/AuthContext.ts";
import { BareBonesLayout } from "../components/layout/BareBonesLayout.tsx";
import NotFound from "../components/NotFound/NotFound.tsx";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth?: AuthContext;
}>()({
  component: RootComponent,
  pendingComponent: () => <CircularProgress color="inherit" />,
  notFoundComponent: () => {
    return (
      <BareBonesLayout>
        <NotFound />
      </BareBonesLayout>
    );
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {/*<ReactQueryDevtools buttonPosition="top-right" />*/}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
