import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import ProfileMenu from "../profile/ProfileMenu.tsx";
import { AuthContext } from "../../context/auth/AuthContext.ts";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f7fafa"
    >
      <AppBar
        position="static"
        // elevation={2}
        sx={{
          bgcolor: "white",
          color: "black",
          width: "100%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Toolbar
          disableGutters={true}
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            py: 1.5,
            pb: 4,
            width: "90%",
            px: 0,
            // mx: "auto",
          }}
        >
          {/* Logo / Title */}
          <Button>
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate({ to: "/home" })}
              sx={{
                margin: 0,
                padding: 0,
                fontWeight: 600,
                transition: "transform 0.2s ease",
                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.05)",
                },
              }}
            >
              Office Booking
            </Typography>
          </Button>

          {/* Nav Links / Actions */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Example placeholder nav links */}
            <Button>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.2)",
                  },
                }}
                onClick={() => {
                  navigate({ to: "/home" });
                }}
              >
                Bookings
              </Typography>
            </Button>
            <Button>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.3)",
                  },
                }}
                onClick={() => {
                  navigate({ to: "/faq" });
                }}
              >
                FAQ
              </Typography>
            </Button>

            {auth?.user?.roles.includes("Admin") && (
              <Typography
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate({ to: "/admin" });
                }}
              >
                ADMIN
              </Typography>
            )}

            <ProfileMenu />
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // bgcolor: "white",
        }}
      >
        {children}
      </Box>

      {/* Footer */}
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

