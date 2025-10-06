// CompanyPrinciples.jsx
import React from "react";
import { Box, Grid, Typography, Stack, Divider } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const visionPoints = [
  "Here, “Quality Is An Assurance”.",
  "Driven by the concept of Quality as Priority, our team strives to foster a reputable and dynamic firm that excels in its operations, serving the best interests of our clients.",
  "We aim to provide opportunities for prosperity and growth to all those associated with us, becoming a leader in our respective areas of expertise.",
  "At IGCA, we are trailblazers for growth and pioneers of quality work.",
];

const valuesPoints = [
  "We help our clients grow.",
  "Excellence: at the core of everything we do.",
  "Integrity: guiding our actions, fostering trust and inspiring excellence.",
  "Commitment: the unwavering dedication and relentless pursuit of excellence that fuels success.",
  "Collaboration: powering innovation and achieving greatness through synergy and shared expertise.",
  "Prosperity: enhancing achievement.",
  "Diversity & Inclusivity.",
];

const approachPoints = [
  "Holistic collaborations that yield effective results.",
  "Tailored solutions driven by a thorough understanding of our clients’ needs.",
  "Confidentiality and security are our top priorities, safeguarding client information with utmost care.",
  "Human capital and leadership advancement drive success.",
  "Our unwavering service standards set us apart.",
];

/** One responsive row (text + image). Stacks on small screens, splits 60/40 on md+. */
function PrincipleRow({ title, points, img, reverse = false }) {
  return (
    <Grid
      container
      alignItems="center"
      columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      rowSpacing={{ xs: 3, md: 0 }}
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
            height: { xs: 220, sm: 260, md: 320, lg: 360 },
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
          Our Principles 
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
          Our company adheres to unwavering success principles guided by integrity and
          excellence.
        </Typography>

        {/* Rows */}
        <PrincipleRow title="Our Vision" points={visionPoints} img="/who1.png" />

        <Divider
          sx={{
            my: { xs: 3, md: 5 },
            borderColor: "rgba(15,37,85,0.15)",
            borderStyle: "dashed",
          }}
        />

        {/* image first on md+ */}
        <PrincipleRow title="Our Values" points={valuesPoints} img="/who2.png" reverse />

        <Divider
          sx={{
            my: { xs: 3, md: 5 },
            borderColor: "rgba(15,37,85,0.15)",
            borderStyle: "dashed",
          }}
        />

        <PrincipleRow title="Our Approach" points={approachPoints} img="/who3.png" />
      </Box>
    </Box>
  );
}
