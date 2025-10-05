import React from "react";
import { Box, Grid, Typography, Link, Divider, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000",
        color: "#fff",
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 8 },
        px: { xs: 2.5, sm: 3, md: 4 },
      }}
    >
      {/* Centered, responsive container */}
      <Box sx={{ maxWidth: { xs: 1200 }, mx: "auto" }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* Left: logo + tagline */}
          <Grid item xs={12} sm={6} md={5}>
            <Box
              component="img"
              src="/rekotaxlogoNew.svg"
              alt="Rekotax logo"
              sx={{
                height: { xs: 36, md: 40 },
                mb: { xs: 1.5, md: 2 },
              }}
            />
            <Typography
              sx={{
                opacity: 0.9,
                mt: 1,
                fontSize: { xs: 13.5, sm: 14, md: 16 },
                lineHeight: 1.7,
              }}
            >
              Expertise in compliance, taxation, and business services.
            </Typography>
          </Grid>

          {/* Quick Links (auto-wrap into 2–3 columns on larger screens) */}
          <Grid item xs={12} sm={6} md={7}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: 0.6,
                mb: { xs: 1.5, md: 2 },
                fontSize: { xs: 14, md: 16 },
              }}
            >
              QUICK LINKS
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 1, sm: 1.25 },
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0,1fr))",
                  lg: "repeat(3, minmax(0,1fr))",
                },
              }}
            >
              {[
                { href: "/company-registration", label: "Company Registration" },
                { href: "/llp-registration", label: "LLP Registration" },
                { href: "/gst-registration", label: "GST Registration" },
                { href: "/msme-registration", label: "MSME Registration" },
                { href: "/trademark", label: "Trademark" },
                { href: "/startup-india", label: "Start-up India" },
                { href: "/compliances", label: "Compliances" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  underline="hover"
                  color="inherit"
                  sx={{
                    fontSize: { xs: 13.5, sm: 14, md: 15 },
                    opacity: 0.95,
                    "&:hover": { opacity: 1 },
                    lineHeight: 1.9,
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: { xs: 3.5, md: 5 } }} />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 0 }}
          alignItems={{ xs: "center", md: "center" }}
          justifyContent="space-between"
        >
          <Typography sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.8, textAlign: { xs: "center", md: "left" } }}>
            © 2025 - VAMSAG CONSULTING PRIVATE LIMITED. ALL RIGHTS RESERVED
          </Typography>

          <Stack direction="row" spacing={{ xs: 2, sm: 3, md: 4 }} flexWrap="wrap" justifyContent="center">
            <Link href="/terms-and-conditions" underline="hover" color="inherit" sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.95 }}>
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" underline="hover" color="inherit" sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.95 }}>
              Privacy Policy
            </Link>
            <Link href="/refund-policy" underline="hover" color="inherit" sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.95 }}>
              Refund Policy
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
