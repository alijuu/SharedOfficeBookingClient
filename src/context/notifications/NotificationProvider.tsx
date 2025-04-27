import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { NotificationContext } from "./NotificationContext";

export type NotificationType = "success" | "error" | "info" | "warning";

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openState, setOpenState] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const open = (msg: string, severity: NotificationType = "success") => {
    setMessage(msg);
    setType(severity);
    setOpenState(true);
  };

  const handleClose = () => {
    setOpenState(false);
  };

  return (
    <NotificationProvider.Context value={{ open }}>
      {children}
      <Snackbar
        open={openState}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </NotificationProvider.Context>
  );
};

NotificationProvider.Context = NotificationContext;
