import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/auth/AuthContext.ts";
import { BareBonesLayout } from "../components/layout/BareBonesLayout.tsx";
import NotFound from "../components/NotFound/NotFound.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route location

  useEffect(() => {
    // If the current path is '/', redirect to '/home'
    if (location.pathname === "/") {
      navigate({ to: "/home" });
    }
  }, [location, navigate]);
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
