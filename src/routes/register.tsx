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
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRegisterSchema } from "../util/authForm.ts";
import { RegisterRequest } from "../http/auth/data.ts";
import { ErrorOutline } from "@mui/icons-material";
import { useState } from "react";
import { parseAxiosError } from "../util/error.ts";
import { useRegister } from "../http/auth/auth.ts";
export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState<string>();
  const [showLoader, setShowLoader] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(useRegisterSchema()),
  });
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();
  const onSubmit = async (data: RegisterRequest) => {
    setShowLoader(true);
    setError(undefined);
    register(data, {
      onSuccess: async () => {
        await navigate({ to: "/home" });
      },
      onError: async (error: Error) => {
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
          position: "relative",
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
          Welcome
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
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
          onClick={() => navigate({ to: "/login" })}
        >
          Already have an account? Log in
        </Typography>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isPending}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
}
