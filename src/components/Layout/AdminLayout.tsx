import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProfileMenu from "../profile/ProfileMenu.tsx";
import { useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleCollapseToggle = () => setCollapsed((prev) => !prev);

  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { text: "Desk", icon: <DesktopWindowsIcon />, to: "/admin/desk" },
    { text: "User", icon: <PeopleIcon />, to: "/admin/users" },
    { text: "Workspace", icon: <BusinessIcon />, to: "/admin/workspace" },
  ];

  const drawer = (
    <div>
      <Toolbar
        sx={{
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 1 : 2,
        }}
      >
        {!collapsed && <Typography variant="h6">Admin Panel</Typography>}
        <IconButton onClick={handleCollapseToggle}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map(({ text, icon, to }) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={to}
              selected={currentPath === to}
              sx={{
                minHeight: 48,
                justifyContent: collapsed ? "center" : "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? "auto" : 2,
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: `calc(100% - ${collapsed ? collapsedDrawerWidth : drawerWidth}px)`,
          },
          ml: {
            sm: `${collapsed ? collapsedDrawerWidth : drawerWidth}px`,
          },
        }}
      >
        <Toolbar sx={{ marginLeft: "auto" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <ProfileMenu />
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Box
        component="nav"
        sx={{
          width: { sm: collapsed ? collapsedDrawerWidth : drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="sidebar folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent drawer for desktop with collapsible behavior */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedDrawerWidth : drawerWidth,
              transition: "width 0.3s",
              overflowX: "hidden",
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          p: 3,
          height: "100vh",
          width: {
            sm: `calc(100% - ${collapsed ? collapsedDrawerWidth : drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
