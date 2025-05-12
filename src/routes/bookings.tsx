
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createFileRoute } from "@tanstack/react-router";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import { HomeLayout } from "../components/layout/HomeLayout";

export const Route = createFileRoute("/bookings")({
  component: AppointmentDetails,
});
export function AppointmentDetails() {
  return (
    <HomeLayout>
      {/* MAIN FLEX ROW + LIGHT GREY BG */}
      <Box
        sx={{


 position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,


          display: "flex",
          width:"100%",
          gap: 4,
          p: 4,
          bgcolor: "#f7f7f7",      // very light gray page background
          minHeight: "100vh",
          justifyContent: "center",
          
        }}
      >
        {/** LEFT BOX: Upcoming appointments **/}
        <Box
          sx={{
            bgcolor: "#fff",       // white background
            p: 2,
            borderRadius: 2,
            width: "fit-content",
            height: "fit-content", 
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Upcoming appointments
          </Typography>

          <Card
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              borderRadius: 2,
              bgcolor: "#fff",     // ensure white
            }}
          >
            <CardMedia
              component="img"
              src="https://cdn.vox-cdn.com/thumbor/A5au9tkiypw2V3qHcoGgfkJPsCw=/0x0:6016x4000/1200x0/filters:focal(0x0:6016x4000):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13600627/shutterstock_1144300976.jpg"
              alt="Office thumbnail"
              sx={{ width: 100, height: 80, borderRadius: 1, objectFit: "cover" }}
            />
            <Box sx={{ ml: 2,
              height: "fit-content", 
             }}>
          
              <Typography variant="subtitle2"color="textSecondary">
                Sun 16 July 2025 at 5:00pm
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Sarajevo – Aria Business
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Office booking
              </Typography>
            </Box>
          </Card>
        </Box>

        {/** RIGHT BOX: Details **/}
        <Box
          sx={{

            bgcolor: "#fff",       // white background
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "fit-content",
            height: "fit-content", 
          }}
        >
          {/* Date */}
          <Typography variant="subtitle1" color="black" fontWeight="bold" fontSize="30px">
            Sun 16 July 2025 at 5:00pm
          </Typography>

          {/* Confirmed pill */}
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
            <CheckCircleIcon  fontSize="small" />
            <Typography color="white" variant="body2" fontWeight="bold">
              Confirmed
            </Typography>
          </Box>

          {/* Image + Title + Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2,   }}>
            <CardMedia
              component="img"
              src="https://cdn.vox-cdn.com/thumbor/A5au9tkiypw2V3qHcoGgfkJPsCw=/0x0:6016x4000/1200x0/filters:focal(0x0:6016x4000):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13600627/shutterstock_1144300976.jpg"
              alt="Office"
              sx={{ width: 120, height: 120, borderRadius: 1, objectFit: "cover" }}
            />

            <Typography variant="body1" fontWeight="bold">
              Sarajevo – Aria Business
            </Typography>

            <Box sx={{ display: "flex", gap: 1,  ml: "auto",}}>
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

          {/* Full‐width detail box */}
          <Card
            variant="outlined"
            sx={{
              width: "100%",      // now spans the full width of this right box
              borderRadius: 1,
            }}
          >
            <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
              <Box>
                <Typography fontWeight="bold" variant="body2">Office – Booking</Typography>
                <Typography variant="caption" color="textSecondary">
                  1h
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight="bold" sx={{ ml: "auto" }}>
                BAM 100
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ px: 1, py: 0.5, display: "flex", alignItems: "center" }}>
    <Typography variant="caption" color="textSecondary">
      Taxes
    </Typography>
    <Typography variant="caption" color="textSecondary" sx={{ ml: "auto" }}>
      BAM 0
    </Typography>
  </Box>

  {/* Total row */}
  <Box sx={{ p: 3,  display: "flex", alignItems: "center" }}>
    <Typography variant="body2" fontWeight="bold">
      Total
    </Typography>
    <Typography
      variant="body1"
      fontWeight="bold"
      sx={{ ml: "auto" }}
    >
      BAM 100
    </Typography>
  </Box>
          </Card>


<Box sx={{ mt: 2, px: 1 }}>
  <Typography variant="body2" fontWeight="bold" gutterBottom>
    Cancellation policy
  </Typography>
  <Typography variant="body2">
    Cancel for free anytime in advance, otherwise you will be charged{" "}
    <Box component="span" fontWeight="bold">
      100%
    </Box>{" "}
    of the service price for not showing up.
  </Typography>
</Box>



        </Box>
      </Box>
    </HomeLayout>
  );
}
