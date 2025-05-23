import { Box, Typography, Button, CircularProgress } from "@mui/material";

import { useNavigate } from "@tanstack/react-router";
import ImageCarousel from "./ImageCarousel/ImageCarousel.tsx";
import { useGetWorkspace } from "../http/workspace/data.ts";
import { Desk } from "./TableBooking/DeskBooking.tsx";
import { DeskLayoutShow } from "./DeskShow/DeskLayoutShow.tsx";
const thumbnails = [
  "https://media.npr.org/assets/img/2020/04/23/gettyimages-656544055-0453d55998c5d12904748541a9137cfc7fc75dc3.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20230619/pngtree-d-rendering-of-a-modern-style-office-room-with-white-and-image_3645011.jpg",
  "https://officebanao.com/wp-content/uploads/2024/02/3d-rendering-business-meeting-room.jpg",
];
const WorkspaceDetails = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetWorkspace({ id: id });
  const grid: Desk[][] = (data?.data.floorPlan ?? []).map((row, rowIdx) =>
    row.map((val, colIdx) => {
      if (val !== 0) {
        return {
          row: rowIdx,
          col: colIdx,
          id: val,
          status: "available",
        };
      } else {
        return null;
      }
    })
  );
  const workspace = data?.data;
  if (!workspace && !isLoading) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          Workspace not found.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          sx={{
            height: "100%",
          }}
        />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          padding: 4,
          maxWidth: "1200px",
          margin: "0 auto",
          // flexShrink: 0,
          // flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mt: 4, width: "100%", flex: 1 }}>
          <ImageCarousel imageUrls={thumbnails} />
        </Box>

        {/* Details Section - Full Width */}
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            padding: 2,
            borderRadius: 2,
            width: "100%",
            flex: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            {workspace && workspace.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {workspace && workspace.address}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            {workspace && workspace.description}
          </Typography>
          {/*<Typography variant="body2" color="text.secondary">*/}
          {/*  {`Rating: ${workspace.rating} ⭐ (${workspace.reviews} reviews)`}*/}
          {/*</Typography>*/}
          {/*<Typography variant="body2" sx={{ my: 1 }}>*/}
          {/*  Working Hours: {workspace.openingHours}*/}
          {/*</Typography>*/}
          {/*<Typography variant="body2">*/}
          {/*  Payment Methods: {workspace.paymentMethods.join(", ")}*/}
          {/*</Typography>*/}

          <Box sx={{ display: "flex", gap: 2, mt: 3, width: "100%" }}>
            <Button variant="outlined" fullWidth>
              Enquire
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                navigate({ to: "/workspace/$id/book", params: { id } });
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <DeskLayoutShow grid={grid} />
      </Box>
    </>
  );
};

export default WorkspaceDetails;
