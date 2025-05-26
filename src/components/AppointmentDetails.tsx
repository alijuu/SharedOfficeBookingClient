import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";

export interface Booking {
  id: string;
  date: string;
  location: string;
  thumbnailUrl: string;
  durationHrs: number;
  price: number;
  currency: string;
  status: "confirmed" | "cancelled";
}

interface AppointmentDetailsProps {
  booking: Booking;
  onCancel: (id: string) => Promise<void>;
}

export function AppointmentDetails({ booking, onCancel }: AppointmentDetailsProps) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const isConfirmed = booking.status === "confirmed";

  const handleClickCancel = () => setConfirmOpen(true);
  const handleClose = () => setConfirmOpen(false);
  const handleConfirm = async () => {
    setConfirmOpen(false);
    await onCancel(booking.id);
  };

  return (
    <>
      <Card
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          p: 4,
          width: "100%",
          maxWidth: 600,
          boxShadow: 1,
        }}
      >
        {/* 1) Date */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          {booking.date}
        </Typography>

        {/* 2) Status pill */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            bgcolor: isConfirmed ? "success.main" : "error.main",
            color: "#fff",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            mb: 3,
          }}
        >
          {isConfirmed ? (
            <CheckCircleIcon fontSize="small" color="inherit" />
          ) : (
            <CancelIcon fontSize="small" color="inherit" />
          )}
          <Typography variant="body2" fontWeight="bold" color="inherit">
            {isConfirmed ? "Confirmed" : "Cancelled"}
          </Typography>
        </Box>

        {/* 3) Image + office name + action icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 4 }}>
          <CardMedia
            component="img"
            src={booking.thumbnailUrl}
            alt="Office thumbnail"
            sx={{ width: 120, height: 120, borderRadius: 1, objectFit: "cover" }}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            {booking.location}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
            <IconButton size="small" sx={{ bgcolor: "#f5f5f5" }}>
              <LocationOnIcon />
            </IconButton>
            <IconButton size="small" sx={{ bgcolor: "#f5f5f5" }} onClick={handleClickCancel}>
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>

        {/* 4) Pricing details */}
        <Card variant="outlined" sx={{ borderRadius: 1, mb: 3 }}>
          <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Office – Booking
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {booking.durationHrs}h
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold" sx={{ ml: "auto" }}>
              {booking.currency} {booking.price}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
            <Typography variant="body2" fontWeight="bold">
              Total
            </Typography>
            <Typography variant="body1" fontWeight="bold" sx={{ ml: "auto" }}>
              {booking.currency} {booking.price}
            </Typography>
          </Box>
        </Card>

        {/* 5) Cancellation policy */}
        <Box>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Cancellation policy
          </Typography>
          <Typography variant="body2">
            Cancel for free anytime in advance, otherwise you will be charged{' '}
            <Box component="span" fontWeight="bold">
              100%
            </Box>{' '}
            of the service price for not showing up.
          </Typography>
        </Box>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to cancel this booking?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button color="error" onClick={handleConfirm}>
            Yes, cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
