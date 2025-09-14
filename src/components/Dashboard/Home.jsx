import React from "react";
import GlassBarsSection from "./GlassBarsSection";
import FloatingHero from "./FloatingHero";
import AboutAndServices from "./AboutAndServices";
import ContactSection from "./ContactSection";
import {
  Box, Grid, Typography, Button, Paper, Chip, Fab
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Home() {
  return (
    <Box
      sx={{
        // page background like the screenshot
        bgcolor: "#0f2555",
        //background: "linear-gradient(135deg, #0f2555 0%, #153b7a 60%, #0f3d7c 100%)",
        backgroundImage: "none",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        color: "#fff",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* HERO + COPY in one row */}
      <Grid container spacing={6} alignItems="center" wrap="nowrap">
        {/* Left: text */}
        <Grid item xs={8} md={5} zeroMinWidth sx={{ minWidth: 0 }}>
          <Typography component="h1" sx={{ fontWeight: 900, letterSpacing: 0.2, lineHeight: 1.05, fontSize: { xs: 40, md: 50 }, mb: 3 }}> Navigating Regulations,<br /> 
          Accelerating Success 
          </Typography> 
          <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.92)", fontSize: { xs: 16, md: 20 } }}> At Rekotax, we understand that your vision is big and your goals are even <br/>
           bigger.  We’re here to ensure that compliance and financial management <br/>never slow you down. </Typography> <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.85)", fontSize: { xs: 16, md: 20 } }}>
             Focus on what you do best - growing your business - and leave the  <br/>complexities of tax planning, 
             registration, and compliance to us. With our <br/>expert-led solutions tailored to your needs, we’ll handle the rest,
              <br/> empowering your ambition every step of the way. </Typography> <Button size="large" variant="contained" endIcon={<ArrowForwardIosIcon fontSize="small" />} sx={{ mt: 5, px: 4, py: 1.6, fontWeight: 800, borderRadius: 999, bgcolor: "transparent", backgroundImage: "linear-gradient(90deg,#4da3ff 0%, #3b7dff 100%)", boxShadow: "0 10px 30px rgba(0,0,0,0.25)", "&:hover": { backgroundImage: "linear-gradient(90deg,#5ab2ff 0%, #4888ff 100%)" } }} > Get Started </Button>
        </Grid>

        {/* Right: floating hero */}
        <Grid item xs={12} md={6} zeroMinWidth sx={{ minWidth: 0, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 560,
              height: { xs: 360, md: 560 },
              position: "relative",
              // force FloatingHero to fit this column (not full screen)
              "& .rk-hero": { minHeight: "auto !important", height: "100%", padding: 0 },
              "& .rk-hero .consultant-img": { maxWidth: { xs: 260, md: 420 } },
              // keep chips inside the column
              "& .rk-hero .box1": { top: "8%", left: "2%" },
              "& .rk-hero .box2": { top: "18%", right: 0 },
              "& .rk-hero .box3": { bottom: "14%", left: "2%" },
              "& .rk-hero .box4": { bottom: "6%", right: "2%" },
              "& .rk-hero .box5": { top: 0, left: "50%", transform: "translateX(-50%)" }
            }}
          >
            <FloatingHero />
          </Box>
        </Grid>
      </Grid>



      <Box sx={{ mt: { xs: 8, md: 10 } }}>
        <GlassBarsSection />
      </Box>

          <AboutAndServices />
          <ContactSection/>

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
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
}

/** A small helper to create the soft glass pill look for chips */
function glassChip(pos) {
  return {
    position: "absolute",
    ...pos,
    px: 2,
    py: 1,
    fontWeight: 800,
    color: "#ffffff",
    borderRadius: 999,
    backdropFilter: "blur(6px)",
    background:
      "linear-gradient(180deg, rgba(113,163,255,0.55) 0%, rgba(64,116,255,0.42) 100%)",
    border: "1px solid rgba(255,255,255,0.35)",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.25)",
    ".MuiChip-label": { px: 1.2, py: 0.4 }
  };
}
