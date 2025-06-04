import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentDetails, Booking } from "../components/AppointmentDetails";
import { BaseLayout } from "../components/Layout/BaseLayout";
import { useGetUserBookings } from "../http/workspace/data";

function BookingsPage() {
  // Fetch bookings from the API
  const { data: apiBookings, isLoading, error } = useGetUserBookings();

  // Local state for all bookings (with “currency” filled in)
  const [bookings, setBookings] = useState<Booking[]>([]);
  // Currently selected booking (or null until we have data)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // When the API response arrives, populate our local state
  useEffect(() => {
    if (apiBookings) {
      // The API’s Booking objects don’t include “currency”, so we add a default here.
      const withCurrency: Booking[] = apiBookings.map((b) => ({
        ...b,
        currency: "BAM",
        status: b.status as "past" | "upcoming",
      }));
      setBookings(withCurrency);

      // If there’s at least one booking, select the first one by default
      if (withCurrency.length > 0) {
        setSelectedBooking(withCurrency[0]);
      }
    }
  }, [apiBookings]);

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const cancelledList = bookings.filter((b) => b.status === "past");

  const handleCancel = async (id: string) => {
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });

    const updatedBookings: Booking[] = bookings.map(
      (b): Booking =>
        b.id === id
          ? { ...b, status: "past" /* infers as literal "past" */ }
          : ({ ...b } as Booking)
    );
    setBookings(updatedBookings);

    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: "past" } : null));
    }
  };

  // While loading, show a spinner
  if (isLoading) {
    return (
      <BaseLayout>
        <Box
          sx={{
            bgcolor: "#f7f7f7",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <CircularProgress />
        </Box>
      </BaseLayout>
    );
  }

  // On error, show a simple message
  if (error) {
    return (
      <BaseLayout>
        <Box
          sx={{
            bgcolor: "#f7f7f7",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Typography color="error">Error loading bookings.</Typography>
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
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
          {/* Left column: Upcoming & “Cancelled” (i.e. past) lists */}
          <Box
            sx={{
              width: 320,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
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
                    sx={{
                      width: 100,
                      height: 80,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      noWrap
                      sx={{ fontSize: "0.75rem" }}
                    >
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
                    sx={{
                      width: 100,
                      height: 80,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      noWrap
                      sx={{ fontSize: "0.75rem" }}
                    >
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
            {selectedBooking ? (
              <AppointmentDetails
                booking={selectedBooking}
                onCancel={handleCancel}
              />
            ) : (
              <Typography>Select a booking to see details</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
}

export const Route = createFileRoute("/bookings")({
  component: BookingsPage,
});
