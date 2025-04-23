import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid';
import Box from '@mui/material/Box';

const GridTableEditor: React.FC = () => {
    const [rows, setRows] = useState<number>(10);
    const [cols, setCols] = useState<number>(10);
    const [grid, setGrid] = useState<number[][]>(
        Array(10)
            .fill(null)
            .map(() => Array(10).fill(0))
    );
    const [markMode, setMarkMode] = useState<boolean>(false);
    const [savedMatrix, setSavedMatrix] = useState<number[][] | null>(null);

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<number>>) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value > 0) setter(value);
            };

    const generateGrid = () => {
        const newGrid = Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(0));
        setGrid(newGrid);
        setSavedMatrix(null);
    };

    const toggleCell = (rowIdx: number, colIdx: number) => {
        if (!markMode) return;
        const newGrid = [...grid.map((row) => [...row])];
        newGrid[rowIdx][colIdx] = newGrid[rowIdx][colIdx] === 1 ? 0 : 1;
        setGrid(newGrid);
    };

    const handleSave = () => {
        setSavedMatrix(grid);
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
                        inputProps={{ min: 1 }}
                        size="small"
                    />
                </Grid2>
                <Grid2>
                    <TextField
                        label="Columns"
                        type="number"
                        value={cols}
                        onChange={handleInputChange(setCols)}
                        inputProps={{ min: 1 }}
                        size="small"
                    />
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={generateGrid}>
                        Generate Grid
                    </Button>
                </Grid2>
                <Grid2>
                    <Button variant="outlined" onClick={() => setMarkMode(!markMode)}>
                        {markMode ? 'Marking: ON' : 'Mark Table'}
                    </Button>
                </Grid2>
                <Grid2>
                    <Button variant="contained" color="success" onClick={handleSave}>
                        Save
                    </Button>
                </Grid2>
            </Grid2>

            <Box mt={4} display="grid" gridTemplateColumns={`repeat(${cols}, 30px)`} gap={0.5}>
                {grid.map((row, rowIdx) =>
                    row.map((cell, colIdx) => (
                        <Box
                            key={`${rowIdx}-${colIdx}`}
                            width={30}
                            height={30}
                            bgcolor={cell === 1 ? 'primary.main' : 'grey.300'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            onClick={() => toggleCell(rowIdx, colIdx)}
                            sx={{ cursor: 'pointer', border: '1px solid #ccc' }}
                        />
                    ))
                )}
            </Box>

            {savedMatrix && (
                <Box mt={4}>
                    <Typography variant="h6">Saved Matrix:</Typography>
                    <pre>{JSON.stringify(savedMatrix, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
};

export default GridTableEditor;
