import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate({ to: "/home" })}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
}
