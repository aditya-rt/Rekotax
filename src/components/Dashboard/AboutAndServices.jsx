import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper
} from "@mui/material";

export default function AboutAndServices() {
  return (

    <Box sx={{ width: "100%" }}>
      {/* ===================== WHO WE ARE ===================== */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 8 }, bgcolor: "#fff" }}>
        <Grid
          container
          alignItems="stretch"
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
          columnSpacing={{ xs: 1, md: 2 }}
          rowSpacing={{ xs: 2, md: 0 }}
        >
          {/* 1) Left column — 30% on md+ */}
          <Grid
            item
            xs={12}
            md="auto"
            zeroMinWidth
            sx={{ minWidth: 0, pr: { md: 3 }, flex: { md: "0 0 30%" }, maxWidth: { md: "30%" } }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 3, color: "#111", fontSize: { xs: 32, md: 40 }, lineHeight: 1.1 }}
            >
              Who we are ?
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 4, fontSize: { xs: 16, md: 15 }, lineHeight: 1.7 }}>
              Expert consultants in company registration, compliance, and taxation,
              committed to guiding your business to success and compliance.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 999, px: 4, py: 1.6, fontWeight: 700,
                borderColor: "#111", color: "#111",
                "&:hover": { borderColor: "#333", backgroundColor: "#f9f9f9" }
              }}
            >
              Learn more
            </Button>
          </Grid>

          {/* 2) Middle column — 35% on md+ */}
          <Grid
            item
            xs={12}
            md="auto"
            zeroMinWidth
            sx={{ minWidth: 0, flex: { md: "0 0 35%" }, maxWidth: { md: "35%" } }}
          >
            <Box
              component="img"
              src="/who1.png"
              alt="Team unity"
              sx={{
                width: "100%",
                height: { xs: 260, md: 560 },
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: "0 12px 28px rgba(0,0,0,0.10)"
              }}
            />
          </Grid>

          {/* 3) Right column — 35% on md+ */}
          <Grid
            item
            xs={12}
            md="auto"
            zeroMinWidth
            sx={{ minWidth: 0, flex: { md: "0 0 35%" }, maxWidth: { md: "35%" } }}
          >
            <Box sx={{ height: { xs: "auto", md: 560 }, display: "flex", flexDirection: "column", gap: { xs: 2, md: 2 } }}>
              <Box
                component="img"
                src="/who2.png"
                alt="Consulting meeting"
                sx={{
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.10)"
                }}
              />
              <Box
                component="img"
                src="/who3.png"
                alt="Client interaction"
                sx={{
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.10)"
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>




      {/* ===================== WHAT WE DO ===================== */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 8 }, bgcolor: "#eef3ff" }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 800, color: "#0f2555", mb: 2 }}
        >
          What we do?
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#334155",
            maxWidth: 720,
            mx: "auto",
            mb: 8,
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.7
          }}
        >
          We provide comprehensive services in company registration, compliance,
          taxation, and business consultancy tailored for you.
        </Typography>

        {/* === three equal columns across one row === */}
        <Grid
          container
          spacing={6}
          alignItems="stretch"
          wrap="nowrap"          // keep three columns on one line at md+
        >
          {/* 1️⃣ Registration */}
          <Grid item xs={12} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                component="img"
                src="/who1.png"
                alt="Registration"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                  Registration
                </Typography>
                <Typography sx={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  We assist you with complete Registration services – from new business
                  incorporation to obtaining all mandatory registrations and licenses,
                  ensuring full compliance right from the start.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 2️⃣ Compliance */}
          <Grid item xs={12} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                component="img"
                src="/Registration.png"
                alt="Compliance"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                  Compliance
                </Typography>
                <Typography sx={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  Our team ensures adherence to compliance requirements under MCA, RBI,
                  SEBI and other authorities, providing complete peace of mind for your
                  business.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 3️⃣ Taxation */}
          <Grid item xs={12} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                component="img"
                src="/Registration.png"
                alt="Taxation"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                  Taxation
                </Typography>
                <Typography sx={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  We provide specialized taxation services covering GST, income tax and
                  corporate tax to keep your business fully aligned with regulations.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
            <Grid
          container
          spacing={6}
          alignItems="stretch"
          wrap="nowrap"          // keep three columns on one line at md+
        >
          {/* 1️⃣ Registration */}
          <Grid item xs={12} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                component="img"
                src="/who1.png"
                alt="Registration"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                  Registration
                </Typography>
                <Typography sx={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  We assist you with complete Registration services – from new business
                  incorporation to obtaining all mandatory registrations and licenses,
                  ensuring full compliance right from the start.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 2️⃣ Compliance */}
          <Grid item xs={12} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                component="img"
                src="/Registration.png"
                alt="Compliance"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                  Compliance
                </Typography>
                <Typography sx={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  Our team ensures adherence to compliance requirements under MCA, RBI,
                  SEBI and other authorities, providing complete peace of mind for your
                  business.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 3️⃣ Taxation */}
          <Grid item xs={12} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                component="img"
                src="/Registration.png"
                alt="Taxation"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                  Taxation
                </Typography>
                <Typography sx={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  We provide specialized taxation services covering GST, income tax and
                  corporate tax to keep your business fully aligned with regulations.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}
