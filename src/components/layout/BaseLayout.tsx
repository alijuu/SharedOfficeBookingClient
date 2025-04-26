import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Menu,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
// import { authProvider } from "../../authProvider.ts";
import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "@tanstack/react-router";
import MenuIcon from "@mui/icons-material/Menu";
import { authProvider } from "../../authProvider.ts";
import { useNavigate } from "@tanstack/react-router";
export function BaseLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = async () => {
    await authProvider.logout();
    navigate({ to: "/login" });
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f7fafa"
    >
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "white", color: "black" }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}
        >
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Office Booking
          </Typography>
          {/* Search */}
          <TextField
            placeholder="Search for an office"
            variant="outlined"
            size="small"
            sx={{ minWidth: 240, bgcolor: "#f1f3f5", borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Desktop Menu */}

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => {
                navigate({ to: "/create" });
              }}
            >
              Create Workspace
            </Button>
            <Button color="inherit" onClick={logOut}>
              Log out
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Contact</MenuItem>
              <MenuItem onClick={handleClose}>For Businesses</MenuItem>
              <MenuItem onClick={handleClose}>Login</MenuItem>
              <MenuItem onClick={handleClose}>Sign Up</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ my: 4, flex: 1 }}>{children}</Container>

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
