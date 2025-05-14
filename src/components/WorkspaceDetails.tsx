import { Box, Typography, Button } from '@mui/material';

import { useParams } from '@tanstack/react-router';
import ImageCarousel from "./ImageCarousel/ImageCarousel.tsx";

const workspaces = [
    {
        id: "123",
        name: "Sarajevo - Building Name",
        address: "123 Main St",
        description: "Modern workspace in the heart of the city.",
        images: ["/assets/image1.webp", "/assets/image2.webp", "/assets/image3.webp"],
        rating: 5.0,
        reviews: 196,
        openingHours: "10:00 am - 07:30 pm",
        paymentMethods: ["On site"],
    },
];

const thumbnails = [
    "https://media.npr.org/assets/img/2020/04/23/gettyimages-656544055-0453d55998c5d12904748541a9137cfc7fc75dc3.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20230619/pngtree-d-rendering-of-a-modern-style-office-room-with-white-and-image_3645011.jpg",
    "https://officebanao.com/wp-content/uploads/2024/02/3d-rendering-business-meeting-room.jpg"
]

const WorkspaceDetails = () => {
    const params = useParams({ from: "/_auth/workspace/$id/" });
    const workspaceId = params?.id;

    const workspace = workspaces.find((ws) => ws.id === workspaceId);

    if (!workspace) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6" color="error">
                    Workspace not found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto' }}>
            {/* Image Gallery - Three Images Layout */}
            <Box>
                <ImageCarousel imageUrls={thumbnails} />
            </Box>

            {/* Details Section - Full Width */}
            <Box sx={{ backgroundColor: '#F5F5F5', padding: 2, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {workspace.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {workspace.address}
                </Typography>
                <Typography variant="body1" sx={{ my: 2 }}>
                    {workspace.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Rating: ${workspace.rating} ⭐ (${workspace.reviews} reviews)`}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                    Working Hours: {workspace.openingHours}
                </Typography>
                <Typography variant="body2">
                    Payment Methods: {workspace.paymentMethods.join(', ')}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button variant="outlined" fullWidth>
                        Enquire
                    </Button>
                    <Button variant="contained" fullWidth>
                        Book Now
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default WorkspaceDetails;