
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";

export function AppointmentDetails() {
  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* 1) Date */}
      <Typography variant="subtitle2" color="textSecondary">
        Sun 16 July 2025 at 5:00pm
      </Typography>

      {/* 2) Confirmation pill */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "success.light",
          color: "success.main",
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          width: "fit-content",
        }}
      >
        <CheckCircleIcon fontSize="small" />
        <Typography variant="body2" fontWeight="bold">
          Confirmed
        </Typography>
      </Box>

      {/* 3) Image + title + action icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Square image */}
        <CardMedia
          component="img"
          src="https://via.placeholder.com/120"
          alt="Office"
          sx={{
            width: 120,
            height: 120,
            borderRadius: 1,
            objectFit: "cover",
          }}
        />

        {/* Title */}
        <Typography variant="body1" fontWeight="bold">
          Sarajevo – Aria Business
        </Typography>

        {/* Action icons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Directions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              p: 1,
              borderRadius: 1,
            }}
          >
            <IconButton size="small">
              <LocationOnIcon />
            </IconButton>
            <Typography variant="caption">Directions</Typography>
          </Box>

          {/* Cancel */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              p: 1,
              borderRadius: 1,
            }}
          >
            <IconButton size="small">
              <CancelIcon />
            </IconButton>
            <Typography variant="caption">Cancel</Typography>
          </Box>
        </Box>
      </Box>

      {/* 4) Detail box with divider */}
      <Card variant="outlined" sx={{ width: "fit-content", borderRadius: 1 }}>
        <Box sx={{ p: 1, display: "flex", alignItems: "center", gap: 4 }}>
          {/* Left: description + duration */}
          <Box>
            <Typography variant="body2">Office – Booking</Typography>
            <Typography variant="caption" color="textSecondary">
              1h
            </Typography>
          </Box>
          {/* Right: price */}
          <Typography variant="body1" fontWeight="bold" sx={{ ml: "auto" }}>
            BAM 100
          </Typography>
        </Box>
        <Divider />
        {/* Bottom half is empty for now */}
        <Box sx={{ height: 16 }} />
      </Card>
    </Box>
  );
}
