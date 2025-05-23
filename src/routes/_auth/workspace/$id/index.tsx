import { createFileRoute, useNavigate } from "@tanstack/react-router";
import WorkspaceDetails from "../../../../components/WorkspaceDetails.tsx";
import { IconButton, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export const Route = createFileRoute("/_auth/workspace/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  return (
    <Paper sx={{ padding: 3, width: "80%" }}>
      <IconButton onClick={() => navigate({ to: "/home" })} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <WorkspaceDetails id={id} />;
    </Paper>
  );
}
