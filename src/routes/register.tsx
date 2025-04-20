import { createFileRoute } from "@tanstack/react-router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 4,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Welcome
        </Typography>

        <TextField fullWidth label="Email" variant="outlined" />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password Confirmation"
          type="password"
          variant="outlined"
        />

        <Button variant="contained" fullWidth>
          Register
        </Button>
      </Paper>
    </Box>
  );
}
