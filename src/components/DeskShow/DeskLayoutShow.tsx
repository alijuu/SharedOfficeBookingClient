import { Box } from "@mui/material";
import { DeskBook } from "../../resources/desk/DeskBook.tsx";
import { Desk } from "../TableBooking/DeskBooking.tsx";
type DeskBookingProps = {
  grid: Desk[][];
  onDeskClick?: (desk: Desk) => void;
};
export function DeskLayoutShow({ grid, onDeskClick }: DeskBookingProps) {
  return (
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
              <DeskBook />
            </Box>
          );
        }),
      )}
    </Box>
  );
}
