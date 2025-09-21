import React from "react";
import {
  Box, Grid, Button, Typography, List, ListItem, ListItemText, Accordion,
  AccordionSummary, AccordionDetails, Container

} from "@mui/material";
import { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../../../Dashboard/Footer";
import ContactSection from "../../../Dashboard/ContactSection";
const BrandColor = "#0f2555";

const InfoCard = ({ title, description }) => (
  <Box
    sx={{
      backgroundColor: "#f3f6fb",
      borderRadius: 2,
      p: 3,
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      },
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 700, color: BrandColor, mb: 1.5 }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: "#444" }}>
      {description}
    </Typography>
  </Box>
);

export default function ImportExportCode() {
  const footerRef = useRef(null);

  const faqs = [
    {
      q: "What is an Import-Export Code (IEC)?",
      a: "An Import-Export Code (IEC) is a unique 10-digit number issued by the DGFT (Director General of Foreign Trade) that is mandatory for any business or individual to start an import-export business in India."
    },
    {
      q: "Who needs to obtain an IEC?",
      a: "Any person or entity looking to import goods into India or export goods from India must have an IEC. It is required for customs clearance, international trade payments, and availing benefits under the Foreign Trade Policy."
    },
    {
      q: "What are the main benefits of having an IEC?",
      a: "The key benefits include legal access to global markets, eligibility for government export schemes, lifetime validity with no renewal hassles, and simplified customs and banking procedures."
    },
    {
      q: "Is there any renewal required for an IEC?",
      a: "No, an IEC has lifetime validity and does not require any renewal. However, it is mandatory to update your IEC details on the DGFT portal annually between April and June to keep it active."
    },
    {
      q: "What documents are needed for IEC registration?",
      a: "You will need a digital copy of the PAN card, identity proof (Aadhaar/Voter ID), proof of business address, and a cancelled cheque or bank certificate of the business's current account."
    },
    {
      q: "How long does it take to get an IEC?",
      a: "Once the online application is submitted with all the correct documents, the IEC is typically issued by the DGFT within 3-5 working days."
    },
    {
      q: "Can an individual apply for an IEC?",
      a: "Yes, both individuals (as proprietors) and business entities like partnership firms, LLPs, and companies can apply for and obtain an IEC."
    },
    {
      q: "Is GST registration mandatory to get an IEC?",
      a: "While GST registration is not a mandatory prerequisite to apply for an IEC, it is required for claiming GST refunds on exports. Most businesses involved in regular trade will need both."
    },
    {
      q: "What happens if I don't update my IEC annually?",
      a: "Failure to update your IEC details on the DGFT portal between April and June each year will result in the deactivation of your IEC, which will halt all your import and export activities until it is reactivated."
    },
    {
      q: "How can Rekotax help with IEC registration?",
      a: "Rekotax offers a complete end-to-end service for IEC registration. We assist with document preparation, ensure an error-free online application, and provide support for annual updates, making the entire process fast and seamless for you."
    }
  ];
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
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ backgroundColor: "#fff", color: "#333", lineHeight: 1.6, py: 6, px: { xs: 2, md: 6 } }}>
      <Box
        sx={{
          background: "linear-gradient(90deg,#0f2555 0%,#0f3d7c 100%)",
          color: "#fff",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Pill>Online Import-Export Code Registration Services in India</Pill>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
              mb: 2,
            }}
          >
            Fast, Accurate, and Hassle-free Import-Export Code (IEC) Registration
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
            An Import-Export Code (IEC) is the essential first step for any business aiming to enter the global marketplace, 
            serving as the primary license for importing and exporting goods. At Rekotax, we manage the entire IEC registration from start to finish, 
            ensuring you can focus on expanding your business internationally while we handle the foundational legal requirements.
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
            {["Typical approvals: 5-7 days*", "CA/CS assisted end-to-end", "Paperless & transparent tracking"].map(
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

      <Typography
        variant="h3"
        sx={{ textAlign: "center", color: BrandColor, fontWeight: 700, mb: 6, mt: 4 }}
      >
        Know All About IEC Registration
      </Typography>

      {/* Intro Row */}
      <Grid container spacing={5} justifyContent="space-between">
        <Grid item xs={12} md={7}>
          <Typography variant="h5" sx={{ color: BrandColor, fontWeight: 700, mb: 2 }}>
            What is an Import-Export Code (IEC)?
          </Typography>
          <Typography variant="body1" paragraph>
            An <strong>Import-Export Code (IEC)</strong> is a unique 10-digit identification number issued by the
            Director General of Foreign Trade (DGFT). It is a mandatory prerequisite for any business or individual
            looking to start an import or export business in India.
          </Typography>
          <Typography variant="body1" paragraph>
            Without an IEC, you cannot import goods into India or export them to other countries.
            It is the primary document required for customs clearance, international bank transactions,
            and availing benefits under various export promotion schemes.
          </Typography>
        </Grid>
      </Grid>

      {/* Key Features */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ color: BrandColor, fontWeight: 700, mb: 3 }}>
          Key Features of IEC Registration
        </Typography>
        <ul style={{ marginLeft: "20px", color: "#444", fontSize: "1rem" }}>
          <li>Acts as the primary <strong>license for import and export</strong> activities</li>
          <li>Carries <strong>lifetime validity</strong> and requires no renewal</li>
          <li>A PAN-based registration, meaning one PAN card can have only one IEC</li>
          <li>No need to file any returns or follow complex post-registration compliance</li>
          <li>Essential for <strong>customs clearance</strong> and foreign bank transfers</li>
        </ul>
      </Box>

      {/* Who Needs an IEC */}
      <Box sx={{ mt: 10 }}>
        <Typography
          variant="h5"
          sx={{ color: BrandColor, fontWeight: 700, mb: 3 }}
        >
          Who Needs an IEC?
        </Typography>

        <Grid
          container
          wrap="nowrap"
          spacing={2}
          sx={{
            overflowX: { xs: "auto", md: "visible" },
            px: { xs: 1, md: 0 },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            "&::-webkit-scrollbar": { display: "none" },
            "-msOverflowStyle": "none",
            scrollbarWidth: "none",
          }}
          justifyContent={{ xs: "flex-start", md: "center" }}
        >
          {[
            {
              title: "Importers",
              desc: <>Any business or individual bringing goods <strong>into India</strong> from a foreign country.</>,
            },
            {
              title: "Exporters",
              desc: <>Businesses or individuals sending goods or services <strong>from India</strong> to other countries.</>,
            },
            {
              title: "Service Providers",
              desc: <>Service providers who wish to avail benefits under the <strong>Foreign Trade Policy</strong>.</>,
            },
          ].map((card) => (
            <Grid
              item
              key={card.title}
              sx={{
                minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: exactly 1/3 each
                flex: { xs: "0 0 auto", md: "1 1 0%" },
                scrollSnapAlign: { xs: "start", md: "none" },
                pr: { xs: 1, md: 0 },
              }}
            >
              <InfoCard title={card.title} description={card.desc} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits of IEC */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" sx={{ color: BrandColor, fontWeight: 700, mb: 3 }}>
          Benefits of IEC Registration
        </Typography>
        <Typography variant="body1" sx={{ color: "#444", mb: 4 }}>
          Securing an IEC is the first step to unlocking global business opportunities.
          It is not just a legal requirement but a gateway to international trade,
          enabling businesses to expand their reach, access new markets,
          and benefit from government schemes.
        </Typography>

        {/* Two rows of three cards each */}
        {[
          [
            {
              title: "Gateway to Global Markets",
              desc: <>Legally access international markets for <strong>buying and selling</strong> goods and services.</>,
            },
            {
              title: "Lifetime Validity",
              desc: <>No need for renewals, making it a <strong>one-time, hassle-free</strong> registration.</>,
            },
            {
              title: "Unlocks Trade Benefits",
              desc: <>Become eligible for various government <strong>export promotion schemes</strong> and subsidies.</>,
            },
          ],
          [
            {
              title: "Simplifies Customs Clearance",
              desc: <>Mandatory for clearing shipments with <strong>customs authorities</strong> smoothly.</>,
            },
            {
              title: "Easy Bank Transactions",
              desc: <>Required by banks for sending or receiving <strong>foreign currency</strong> for trade.</>,
            },
            {
              title: "No Compliance Burden",
              desc: <>No need to file any returns or follow complex <strong>post-registration compliance</strong> for IEC.</>,
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
              mb: idx === 0 ? 4 : 0,
              scrollSnapType: { xs: "x mandatory", md: "none" },
              "&::-webkit-scrollbar": { display: "none" },
              "-msOverflowStyle": "none",
              scrollbarWidth: "none",
            }}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            {row.map((card) => (
              <Grid
                item
                key={card.title}
                sx={{
                  minWidth: { xs: 260, sm: 300, md: 1 / 3 },
                  flex: { xs: "0 0 auto", md: "1 1 0%" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  pr: { xs: 1, md: 0 },
                }}
              >
                <InfoCard title={card.title} description={card.desc} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>

      <Box sx={{ py: 8, px: { xs: 2, md: 6 }, backgroundColor: "#fff", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#0f2555", mb: 6 }}
        >
          Our IEC Registration Packages
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Essentials */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "#f9fbff",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box sx={{ backgroundColor: "#3f5177", color: "#fff", fontWeight: 700, fontSize: "1.4rem", py: 2, borderRadius: "12px 12px 0 0" }}>
                Essentials
              </Box>
              <Box sx={{ textAlign: "left", p: 3 }}>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#444" }}>
                  <li>IEC Registration Application</li>
                  <li>Document Verification</li>
                  <li>Online Filing with DGFT</li>
                  <li>e-IEC Certificate Issuance</li>
                </ul>
              </Box>
              <Box sx={{ mt: "auto", borderTop: "1px solid #ddd", p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f2555" }}>
                  ₹ 1,499/-
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                  (Inclusive of taxes)
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0f2555",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#0eb733" },
                  }}
                >
                  Select Plan
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Advanced */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "#f9fbff",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box sx={{ backgroundColor: "#0f2555", color: "#fff", fontWeight: 700, fontSize: "1.4rem", py: 2, borderRadius: "12px 12px 0 0" }}>
                Advanced
              </Box>
              <Box sx={{ textAlign: "left", p: 3 }}>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#444" }}>
                  <li>All services from Essentials Plan</li>
                  <li><strong>GST Registration</strong></li>
                  <li>Assistance with First Annual Updation</li>
                  <li>AD Code Registration Support</li>
                </ul>
              </Box>
              <Box sx={{ mt: "auto", borderTop: "1px solid #ddd", p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f2555" }}>
                  ₹ 2,999/-
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                  (Inclusive of taxes)
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0f2555",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#0eb733" },
                  }}
                >
                  Select Plan
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* All-Inclusive */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: "#f9fbff",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(118deg, #0f2555, #023691)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  py: 2,
                  borderRadius: "12px 12px 0 0",
                }}
              >
                All-Inclusive
              </Box>
              <Box sx={{ textAlign: "left", p: 3 }}>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#444" }}>
                  <li>All services from Essentials & Advanced Plan</li>
                  <li><strong>GST Filing for 12 Months</strong></li>
                  <li>LUT Filing Assistance</li>
                  <li>Dedicated Expert Consultation</li>
                </ul>
              </Box>
              <Box sx={{ mt: "auto", borderTop: "1px solid #ddd", p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f2555" }}>
                  ₹ 8,999/-
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                  (Inclusive of taxes)
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0f2555",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#0eb733" },
                  }}
                >
                  Select Plan
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body1"
          sx={{ mt: 6, fontSize: "1rem", color: "#333" }}
        >
          Need help with other business registrations?{" "}
          <a
            href="https://www.rekotax.com/online-store"
            target="_blank"
            style={{ color: "#0f2555", fontWeight: 600, textDecoration: "none" }}
          >
            Click here
          </a>{" "}
          to explore all our services.
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          py: 8,
          px: { xs: 2, md: 6 },
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#0f2555", mb: 6 }}
        >
          Simplified Process for IEC Registration
        </Typography>

        {[
          [
            {
              num: "1",
              title: "Prepare Your Documents",
              desc: "Gather the necessary documents, including the PAN card, Aadhaar card, proof of business address (like a rent agreement or electricity bill), and a cancelled cheque for bank account verification.",
            },
            {
              num: "2",
              title: "Register on DGFT Portal",
              desc: "Visit the official Director General of Foreign Trade (DGFT) portal. Register as a new user by providing and verifying your mobile number and email address via OTP.",
            },
            {
              num: "3",
              title: "Fill the Application Form",
              desc: "Log in to the portal and fill out the online application form (ANF-2A). You will need to enter details about your business, directors/partners, and bank account information accurately.",
            },
          ],
          [
            {
              num: "4",
              title: "Upload Documents",
              desc: "Scan and upload the required documents as per the specified format and size. This includes your address proof and the cancelled cheque.",
            },
            {
              num: "5",
              title: "Pay the Government Fee",
              desc: "Proceed to pay the prescribed government application fee through the online payment gateway. The fee is non-refundable.",
            },
            {
              num: "6",
              title: "Receive Your IEC Certificate",
              desc: "After successful submission and verification, the DGFT will issue your 10-digit IEC. You can download the e-IEC certificate directly from the portal.",
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
              mb: idx === 0 ? 4 : 0,
              scrollSnapType: { xs: "x mandatory", md: "none" },
              "&::-webkit-scrollbar": { display: "none" },
              "-msOverflowStyle": "none",
              scrollbarWidth: "none",
            }}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            {row.map((card) => (
              <Grid
                item
                key={card.title}
                sx={{
                  minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: exactly three per row
                  flex: { xs: "0 0 auto", md: "1 1 0%" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  pr: { xs: 1, md: 0 },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#f3f6fb",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: "#0f2555",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      mx: "auto",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    {card.num}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f2555", mb: 1.5 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333", textAlign: "left", fontSize: "0.95em", lineHeight: 1.6 }}>
                    {card.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>



      <Box
        sx={{
          backgroundColor: "#ffffff",
          py: 8,
          px: { xs: 2, md: 6 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#0f2555", mb: 6 }}
        >
          Why REKOTAX
        </Typography>

        {[
          [
            { icon: "fas fa-certificate", text: "Govt. of India Authorized & Trusted" },
            { icon: "fas fa-users", text: "Trusted by 1,000+ Founders Nationwide" },
            { icon: "fas fa-award", text: "ISO-Certified for Quality Excellence" },
          ],
          [
            { icon: "fas fa-shield-alt", text: "Bank-Level Data Security You Can Rely On" },
            { icon: "fas fa-user-tie", text: "Guided by Experienced Legal & Tax Experts" },
            { icon: "fas fa-clock", text: "Always On-Time. Every Time." },
          ],
          [
            { icon: "fas fa-hands-helping", text: "One-on-One Support from a Dedicated Expert" },
            { icon: "fas fa-headset", text: "Fast, Friendly & Always Available Support" },
            { icon: "fas fa-rupee-sign", text: "Premium Service at Startup-Friendly Prices" },
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
              mb: idx < 2 ? 4 : 0,
              scrollSnapType: { xs: "x mandatory", md: "none" },
              "&::-webkit-scrollbar": { display: "none" },
              "-msOverflowStyle": "none",
              scrollbarWidth: "none",
            }}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            {row.map((card) => (
              <Grid
                item
                key={card.text}
                sx={{
                  minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: exactly three per row
                  flex: { xs: "0 0 auto", md: "1 1 0%" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  pr: { xs: 1, md: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#0f2555",
                    color: "#fff",
                    borderRadius: 2,
                    px: 3,
                    py: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#b5b7bb",
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <i className={card.icon} style={{ color: "#0f2555", fontSize: 20 }} />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>
                    {card.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>


      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 8 },
          backgroundColor: "#fff",
          color: "#333",
          lineHeight: 1.7,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#0f2555",
            fontWeight: 700,
            mb: 4,
          }}
        >
          IEC Registration in India – A Complete Guide for Importers & Exporters
        </Typography>

        {/* Introduction */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 4, mb: 2 }}>
          Introduction to IEC Registration
        </Typography>
        <Typography paragraph>
          For any business aspiring to engage in international trade, the <strong>Import-Export Code (IEC)</strong> is the first and most crucial requirement. Issued by the Director General of Foreign Trade (DGFT), the IEC is a mandatory license that enables businesses to import goods into India and export them to global markets.
        </Typography>
        <Typography paragraph>
          Obtaining an IEC is the foundational step to unlocking your business's global potential. At <strong>Rekotax</strong>, we specialize in providing a seamless and efficient IEC registration service, ensuring you can focus on your international expansion while we handle the essential legal formalities.
        </Typography>

        {/* What is IEC */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          What is an Import-Export Code (IEC)?
        </Typography>
        <Typography paragraph>
          An Import-Export Code is a unique <strong>10-digit identification number</strong> linked to a business's or individual's PAN card. It is a mandatory requirement for clearing customs, processing international payments, and availing benefits under India's Foreign Trade Policy. Without a valid IEC, no entity can legally conduct import or export activities.
        </Typography>

        {/* Who Needs an IEC */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Who Needs an IEC Registration?
        </Typography>
        <Typography paragraph>
          IEC registration is mandatory for any person or entity involved in the cross-border trade of goods and services. This includes:
        </Typography>
        <List sx={{ pl: 3 }}>
          {[
            "Importers: Any business that needs to clear customs for bringing goods into India.",
            "Exporters: Any business that sends goods to another country and needs to send shipments.",
            "Service Providers: Service or technology providers who want to avail benefits under the Foreign Trade Policy for their exports.",
            "E-commerce Operators: Online sellers and platforms dealing with customers in foreign countries.",
          ].map((item) => (
            <ListItem key={item} sx={{ py: 0 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Typography paragraph>
          Essentially, if your business transactions involve foreign remittance or customs, an IEC is indispensable.
        </Typography>

        {/* Key Features */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Key Features of IEC Registration
        </Typography>
        <Typography paragraph>
          The IEC registration comes with several distinct features that make it business-friendly:
        </Typography>
        <List sx={{ pl: 3 }}>
          {[
            "Lifetime Validity: Once an IEC is issued, it is valid for the lifetime of the entity and requires no renewal.",
            "No Return Filing: Unlike other tax registrations, IEC holders are not required to file any periodic returns.",
            "PAN-Based: The IEC is linked to the PAN of the business. One PAN can have only one IEC.",
            "Quick Processing: The application process is entirely online and is generally processed within a few working days.",
          ].map((item) => (
            <ListItem key={item} sx={{ py: 0 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        {/* Benefits */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Benefits of IEC Registration
        </Typography>
        <Typography paragraph>
          Registering for an IEC opens up a world of opportunities and offers tangible benefits:
        </Typography>
        <List sx={{ pl: 3 }}>
          {[
            "Global Market Access: It is the primary license that legally allows you to expand your business to international markets.",
            "Unlocks Export Benefits: An IEC is necessary to avail benefits from the DGFT, Customs, and Export Promotion Councils under various schemes.",
            "Simplifies Customs Clearance: It is a mandatory document for clearing shipments with customs authorities, ensuring smooth logistics.",
            "Facilitates International Banking: Banks require an IEC for processing transactions involving foreign currency for import or export purposes.",
            "Enhances Business Credibility: Having an IEC adds to the credibility of your business when dealing with international clients and partners.",
          ].map((item) => (
            <ListItem key={item} sx={{ py: 0 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        {/* Documents Required */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Documents Required for IEC Registration
        </Typography>
        <Typography paragraph>
          The application process for an IEC is digital and requires the following key documents:
        </Typography>
        <List sx={{ pl: 3 }}>
          {[
            "PAN Card: A digital copy of the PAN card of the individual or the business entity.",
            "Identity Proof: Aadhaar card, Voter ID, or Passport of the applicant.",
            "Address Proof: A utility bill (electricity or telephone), rent agreement, or sale deed of the business premises.",
            "Bank Account Proof: A cancelled cheque or a bank certificate of the business's current account.",
          ].map((item) => (
            <ListItem key={item} sx={{ py: 0 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        {/* Step-by-Step Process */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Step-by-Step Process for IEC Registration
        </Typography>
        <Typography paragraph>The IEC application process is handled online through the DGFT portal:</Typography>
        <List sx={{ listStyleType: "decimal", pl: 4 }}>
          {[
            "Portal Registration: Register on the official DGFT website by verifying your mobile number and email.",
            "Application Filing: Log in and fill out the online application form (ANF-2A) with accurate business, director/partner, and bank details.",
            "Document Upload: Upload scanned copies of all the required documents in the prescribed format.",
            "Fee Payment: Pay the requisite government application fee using the online payment options.",
            "IEC Issuance: Once the application is submitted and verified by the department, the e-IEC certificate is generated and can be downloaded from the portal.",
          ].map((item) => (
            <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        {/* Updating IEC */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Updating Your IEC
        </Typography>
        <Typography paragraph>
          While IEC has lifetime validity, it is mandatory for every IEC holder to update their details on the DGFT portal annually between April and June. Failure to do so can result in the deactivation of the IEC. This ensures that the information in the DGFT database remains current.
        </Typography>

        {/* How Rekotax Helps */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          How Rekotax Can Help You
        </Typography>
        <Typography paragraph>At Rekotax, we simplify the entire IEC registration process. Our services include:</Typography>
        <List sx={{ pl: 3 }}>
          {[
            "Complete Documentation Support: We assist in preparing and verifying all required documents for a flawless application.",
            "Error-Free Application Filing: Our experts handle the online submission to ensure accuracy and avoid rejections.",
            "Fast and Efficient Processing: We manage the entire process to get your IEC issued in the shortest possible time.",
            "Post-Registration Support: We provide guidance on annual updates and other compliance matters related to foreign trade.",
          ].map((item) => (
            <ListItem key={item} sx={{ py: 0 }}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        {/* Conclusion */}
        <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
          Conclusion
        </Typography>
        <Typography paragraph>
          An Import-Export Code is more than just a number; it's your passport to the world of international business. It is the first and most critical step in taking your products and services to a global audience, ensuring compliance and unlocking numerous government benefits.
        </Typography>
        <Typography paragraph>
          Let <strong>Rekotax</strong> be your partner in this journey. Contact us today for a swift and professional IEC registration experience, and take your business across borders.
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          my: { xs: 4, md: 8 },
          px: { xs: 2, md: 4 }
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 700, mb: 4, color: "#0f2555" }}
        >
          Frequently Asked Questions (FAQs)
        </Typography>

        {faqs.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#0f2555" }} />}
              sx={{
                backgroundColor: "#fff",
                "&:hover": { backgroundColor: "#f7f9fc" },
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "#0f2555" }}>
                {index + 1}. {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#fafbfc", color: "#444" }}>
              <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6 }}>
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
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
