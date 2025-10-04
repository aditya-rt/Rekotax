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
        bgcolor: "#f4f6f8",
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
            fontWeight: 700,
            color: "#4a5d82",
            fontSize: { xs: "clamp(28px, 6vw, 36px)", md: "clamp(32px, 3.5vw, 44px)" },
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
                  minHeight: { xs: 46, md: 54 },           // compact height like your 2nd image
                  bgcolor: "#0f2555",
                  color: "#fff",
                  borderRadius: 3,                          // small rounded corners
                  px: { xs: 2.5, md: 3 },                   // tight padding
                  py: { xs: 1.25, md: 1.5 },
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                  transition: "transform .25s ease",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                {/* rounded-rect icon badge (not a circle) */}
                <Box
                  sx={{
                    bgcolor: "#b5b7bb",
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
                    fontWeight: 700,
                    lineHeight: 1.35,
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
