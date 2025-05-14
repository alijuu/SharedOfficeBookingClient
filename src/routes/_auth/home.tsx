import { createFileRoute } from "@tanstack/react-router";
import { useGetAllWorkspaces } from "../../http/workspace/data.ts";
import WorkspaceCard from "../../components/WorkspaceCard.tsx";
import { Workspace } from "../../resources/workspaces/model.ts";
import { Box, CircularProgress, Paper } from "@mui/material";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
  pendingComponent: () => <CircularProgress color="inherit" />,
});

function renderItem(workspace: Workspace) {
  return (
    <WorkspaceCard
      key={workspace.id}
      id={workspace.id.toString()}
      name={workspace.name}
      address={workspace.address}
      description={workspace.description}
      imageUrl={workspace.imageUrl}
    />
  );
}

function RouteComponent() {
  const { data, isLoading } = useGetAllWorkspaces();
  if (isLoading)
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
        <CircularProgress
          sx={{
            height: "100%",
          }}
        />
      </Box>
    );

  const items = data?.items ?? [];

  return (
    <Paper sx={{ padding: 3, width: "90%", minHeight: "80vh" }}>
      <Box
        sx={{
          // display: "flex",
          // flexDirection: "row",
          // flexWrap: "wrap",
          // justifyContent: "flex-start",
          // marginLeft: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 card on extra-small
            sm: "repeat(2, 1fr)", // 2 cards on small
            md: "repeat(3, 1fr)", // 3 cards on medium
            lg: "repeat(4, 1fr)", // 4 cards on large
            xl: "repeat(5, 1fr)", // 5 cards on extra-large
          },
          gap: 2,
          width: "100%",
          boxSizing: "border-box",
          paddingX: 10,
        }}
      >
        {items.length > 0 ? (
          items.map(renderItem)
        ) : (
          <Box
            sx={{
              gridColumn: "1 / -1",
              textAlign: "center",
              py: 5,
              color: "text.secondary",
            }}
          >
            No workspaces found.
          </Box>
        )}
      </Box>
    </Paper>
  );
}
