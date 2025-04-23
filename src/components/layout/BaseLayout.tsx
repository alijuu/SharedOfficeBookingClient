import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { authProvider } from "../../authProvider.ts";
import { useNavigate } from "@tanstack/react-router";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" minHeight={"100vh"}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Shared Office Booking
          </Typography>
          <Button
            onClick={async () => {
              try {
                await authProvider.logout();
                navigate({ to: "/login" });
              } catch (err) {
                console.log(err);
              }
            }}
            variant="contained"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4 }}>{children}</Container>

      <Box
        component="footer"
        sx={{ py: 2, textAlign: "center", bgcolor: "grey.200", mt: "auto" }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Shared Office Booking. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
}
