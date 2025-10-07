// ClientTestimonials.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Rating,
  Stack,
  Slide,
} from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

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
  const cbRef = useRef(null); // for stable autoplay callback
  const [reduced, setReduced] = useState(false);

  const len = TESTIMONIALS.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);

  // Keep the latest next() in a ref so the interval isn't recreated
  useEffect(() => {
    cbRef.current = next;
  }, [next]);

  // Prefer-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(!!mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  // Pause when the tab/window is hidden
  useEffect(() => {
    const handleVis = () => setPaused(document.hidden || paused);
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay loop that pauses on hover and resumes after
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => cbRef.current && cbRef.current(), 4000);
    return () => clearInterval(id);
  }, [paused, reduced]);

  const t = TESTIMONIALS[idx];

  return (
    <Box
      sx={{
        pt: fullBleed ? 0 : { xs: 6, sm: 8, md: 12 },
        pb: { xs: 6, sm: 8, md: 12 },
        px: fullBleed ? 0 : { xs: 2, sm: 3, md: 4, lg: 6 },
        bgcolor: "#eef3ff",
        ...(fullBleed
          ? { width: "100vw", maxWidth: "100vw", mx: "calc(50% - 50vw)" }
          : { maxWidth: { xs: "100%", md: 1180, lg: 1280 }, mx: "auto" }),
      }}
      // Pause autoplay when hovering anywhere in the section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Heading */}
      <Typography
        align="center"
        sx={{
          fontWeight: 600,
          color: "#0f2555",
          letterSpacing: 0.4,
          lineHeight: 1.1,
          mb: 2,
          pt: { xs: 6, sm: 8, md: 6 },
          fontSize: { xs: "clamp(26px, 8vw, 34px)", md: "clamp(38px, 5vw, 56px)" },
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
          fontSize: { xs: 14, sm: 15, md: 16 },
        }}
      >
        Discover the impact of our services through the words of our valued clients.
        Read their testimonials and hear firsthand how we drive success and exceed expectations.
      </Typography>

      {/* Content */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
        rowSpacing={{ xs: 3, sm: 4, md: 0 }}
        sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
      >
        {/* RIGHT — testimonial card (we use Slide for a smooth step transition) */}
        <Grid item xs={12} md="auto" sx={{ maxWidth: "100%" }}>
          {/* ==== AUTO-SCROLL CAROUSEL (no dots, no arrows) ==== */}
          <Box
            // pause the scroll when hovering anywhere on the strip
            sx={{
              overflow: "hidden",
              position: "relative",
              // when the wrapper is hovered, pause the inner track animation
              "&:hover .press-track": { animationPlayState: "paused" },
            }}
          >
            {/* track: we render items twice for seamless loop */}
            <Box
              className="press-track"
              sx={{
                display: "flex",
                alignItems: "stretch",
                // duplicate width, so one full set can slide out while the next follows
                width: "max-content",
                // keyframes defined inline
                animation: "scrollX 30s linear infinite",
                "@keyframes scrollX": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(-50%)" }, // half, because we render two sets
                },
              }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((it, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    flex: "0 0 auto",
                    // responsive card width like the screenshot
                    width: { xs: 280, sm: 360, md: 420 },
                    mx: { xs: 1, sm: 1.5, md: 2 },
                    p: { xs: 2.25, sm: 3, md: 3.25 },
                    borderRadius: 4,
                    border: "1px solid #eef2f7",
                    bgcolor: "#f7f9fc",
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#0f172a",
                      fontWeight: 400,
          fontSize: { xs: 14, sm: 15, md: 16 },
                      lineHeight: 1.4,
                      mb: { xs: 6, sm: 8 },
                      // quoted look like the reference
                      "&::before": { content: '"“"' },
                      "&::after": { content: '"”"' },
                    }}
                  >
                    {it.text}
                  </Typography>

                  {/* logo + source at bottom-left */}
                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    sx={{
                      position: "absolute",
                      left: { xs: 14, sm: 18 },
                      bottom: { xs: 12, sm: 16 },
                    }}
                  >
                    <Box
                      component="img"
                      src={it.image}
                      alt={it.name}
                      sx={{
                        width: { xs: 36, sm: 44 },
                        height: { xs: 36, sm: 44 },
                        borderRadius: "50%",
                        objectFit: "cover",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        backgroundColor: "#fff",
                      }}
                    />
                    <Typography sx={{ color: "#6b7280", fontWeight: 600, fontSize: { xs: 13, sm: 14 } }}>
                      {it.name}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Box>

        </Grid>
      </Grid>
    </Box>
  );
}
