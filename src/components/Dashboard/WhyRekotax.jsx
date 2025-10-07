// WhyRekotax.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
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

const FEATURES = [
  { icon: <Gavel sx={{ color: "#0f2555" }} />, text: "Govt. of India Authorized & Trusted" },
  { icon: <Group sx={{ color: "#0f2555" }} />, text: "Trusted by 1,000+ Founders Nationwide" },
  { icon: <WorkspacePremium sx={{ color: "#0f2555" }} />, text: "ISO-Certified for Quality Excellence" },
  { icon: <Security sx={{ color: "#0f2555" }} />, text: "Bank-Level Data Security You Can Rely On" },
  { icon: <AccountBalance sx={{ color: "#0f2555" }} />, text: "Guided by Experienced Legal & Tax Experts" },
  { icon: <AccessTime sx={{ color: "#0f2555" }} />, text: "Always On-Time. Every Time." },
  { icon: <Handshake sx={{ color: "#0f2555" }} />, text: "One-on-One Support from a Dedicated Expert" },
  { icon: <HeadsetMic sx={{ color: "#0f2555" }} />, text: "Fast, Friendly & Always Available Support" },
  { icon: <CurrencyRupee sx={{ color: "#0f2555" }} />, text: "Premium Service at Startup-Friendly Prices" },
];

export default function WhyRekotax({ fullBleed = false }) {
  return (
    <Box
      sx={{
        bgcolor: "#eef3ff",
        py: { xs: 6, md: 8 },
        px: fullBleed ? 0 : { xs: 2, md: 4 },
        ...(fullBleed
          ? { width: "100vw", maxWidth: "100vw", mx: "calc(50% - 50vw)" }
          : { maxWidth: "100%", mx: "auto" }),
      }}
    >
      <Box sx={{ mx: "auto", maxWidth: 1200 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 600,
            color: "#4a5d82",
            fontSize: { xs: 26, sm: 30, md: 36, lg: 40 },
            //fontSize: { xs: "clamp(28px, 6vw, 36px)", md: "clamp(32px, 3.5vw, 44px)" },
            mb: { xs: 4, md: 6 },
          }}
        >
          Why Rekotax ?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {FEATURES.map((item, i) => (
            <Box key={i} sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "100%",
                  minHeight: { xs: 46, md: 54 },
                  // glassy brand panel using your #0f2555 tone
                  bgcolor: "rgba(227, 233, 245, 0.58)",
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(14px) saturate(160%)",
                  WebkitBackdropFilter: "blur(14px) saturate(160%)",
                  color: "#fff",
                  borderRadius: 3,
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 1.25, md: 1.5 },
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 2 },
                  boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": { transform: "translateY(-3px)", boxShadow: "0 14px 40px rgba(0,0,0,0.28)" },
                }}

              >
                {/* rounded-rect icon badge (not a circle) */}
                <Box
                  sx={{
                    bgcolor: "rgba(198, 203, 213, 0.35)", // your #b5b7bb with glass alpha
                    border: "1px solid rgba(181, 183, 187, 0.55)",
                    width: { xs: 40, md: 44 },
                    height: { xs: 40, md: 44 },
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: { xs: 1.75, md: 2 },
                    flexShrink: 0,
                  }}

                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: 14, md: 15.5 },
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: "#000000",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
