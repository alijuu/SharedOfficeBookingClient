import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

type WorkspaceCardProps = {
    id: string;
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    onViewDetails?: () => void;
};

const WorkspaceCard = ({ id, name, address, description, imageUrl, onViewDetails }: WorkspaceCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        if (onViewDetails) {
            onViewDetails();
        } else {
            navigate({ to: `workspace/${id}` });
        }
    };

    return (
        <Card sx={{ width: 345, m: 2 }}>
            <CardMedia component="img" height="160" image={imageUrl} alt={name} />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {address}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" onClick={handleViewDetails}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default WorkspaceCard;
