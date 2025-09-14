import React, { useEffect, useRef, useState } from "react";
import GlassBarsSection from "./GlassBarsSection";
import FloatingHero from "./FloatingHero";
import AboutAndServices from "./AboutAndServices";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import {
  Box, Grid, Typography, Button, Fab
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Home() {
  // Floating section label
  const [activeSection, setActiveSection] = useState("");

  // Refs to sections
  const heroRef = useRef(null);
  const glassRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

useEffect(() => {
  const opts = { root: null, rootMargin: "0px", threshold: 0.55 }; // >50% in view
  const io = new IntersectionObserver((entries) => {
    // collect all visible sections
    const visible = new Set(entries.filter(e => e.isIntersecting).map(e => e.target));

    // priority order: hero (hide), services, about, contact, footer
    if (visible.has(heroRef.current)) {
      setActiveSection("");                // at top: hide banner
    } else if (visible.has(glassRef.current)) {
      setActiveSection("Our Services");
    } else if (visible.has(aboutRef.current)) {
      setActiveSection("About Details");
    } else if (visible.has(contactRef.current)) {
      setActiveSection("Contact");
    } 
    
  }, opts);

  [heroRef, glassRef, aboutRef, contactRef, footerRef].forEach((r) => {
    if (r.current) io.observe(r.current);
  });

  return () => io.disconnect();
}, []);



  return (
    <Box
      sx={{
        bgcolor: "#0f2555",
        backgroundImage: "none",
        pt: { xs: 6, md: 10 },
        pb: 0,
        px: { xs: 2, md: 8 },
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Floating section label (top-right) */}
    {/* Floating section label (top-left instead of top-right) */}
{/* Floating section banner */}
<Box
  sx={{
    position: "fixed",
    top: activeSection === "Footer Page Details" ? 64 : 0, // push below navbar at footer
    left: 0,
    width: "100%",
    bgcolor: "#228B22",
    color: "#fff",
    px: { xs: 2, md: 6 },
    py: 1.5,
    fontWeight: 700,
    fontSize: 20,
    zIndex: 1300,
    textAlign: "left",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    transition: "transform 0.3s ease, opacity 0.3s ease, top 0.2s ease",
    transform: activeSection ? "translateY(0)" : "translateY(-100%)",
    opacity: activeSection ? 1 : 0,
  }}
>
  {activeSection}
</Box>


      {/* HERO + COPY */}
    <Grid container spacing={3} alignItems="center" wrap="nowrap" ref={heroRef}>
  {/* LEFT: text (narrower) */}
  <Grid item xs={12} md={3} zeroMinWidth sx={{ minWidth: 0 }}>
    <Typography
      component="h1"
      sx={{
        fontWeight: 900,
        letterSpacing: 0.2,
        lineHeight: 1.05,
        fontSize: { xs: 36, md: 48 },
        mb: 3,
      }}
    >
      Navigating Regulations,<br />Accelerating Success
    </Typography>

    <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.92)", fontSize: { xs: 16, md: 18 } }}>
      At Rekotax, we understand that your vision is big and your goals are even
      bigger. <br/>We’re here to ensure that compliance and financial management never slow you<br/> down.
    </Typography>

    <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.85)", fontSize: { xs: 16, md: 18 } }}>
      Focus on what you do best - growing your business - and leave the complexities<br/> of
      tax planning, registration, and compliance to us. With our expert-led solutions <br/>tailored
      to your needs, we’ll handle the rest, empowering your ambition every step of the way.
    </Typography>

    <Button
      size="large"
      variant="contained"
      endIcon={<ArrowForwardIosIcon fontSize="small" />}
      sx={{
        mt: 4,
        px: 4,
        py: 1.4,
        fontWeight: 800,
        borderRadius: 999,
        bgcolor: "transparent",
        backgroundImage: "linear-gradient(90deg,#4da3ff 0%, #3b7dff 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        "&:hover": { backgroundImage: "linear-gradient(90deg,#5ab2ff 0%, #4888ff 100%)" },
      }}
    >
      Get Started
    </Button>
  </Grid>

  {/* RIGHT: floating hero (wider) */}
  <Grid
    item
    xs={12}
    md={9}
    zeroMinWidth
    sx={{ minWidth: 0, display: "flex", justifyContent: "center" }}
  >
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,                 // use the extra width
        height: { xs: 360, md: 560 },
        position: "relative",
        "& .rk-hero": { minHeight: "auto !important", height: "100%", padding: 0 },
        "& .rk-hero .consultant-img": { maxWidth: { xs: 260, md: 460 } },
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


      {/* Our Services (Glass bars) */}
      <Box sx={{ mt: 0, mx: { xs: -5, md: -10 } }} ref={glassRef}>
        <GlassBarsSection />
      </Box>

      {/* About & Services */}
      <Box sx={{ mt: 0, mx: { xs: -5, md: -10 } }} ref={aboutRef}>
        <AboutAndServices />
      </Box>

      {/* Contact */}
      <Box sx={{ mt: 0, mx: { xs: -5, md: -10 } }} ref={contactRef}>
        <ContactSection />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 0,
          mb: 0,
          pb: 0,
          mx: { xs: -5, md: -10 },
        }}
        ref={footerRef}
      >
        <Footer />
      </Box>

      {/* Floating WhatsApp button (bottom-right) */}
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
  );
}

/** If you still see a tiny gap at page bottom, ensure global CSS contains:
html, body { margin: 0; padding: 0; }
Or include <CssBaseline /> from MUI once at app root. */
