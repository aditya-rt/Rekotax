import React from "react";
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
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef, useState, useEffect } from "react";
import Footer from "../../Dashboard/Footer.jsx";
import ContactSection from "../../Dashboard/ContactSection.jsx";


const Pill = ({ children }) => (
  <Box
    sx={{
      display: "inline-block",
      bgcolor: "rgba(255,255,255,0.1)",
      px: 2.5,
      py: 0.8,
      borderRadius: 5,
      fontSize: "0.95rem",
      mb: 3,
    }}
  >
    {children}
  </Box>
);

const InfoCard = ({ title, desc }) => (
  <Paper
    elevation={3}
    sx={{
      bgcolor: "#f3f6fb",
      p: { xs: 3, md: 4 },
      textAlign: "center",
      borderRadius: 2,
      height: "100%",
      transition: "0.3s",
      "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
    }}
  >
    <Typography
      variant="h4"
      sx={{ color: "#0f2555", fontWeight: 700, mb: 1.5, fontSize: "1.5rem" }}
    >
      {title}
    </Typography>
    <Typography sx={{ color: "#444" }}>{desc}</Typography>
  </Paper>
);

const GstinBox = ({ code, label }) => (
  <Grid item>
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
        minWidth: 90,
        "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
      }}
    >
      {code}
    </Box>
    <Typography align="center" sx={{ mt: 1, fontSize: "0.9rem", color: "#444" }}>
      {label}
    </Typography>
  </Grid>
);

