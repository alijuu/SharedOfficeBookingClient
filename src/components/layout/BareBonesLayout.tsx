import React from "react";
import { Typography, Box } from "@mui/material";

export function BareBonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f7fafa"
      width="100%"
    >
      <Box>{children}</Box>
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "grey.200",
          mt: "auto",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Shared Office Booking. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
}
