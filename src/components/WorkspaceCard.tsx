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
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  id: string;
  admin?: boolean;
};

const WorkspaceCard = ({
  name,
  address,
  description,
  imageUrl,
  id,
  admin,
}: WorkspaceCardProps) => {
  const navigate = useNavigate();
  const onViewDetails = () => {
    if (admin) {
      navigate({
        to: "/admin/workspace/$id",
        params: { id: id },
      });
    } else {
      navigate({
        to: "/workspace/$id",
        params: { id: id },
      });
    }
  };

  return (
    <Card
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 360,
      }}
    >
      <CardMedia component="img" height="160" image={imageUrl} alt={name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: 0,
            padding: 0,
          }}
        >
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
