import { createFileRoute } from "@tanstack/react-router";
import { useGetAllWorkspaces } from "../../http/workspace/data.ts";
import WorkspaceCard from "../../components/WorkspaceCard.tsx";
import { Workspace } from "../../resources/workspaces/model.ts";
import { Box, CircularProgress } from "@mui/material";
import { HomeLayout } from "../../components/layout/HomeLayout.tsx";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
  pendingComponent: () => <CircularProgress color="inherit" />,
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
  if (isLoading)
    return (
      <HomeLayout>
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
          <CircularProgress
            sx={{
              height: "100%",
            }}
          />
        </Box>
      </HomeLayout>
    );

  const items = data?.items ?? [];

  return (
    <HomeLayout>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", flexShrink: 0, flexGrow: 1 }}
      >
        {items.map(renderItem)}
      </Box>
    </HomeLayout>
  );
}
