import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IconButton, Paper, Box } from "@mui/material";
import WorkspaceDetails from "../../../../../components/WorkspaceDetails.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
export const Route = createFileRoute("/_dashboard/admin/workspace/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  return (
    <Paper sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          onClick={() => navigate({ to: "/admin/workspace" })}
          sx={{ mb: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            navigate({ to: "/admin/workspace/$id/edit", params: { id } })
          }
          aria-label="Edit workspace"
        >
          <EditIcon />
        </IconButton>
      </Box>

      <WorkspaceDetails id={id} />
    </Paper>
  );
}