export default function GSTRegistration() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const footerRef = useRef(null);
  const contactRef = useRef(null);


  return (
    <Box sx={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(90deg,#0f2555 0%,#0f3d7c 100%)",
          color: "#fff",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Pill>Expert GST Registration Services in India</Pill>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
              mb: 2,
            }}
          >
            Fast, Accurate, and Hassle-free GST Registration
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              maxWidth: 700,
              mx: "auto",
              mb: 4,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            GST Registration gives your business a legal tax identity, enabling
            smooth compliance, input tax credit, and nationwide credibility. At
            Rekotax, we make the entire process effortless so you can focus on
            growth while we handle the compliances.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ mb: 5 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#fff",
                color: "#0f2555",
                fontWeight: 600,
                px: 4,
                py: 1.2,
                borderRadius: 10,
                mr: 2,
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              Start Registration
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.7)",
                px: 4,
                py: 1.2,
                borderRadius: 10,
                "&:hover": { borderColor: "#fff" },
              }}
              href="tel:+919220580062"
            >
              +91-9220580062
            </Button>
          </Box>

          {/* Highlights */}
          <Grid container spacing={2} justifyContent="center">
            {["Typical approvals: 7-10 days*", "CA/CS assisted end-to-end", "Paperless & transparent tracking"].map(
              (item) => (
                <Grid item xs={12} sm="auto" key={item}>
                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      px: 3,
                      py: 1,
                      borderRadius: 20,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Box>
                </Grid>
              )
            )}
          </Grid>

          <Typography sx={{ mt: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
            *Subject to government verification and completeness of documents.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: "#0f2555",
            fontWeight: 700,
            mb: 4,
            mt: 2,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Know All About GST Registration
        </Typography>

        {/* What is GST Registration */}
        <Grid container spacing={5} sx={{ mb: 2 }}>
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              sx={{
                color: "#0f2555",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
            >
              What is GST Registration?
            </Typography>
            <Typography sx={{ fontSize: "1rem", mb: 1.5 }}>
              <strong>GST (Goods and Services Tax)</strong> registration is a mandatory process for
              businesses exceeding the prescribed <strong>turnover threshold</strong>. It provides a
              unique <strong>15-digit identification number (GSTIN)</strong> that enables legal tax
              collection and <strong>input tax credit</strong> claims.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* GSTIN Structure */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h3"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 3.5, fontSize: { xs: "1.8rem", md: "2rem" } }}
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
          <Grid container spacing={3} wrap="wrap">
            <GstinBox code="22" label="State Code" />
            <GstinBox code="ABCDE1234F" label="PAN Number" />
            <GstinBox code="1" label="Entity Code" />
            <GstinBox code="Z" label="Default Letter" />
            <GstinBox code="5" label="Check Digit" />
          </Grid>
        </Box>

        {/* Threshold Limits */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 3, textAlign: "left" }}
          >
            Threshold Limits for Registration
          </Typography>

          {/* One-row, responsive, scrollable on mobile */}
          <Grid
            container
            wrap="nowrap"
            spacing={2}
            sx={{
              overflowX: { xs: "auto", md: "visible" },
              px: { xs: 1, md: 0 },
              scrollSnapType: { xs: "x mandatory", md: "none" },
              // hide scrollbar on WebKit while keeping scroll
              "&::-webkit-scrollbar": { display: "none" },
              "-msOverflowStyle": "none",
              scrollbarWidth: "none",
            }}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
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
              <Grid
                item
                key={card.title}
                // keep three items on one row; width adapts
                sx={{
                  minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: each takes one-third of row
                  flex: { xs: "0 0 auto", md: "1 1 0%" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  pr: { xs: 1, md: 0 },
                }}
              >
                <InfoCard title={card.title} desc={card.desc} />
              </Grid>
            ))}
          </Grid>
        </Box>


        {/* Benefits Section */}
        <Box sx={{ mt: 14 }}>
          <Typography
            variant="h3"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 3, mt: 4, textAlign: "left" }}
          >
            Why Consider GST Registration Even If It’s Not Applicable?
          </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
            The <strong>GST law</strong> exempts businesses from registration until they cross the
            prescribed <strong>turnover threshold</strong>. However, many <strong>entrepreneurs</strong> and{" "}
            <strong>growing businesses</strong> choose to voluntarily register under GST despite not being
            legally required. The reason is simple - <strong>GST registration</strong> offers much more than
            compliance. It provides <strong>strategic</strong>, <strong>financial</strong>, and{" "}
            <strong>operational advantages</strong> that accelerate business growth.
          </Typography>

          {[
            [
              {
                title: "Business Credibility",
                desc:
                  "Enhances trust with customers, vendors, and corporates by showing your business is tax-compliant and professional.",
              },
              {
                title: "Input Tax Credit",
                desc:
                  "Claim input tax credit (ITC) on purchases to reduce your tax burden and increase profitability.",
              },
              {
                title: "B2B Opportunities",
                desc:
                  "Issue GST invoices and work with GST-registered clients, helping you secure bigger contracts.",
              },
            ],
            [
              {
                title: "Inter-State Expansion",
                desc:
                  "Expand across states without turnover restrictions, making scaling hassle-free.",
              },
              {
                title: "E-Commerce Ready",
                desc:
                  "Sell on Amazon, Flipkart, and other platforms where GST registration is mandatory.",
              },
              {
                title: "Government Contracts",
                desc:
                  "Become eligible to bid for tenders and PSU contracts that require GST registration.",
              },
            ],
          ].map((row, idx) => (
            <Grid
              key={idx}
              container
              wrap="nowrap"
              spacing={2}
              sx={{
                overflowX: { xs: "auto", md: "visible" },
                px: { xs: 1, md: 0 },
                mb: idx === 0 ? 2.5 : 0,
                scrollSnapType: { xs: "x mandatory", md: "none" },
                "&::-webkit-scrollbar": { display: "none" },
                "-msOverflowStyle": "none",
                scrollbarWidth: "none",
              }}
              justifyContent={{ xs: "flex-start", md: "center" }}
              alignItems="stretch"
            >
              {row.map((card) => (
                <Grid
                  item
                  key={card.title}
                  sx={{
                    minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: exactly one-third each
                    flex: { xs: "0 0 auto", md: "1 1 0%" },
                    scrollSnapAlign: { xs: "start", md: "none" },
                    pr: { xs: 1, md: 0 },
                    display: "flex",
                  }}
                >
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <InfoCard title={card.title} desc={card.desc} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>

        {/* GST Pricing - single row, responsive, scrollable on mobile */}
        <Box sx={{ mt: 14 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "2.2rem" },
              fontWeight: 700,
              color: "#0f2555",
              mb: 4,
            }}
          >
            Our GST Registration Packages
          </Typography>

          <Grid
            container
            wrap="nowrap"
            spacing={2}
            justifyContent={{ xs: "flex-start", md: "center" }}
            sx={{
              overflowX: { xs: "auto", md: "visible" },
              px: { xs: 1, md: 0 },
              scrollSnapType: { xs: "x mandatory", md: "none" },
              "&::-webkit-scrollbar": { display: "none" },
              "-msOverflowStyle": "none",
              scrollbarWidth: "none",
            }}
          >
            {[
              {
                name: "Essentials",
                price: "₹ 1,999/-",
                headerBg: "#3f5177",
                features: [
                  "GST Registration",
                  "Supporting Document Preparation",
                  "Amendment of Non-Core Fields (within 30 days of registration)",
                ],
              },
              {
                name: "Advanced",
                price: "₹ 2,999/-",
                headerBg: "#0f2555",
                features: [
                  "GST Registration",
                  "Supporting Document Preparation",
                  "Amendment of Non-Core Fields (within 30 days of registration)",
                  "GST Filing for First 3 Months",
                ],
              },
              {
                name: "All-Inclusive",
                price: "₹ 9,499/-",
                headerBg: "linear-gradient(118deg, #0f2555, #023691)",
                features: [
                  "GST Registration",
                  "Supporting Document Preparation",
                  "Amendment of Non-Core Fields (within 30 days of registration)",
                  "GST Return Filing for First 12 Months (Up to ₹50L Turnover)",
                  "Reconciliation of Books and GSTRs",
                ],
              },
            ].map((plan) => (
              <Grid
                item
                key={plan.name}
                sx={{
                  minWidth: { xs: 280, sm: 320, md: 1 / 3 }, // md+: exactly one-third each
                  flex: { xs: "0 0 auto", md: "1 1 0%" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  display: "flex",
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    bgcolor: "#f9fbff",
                    borderRadius: 3,
                    width: "100%",
                    minHeight: 460,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: 10 },
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      px: 3,
                      py: 1.5,
                      color: "#fff",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      background: plan.headerBg,
                    }}
                  >
                    {plan.name}
                  </Box>

                  {/* Features */}
                  <Box sx={{ px: 3, py: 3, textAlign: "left", flexGrow: 1 }}>
                    <ul style={{ paddingLeft: 20, margin: 0, color: "#444" }}>
                      {plan.features.map((f, i) => (
                        <li key={i} style={{ marginBottom: 10, fontSize: "0.95rem" }}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Box>

                  <Divider />

                  {/* Footer */}
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#0f2555", mb: 1, fontSize: "1.8rem" }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography sx={{ fontSize: "0.9rem", color: "#666", mb: 2 }}>
                      (Inclusive of taxes)
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#0f2555",
                        color: "#fff",
                        fontWeight: 600,
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#0eb733" },
                      }}
                    >
                      Checkout
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Note */}
          <Typography sx={{ mt: 4, textAlign: "center", color: "#333", fontSize: "1rem" }}>
            Looking for a Virtual Office Address for GST Registration?{" "}
            <Typography
              component="a"
              href="https://www.rekotax.com/online-store"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#0f2555", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Click here
            </Typography>{" "}
            to explore our Virtual Office solutions.
          </Typography>
        </Box>

        {/* Steps - exactly 3 per row (2 rows), scrollable on mobile */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "2.2rem" },
              fontWeight: 700,
              color: "#0f2555",
              mb: 6,
            }}
          >
            Simplified Process for GST Registration
          </Typography>

          {(() => {
            const steps = [
              {
                number: "1",
                title: "Collect Required Documents",
                desc:
                  "Gather PAN, Aadhaar, business address proof, bank details, and photographs of the proprietor/partners/directors before starting the application.",
              },
              {
                number: "2",
                title: "Create GST Portal Account",
                desc:
                  "Visit the GST portal and create a temporary reference number (TRN) by verifying your mobile and email through OTP authentication.",
              },
              {
                number: "3",
                title: "Fill GST Application (Form GST REG-01)",
                desc:
                  "Complete the online application form with business details, promoter information, place of business, and upload scanned documents.",
              },
              {
                number: "4",
                title: "Verification & ARN Generation",
                desc:
                  "Submit the application using DSC or EVC. The system generates an Application Reference Number (ARN) for future tracking.",
              },
              {
                number: "5",
                title: "Application Review by Officer",
                desc:
                  "A GST officer reviews the application and documents. If any clarification is required, you may receive a notice for additional information.",
              },
              {
                number: "6",
                title: "Receive GSTIN & Certificate",
                desc:
                  "Upon approval, you will be issued a 15-digit GSTIN along with the GST Registration Certificate. You can now legally collect and pay GST.",
              },
            ];

            const rows = [steps.slice(0, 3), steps.slice(3, 6)];

            return rows.map((row, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: 2, // 16px between cards
                  overflowX: { xs: "auto", md: "visible" },
                  px: { xs: 1, md: 0 },
                  mb: idx === 0 ? 3 : 0,
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  "&::-webkit-scrollbar": { display: "none" },
                  "-msOverflowStyle": "none",
                  scrollbarWidth: "none",
                  justifyContent: { xs: "flex-start", md: "center" },
                }}
              >
                {row.map((step) => (
                  <Box
                    key={step.number}
                    sx={{
                      // Mobile/tablet: fixed card width for swipe
                      // Desktop: exact 1/3 of the row minus the two gaps (2 * 16px = 32px)
                      flex: {
                        xs: "0 0 88%",
                        sm: "0 0 360px",
                        md: "0 0 calc((100% - 32px) / 3)",
                      },
                      scrollSnapAlign: { xs: "start", md: "none" },
                      display: "flex",
                    }}
                  >
                    <Paper
                      elevation={6}
                      sx={{
                        bgcolor: "#f9fbff",
                        borderRadius: 2,
                        p: { xs: 3, md: 4 },
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 28px rgba(0,0,0,0.12)" },
                      }}
                    >
                      {/* Step number circle */}
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          bgcolor: "#0f2555",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1.2em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        {step.number}
                      </Box>

                      {/* Title and description (left-aligned like your screenshot) */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#0f2555",
                          mb: 1,
                          fontSize: "1.1em",
                          textAlign: "left",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, color: "#333", textAlign: "left" }}>
                        {step.desc}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            ));
          })()}
        </Box>

        {/* Why REKOTAX — always 3 per row on md+ */}
        <Box sx={{ mt: 14 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontSize: { xs: "2rem", md: "2.2rem" }, fontWeight: 700, color: "#0f2555", mb: 6 }}
          >
            Why REKOTAX
          </Typography>

          <Box
            sx={{
              mx: "auto",
              maxWidth: 1200,
              px: { xs: 2, md: 0 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
              gap: 3,
            }}
          >
            {[
              { icon: <Gavel sx={{ color: "#0f2555" }} />, text: "Govt. of India Authorized & Trusted" },
              { icon: <Group sx={{ color: "#0f2555" }} />, text: "Trusted by 1,000+ Founders Nationwide" },
              { icon: <WorkspacePremium sx={{ color: "#0f2555" }} />, text: "ISO-Certified for Quality Excellence" },
              { icon: <Security sx={{ color: "#0f2555" }} />, text: "Bank-Level Data Security You Can Rely On" },
              { icon: <AccountBalance sx={{ color: "#0f2555" }} />, text: "Guided by Experienced Legal & Tax Experts" },
              { icon: <AccessTime sx={{ color: "#0f2555" }} />, text: "Always On-Time. Every Time." },
              { icon: <Handshake sx={{ color: "#0f2555" }} />, text: "One-on-One Support from a Dedicated Expert" },
              { icon: <HeadsetMic sx={{ color: "#0f2555" }} />, text: "Fast, Friendly & Always Available Support" },
              { icon: <CurrencyRupee sx={{ color: "#0f2555" }} />, text: "Premium Service at Startup-Friendly Prices" },
            ].map((item, i) => (
              <Box key={i} sx={{ display: "flex" }}>
                <Box
                  sx={{
                    bgcolor: "#0f2555",
                    color: "#fff",
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  {/* Icon box with MUI icon */}
                  <Box
                    sx={{
                      bgcolor: "#b5b7bb",
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2.5,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Text */}
                  <Typography sx={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.4 }}>
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 6, md: 10 },
            fontFamily: "'Open Sans', sans-serif",
            color: "#333",
            lineHeight: 1.7,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              color: "#0f2555",
              mb: 4,
            }}
          >
            GST Registration in India – A Complete Guide for Businesses
          </Typography>

          {/* Introduction */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Introduction
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Goods and Services Tax (GST) is one of the most significant tax reforms in India. Introduced in July
            2017, GST replaced multiple indirect taxes like VAT, Service Tax, and Excise Duty with a single unified
            system. It simplified taxation and created a transparent business environment.
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Every business that crosses the prescribed turnover threshold or engages in specific taxable activities
            must obtain GST Registration. At <strong>Rekotax</strong>, we provide end-to-end support for GST
            registration and compliance, ensuring your business remains tax-ready, compliant, and hassle-free.
          </Typography>

          {/* What is GST Registration */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            What is GST Registration?
          </Typography>
          <Typography sx={{ mb: 4 }}>
            GST Registration is the process of enrolling a business under the GST law to obtain a unique{" "}
            <strong>15-digit GST Identification Number (GSTIN)</strong>. This number enables businesses to collect
            GST from customers, file tax returns, and claim input tax credit on purchases. Without GST registration,
            businesses cannot legally collect tax or avail credit on the GST paid to suppliers.
          </Typography>

          {/* Who Needs GST Registration */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Who Needs GST Registration?
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST registration is mandatory for certain categories of businesses and professionals. Below are the key
            groups that require GST registration:
          </Typography>
          <ul>
            <li>
              <strong>Businesses with turnover above the prescribed threshold:</strong> Any business that crosses the
              annual turnover limit set by GST law must obtain registration to comply with tax regulations.
            </li>
            <li>
              <strong>Inter-state suppliers of goods and services:</strong> Businesses involved in selling goods or
              services across state boundaries are required to register under GST regardless of turnover.
            </li>
            <li>
              <strong>E-commerce operators and aggregators:</strong> Online platforms facilitating the sale of goods
              or services are compulsorily required to obtain GST registration.
            </li>
            <li>
              <strong>Casual taxable persons:</strong> Businesses that occasionally supply goods or services in
              another state where they do not have a fixed place of business must register under GST.
            </li>
            <li>
              <strong>Non-resident taxable persons:</strong> Foreign businesses providing goods or services in India
              without a permanent establishment must register under GST.
            </li>
            <li>
              <strong>Businesses required to deduct or collect TDS/TCS:</strong> Specific entities like government
              departments or e-commerce operators that deduct/collect tax at source must be registered under GST.
            </li>
          </ul>

          {/* Threshold Limits */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            GST Threshold Limits (2025)
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST law prescribes turnover limits for mandatory registration. These limits ensure that small businesses
            are relieved from heavy compliance. The threshold limits are:
          </Typography>
          <ul>
            <li>
              <strong>₹40 lakhs for goods suppliers:</strong> Businesses engaged in supplying goods with turnover above
              ₹40 lakhs must register (₹20 lakhs in special category states).
            </li>
            <li>
              <strong>₹20 lakhs for service providers:</strong> Businesses offering services must register if turnover
              exceeds ₹20 lakhs (₹10 lakhs in special category states).
            </li>
          </ul>
          <Typography sx={{ mb: 4 }}>
            Voluntary registration is also available for businesses below the threshold. Opting for it offers benefits
            like input tax credit, better compliance records, and enhanced market reputation.
          </Typography>

          {/* Different Categories */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Different Categories under GST
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST law provides different types of registration categories to suit different types of businesses. They
            include:
          </Typography>
          <ul>
            <li>
              <strong>Regular Taxpayer:</strong> The most common category, where businesses file monthly or quarterly
              GST returns and comply with standard GST rules.
            </li>
            <li>
              <strong>Composition Scheme:</strong> Designed for small businesses with turnover up to ₹1.5 crore, this
              scheme allows them to pay GST at a fixed rate with simplified compliance.
            </li>
            <li>
              <strong>Casual Taxable Person:</strong> Suitable for businesses making occasional transactions in states
              where they don’t have a fixed place of business.
            </li>
            <li>
              <strong>Non-Resident Taxable Person:</strong> Applicable to foreign businesses supplying goods or
              services in India but without a permanent business location.
            </li>
            <li>
              <strong>E-commerce Operators:</strong> Online platforms that facilitate trade are responsible for
              collecting Tax Collected at Source (TCS).
            </li>
            <li>
              <strong>TDS/TCS Deductors:</strong> Government departments and e-commerce companies responsible for
              deducting or collecting GST at source fall under this category.
            </li>
          </ul>

          {/* GST Slab Rates */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            GST Slab Rates in India
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST in India is structured into multiple slab rates to categorize goods and services based on necessity and
            luxury. Below is a quick overview of the current GST rates:
          </Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", my: 3 }}>
            <thead>
              <tr>
                <Box component="th" sx={{ border: "1px solid #ddd", p: 2, bgcolor: "#0f2555", color: "#fff" }}>
                  GST Slab Rate
                </Box>
                <Box component="th" sx={{ border: "1px solid #ddd", p: 2, bgcolor: "#0f2555", color: "#fff" }}>
                  Applicable Goods/Services
                </Box>
              </tr>
            </thead>
            <tbody>
              {[
                ["0%", "Essential items like fresh fruits, vegetables, milk, eggs, and basic healthcare services remain tax-free."],
                ["5%", "Items of mass consumption like packaged food, edible oils, tea, coffee, coal, and economy-class air travel fall under this slab."],
                ["12%", "Processed foods, computers, medicines, and mobile phones are taxed at this moderate rate."],
                ["18%", "Consumer durables, financial services, telecom, industrial goods, and restaurants are generally taxed at 18%."],
                ["28%", "Luxury items such as high-end cars, tobacco, and aerated drinks fall under this highest slab."],
              ].map(([rate, desc]) => (
                <tr key={rate}>
                  <Box component="td" sx={{ border: "1px solid #ddd", p: 2 }}>
                    {rate}
                  </Box>
                  <Box component="td" sx={{ border: "1px solid #ddd", p: 2 }}>
                    {desc}
                  </Box>
                </tr>
              ))}
            </tbody>
          </Box>

          {/* Benefits */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Benefits of GST Registration
          </Typography>
          <ul>
            <li>
              <strong>Legal recognition:</strong> Your business is officially recognized as a supplier of goods and
              services under GST law.
            </li>
            <li>
              <strong>Input Tax Credit (ITC):</strong> Businesses can claim credit for the GST paid on purchases,
              reducing overall tax liability.
            </li>
            <li>
              <strong>Seamless inter-state trade:</strong> GST allows businesses to sell goods and services across
              states without additional restrictions.
            </li>
            <li>
              <strong>Enhanced credibility:</strong> Registered businesses gain more trust from customers, suppliers,
              and banks.
            </li>
            <li>
              <strong>Eligibility for government tenders:</strong> GST registration is mandatory for applying to most
              government contracts and tenders.
            </li>
            <li>
              <strong>Avoidance of penalties:</strong> Registering ensures compliance and saves businesses from heavy
              penalties and legal consequences.
            </li>
          </ul>

          {/* Why Register Even If Not Mandatory */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Why Register Even If Not Mandatory?
          </Typography>
          <ul>
            <li>
              <strong>Claim Input Tax Credit:</strong> Even small businesses can reduce costs by claiming ITC on their
              purchases.
            </li>
            <li>
              <strong>Increased customer trust:</strong> A GSTIN on invoices shows credibility and transparency to
              clients.
            </li>
            <li>
              <strong>Better business opportunities:</strong> Large companies prefer dealing with GST-compliant
              businesses, opening up new opportunities.
            </li>
            <li>
              <strong>Future readiness:</strong> Voluntary registration prepares your business for future growth
              without facing compliance delays later.
            </li>
          </ul>

          {/* Documents Required */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Documents Required for GST Registration
          </Typography>
          <ul>
            <li>
              <strong>PAN card:</strong> PAN of the business or applicant is mandatory for GST registration.
            </li>
            <li>
              <strong>Aadhaar card:</strong> Identification proof of the proprietor, partners, or directors.
            </li>
            <li>
              <strong>Business address proof:</strong> Electricity bill, rent agreement, or property documents to
              confirm business location.
            </li>
            <li>
              <strong>Bank account proof:</strong> Cancelled cheque or passbook copy to link bank details with GSTIN.
            </li>
            <li>
              <strong>Photographs:</strong> Passport-size photographs of proprietors, partners, or directors.
            </li>
            <li>
              <strong>Constitution documents:</strong> Incorporation certificate, partnership deed, or other applicable
              proof.
            </li>
            <li>
              <strong>Digital Signature Certificate:</strong> For companies and LLPs, DSC is required for secure
              filing.
            </li>
          </ul>

          {/* Step-by-Step Process */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Step-by-Step Process of GST Registration
          </Typography>
          <ol>
            <li>
              <strong>Document Collection & Verification:</strong> Gather and verify all necessary documents for
              accuracy.
            </li>
            <li>
              <strong>Application Filing:</strong> Submit the GST registration application online using Form GST REG-01
              on the GST portal.
            </li>
            <li>
              <strong>ARN Generation:</strong> After submission, an Application Reference Number (ARN) is generated to
              track the status.
            </li>
            <li>
              <strong>Verification by Officer:</strong> A GST officer reviews the application and may seek
              clarifications if needed.
            </li>
            <li>
              <strong>GSTIN Allotment:</strong> Once approved, the business receives a GSTIN and the GST Registration
              Certificate.
            </li>
          </ol>

          {/* Penalties */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Penalties for Not Registering Under GST
          </Typography>
          <ul>
            <li>
              <strong>10% penalty:</strong> If a business fails to register when required, a penalty of 10% of the tax
              amount due is imposed, with a minimum of ₹10,000.
            </li>
            <li>
              <strong>100% penalty:</strong> In cases of intentional tax evasion, the penalty can go up to 100% of the
              tax due.
            </li>
          </ul>

          {/* How Rekotax Can Help */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            How Rekotax Can Help You
          </Typography>
          <ul>
            <li>
              <strong>End-to-end assistance:</strong> From document preparation to application approval, we handle the
              entire process.
            </li>
            <li>
              <strong>Error-free filing:</strong> We ensure all documents are accurate and filed correctly to avoid
              rejections.
            </li>
            <li>
              <strong>Expert guidance:</strong> Our professionals provide clarity on GST rules, compliance, and future
              filings.
            </li>
            <li>
              <strong>Ongoing compliance support:</strong> Beyond registration, we also help with GST return filing and
              notices.
            </li>
            <li>
              <strong>Dedicated one-on-one support:</strong> A dedicated expert is assigned to assist you throughout
              the process.
            </li>
          </ul>

          {/* Conclusion */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Conclusion
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST registration is more than a legal formality — it strengthens credibility, ensures compliance, and
            facilitates business growth. Whether mandatory or voluntary, registering under GST gives your business a
            competitive edge.
          </Typography>
          <Typography>
            At <strong>Rekotax</strong>, we make GST registration simple, transparent, and reliable. Contact us today
            to get your business GST-registered without any hassle.
          </Typography>
        </Box>


        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            my: { xs: 6, md: 10 },
            px: { xs: 2, md: 0 },
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: "25px",            // consistent heading size
              fontWeight: 700,
              mb: 6,
              color: "#0f2555",
            }}
          >
            GST Registration FAQs
          </Typography>

          {[
            {
              q: "1. What is GST Registration and why is it required in India?",
              a: "GST Registration is the process by which a business gets enrolled under Goods and Services Tax (GST) and receives a unique 15-digit GSTIN. It is required for legally collecting GST from customers, claiming input tax credit, and ensuring smooth business operations in compliance with Indian tax laws.",
            },
            {
              q: "2. Who is mandatorily required to register under GST?",
              a: "Businesses with turnover exceeding ₹40 lakhs (₹20 lakhs for services and ₹10 lakhs in special category states), inter-state suppliers, e-commerce operators, casual/non-resident taxable persons, and entities liable for TDS/TCS must register mandatorily under GST.",
            },
            {
              q: "3. What is the turnover limit for GST Registration in 2025?",
              a: "For 2025, GST Registration is mandatory for goods suppliers with turnover above ₹40 lakhs (₹20 lakhs in special states) and service providers above ₹20 lakhs (₹10 lakhs in special states).",
            },
            {
              q: "4. Can a business apply for GST voluntarily even below threshold?",
              a: "Yes. Businesses can apply for GST Registration voluntarily even if their turnover is below the threshold. Voluntary registration helps claim input tax credit, build credibility, and expand business opportunities with GST-compliant clients.",
            },
            {
              q: "5. How long does it take to get a GSTIN after applying?",
              a: "Typically, it takes 3–7 working days to receive a GSTIN after applying, provided all documents are valid and there are no queries raised by GST authorities.",
            },
            {
              q: "6. What are the documents required for GST Registration?",
              a: "The documents include PAN card, Aadhaar card, business address proof, bank proof (cancelled cheque or passbook), passport-size photos, incorporation certificate/partnership deed, and DSC for companies/LLPs.",
            },
            {
              q: "7. Is GST Registration different for goods and service providers?",
              a: "Yes. While the registration process is the same, the turnover threshold for mandatory GST registration differs: ₹40 lakhs for goods suppliers and ₹20 lakhs for service providers.",
            },
            {
              q: "8. What are the different types of GST Registration categories?",
              a: "Categories include: Regular Taxpayer, Composition Scheme, Casual Taxable Person, Non-Resident Taxable Person, E-commerce Operator, and TDS/TCS Deductors.",
            },
            {
              q: "9. What is the penalty for not registering under GST?",
              a: "Non-registration attracts a penalty of 10% of the tax due (minimum ₹10,000). In cases of deliberate tax evasion, penalties can reach 100% of the tax amount due.",
            },
            {
              q: "10. Can I run my business without GST Registration?",
              a: "No, if you are required by law to register, running a business without GSTIN is illegal and may result in heavy penalties and legal consequences.",
            },
            {
              q: "11. Is GST Registration free of cost?",
              a: "Yes. The Government does not charge any fee for GST Registration. However, professional consultation ensures error-free application and compliance.",
            },
            {
              q: "12. Can I apply for GST Registration online myself?",
              a: "Yes. GST Registration can be done on the official GST portal. However, due to frequent technical errors and document requirements, businesses prefer professional assistance for smooth processing.",
            },
            {
              q: "13. What are GSTIN and ARN in GST Registration?",
              a: "GSTIN is the unique 15-digit Goods and Services Tax Identification Number provided after successful registration. ARN is the Application Reference Number generated upon submission of the GST application for tracking purposes.",
            },
            {
              q: "14. Can a single person have multiple GSTINs?",
              a: "Yes. A person can have multiple GSTINs for different states or business verticals, as GST is state-specific and based on place of supply.",
            },
            {
              q: "15. How to update or amend details after GST Registration?",
              a: "Businesses can update or amend details like address, email, and phone number through the GST portal by submitting Form GST REG-14 online.",
            },
            {
              q: "16. What are the GST slab rates in India?",
              a: "GST has five main slabs: 0% (essential items), 5% (mass consumption goods), 12% (processed food & medicines), 18% (services & durables), and 28% (luxury items and sin goods).",
            },
            {
              q: "17. What is the validity of GST Registration Certificate?",
              a: "GST Registration is valid until cancelled by the taxpayer or department. However, for casual and non-resident taxable persons, registration is valid for 90 days (extendable).",
            },
            {
              q: "18. Can GST Registration be cancelled?",
              a: "Yes. A taxpayer can apply for cancellation of GST Registration if business closes or turnover falls below the threshold. The GST officer may also cancel it for non-compliance.",
            },
            {
              q: "19. Is GST Registration mandatory for freelancers and consultants?",
              a: "Yes, if freelancers or consultants have turnover above ₹20 lakhs (₹10 lakhs in special states) or provide services to clients outside their state, GST Registration is mandatory.",
            },
            {
              q: "20. How can Rekotax help me in GST Registration?",
              a: "Rekotax offers end-to-end GST services including documentation, error-free filing, expert guidance, and post-registration compliance support — ensuring hassle-free GST Registration.",
            },
          ].map((faq, idx) => (
            <Accordion
              key={idx}
              disableGutters
              elevation={2}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#0f2555" }} />}
                sx={{
                  bgcolor: "#fff",
                  "&:hover": { bgcolor: "#f7f9fc" },
                  borderRadius: 2,
                  fontWeight: 600,
                  color: "#0f2555",
                }}
              >
                {faq.q}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "#fafbfc",
                  fontSize: "0.95rem",
                  color: "#444",
                  lineHeight: 1.6,
                }}
              >
                {faq.a}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>


      </Container>

      <Box
         sx={{
          mt: 0,
          mb: 0,
          pb: 0,
          mx: { xs: 2, md: -4 },
        }}
        ref={footerRef}
      >
        <ContactSection />
      </Box>


      <Box
        sx={{
          mt: 0,
          mb: 0,
          pb: 0,
          mx: { xs: 2, md: -4 },
        }}
        ref={footerRef}
      >
        <Footer />
      </Box>
    </Box>
  );
}
