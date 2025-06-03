import { createFileRoute } from "@tanstack/react-router";
import WorkspaceDetails from "../../../../components/WorkspaceDetails.tsx";
import { Box } from "@mui/material";
export const Route = createFileRoute("/_auth/workspace/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <Box sx={{ padding: 3, width: "80%" }}>
      <WorkspaceDetails id={id} />;
    </Box>
  );
}
