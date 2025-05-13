import { createFileRoute } from "@tanstack/react-router";
import { useGetWorkspace } from "../../../../http/workspace/data.ts";

import { Box, Typography } from "@mui/material";
import {
  Desk,
  DeskBooking,
} from "../../../../components/TableBooking/DeskBooking.tsx";

export const Route = createFileRoute("/_auth/workspace/$id/book")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useGetWorkspace({ id: id });

  const grid: Desk[][] = data?.data.floorPlan.map((row, rowIdx) =>
    row.map((val, colIdx) => {
      if (val !== 0) {
        return {
          row: rowIdx,
          col: colIdx,
          id: val,
          status: "available",
        };
      } else {
        return null; // Empty space (no desk)
      }
    }),
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary">
        Choose a Table
      </Typography>
      {grid && <DeskBooking grid={grid} />}
    </Box>
  );
}
