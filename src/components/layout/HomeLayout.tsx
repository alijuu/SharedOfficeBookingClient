import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Menu,
  IconButton,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileMenu from "../profile/ProfileMenu.tsx";
export function HomeLayout({ children }: { children: React.ReactNode }) {
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" width="100%" flexDirection="column">
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "white", color: "black", width: "100%" }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}
        >
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Office Booking
          </Typography>
          {/* Search */}
          {/*<TextField*/}
          {/*  placeholder="Search for an office"*/}
          {/*  variant="outlined"*/}
          {/*  size="small"*/}
          {/*  sx={{ minWidth: 240, bgcolor: "#f1f3f5", borderRadius: 2 }}*/}
          {/*  InputProps={{*/}
          {/*    startAdornment: (*/}
          {/*      <InputAdornment position="start">*/}
          {/*        <SearchIcon />*/}
          {/*      </InputAdornment>*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*/>*/}

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {/*<Button*/}
            {/*  color="inherit"*/}
            {/*  onClick={async () => {*/}
            {/*    await navigate({ to: "/create" });*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Create Workspace*/}
            {/*</Button>*/}
            <ProfileMenu />
          </Box>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Contact</MenuItem>
              <MenuItem onClick={handleClose}>For Businesses</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        sx={{ my: 4, flex: 1, position: "relative", width: "100%" }}
        maxWidth={false}
      >
        {children}
      </Container>
    </Box>
  );
}
