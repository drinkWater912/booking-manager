"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div
      className={geist.className}
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Restaurant Booking
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              href="/reservation"
              sx={{
                color:
                  pathname === "/reservation"
                    ? "#fff"
                    : "rgba(255,255,255,0.7)",
                "&:hover": { color: "#fff" },
              }}
            >
              Make Reservation
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/admin/reservations"
              sx={{
                color:
                  pathname === "/admin/reservations"
                    ? "#fff"
                    : "rgba(255,255,255,0.7)",
                "&:hover": { color: "#fff" },
              }}
            >
              Manage Bookings
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/admin/calendar"
              sx={{
                color:
                  pathname === "/admin/calendar"
                    ? "#fff"
                    : "rgba(255,255,255,0.7)",
                "&:hover": { color: "#fff" },
              }}
            >
              Calendar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 1,
          p: 3,
          boxShadow: 1,
        }}
      >
        {children}
      </Container>
    </div>
  );
}
