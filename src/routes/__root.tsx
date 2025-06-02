import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/auth/AuthContext.ts";
import NotFound from "../components/NotFound/NotFound.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useEffect } from "react";
import { BaseLayout } from "../components/Layout/BaseLayout.tsx";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth?: AuthContext;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <BaseLayout>
        <NotFound />
      </BaseLayout>
    );
  },
});

function RootComponent() {
  useEffect(() => {
    const loader = document.getElementById("loader");
    const loaderStyle = document.getElementById("loader-style");
    if (loader) {
      loader.remove();
    }
    if (loaderStyle) {
      loaderStyle.remove();
    }
  }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Outlet />
        {/*<ReactQueryDevtools buttonPosition="top-right" />*/}
        <TanStackRouterDevtools position="bottom-right" />
      </LocalizationProvider>
    </>
  );
}
