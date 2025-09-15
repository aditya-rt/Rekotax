import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function GSTRegistration() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      {/* Title */}
      <Typography
        variant="h2"
        align="center"
        sx={{ color: "#0f2555", fontWeight: 700, mb: 4, fontSize: { xs: "2rem", md: "2.5rem" } }}
      >
        Know All About GST Registration
      </Typography>

      {/* What is GST Registration */}
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <Typography
            variant="h3"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 2, fontSize: { xs: "1.5rem", md: "1.8rem" } }}
          >
            What is GST Registration?
          </Typography>
          <Typography sx={{ fontSize: "1rem", mb: 3 }}>
            <strong>GST (Goods and Services Tax)</strong> registration is a mandatory process for
            businesses exceeding the prescribed <strong>turnover threshold</strong>. It provides
            a unique <strong>15-digit identification number (GSTIN)</strong> that enables legal
            tax collection and <strong>input tax credit</strong> claims.
          </Typography>
        </Grid>
      </Grid>

      {/* GSTIN Structure */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h3"
          sx={{ color: "#0f2555", fontWeight: 700, mb: 4, fontSize: { xs: "1.8rem", md: "2rem" } }}
        >
          GSTIN Structure Explained
        </Typography>

        {/* GSTIN Display */}
        <Box
          sx={{
            display: "inline-block",
            bgcolor: "#0f2555",
            color: "#fff",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontWeight: 600,
            px: 3,
            py: 1.5,
            borderRadius: 2,
            letterSpacing: 2,
            mb: 4,
            boxShadow: 3,
          }}
        >
          22ABCDE1234F1Z5
        </Box>

        {/* Breakdown Boxes */}
        <Grid container spacing={3}>
          {[
            { code: "22", label: "State Code" },
            { code: "ABCDE1234F", label: "PAN Number" },
            { code: "1", label: "Entity Code" },
            { code: "Z", label: "Default Letter" },
            { code: "5", label: "Check Digit" },
          ].map((item) => (
            <Grid item key={item.label}>
              <Box
                sx={{
                  bgcolor: "#f3f6fb",
                  px: 3,
                  py: 2,
                  borderRadius: 1.5,
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  color: "#0f2555",
                  textAlign: "center",
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                  },
                }}
              >
                {item.code}
              </Box>
              <Typography align="center" sx={{ mt: 1, fontSize: "0.9rem", color: "#444" }}>
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Threshold Limits */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h3"
          sx={{ color: "#0f2555", fontWeight: 700, mb: 4, textAlign: "left" }}
        >
          Threshold Limits for Registration
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Goods",
              desc: "Rs. 40 lakh annual turnover. (Rs. 20 lakh for special category states).",
            },
            {
              title: "Services",
              desc: "Rs. 20 lakh annual turnover. (Rs. 10 lakh for special category states).",
            },
            {
              title: "Interstate Supply",
              desc: "Registration is mandatory for any interstate supply of goods, regardless of turnover.",
            },
          ].map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <Paper
                elevation={3}
                sx={{
                  bgcolor: "#f3f6fb",
                  p: 4,
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#0f2555", fontWeight: 700, mb: 2, fontSize: "1.5rem" }}
                >
                  {card.title}
                </Typography>
                <Typography sx={{ color: "#444" }}>{card.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h3"
          sx={{ color: "#0f2555", fontWeight: 700, mb: 4, textAlign: "left" }}
        >
          Why Consider GST Registration Even If It’s Not Applicable?
        </Typography>
        <Typography sx={{ mb: 5, color: "#444" }}>
          The <strong>GST law</strong> exempts businesses from registration until they cross
          the prescribed <strong>turnover threshold</strong>. However, many{" "}
          <strong>entrepreneurs</strong> and <strong>growing businesses</strong> choose to
          voluntarily register under GST despite not being legally required. The reason is
          simple—<strong>GST registration</strong> offers much more than compliance. It provides{" "}
          <strong>strategic</strong>, <strong>financial</strong>, and{" "}
          <strong>operational advantages</strong> that accelerate business growth.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Business Credibility",
              desc: "Enhances trust with customers, vendors, and corporates by showing your business is tax-compliant and professional.",
            },
            {
              title: "Input Tax Credit",
              desc: "Claim input tax credit (ITC) on purchases to reduce your tax burden and increase profitability.",
            },
            {
              title: "B2B Opportunities",
              desc: "Issue GST invoices and work with GST-registered clients, helping you secure bigger contracts.",
            },
            {
              title: "Inter-State Expansion",
              desc: "Expand across states without turnover restrictions, making scaling hassle-free.",
            },
            {
              title: "E-Commerce Ready",
              desc: "Sell on Amazon, Flipkart, and other platforms where GST registration is mandatory.",
            },
            {
              title: "Government Contracts",
              desc: "Become eligible to bid for tenders and PSU contracts that require GST registration.",
            },
          ].map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <Paper
                elevation={3}
                sx={{
                  bgcolor: "#f3f6fb",
                  p: 4,
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#0f2555", fontWeight: 700, mb: 2, fontSize: "1.5rem" }}
                >
                  {card.title}
                </Typography>
                <Typography sx={{ color: "#444" }}>{card.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
