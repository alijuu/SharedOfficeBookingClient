import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';

type WorkspaceCardProps = {
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    onViewDetails: () => void;
};

const WorkspaceCard = ({ name, address, description, imageUrl, onViewDetails }: WorkspaceCardProps) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                height="160"
                image={imageUrl}
                alt={name}
            />
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
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {description}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" onClick={onViewDetails}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default WorkspaceCard;
