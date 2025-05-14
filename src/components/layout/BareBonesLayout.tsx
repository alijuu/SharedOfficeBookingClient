import React from "react";
import { Typography, Box } from "@mui/material";

export function BareBonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="#f7fafa"
      width="100%"
    >
      {/* Content Section */}
      <Box
        sx={{
          my: 4,
          flex: 1,
          display: "flex",
        }}
      >
        {children}
      </Box>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "grey.200",
          mt: "auto", // Pushes footer to the bottom
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
