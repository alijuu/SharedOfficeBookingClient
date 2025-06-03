
import {

    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Stack,
    Divider,
} from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import ChairIcon from "@mui/icons-material/Chair";
import LaptopIcon from "@mui/icons-material/Laptop";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PowerIcon from "@mui/icons-material/Power";
import WifiIcon from "@mui/icons-material/Wifi";
import LanIcon from "@mui/icons-material/Lan";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const DeskDetails = () => {
    const desk = {
        name: "Desk 12",
        monitor: true,
        numMonitors: 2,
        chair: "Ergonomic",
        dockingStation: true,
        keyboardMouse: true,
        powerOutlets: 2,
        wifi: true,
        ethernet: false,
        price: 10,
        available: true,
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                mx: "auto",
                my: 4,
                borderRadius: 4,
                boxShadow: 6,
                textAlign: "center",
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image="/assets/desk.webp"
                alt="Desk image"
                sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            />
            <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {desk.name}
                </Typography>

                <Stack spacing={1} alignItems="center" divider={<Divider flexItem />}>
                    <Typography>
                        <MonitorIcon sx={{ mr: 1 }} />
                        Monitor: {desk.monitor ? `Yes (${desk.numMonitors})` : "No"}
                    </Typography>
                    <Typography>
                        <ChairIcon sx={{ mr: 1 }} />
                        Chair: {desk.chair}
                    </Typography>
                    <Typography>
                        <LaptopIcon sx={{ mr: 1 }} />
                        Docking Station: {desk.dockingStation ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        <KeyboardIcon sx={{ mr: 1 }} />
                        Keyboard & Mouse: {desk.keyboardMouse ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        <PowerIcon sx={{ mr: 1 }} />
                        Power Outlets: {desk.powerOutlets}
                    </Typography>
                    <Typography>
                        <WifiIcon sx={{ mr: 1 }} />
                        Wi-Fi: {desk.wifi ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        <LanIcon sx={{ mr: 1 }} />
                        Ethernet: {desk.ethernet ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        <AttachMoneyIcon sx={{ mr: 1 }} />
                        Price: {desk.price} KM/day
                    </Typography>
                </Stack>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                        mt: 4,
                        bgcolor: "#1976d2",
                        fontWeight: "bold",
                        py: 1.5,
                        fontSize: "1rem",
                        "&:hover": {
                            bgcolor: "#1565c0",
                        },
                    }}
                    disabled={!desk.available}
                >
                    {desk.available
                        ? "Book for Full Day (8:00–16:00)"
                        : "Not Available"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default DeskDetails;
