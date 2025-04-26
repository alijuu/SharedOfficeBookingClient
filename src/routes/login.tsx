import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useLoginSchema } from "../util/authForm.ts";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { authProvider } from "../authProvider.ts";
import { AuthRequest } from "../http/auth/data.ts";
import { ErrorOutline } from "@mui/icons-material";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});
function RouteComponent() {
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(useLoginSchema()),
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const onSubmit = async (data: AuthRequest) => {
    console.log("Form Data:", data);
    try {
      const result = await authProvider.login(data);
      if (!result.success) {
        console.error("Login failed:", result.error);
        setError(result?.error?.message);
        return;
      }
      await navigate({ to: "/home" });
    } catch (error) {
      console.log(error);
    }
  };

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
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Welcome Back
        </Typography>

        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {error && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "error.main",
              textAlign: "center",
              mt: 1,
            }}
          >
            <ErrorOutline fontSize="small" sx={{ marginRight: 1 }} />
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{ mt: 1, cursor: "pointer", color: "primary.main" }}
          onClick={() => navigate({ to: "/register" })}
        >
          Don't have an account? Register
        </Typography>

        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
      </Paper>
    </Box>
  );
}
