import { createFileRoute } from "@tanstack/react-router";
import WorkspaceDetails from "../../../../components/WorkspaceDetails.tsx";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  useGetAllWorkspaces,
  useGetWorkspace,
} from "../../../../http/workspace/data.ts";
import {
  Desk,
  DeskBooking,
} from "../../../../components/TableBooking/DeskBooking.tsx";
import { Workspace } from "../../../../resources/workspaces/model.ts";
import WorkspaceCard from "../../../../components/WorkspaceCard.tsx";
export const Route = createFileRoute("/_auth/workspace/$id/")({
  component: RouteComponent,
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
  const { id } = Route.useParams();
  const { data } = useGetWorkspace({ id: id });
  // const { data: freeDesks } = useGetAvailableDesk(id);
  const { data: allWorkspaces, isLoading } = useGetAllWorkspaces();
  const grid: Desk[][] = (data?.data.floorPlan ?? []).map((row, rowIdx) =>
    row.map((val, colIdx) => {
      if (val !== 0) {
        return {
          row: rowIdx,
          col: colIdx,
          id: val,
          status: "available",
        };
      } else {
        return null;
      }
    }),
  );
  const items =
    allWorkspaces?.items?.filter(
      (workspace) => workspace.id.toString() !== id.toString(),
    ) ?? [];
  return (
    <Box
      sx={{
        padding: 3,
        width: "80%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <WorkspaceDetails id={id} />

      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ my: 4 }}>
        Choose a Table
      </Typography>
      {grid && <DeskBooking grid={grid} />}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            mt: 6,
            mx: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Other Workspaces
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(3, 1fr)",
              },
              gap: 2,
              width: "100%",
              boxSizing: "border-box",
              paddingX: 10,
            }}
          >
            {items.length > 0 ? (
              items.slice(0, 3).map(renderItem)
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
        </Box>
      )}
    </Box>
  );
}
