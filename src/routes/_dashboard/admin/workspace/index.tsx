import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGetAllWorkspaces } from "../../../../http/workspace/data";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import WorkspaceCard from "../../../../components/WorkspaceCard.tsx";
import { DeleteWorkspaceButton } from "../../../../resources/workspaces/DeleteButton.tsx";

export const Route = createFileRoute("/_dashboard/admin/workspace/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useGetAllWorkspaces();
  const navigate = useNavigate();

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

  const items = data?.items ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box>
        <Paper sx={{ padding: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate({ to: "/admin/workspace/create" })}
            >
              Create +
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              gap: 2,
              paddingX: 2,
            }}
          >
            {items.length > 0 ? (
              items.map((workspace) => (
                <Box key={workspace.id}>
                  <WorkspaceCard
                    name={workspace.name}
                    address={workspace.address}
                    description={workspace.description}
                    imageUrl={workspace.imageUrl}
                    id={workspace.id.toString()}
                    admin={true}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="info"
                      onClick={() =>
                        navigate({
                          to: "/admin/workspace/$id/edit",
                          params: { id: workspace.id.toString() },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <DeleteWorkspaceButton id={workspace.id.toString()} />
                  </Box>
                </Box>
              ))
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
      </Box>
    </Box>
  );
}
