// ProfileMenu.tsx
import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useLogout } from "../../http/auth/auth.ts";
import { useNavigate } from "@tanstack/react-router";

const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={async () => await navigate({ to: "/user" })}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={async () => await navigate({ to: "/user/settings" })}
        >
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
