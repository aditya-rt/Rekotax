import React from "react";
import { Box, Grid, Typography, Link, Divider, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000",          // black background
        color: "#fff",
        pt: { xs: 6, md: 8 },
        pb: { xs: 3, md: 4 },
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid container spacing={6}>
        {/* Left logo and tagline */}
        <Grid item xs={12} md={5}>
          {/* if using Next.js Image */}
          {/* <Image src="/rekotax-logo.svg" alt="Rekotax logo" width={180} height={40}/> */}
          <Box
            component="img"
            src="/rekotaxlogoNew.svg"   // replace with your actual SVG path
            alt="Rekotax logo"
            sx={{ height: 40, mb: 2 }}
          />
          <Typography
            variant="body1"
            sx={{ opacity: 0.9, mt: 1, fontSize: { xs: 14, md: 16 } }}
          >
            Expertise in compliance, taxation, and business services.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}
          >
            QUICK LINKS
          </Typography>
          <Stack spacing={1.2}>
            <Link href="/company-registration" underline="hover" color="inherit">
              Company Registration
            </Link>
            <Link href="/llp-registration" underline="hover" color="inherit">
              LLP Registration
            </Link>
            <Link href="/gst-registration" underline="hover" color="inherit">
              GST Registration
            </Link>
            <Link href="/msme-registration" underline="hover" color="inherit">
              MSME Registration
            </Link>
            <Link href="/trademark" underline="hover" color="inherit">
              Trademark
            </Link>
            <Link href="/startup-india" underline="hover" color="inherit">
              Start-up India
            </Link>
            <Link href="/compliances" underline="hover" color="inherit">
              Compliances
            </Link>
          </Stack>
        </Grid>
      </Grid>

      {/* Bottom line */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 4 }} />

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ textAlign: { xs: "center", md: "left" } }}
      >
        <Grid item xs={12} md="auto">
          <Typography sx={{ fontSize: 14, opacity: 0.8 }}>
            © 2025 - VAMSAG CONSULTING PRIVATE LIMITED. ALL RIGHTS RESERVED
          </Typography>
        </Grid>

        <Grid item xs={12} md="auto">
          <Stack
            direction="row"
            spacing={4}
            justifyContent={{ xs: "center", md: "flex-end" }}
            sx={{ mt: { xs: 2, md: 0 } }}
          >
            <Link href="/terms-and-conditions" underline="hover" color="inherit">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" underline="hover" color="inherit">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" underline="hover" color="inherit">
              Refund Policy
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
