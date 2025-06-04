import React, { useContext, useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { useLogout } from "../../http/auth/auth.ts";
import { AuthContext } from "../../context/auth/AuthContext.ts";
import { useNavigate } from "@tanstack/react-router";

const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = useContext(AuthContext);
  const { user } = auth as AuthContext;
  const open = Boolean(anchorEl);
  const { logout } = useLogout();
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleMenuClick}>
        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <Typography
        variant="body1"
        sx={{ ml: 1 }}
        onClick={() => {
          navigate({ to: "/home" });
        }}
      >
        {user?.username}
      </Typography>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user?.username === "Ali123" && (
          <MenuItem
            onClick={() => {
              navigate({ to: "/admin" });
            }}
          >
            ADMIN
          </MenuItem>
        )}
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
