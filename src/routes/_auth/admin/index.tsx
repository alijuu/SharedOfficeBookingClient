import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Button, Paper, CircularProgress } from "@mui/material";
import {
  useDeleteWorkspace,
  useGetAllWorkspaces,
} from "../../../http/workspace/data.ts";
import WorkspaceCard from "../../../components/WorkspaceCard.tsx";

// Define route
export const Route = createFileRoute("/_auth/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: deleteWorkspace, isPending } = useDeleteWorkspace();
  const { data, isLoading } = useGetAllWorkspaces();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteWorkspace(id, {
      onSuccess: async () => {},
    });
  };

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
      <Box sx={{ flex: 1, padding: 3 }}>
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
                  />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Button
                      disabled={true}
                      fullWidth
                      variant="contained"
                      color="info"
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      disabled={isPending}
                      onClick={() => handleDelete(workspace.id.toString())}
                    >
                      Delete
                    </Button>
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
