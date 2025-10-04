// ClientTestimonials.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Rating,
  Stack,
  Slide,
  Fade,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

const TESTIMONIALS = [
  {
    name: "Amit Kumar",
    rating: 4,
    image: "/who1.png",
    text:
      "Highly professional work environment. A place to grow with lots of opportunities to learn. Supportive seniors, colleagues and management in every situation.",
  },
  {
    name: "Neha Sharma",
    rating: 5,
    image: "/who2.png",
    text:
      "Exceptional guidance on compliance and taxation. Clear communication and timely delivery helped us scale confidently.",
  },
  {
    name: "Rohit Verma",
    rating: 5,
    image: "/who3.png",
    text:
      "From registration to ongoing filings, everything was handled smoothly. Truly reliable and efficient team.",
  },
];

export default function ClientTestimonials({ fullBleed = false }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate every 5s; pause on hover
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[idx];

  return (
    
    <Box
      sx={{
        // spacing: kill top/side padding when fullBleed
        pt: fullBleed ? 0 : { xs: 6, sm: 8, md: 12 },
        pb: { xs: 6, sm: 8, md: 12 },
        px: fullBleed ? 0 : { xs: 2, sm: 3, md: 4, lg: 6 },

        bgcolor: "#fff",

        // full-bleed breakout so section spans the viewport edges
        ...(fullBleed
          ? {
            width: "100vw",
            maxWidth: "100vw",
            mx: "calc(50% - 50vw)",   // breakout from parent container
          }
          : {
            maxWidth: { xs: "100%", lg: 1240, xl: 1440 },
            mx: "auto",
          }),
      }}
    >

      {/* Heading */}
      <Typography
        align="center"
        sx={{
          fontWeight: 900,
          color: "#0f2555",
          letterSpacing: 0.4,
          lineHeight: 1.1,
          mb: 2,
         pt: { xs: 8, sm: 10, md: 6 },


          fontSize: { xs: "clamp(26px, 8vw, 36px)", md: "clamp(40px, 5vw, 56px)" },
        }}
      >
        Hear What Our Clients Say
      </Typography>

      {/* Subcopy */}
      <Typography
        align="center"
        sx={{
          color: "#334155",
          maxWidth: 960,
          mx: "auto",
          mb: { xs: 5, sm: 6, md: 8 },
          lineHeight: 1.75,
          textTransform: "capitalize",
          fontSize: { xs: 14, sm: 15, md: 16 },
        }}
      >
        Discover the impact of our services through the words of our valued clients.
        Read their testimonials and hear firsthand how we drive success and exceed expectations.
      </Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
        rowSpacing={{ xs: 3, sm: 4, md: 0 }}
        sx={{ flexWrap: { xs: "wrap", lg: "nowrap" } }}
      >
        {/* LEFT — compact video-style card (image/name/rating rotate with idx) */}
        <Grid item xs={12} lg="auto" sx={{ display: "flex", justifyContent: "center" }}>
          <Fade in key={`left-${idx}`} timeout={300}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
                // Responsive sizing
                width: { xs: "100%", sm: 360, md: 300, lg: 260 },
                maxWidth: "100%",
                // Prefer aspect ratio; fallback height keeps small devices happy
                aspectRatio: { xs: "16 / 10", sm: "1 / 1" },
                height: { xs: 220, sm: "auto" },
                backgroundImage: `url('${t.image || "/who1.png"}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mx: { xs: "auto", lg: 0 },
              }}
            >
              {/* overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              <Typography
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: { xs: 18, md: 20 },
                  textShadow: "0 2px 6px rgba(0,0,0,0.35)",
                }}
              >
                Coming soon…
              </Typography>

              <IconButton
                size="large"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                  width: 56,
                  height: 56,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                }}
              >
                <PlayArrowRoundedIcon sx={{ fontSize: 32, color: "#0f2555" }} />
              </IconButton>

              <Box sx={{ position: "absolute", left: 16, bottom: 12, color: "#fff" }}>
                <Typography sx={{ fontWeight: 800, mb: 0.5 }}>{t.name}</Typography>
                <Rating name="read-only" value={t.rating} size="small" readOnly />
              </Box>
            </Box>
          </Fade>
        </Grid>

        {/* RIGHT — wide & shallow testimonial card (rotating) */}
        <Grid item xs={12} lg="auto" sx={{ maxWidth: "100%" }}>
          <Box
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Slide
              in
              appear
              key={`right-${idx}`}
              direction="left"
              timeout={{ enter: 350, exit: 250 }}
            >
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  // Fluid width that caps nicely across sizes
                  width: {
                    xs: "100%",
                    sm: "min(680px, 95vw)",
                    md: "min(820px, 90vw)",
                    lg: 860,
                    xl: 960,
                  },
                  maxWidth: "100%",
                  height: { xs: "auto", sm: "auto", md: 300, lg: 300 },
                  p: { xs: 2.5, sm: 3, md: 4 },
                  ml: { lg: 3 }, // small gap from the image card on desktop
                  borderRadius: 3,
                  border: "1px solid #e8edf6",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                  bgcolor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <FormatQuoteRoundedIcon
                  sx={{ fontSize: 48, color: "#3b82f6", opacity: 0.8, mb: 1 }}
                />

                <Typography
                  sx={{
                    color: "#334155",
                    fontSize: { xs: 14, sm: 15, md: 17 },
                    lineHeight: { xs: 1.7, md: 1.9 },
                    pr: { md: 2 },
                    overflowWrap: "anywhere",
                  }}
                >
                  {t.text}
                </Typography>

                <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontWeight: 800, color: "#0f2555" }}>
                    {t.name}
                  </Typography>
                  <Rating value={t.rating} size="small" readOnly />
                </Box>

                <FormatQuoteRoundedIcon
                  sx={{
                    position: "absolute",
                    right: 16,
                    bottom: 12,
                    transform: "rotate(180deg)",
                    fontSize: 40,
                    color: "#3b82f6",
                    opacity: 0.8,
                  }}
                />
              </Paper>
            </Slide>

            {/* Dots */}
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
              {TESTIMONIALS.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setIdx(i)}
                  sx={{
                    width: i === idx ? 10 : 8,
                    height: i === idx ? 10 : 8,
                    borderRadius: "50%",
                    bgcolor: i === idx ? "#3b82f6" : "#cbd5e1",
                    cursor: "pointer",
                    transition: "all .2s ease",
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
