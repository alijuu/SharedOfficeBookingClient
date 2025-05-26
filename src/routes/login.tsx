import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLoginSchema } from "../util/authForm.ts";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { AuthRequest } from "../http/auth/data.ts";
import { ErrorOutline } from "@mui/icons-material";
import { useState } from "react";
import { useLogin } from "../http/auth/auth.ts";
import { parseAxiosError } from "../util/error.ts";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});
function RouteComponent() {
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(useLoginSchema()),
  });
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const onSubmit = async (data: AuthRequest) => {
    setError(undefined);
    setShowLoader(true);
    console.log("Form Data:", data);
    login(data, {
      onSuccess: async () => {
        await navigate({ to: "/home" });
      },
      onError: (error) => {
        const errorMessage = parseAxiosError(error);
        setError(errorMessage);
      },
    });
    setTimeout(() => {
      setShowLoader(false); // Hide the loader after 2 seconds
    }, 500);
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
          position: "absolute",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Backdrop
          open={showLoader || isPending}
          sx={{ position: "absolute", zIndex: "50", borderRadius: 4 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
              justifyContent: "flex-start", // Align to the left
              alignItems: "center",
              color: "error.main",
              mt: 1,
              width: "100%",
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

        <Button
          disabled={isPending}
          variant="contained"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
