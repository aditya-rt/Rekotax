import React from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";

export default function AboutAndServices() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* ============ WHO WE ARE ============ */}
   <Box sx={{ bgcolor: "#fff", py: { xs: 6, sm: 8, md: 10 } }}>
  <Box
    sx={{
      maxWidth: { xs: "100%", md: 1180, lg: 1280 },
      mx: "auto",
      px: { xs: 2, sm: 3, md: 10 },
    }}
  >
    <Grid
      container
      alignItems="stretch"
      // avoid horizontal squeeze on phones
      columnSpacing={{ xs: 0, sm: 2, md: 3 }}
      rowSpacing={{ xs: 3, sm: 4, md: 0 }}
      wrap="wrap"
      sx={{
        ["@media (min-width:900px)"]: { flexWrap: "nowrap" },
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
            justifyContent: { md: "center" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
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
            Expert consultants in company registration, compliance, and taxation, committed to
            guiding your business to success and compliance.
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

      {/* Middle column - single image */}
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
            // guarantee visible space on small screens
            aspectRatio: { xs: "16 / 10", sm: "16 / 9", md: "auto" },
            height: { md: 420, lg: 450 }, // only apply fixed height on md+
            minHeight: { xs: 220, sm: 260, md: 0 },
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
              objectPosition: "center",
              display: "block",
            }}
          />
        </Box>
      </Grid>

      {/* Right column - two stacked images */}
      <Grid
        item
        xs={12}
        md="auto"
        zeroMinWidth
        sx={{ minWidth: 0, flex: { md: "0 0 35%" }, maxWidth: { md: "35%" } }}
      >
        <Box
          sx={{
            height: { xs: "auto", md: 420, lg: 450 },
            display: "grid",
            gap: { xs: 1.75, sm: 2, md: 1.75 },
            gridTemplateRows: { xs: "auto auto", md: "1fr 1fr" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: { xs: "16 / 11", sm: "16 / 10", md: "auto" },
              height: { md: "100%" },
              minHeight: { xs: 200, sm: 220, md: 0 },
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
                objectPosition: "center",
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: { xs: "16 / 11", sm: "16 / 10", md: "auto" },
              height: { md: "100%" },
              minHeight: { xs: 200, sm: 220, md: 0 },
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
                objectPosition: "center",
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
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 600,
              color: "#0f2555",
              mb: 1.5,
              fontSize: { xs: 26, sm: 30, md: 36, lg: 40 },
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
            We provide comprehensive services in company registration, compliance, taxation, and business consultancy tailored for you.
          </Typography>

          {/* One Grid with two rows of three cards */}
          <Grid
            container
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
            rowSpacing={{ xs: 3, sm: 5, md: 7 }}   // a bit more space between rows
            alignItems="stretch"
            wrap="wrap"
          >
            {[
              // Row 1
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
              // Row 2
              {
                img: "/BusinessAdv.jpg",
                title: "Business Advisory",
                body:
                  "We empower businesses with strategic insights and actionable guidance at every stage of growth. Our experts help refine business models, optimize operations, and navigate challenges with clarity - turning vision into measurable success.",
              },
              {
                img: "/VirtualCfo.jpg",
                title: "Virtual CFO",
                body:
                  "Virtual CFO brings board-level financial intelligence without full-time cost. From cash-flow, budgeting, and controls to forecasting and investor reporting, we ensure decisions drive sustainable growth and profitability.",
              },
              {
                img: "/Outsourcing.jpg",
                title: "Other Outsourcing",
                body:
                  "Delegate non-core operations to our trusted team and focus on what truly matters - growing your business. We handle accounting, payroll, reporting, and compliance back-office functions with precision and confidentiality.",
              },
            ].map((card, i) => (
              <Grid
                key={i}
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                sx={{ display: "flex", minWidth: 0 }} // lets the card stretch to equal height
              >
                <ServiceCard {...card} />
              </Grid>
            ))}
          </Grid>

        </Container>
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
        borderRadius: 3,
        boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // keep card flexible; remove hard cap if you want full width on phones
        maxWidth: { xs: "100%", sm: 360 },
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 220, sm: 220, md: 240 },
          minHeight: 200,
          overflow: "hidden",
          flexShrink: 0,
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

      <Box
        sx={{
          p: { xs: 2.5, sm: 2.75, md: 3 },
          display: "grid",
          gridTemplateRows: "auto 1fr",
          flex: 1,
          minHeight: { xs: 150, sm: 160, md: 170 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#0f2555",
            mb: 1,
            fontSize: { xs: 16, sm: 17, md: 20 },
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: { xs: 28, sm: 30, md: 20 },
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#334155",
            fontSize: { xs: 13.5, sm: 14, md: 15 },
            lineHeight: 1.6,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: { xs: 4, sm: 5, md: 6 },
            WebkitBoxOrient: "vertical",
          }}
        >
          {body}
        </Typography>
      </Box>
    </Box>
  );
}
