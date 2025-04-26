import { createFileRoute } from "@tanstack/react-router";
import { useGetAllWorkspaces } from "../../http/workspace/data.ts";
import WorkspaceCard from "../../components/WorkspaceCard.tsx";
import { Workspace } from "../../resources/workspaces/model.ts";
import { Box } from "@mui/material";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
  loader: async () => {},
});

function renderItem(workspace: Workspace) {
  return (
    <WorkspaceCard
      key={workspace.id}
      name={workspace.name}
      address={workspace.address}
      description={workspace.description}
      imageUrl={workspace.imageUrl}
      onViewDetails={() => {
        console.log(`Viewing details for workspace ID: ${workspace.id}`);
      }}
    />
  );
}

function RouteComponent() {
  const { data, isLoading } = useGetAllWorkspaces();

  if (isLoading) return <div>Loading...</div>;

  const items = data?.data?.items ?? [];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", flexShrink: 0, flexGrow: 1 }}>
      {items.map(renderItem)}
    </Box>
  );
}
