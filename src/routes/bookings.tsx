import React, { useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentDetails, Booking } from "../components/AppointmentDetails";
import { HomeLayout } from "../components/layout/HomeLayout";

// Mock booking data
const initialBookings: Booking[] = [
  {
    id: "1",
    date: "Sun 16 July 2025 at 5:00pm",
    location: "Sarajevo – Aria Business",
    thumbnailUrl: "https://cpre.ba/storage/2022/12/aria-mall-projekt-12.jpg",
    durationHrs: 1,
    price: 100,
    currency: "BAM",
    status: "confirmed",
  },
  {
    id: "2",
    date: "Mon 17 July 2025 at 3:30pm",
    location: "Mostar – River Office",
    thumbnailUrl: "https://tse1.mm.bing.net/th?id=OIP.6NnVQd_3T_QroK18y3nvxwHaFj&pid=Api&P=0&h=220",
    durationHrs: 2,
    price: 150,
    currency: "BAM",
    status: "confirmed",
  },
  {
    id: "3",
    date: "Tue 18 July 2025 at 1:00pm",
    location: "Tuzla – Tech Park",
    thumbnailUrl: "https://i.pinimg.com/originals/89/9a/a2/899aa2eca086d649d166f6b44745d17a.jpg",
    durationHrs: 1,
    price: 80,
    currency: "BAM",
    status: "cancelled",
  },
];

function BookingsPage() {
  // Manage all bookings
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  // Default to first booking
  const [selectedBooking, setSelectedBooking] = useState<Booking>(initialBookings[0]);

  // Separate lists by status
  const upcoming = bookings.filter((b) => b.status === "confirmed");
  const cancelledList = bookings.filter((b) => b.status === "cancelled");

  const handleCancel = async (id: string) => {
    // Inform backend to delete or mark cancelled
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    // Update local status instead of removing
    const updated: Booking[] = bookings.map((b) =>
      b.id === id
        ? { ...b, status: "cancelled" as Booking["status"] }
        : b
    );
    setBookings(updated);
    // If cancelled one was selected, update selectedBooking status
    if (selectedBooking.id === id) {
      setSelectedBooking((prev) => ({ ...prev, status: "cancelled" as Booking["status"] }));
    }
  };

  return (
    <HomeLayout>
      <Box
        sx={{
          bgcolor: "#f7f7f7",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 4, width: "100%", maxWidth: 1200 }}>
          {/* Left column: Upcoming & Cancelled lists */}
          <Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Upcoming appointments
              </Typography>
              {upcoming.map((b) => (
                <Card
                  key={b.id}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onClick={() => setSelectedBooking(b)}
                >
                  <CardMedia
                    component="img"
                    src={b.thumbnailUrl}
                    alt="Office thumbnail"
                    sx={{ width: 100, height: 80, borderRadius: 1, objectFit: "cover" }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="caption" color="textSecondary" noWrap sx={{ fontSize: "0.75rem" }}>
                      {b.date}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {b.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      Office booking
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>

            <Box>
              <Typography variant="h5" fontWeight="bold">
                Cancelled appointments
              </Typography>
              {cancelledList.map((b) => (
                <Card
                  key={b.id}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onClick={() => setSelectedBooking(b)}
                >
                  <CardMedia
                    component="img"
                    src={b.thumbnailUrl}
                    alt="Office thumbnail"
                    sx={{ width: 100, height: 80, borderRadius: 1, objectFit: "cover" }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="caption" color="textSecondary" noWrap sx={{ fontSize: "0.75rem" }}>
                      {b.date}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {b.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      Office booking
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Center column: Details for selected booking */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <AppointmentDetails booking={selectedBooking} onCancel={handleCancel} />
          </Box>
        </Box>
      </Box>
    </HomeLayout>
  );
}

export const Route = createFileRoute("/bookings")({
  component: BookingsPage,
});
