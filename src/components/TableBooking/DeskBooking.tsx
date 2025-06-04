import { Box, Typography } from "@mui/material";
import { DeskBook } from "../../resources/desk/DeskBook.tsx";

export type Desk = {
  row: number;
  col: number;
  id: number;
  status: DeskStatus;
} | null;

type DeskBookingProps = {
  grid: Desk[][];
  onDeskClick?: (desk: Desk) => void;
};

export type DeskStatus = "available" | "out of order";

export function DeskBooking({ grid, onDeskClick }: DeskBookingProps) {
  if (!grid || grid.length === 0 || !grid[0]) {
    return <Typography>No desks to display</Typography>;
  }

  return (
    <Box sx={{}}>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${grid[0].length}, minmax(40px, 4vw))`}
        gridTemplateRows={`repeat(${grid.length}, minmax(40px, 50px))`}
        gap={2}
        justifyContent="flex-start"
        borderRadius={2}
        border="10px solid #ccc"
        padding={2}
      >
        {grid.map((row, rowIdx) =>
          row.map((desk, colIdx) => {
            if (!desk) {
              return <Box key={`${rowIdx}-${colIdx}`} />;
            }

            if (desk.id === -1) {
              return (
                <Box
                  key={`${rowIdx}-${colIdx}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "black",
                    borderRadius: 1,
                  }}
                />
              );
            }

            const isClickable = desk.status === "available";

            return (
              <Box
                key={`${rowIdx}-${colIdx}`}
                onClick={() => isClickable && onDeskClick?.(desk)}
                sx={{
                  cursor: isClickable ? "pointer" : "not-allowed",
                  opacity: isClickable ? 1 : 0.5,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: isClickable ? "scale(1.3)" : "none",
                  },
                }}
              >
                <DeskBook id={desk.id.toString()} />
              </Box>
            );
          }),
        )}
      </Box>
    </Box>
  );
}
