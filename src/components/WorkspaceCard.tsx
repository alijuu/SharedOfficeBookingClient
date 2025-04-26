import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

type WorkspaceCardProps = {
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  onViewDetails?: () => void;
};

const WorkspaceCard = ({
  name,
  address,
  description,
  imageUrl,
  onViewDetails,
}: WorkspaceCardProps) => {
  // const imageUrl2 =
  //   "https://plus.unsplash.com/premium_photo-1661963643994-71bd551d73c1?q=80&w=2655&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <Card
      sx={{
        width: 345,
        m: 2,
      }}
    >
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
        <Button size="small" variant="outlined" onClick={onViewDetails}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default WorkspaceCard;
