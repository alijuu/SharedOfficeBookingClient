
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from "@tanstack/react-router";




export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <div>
            {/* Navbar */}
            <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            bgcolor="#f7fafa"
            >
            <AppBar
                position="static"
                elevation={0}
                sx={{ bgcolor: "white", color: "black", width: "100%" }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        gap: 2,
                        flexWrap: "wrap",
                        px: { xs: 2, md: 4 },
                        py: 1.5,
                    }}
                >
                    {/* Logo / Title */}
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={() => navigate({ to: "/home" })}
                        sx={{
                            fontWeight: 600,
                            transition: "transform 0.2s ease",
                            "&:hover": {
                                cursor: "pointer",
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        Office Booking
                    </Typography>

                    {/* Optional: Nav Links or Actions */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 3,
                        }}
                    >

                        <Typography
                            variant="body1"
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate({ to: "/faq" });
                            }}
                        >
                            FAQ
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                cursor: 'pointer',
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                textAlign: 'center',
                                display: 'inline-block',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                            onClick={() => {
                                navigate({ to: '/login' });
                            }}
                        >
                            Login
                        </Typography>


                        <Typography
                            variant="body1"
                            sx={{
                                cursor: 'pointer',
                                bgcolor: 'success.main',
                                color: 'primary.contrastText',
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                textAlign: 'center',
                                display: 'inline-block',
                                '&:hover': {
                                    bgcolor: 'success.dark',
                                },
                            }}
                            onClick={() => {
                                navigate({ to: '/register' });
                            }}
                        >
                            GET STARTED
                        </Typography>

                    </Box>
                </Toolbar>
            </AppBar>


            {/* Main Content */}
            <Box component="main">
                {children}
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 2,
                    textAlign: "center",
                    bgcolor: "grey.200",
                    mt: "auto",
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Shared Office Booking. All rights
                    reserved.
                </Typography>
            </Box>
            </Box>
        </div>
    );
}


