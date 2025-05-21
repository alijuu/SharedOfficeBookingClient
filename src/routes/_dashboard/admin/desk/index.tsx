import { createFileRoute } from "@tanstack/react-router";
import { Paper } from "@mui/material";

export const Route = createFileRoute("/_dashboard/admin/desk/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Paper sx={{ padding: 3, height: "100%" }}></Paper>;
}
