import React, { useRef, useState } from "react";
import GlassBarsSection from "./GlassBarsSection";
import FloatingHero from "./FloatingHero";
import AboutAndServices from "./AboutAndServices";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import { Box, Grid, Typography, Button, Fab } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ClientTestimonials from "./ClientTestimonials";
import PrincipleAndApproach from "./PrincipleAndApproach";
import {
  Gavel,
  Group,
  WorkspacePremium,
  Security,
  AccountBalance,
  AccessTime,
  Handshake,
  HeadsetMic,
  CurrencyRupee,
} from "@mui/icons-material";
import WhyRekotax from "./WhyRekotax";
import Insights from "./Insights";

export default function Home() {
  const [activeSection] = useState("");
  const heroRef = useRef(null);
  const glassRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <>


      <Box
        sx={{
          // keep the gradient background
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          bgcolor: "transparent",
          backgroundImage: `
          radial-gradient(1000px 600px at 76% 60%, rgba(77,147,255,0.20), rgba(77,147,255,0) 60%),
          radial-gradient(800px 420px at 20% 10%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%),
          linear-gradient(180deg, #0B2A5A 0%, #0A244B 100%)
        `,
          backgroundBlendMode: "screen, normal, normal",
          backgroundRepeat: "no-repeat",

          // page gutters & top offset for fixed AppBar
          maxWidth: "100%",       // use full width
          mx: "auto",
          px: { xs: 1, sm: 2, md: 3 }, // smaller gutters on all screens

          pt: { xs: "56px", md: "64px" }, // remove the extra +20/+32
          mt: { xs: -2, md: -10 },  // navbar height + breathing room
          // pb: { xs: 6, md: 10 },
        }}
      >
        {/* Floating section banner (unchanged) */}
        <Box
          sx={{
            position: "fixed",
            top: { xs: 56, md: 64 },                    // always below the AppBar
            left: 0,
            width: "100%",
            bgcolor: "#228B22",
            color: "#fff",
            px: { xs: 2, md: 6 },
            py: 1.5,
            fontWeight: 700,
            fontSize: 20,
            zIndex: (theme) => theme.zIndex.appBar - 1, // stay behind the Navbar
            textAlign: "left",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: activeSection ? "translateY(0)" : "translateY(-100%)",
            opacity: activeSection ? 1 : 0,
          }}
        >
          {activeSection}
        </Box>


        <Grid
          container
          alignItems="center"
          ref={heroRef}
          justifyContent={{ xs: "center", md: "space-between" }}
          columnSpacing={{ xs: 2, sm: 4, md: 8 }}
          rowSpacing={{ xs: 4, sm: 5, md: 0 }}
          sx={{
            // center the whole hero section and add responsive gutters
            maxWidth: { xs: "100%", md: 1200, lg: 1280 },
            mx: "auto",
            px: { xs: 2, sm: 3, md: 6 },
            flexWrap: { xs: "wrap", md: "nowrap" },
            mt: { xs: -10, md: 2 },
          }}
        >
          {/* LEFT: text */}
          <Grid
            item
            xs={12}
            md={5}
            zeroMinWidth
            sx={{
              minWidth: 0,
              // align the whole column responsively
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: "#FFFFFF",
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 700,
                letterSpacing: 0.3,
                lineHeight: { xs: 1.1, md: 1.05 },
                fontSize: { xs: 32, sm: 42, md: 55 },
                mb: { xs: 2, md: 3 },
              }}
            >
              <Box component="span" sx={{ display: "block" }}>
                Navigating Regulations,
              </Box>
              <Box component="span" sx={{ display: "block", mt: { xs: 0.5, sm: 0.75, md: 1.25 } }}>
                Accelerating Success
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: { xs: 1, md: 1.5 },
                color: "#B5B7BB",
                fontSize: { xs: 15, sm: 16, md: 18 },
                lineHeight: { xs: 1.5, md: 1.45 },
                maxWidth: { xs: "100%", md: "60ch" },
                mx: { xs: "auto", md: 0 },
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              At Rekotax, we understand that your vision is big and your goals are even bigger. We’re here
              to ensure that compliance and financial management never slow you down.
            </Typography>

            <Typography
              sx={{
                mt: { xs: 2, md: 3 },
                color: "#B5B7BB",
                fontSize: { xs: 15, sm: 16, md: 18 },
                lineHeight: { xs: 1.5, md: 1.45 },
                maxWidth: { xs: "100%", md: "60ch" },
                mx: { xs: "auto", md: 0 },
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Focus on what you do best—growing your business—and leave the complexities of tax planning,
              registration, and compliance to us. With our expert-led solutions tailored to your needs,
              we’ll handle the rest, empowering your ambition every step of the way.
            </Typography>

            <Box
              sx={{
                mt: { xs: 3, md: 4 },
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowForwardIosIcon fontSize="small" />}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: 1.4,
                  fontWeight: 800,
                  borderRadius: 999,
                  bgcolor: "transparent",
                  backgroundImage: "linear-gradient(90deg,#4da3ff 0%, #3b7dff 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    backgroundImage: "linear-gradient(90deg,#5ab2ff 0%, #4888ff 100%)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>

          {/* RIGHT: floating hero (bounded & responsive) */}
          <Grid
            item
            xs={12}
            md={7}
            zeroMinWidth
            sx={{
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              overflow: "visible",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: 360, sm: 520, md: 760 },
                height: { xs: 240, sm: 360, md: 520 },
                position: "relative",
                overflow: "visible",
                mx: { xs: "auto", md: 0 }, // center on small screens
                "& .rk-hero": {
                  minHeight: "auto !important",
                  height: "100%",
                  padding: 0,
                  overflow: "visible",
                },
                "& .rk-hero .consultant-img": {
                  maxWidth: { xs: 180, sm: 260, md: 300 },
                },
                "& .rk-hero .box1": { top: "8%", left: "2%" },
                "& .rk-hero .box2": { top: "18%", right: 0 },
                "& .rk-hero .box3": { bottom: "14%", left: "2%" },
                "& .rk-hero .box4": { bottom: "6%", right: "2%" },
                "& .rk-hero .box5": { top: 0, left: "50%", transform: "translateX(-50%)" },
              }}
            >
              <FloatingHero />
            </Box>
          </Grid>
        </Grid>



        {/* Sections */}
        <Box sx={{ mx: { xs: -2, md: -6 } }} ref={glassRef}>
          <GlassBarsSection />
        </Box>

        {/* Insights Section */}
        <Box sx={{ mx: { xs: -2, md: -6 } }} ref={aboutRef}>
          <Insights />
        </Box>



        {/* About & Services */}
        <Box sx={{ mx: { xs: -2, md: -6 } }} ref={aboutRef}>
          <AboutAndServices />
        </Box>


        <Box sx={{ mx: { xs: -2, md: -6 } }} ref={aboutRef}>
          <PrincipleAndApproach />
        </Box>



        <Box sx={{ mt: 0, p: 0, mx: 0, overflow: "visible" }} ref={aboutRef}>
          <WhyRekotax fullBleed />
        </Box>

        <Box sx={{ mt: 0, mx: 0 }} ref={aboutRef}>
          <ClientTestimonials fullBleed />
        </Box>

        <Box sx={{ mt: 0, mx: 0 }} ref={aboutRef}>
          <ContactSection />
        </Box>

        <Box sx={{ mx: { xs: -2, md: -6 } }} ref={footerRef}>
          <Footer />
        </Box>

        <Fab
          color="success"
          aria-label="whatsapp"
          sx={{
            position: "fixed",
            right: 24,
            bottom: 24,
            bgcolor: "#22c55e",
            "&:hover": { bgcolor: "#16a34a" },
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            zIndex: 1200,
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Box>
    </>
  );
}
