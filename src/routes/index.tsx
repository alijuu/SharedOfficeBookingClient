import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import OfficePhoto from "../assets/images/office.png";
import PlaceholderImage from "../assets/images/placeholder.png";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PaymentIcon from "@mui/icons-material/Payment";
import { BaseLayout } from "../components/Layout/BaseLayout.tsx";

export interface Feature {
  title: string;
  text: string;
}

const HeroWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.grey[100],
}));

const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(8, 0),
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
}));

// New styled components for the bottom stats + text section
const StatsSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(8, 2),
}));

const StatsGridTwoCols = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

const StatWithIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

function StatsComponent() {
  const stats = [
    {
      icon: <WorkspacePremiumIcon color="primary" fontSize="large" />,
      number: "2,245,341",
      label: "Bookings Made",
    },
    {
      icon: <PeopleIcon color="primary" fontSize="large" />,
      number: "46,328",
      label: "Happy Clients",
    },
    {
      icon: <MeetingRoomIcon color="primary" fontSize="large" />,
      number: "828,867",
      label: "Workspaces Listed",
    },
    {
      icon: <PaymentIcon color="primary" fontSize="large" />,
      number: "1,926,436",
      label: "Payments Processed",
    },
  ];

  return (
    <StatsGridTwoCols>
      {stats.map(({ icon, number, label }) => (
        <StatWithIcon key={label}>
          {icon}
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </StatWithIcon>
      ))}
    </StatsGridTwoCols>
  );
}

export function LandingPage() {
  const features: Feature[] = [
    {
      title: "Membership Organisations",
      text: "Fully automate membership renewals and office space payments.",
    },
    {
      title: "National Associations",
      text: "Easily manage multiple office bookings across regions.",
    },
    {
      title: "Clubs And Groups",
      text: "Reserve collaborative workspaces for team projects effortlessly.",
    },
  ];

  return (
    <BaseLayout>
      <Box sx={{ bgcolor: "#fff", width: "100%" }}>
        {/* Hero Section */}
        <HeroWrapper>
          <Container maxWidth="lg">
            <HeroSection>
              <Box sx={{ flex: 1, pr: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  Find and book your ideal office space
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: (theme) => theme.palette.grey[700], mb: 3 }}
                >
                  Instantly search, compare, and reserve offices tailored to
                  your needs.
                </Typography>
                <Button variant="contained" size="large" color="primary">
                  Get Started
                </Button>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>
                <img
                  src={OfficePhoto}
                  alt="Office illustration"
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </Box>
            </HeroSection>
          </Container>
        </HeroWrapper>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 15 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Manage your office bookings seamlessly
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 4, color: (theme) => theme.palette.grey[600] }}
          >
            Who is this solution for?
          </Typography>
          <Box
            component="section"
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            }}
          >
            {features.map((f) => (
              <FeatureCard key={f.title}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  color="primary.main"
                >
                  {f.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {f.text}
                </Typography>
              </FeatureCard>
            ))}
          </Box>
        </Container>

        {/* Additional Content Section */}
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 7,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <img
                src={PlaceholderImage}
                alt="Placeholder"
                style={{ width: "95%", borderRadius: 8 }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Transforming how teams book office spaces
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
                Our journey has been about more than just technology — it's
                about making workspace booking effortless, reliable, and
                tailored for growing teams.
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", mb: 1 }}
                ></Typography>
                Whether you need short-term flexibility or long-term stability,
                our platform adapts to your team’s unique needs.
              </Typography>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>

        {/* New Stats + Text Section */}
        <StatsSection>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
              }}
            >
              {/* Left text content */}
              <Box sx={{ flex: 2 }}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                >
                  Why choose us ?
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="primary.main"
                  gutterBottom
                ></Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                  We empower businesses and teams to find the perfect workspace
                  effortlessly.
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  ></Typography>
                  With seamless booking, transparent pricing, and dedicated
                  support, your ideal office is just a few clicks away.
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                  Join thousands of happy clients who have transformed their
                  workspace experience with us. Whether you need flexible
                  memberships or fully equipped offices, we’ve got you covered.
                </Typography>
              </Box>

              {/* Right stats with icons */}
              <Box sx={{ flex: 0 }}>
                <StatsComponent />
              </Box>
            </Box>
          </Container>
        </StatsSection>
      </Box>
    </BaseLayout>
  );
}
