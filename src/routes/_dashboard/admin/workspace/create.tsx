import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { IconButton, Paper } from "@mui/material";

import { WorkspaceForm } from "../../../../resources/workspaces/FormComponent.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export const Route = createFileRoute("/_dashboard/admin/workspace/create")({
  component: CreateWorkspace,
});

function CreateWorkspace() {
  const navigate = useNavigate();
  return (
    <Paper sx={{ padding: 3, paddingBottom: 10 }}>
      <IconButton
        onClick={() => navigate({ to: "/admin/workspace" })}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <WorkspaceForm />
    </Paper>
  );
}
