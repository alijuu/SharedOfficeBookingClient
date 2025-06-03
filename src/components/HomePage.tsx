
import {Typography, Button, Container, Box, Card, CardContent } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import { useNavigate } from "@tanstack/react-router";


export default function HomePage() {
    const features = [
        { title: 'Easy Reservations', desc: 'Quickly reserve the workspace you need with just a few clicks.', emoji: '🖱️' },
        { title: 'Flexible Spaces', desc: 'Book desks, rooms, or equipment tailored to your team\'s needs.', emoji: '🏢' },
        { title: 'Maximize Productivity', desc: 'Optimize your office layout and boost team efficiency.', emoji: '⚡' },
        { title: 'Real-Time Availability', desc: 'See live desk and room availability to avoid conflicts.', emoji: '⏱️' },

    ];

    const navigate = useNavigate();
    return (
        <div>

            <Box sx={{ bgcolor: 'grey.100', py: 10 }}>
                <Container maxWidth="lg">
                    <Grid2 container spacing={4} alignItems="center">
                        {/* Left side: text */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography variant="h3" gutterBottom sx={{ color: '#2979ff' }}>
                                Shared Office Booking
                            </Typography>
                            <Typography variant="h2" gutterBottom>
                                 Made Simple
                            </Typography>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                Book desks, meeting rooms, and coworking spaces effortlessly with our intuitive platform.
                            </Typography>
                        </Grid2>

                        {/* Right side: image */}
                        <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: 'flex',  textAlign: 'center' }}>
                            <Box
                                component="img"
                                src="/assets/demo.webp"
                                alt="Desk booking preview"
                                sx={{

                                    maxWidth: '450px',
                                    height: 'auto',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            />
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Grid2 container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid2 key={index} size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', p: 3, borderRadius: 3, boxShadow: 3, textAlign: 'center' }}>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        {feature.emoji}
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {feature.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>



            {/* Final CTA Section */}
            <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 8, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                        Ready to get started?
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Join hundreds of teams improving their office workflows today.
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={() => {
                            navigate({ to: '/register' });
                        }}
                    >
                        Get Started Now
                    </Button>

                </Container>
            </Box>


        </div>
    );
}