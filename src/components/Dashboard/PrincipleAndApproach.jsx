// CompanyPrinciples.jsx
import React from "react";
import { Box, Grid, Typography, Stack, Divider } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const missionPoints = [
  "To simplify the complex world of compliance, taxation, and business management through intelligent systems and human-centered design.",
  "We exist to eliminate friction and uncertainty — enabling founders to focus on innovation while we manage precision, transparency, and trust.",
  "Our mission is to make business operations seamless through expertise, technology, and accountability.",
  "We aim to be the most reliable growth partner for entrepreneurs, startups, and enterprises across India and beyond.",
];

const visionPoints = [
  "To redefine how entrepreneurs experience compliance and business management.",
  "Creating a future where launching, running, and scaling a business is effortless, transparent, and growth-driven.",
  "We envision a world where compliance becomes a catalyst for innovation, credibility, and sustainable success.",
  "Rekotax strives to empower founders with clarity, confidence, and control across every stage of their business journey.",
];

const approachPoints = [
  "At Rekotax, our approach blends technology, expertise, and empathy to deliver results that truly matter.",
  "We begin by understanding your business, identifying compliance and financial goals, and designing a roadmap that aligns with your vision.",
  "Every engagement follows a structured process — Evaluate, Plan, Implement, and Improve — ensuring consistency, precision, and measurable outcomes.",
  "We integrate compliance into your business model, transforming it from a regulatory obligation into a strategic advantage.",
  "Our advisory is powered by automation but guided by people — experts who understand not just the laws, but the entrepreneurs behind them.",
  "Through collaboration, innovation, and accountability, we make sure our clients stay compliant, confident, and future-ready."
];

/** One responsive row (text + image). Stacks on small screens, splits 60/40 on md+. */
function PrincipleRow({ title, points, img, reverse = false }) {
  return (
    <Grid
      container
      alignItems="center"
      // 1) Avoid horizontal squeeze on phones
      columnSpacing={{ xs: 0, sm: 3, md: 4 }}
      rowSpacing={{ xs: 3, sm: 4, md: 5 }}
      wrap="wrap"
      sx={{
        ["@media (min-width:900px)"]: { flexWrap: "nowrap" }, // 2 columns only on md+
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      {/* Text — 60% on md+ */}
      <Grid
        item
        xs={12}
        md="auto"
        sx={{
          order: { xs: 1, md: reverse ? 2 : 1 },
          flex: { md: "0 0 60%" },
          maxWidth: { md: "60%" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#0f2555",
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: 18, sm: 20, md: 22 },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        <Stack spacing={{ xs: 1, sm: 1.25 }}>
          {points.map((p, i) => (
            <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
              <CheckCircleRoundedIcon
                sx={{ color: "#22c55e", mt: "2px", fontSize: { xs: 18, md: 20 } }}
              />
              <Typography
                sx={{
                  color: "#334155",
                  fontSize: { xs: 14, sm: 14.5, md: 15 },
                  lineHeight: 1.7,
                  wordBreak: "break-word",
                  hyphens: "auto",
                }}
              >
                {p}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Grid>

      {/* Image — 40% on md+ (wrapped to preserve aspect without distortion) */}
      <Grid
        item
        xs={12}
        md="auto"
        sx={{
          order: { xs: 2, md: reverse ? 1 : 2 },
          flex: { md: "0 0 40%" },
          maxWidth: { md: "40%" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            // 2) Use aspectRatio on small screens to guarantee visible space
            aspectRatio: { xs: "16 / 10", sm: "16 / 9", md: "auto" },
            // 3) Keep fixed height only for md+ (where we have two columns)
            height: { md: 320, lg: 360 },
            minHeight: { xs: 200, sm: 220, md: 0 },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            component="img"
            src={img}
            alt={title}
            loading="lazy"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default function CompanyPrinciples() {
  return (
    <Box sx={{ bgcolor: "#fff", py: { xs: 6, sm: 8, md: 2 } }}>
      {/* Contained, centered, with responsive gutters */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: 1180, lg: 1280 },
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
        }}
      >
        <Typography
          align="center"
          sx={{
            fontWeight: 600,
            color: "#0f2555",
            letterSpacing: 0.4,
            lineHeight: 1.1,
            pt: { xs: 4, sm: 6, md: 6 },
            fontSize: { xs: "clamp(26px, 7vw, 34px)", md: "clamp(38px, 4.5vw, 54px)" },
          }}
        >
          Built for Founders, Driven by Purpose
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#64748b",
            maxWidth: 820,
            mx: "auto",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: 13.5, md: 15 },
            lineHeight: 1.7,
          }}
        >
          Empowering entrepreneurs with clarity, compliance, and confidence to build businesses that last.
        </Typography>

        {/* Rows */}
        <PrincipleRow title="Our Vision" points={visionPoints} img="/vision.jpeg" />

        <Divider
          sx={{
            my: { xs: 3, md: 5 },
            borderColor: "rgba(15,37,85,0.15)",
            borderStyle: "dashed",
          }}
        />

        {/* image first on md+ */}
        <PrincipleRow title="Our Mission" points={missionPoints} img="/mission.jpeg" reverse />

        <Divider
          sx={{
            my: { xs: 3, md: 5 },
            borderColor: "rgba(15,37,85,0.15)",
            borderStyle: "dashed",
          }}
        />

        <PrincipleRow title="Our Approach" points={approachPoints} img="/approach.jpeg" />
      </Box>
    </Box>
  );
}
