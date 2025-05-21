import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface GridTableEditorProps {
  updateFloorPlan: (grid: number[][]) => void;
  setOpen: (open: boolean) => void;
  initialGrid?: number[][];
}

export function GridTableEditor({
  updateFloorPlan,
  setOpen,
  initialGrid,
}: GridTableEditorProps) {
  const [rows, setRows] = useState<number>(10);
  const [cols, setCols] = useState<number>(10);
  const [grid, setGrid] = useState<number[][]>([]);
  const [markMode, setMarkMode] = useState<boolean>(false);
  const [wallMarkMode, setWallMarkMode] = useState<boolean>(false);
  console.log(initialGrid);
  // Create initial grid with outer walls
  useEffect(() => {
    if (initialGrid && initialGrid.length > 0) {
      setGrid(initialGrid);
      setRows(initialGrid.length);
      setCols(initialGrid[0].length);
    } else {
      generateGrid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value > 0) setter(value);
    };

  const generateGrid = () => {
    const newGrid: number[][] = Array(rows)
      .fill(null)
      .map((_, r) =>
        Array(cols)
          .fill(null)
          .map((_, c) =>
            r === 0 || r === rows - 1 || c === 0 || c === cols - 1 ? -1 : 0,
          ),
      );
    setGrid(newGrid);
  };

  const toggleCell = (rowIdx: number, colIdx: number) => {
    const newGrid = [...grid.map((row) => [...row])];

    if (wallMarkMode) {
      newGrid[rowIdx][colIdx] = newGrid[rowIdx][colIdx] === -1 ? 0 : -1;
    } else if (markMode) {
      newGrid[rowIdx][colIdx] = newGrid[rowIdx][colIdx] === 1 ? 0 : 1;
    }

    setGrid(newGrid);
  };

  const handleSave = () => {
    updateFloorPlan(grid);
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2>
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={handleInputChange(setRows)}
            inputProps={{ min: 3 }}
            size="small"
          />
        </Grid2>
        <Grid2>
          <TextField
            label="Columns"
            type="number"
            value={cols}
            onChange={handleInputChange(setCols)}
            inputProps={{ min: 3 }}
            size="small"
          />
        </Grid2>
        <Grid2>
          <Button variant="contained" onClick={generateGrid}>
            Generate Grid
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="outlined"
            onClick={() => {
              setMarkMode(!markMode);
              if (!markMode) setWallMarkMode(false);
            }}
          >
            {markMode ? "Marking: ON" : "Mark Table"}
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setWallMarkMode(!wallMarkMode);
              if (!wallMarkMode) setMarkMode(false);
            }}
          >
            {wallMarkMode ? "Wall Marking: ON" : "Mark Wall"}
          </Button>
        </Grid2>
        <Grid2>
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
        </Grid2>
      </Grid2>

      {/* Legend */}
      <Box mt={4} mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Legend:
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              width={20}
              height={20}
              bgcolor="primary.main"
              border="1px solid #ccc"
            />
            <Typography variant="body2">Table (Blue)</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              width={20}
              height={20}
              bgcolor="black"
              border="1px solid #ccc"
            />
            <Typography variant="body2">Wall (Black)</Typography>
          </Box>
        </Box>
      </Box>

      {/* Grid display */}
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${cols}, 30px)`}
        gap={0.5}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            let bgColor = "grey.300";
            if (cell > 0) bgColor = "primary.main";
            else if (cell === -1) bgColor = "black";

            return (
              <Box
                key={`${rowIdx}-${colIdx}`}
                width={30}
                height={30}
                bgcolor={bgColor}
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => toggleCell(rowIdx, colIdx)}
                sx={{ cursor: "pointer", border: "1px solid #ccc" }}
              />
            );
          }),
        )}
      </Box>
    </Box>
  );
}

export default GridTableEditor;
