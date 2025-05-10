import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { queryClient } from "./util/client.ts";
import { CssBaseline } from "@mui/material";
import { NotificationProvider } from "./context/notifications/NotificationProvider.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { useAuth } from "./context/auth/useAuth.ts";

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>,
  );
}
