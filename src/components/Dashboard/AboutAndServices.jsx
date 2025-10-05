import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

export default function AboutAndServices() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* ============ WHO WE ARE ============ */}
      <Box sx={{ bgcolor: "#fff", py: { xs: 6, sm: 8, md: 10 } }}>
        <Box
          sx={{
            maxWidth: { xs: "100%", md: 1180, lg: 1280 },
            mx: "auto",
            px: { xs: 2, sm: 3, md: 10 }, // horizontal content padding
          }}
        >
          <Grid
            container
            alignItems="stretch"
            columnSpacing={{ xs: 0, sm: 2, md: 3 }}
            rowSpacing={{ xs: 3, sm: 4, md: 0 }}
            wrap="wrap"
            sx={{
              ["@media (min-width:900px)"]: { flexWrap: "nowrap" }, // 3 columns only on md+
            }}
          >
            {/* Left column - text */}
            <Grid
              item
              xs={12}
              md="auto"
              zeroMinWidth
              sx={{
                minWidth: 0,
                pr: { md: 3 },
                flex: { md: "0 0 30%" },
                maxWidth: { md: "30%" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: { md: "center" }, // center vertically on md+
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    color: "#111",
                    fontSize: { xs: 26, sm: 30, md: 36, lg: 40 },
                    lineHeight: 1.15,
                  }}
                >
                  Who we are?
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    fontSize: { xs: 14, sm: 15, md: 15 },
                    lineHeight: 1.7,
                  }}
                >
                  Expert consultants in company registration, compliance, and
                  taxation, committed to guiding your business to success and
                  compliance.
                </Typography>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    px: 3.5,
                    py: 1.25,
                    fontWeight: 700,
                    borderColor: "#111",
                    color: "#111",
                    "&:hover": { borderColor: "#333", backgroundColor: "#f9f9f9" },
                  }}
                >
                  Learn more
                </Button>
              </Box>
            </Grid>

            {/* Middle column - single image (wrapped to preserve aspect without distortion) */}
            <Grid
              item
              xs={12}
              md="auto"
              zeroMinWidth
              sx={{ minWidth: 0, flex: { md: "0 0 35%" }, maxWidth: { md: "35%" } }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 170, sm: 240, md: 420, lg: 450 },
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
                }}
              >
                <Box
                  component="img"
                  src="/who1.png"
                  alt="Team unity"
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

            {/* Right column - two stacked images (each wrapped) */}
        <Grid
  item
  xs={12}
  md="auto"
  zeroMinWidth
  sx={{ minWidth: 0, flex: { md: "0 0 35%" }, maxWidth: { md: "35%" } }}
>
  <Box
    sx={{
      height: { xs: "auto", md: 420, lg: 450 }, // align with middle column
      display: "grid",
      gap: { xs: 1.75, sm: 2, md: 1.75 },
      gridTemplateRows: { xs: "auto auto", md: "1fr 1fr" },
    }}
  >
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 180, sm: 220, md: "100%" },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
      }}
    >
      <Box
        component="img"
        src="/who2.png"
        alt="Consulting meeting"
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

    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 180, sm: 220, md: "100%" },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
      }}
    >
      <Box
        component="img"
        src="/who3.png"
        alt="Client interaction"
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
  </Box>
</Grid>

          </Grid>
        </Box>
      </Box>

      {/* ============ WHAT WE DO ============ */}
      <Box sx={{ bgcolor: "#eef3ff", py: { xs: 6, sm: 8, md: 10 } }}>
        <Box
          sx={{
            maxWidth: { xs: "100%", md: 1180, lg: 1280 },
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 }, // horizontal content padding
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              color: "#0f2555",
              mb: 1.5,
              fontSize: { xs: 24, sm: 28, md: 34 },
              lineHeight: 1.2,
            }}
          >
            What we do?
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "#334155",
              maxWidth: 760,
              mx: "auto",
              mb: { xs: 5, sm: 6, md: 7 },
              fontSize: { xs: 14, sm: 15, md: 16 },
              lineHeight: 1.7,
            }}
          >
            We provide comprehensive services in company registration, compliance,
            taxation, and business consultancy tailored for you.
          </Typography>

          {/* Row 1 */}
          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 6 }}
            alignItems="stretch"
            wrap="wrap"
            sx={{
              ["@media (min-width:900px)"]: { flexWrap: "nowrap" }, // keep 3 in a row on md+
            }}
          >
            {[
              {
                img: "/Registration.png",
                title: "Registration",
                body:
                  "We assist you with complete Registration services - from new business incorporation to obtaining all mandatory registrations and licenses, ensuring full compliance right from the start.",
              },
              {
                img: "/compliance.png",
                title: "Compliance",
                body:
                  "Our team ensures adherence to compliance requirements under MCA, RBI, SEBI and other authorities, providing complete peace of mind for your business.",
              },
              {
                img: "/Taxation.png",
                title: "Taxation",
                body:
                  "We provide specialized taxation services covering GST, income tax and corporate tax to keep your business fully aligned with regulations.",
              },
            ].map((card, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
                <ServiceCard {...card} />
              </Grid>
            ))}
          </Grid>

          {/* Row 2 */}
          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 6 }}
            alignItems="stretch"
            wrap="wrap"
            sx={{
              mt: { xs: 3, sm: 4, md: 6 },
              ["@media (min-width:900px)"]: { flexWrap: "nowrap" },
            }}
          >
            {[
              {
                img: "/Registration.png",
                title: "Business Advisory",
                body:
                  "End-to-end FEMA and RBI compliance support for cross-border transactions, foreign investment, reporting and approvals.",
              },
              {
                img: "/Registration.png",
                title: "Virtual CFO",
                body:
                  "Strategic finance leadership on subscription - MIS, budgeting, controls, board reporting and investor readiness.",
              },
              {
                img: "/Registration.png",
                title: "Other Outsourcing",
                body:
                  "Accounting, payroll, invoicing, vendor management and more - reliable back office so you can focus on growth.",
              },
            ].map((card, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
                <ServiceCard {...card} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

/* --- Small reusable card --- */
function ServiceCard({ img, title, body }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image wrapper to maintain proportions without distortion */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 200, sm: 220, md: 240 },
          overflow: "hidden",
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

      <Box sx={{ p: { xs: 2.25, sm: 2.5, md: 3 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#0f2555",
            mb: 1,
            fontSize: { xs: 16, sm: 17, md: 18 },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#334155",
            fontSize: { xs: 13.5, sm: 14, md: 15 },
            lineHeight: 1.6,
          }}
        >
          {body}
        </Typography>
      </Box>
    </Box>
  );
}
