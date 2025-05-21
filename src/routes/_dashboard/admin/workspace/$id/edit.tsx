import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGetWorkspace } from "../../../../../http/workspace/data.ts";
import { Box, CircularProgress } from "@mui/material";
import { WorkspaceForm } from "../../../../../resources/workspaces/FormComponent.tsx";
import { IconButton, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export const Route = createFileRoute("/_dashboard/admin/workspace/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetWorkspace({ id: id });
  if (isLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper sx={{ padding: 3, paddingBottom: 10 }}>
      <IconButton
        onClick={() => navigate({ to: "/admin/workspace" })}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <WorkspaceForm workspace={data?.data} />
    </Paper>
  );
}
