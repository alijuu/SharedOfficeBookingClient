import { Box, Typography, CircularProgress } from "@mui/material";

import ImageCarousel from "./ImageCarousel/ImageCarousel.tsx";
import { useGetWorkspace } from "../http/workspace/data.ts";
const thumbnails = [
  "https://media.npr.org/assets/img/2020/04/23/gettyimages-656544055-0453d55998c5d12904748541a9137cfc7fc75dc3.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20230619/pngtree-d-rendering-of-a-modern-style-office-room-with-white-and-image_3645011.jpg",
  "https://officebanao.com/wp-content/uploads/2024/02/3d-rendering-business-meeting-room.jpg",
];
const WorkspaceDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetWorkspace({ id: id });
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
        display="flex"
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        zIndex={1999}
      >
        <CircularProgress />
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
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mt: 4, width: "100%", flex: 1 }}>
          <ImageCarousel imageUrls={thumbnails} />
        </Box>
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
          {workspace?.email && (
            <Typography variant="body2" color="text.secondary">
              Email: {workspace.email}
            </Typography>
          )}
          {workspace?.phone && (
            <Typography variant="body2" color="text.secondary">
              Phone: {workspace.phone}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default WorkspaceDetails;
