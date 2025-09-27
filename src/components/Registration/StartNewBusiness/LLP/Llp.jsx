import React from "react";
import { useRef, useState } from "react";
import Footer from "../../../Dashboard/Footer";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ContactSection from "../../../Dashboard/ContactSection";
const theme = createTheme({
  typography: {
    fontFamily:
      'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h6: { fontWeight: 700 },
  },
  palette: {
    primary: { main: "#0f3d7c" },
    background: { default: "transparent" },
  },
  shape: { borderRadius: 12 },
});

const cardData = [
  {
    title: "Company-Related Documents",
    items: [
      "3–4 proposed company name options",
      "Description of business activities and objectives",
      "Details of authorized and paid-up capital",
      "Shareholding pattern",
      "Draft Memorandum of Association (MOA)",
      "Draft Articles of Association (AOA)",
      "Board resolution for appointment of first directors",
    ],
  },
  {
    title: "For Directors & Shareholders",
    items: [
      "PAN Card & Aadhaar Card (for Indian nationals)",
      "Passport (for foreign nationals/NRIs)",
      "Passport-sized photograph",
      "Residential proof (utility bill not older than 2 months)",
      "Personal bank statement (not older than 2 months)",
      "Voter ID or Driving License",
      "Mobile number linked with Aadhaar",
      "Email ID",
      "Specimen signature",
      "For foreign nationals: notarized and apostilled documents",
    ],
  },
  {
    title: "For Registered Office",
    items: [
      "Recent utility bill or property tax receipt (not older than 2 months)",
      "No Objection Certificate (NOC) from the owner (if rented)",
      "Copy of rent/lease agreement (if applicable)",
      "Proof of ownership or occupancy",
    ],
  },
];

export default function Llp() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: "What is an LLP (Limited Liability Partnership)?",
      a: "An LLP is a hybrid business structure that combines the flexibility of a partnership with the limited liability of a company. It offers legal protection to its partners and is governed under the LLP Act, 2008.",
    },
    {
      q: "How many partners are required to start an LLP?",
      a: "A minimum of two partners is required to form an LLP. There is no upper limit to the number of partners in an LLP.",
    },
    {
      q: "Is a Digital Signature Certificate (DSC) mandatory for LLP registration?",
      a: "Yes, a valid DSC is mandatory for all designated partners to sign electronic documents during the LLP incorporation process.",
    },
    {
      q: "What documents are required to register an LLP in India?",
      a: "Documents include PAN, Aadhaar or passport, address proof of partners, rental agreement or utility bill for the office, NOC from landlord, and the LLP agreement.",
    },
    {
      q: "Is LLP registration recognized across India?",
      a: "Yes, once registered, an LLP has nationwide validity and can operate its business across India.",
    },
    {
      q: "Can foreign nationals or NRIs become partners in an LLP?",
      a: "Yes, foreign nationals and NRIs can become partners in an LLP subject to compliance with the FDI guidelines and approval from the Reserve Bank of India if required.",
    },
    {
      q: "Is it mandatory to have a registered office address for the LLP?",
      a: "Yes, a registered office address within India is mandatory for receiving official communications from MCA and other authorities.",
    },
    {
      q: "How long does it take to register an LLP?",
      a: "Typically, it takes around 7 to 10 working days for the complete LLP registration process, depending on document verification and government approvals.",
    },
    {
      q: "Is an LLP required to file annual returns?",
      a: "Yes, LLPs must file Form 11 (Annual Return) and Form 8 (Statement of Account & Solvency) annually with the MCA, even if there’s no business activity.",
    },
    {
      q: "What is an LLP Agreement and is it compulsory?",
      a: "The LLP Agreement outlines the roles, responsibilities, profit-sharing ratios, and terms of management. It must be filed within 30 days of incorporation and is legally binding.",
    },
    {
      q: "Can an LLP be converted into a Private Limited Company?",
      a: "Yes, with proper compliance and regulatory approvals, an LLP can be converted into a Private Limited Company under Companies Act provisions.",
    },
    {
      q: "Is there a minimum capital requirement for forming an LLP?",
      a: "No, there is no minimum capital requirement to incorporate an LLP in India. It can be started with any amount agreed upon by the partners.",
    },
    {
      q: "Can an LLP be started from a residential address?",
      a: "Yes, an LLP can use a residential property as its registered office address as long as the necessary NOC from the property owner is obtained.",
    },
    {
      q: "What are the benefits of registering an LLP over a traditional partnership?",
      a: "LLPs offer limited liability protection, no requirement for audit below certain thresholds, perpetual succession, and easier compliance compared to traditional partnership firms.",
    },
    {
      q: "Can I register an LLP myself or do I need professional help?",
      a: "While technically possible, it is advisable to take professional assistance due to legal intricacies, documentation, and mandatory filings with the Ministry of Corporate Affairs (MCA).",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: BrandColor,
        color: "#fff",
        py: { xs: 6, md: 10 },
        //  px: { xs: 2, md: 1 },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Hero compo */}
        <Grid
          container
          spacing={6}
          alignItems="flex-start"
          justifyContent="space-between"
          wrap="nowrap" // keep both columns on one row (md+)
        >
          {/* LEFT: text (narrower, like your reference) */}
          <Grid item xs={12} md={3} zeroMinWidth sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 8, lineHeight: 1.2 }}
            >
              LLP Registration
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
              Register your Limited Liability Partnership (LLP) with Rekotax —{" "}
              <br /> experience fast setup, full legal compliance, expert <br />{" "}
              documentation, and dedicated support to launch your business
              effortlessly.
              <br />
            </Typography>

            <ul style={{ paddingLeft: "1rem", marginBottom: "1.5rem" }}>
              <li>
                Company Registered in Just <strong>7–10 Days</strong>
              </li>
              <li>
                <strong>End-to-End Documentation:</strong> Name Approval, MOA &
                AOA
              </li>
              <li>
                <strong>Complete Incorporation Kit:</strong> COI, DIN, DSC, PAN
                & TAN
              </li>
              <li>
                <strong>Trusted</strong> by Entrepreneurs, Backed by Industry
                Experts
              </li>
              <li>
                Handled by <strong>MCA-Registered Professionals</strong>
              </li>
            </ul>

            <Box
              sx={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                p: 2,
                maxWidth: 320,
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
                <strong>Fastest Company Registration in India</strong>
                <br />
                MCA filing in 7 days or full refund guaranteed.
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT: form (wider, like your reference) */}
          <Grid item xs={12} md={9} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                ml: { md: 2 }, // small gutter on desktop
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                maxWidth: 720, // keep a nice readable width
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#d1d5db", textAlign: "center" }}
              >
                Get Expert Consultation
              </Typography>

              <TextField
                variant="filled"
                fullWidth
                label="Name*"
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />
              <TextField
                variant="filled"
                fullWidth
                label="Mobile No.*"
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />
              <TextField
                variant="filled"
                fullWidth
                label="Your email*"
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />
              <TextField
                variant="filled"
                fullWidth
                label="Message"
                multiline
                minRows={3}
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#000",
                  borderRadius: 10,
                  px: 6,
                  alignSelf: "center",
                  ":hover": { backgroundColor: "#222" },
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Cards grid */}
        <Box
          sx={{
            // py: { xs: 5, md: 10 },
            // px: { xs: -10, md: 8 },
            backgroundColor: "#f5f7fb",
          }}
        >
          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Documents Required
          </Typography>
          <Typography
            variant="h6" // smaller subtitle like the screenshot
            sx={{
              color: "#0f3d7c",
              fontWeight: 400,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            To register your LLP seamlessly, you’ll need to submit basic
            identity, address, and office-related documents.
          </Typography>
          <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              wrap="nowrap"
              sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
            >
              {cardData.map((card) => (
                <Grid
                  item
                  key={card.title}
                  xs={12}
                  md={4}
                  sx={{
                    flex: { xs: "1 1 100%", md: "1 1 33.33%" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: 3,
                      p: 4,
                      width: "100%",
                      maxWidth: 360,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: BrandColor,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <ul
                      style={{
                        textAlign: "left",
                        paddingLeft: "1.2rem",
                        color: "#333",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {card.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "8px" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 8, md: 10 }, // top spacing to clear navbar or previous section
              mb: { xs: 6, md: 8 }, // space below before next content
              px: { xs: 2, md: 0 }, // side padding on small screens
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#4A5A7D", // main heading color
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Simplified Process to Register Your <br /> Your LLP in India
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#0f3d7c", // subtitle color
                fontWeight: 400,
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Setting up your LLP  is simpler than you think —
              especially with Rekotax guiding every step. Here’s a streamlined
              breakdown of the entire process:
            </Typography>
          </Box>
          <Box
            sx={{
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
              bgcolor: "transparent",
            }}
          >
            <Container maxWidth="lg">
              <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }} // wraps on smaller devices
              >
                {[
                  {
                    title: "Documents of Partners",
                    items: [
                      "PAN Card of all Indian partners",
                      "Aadhaar/Passport/Voter ID/Driving License",
                      "Latest address proof (utility bill or bank statement)",
                      "Recent passport-size photograph",
                      "Proof of Indian residency (for one designated partner)",
                      "Digital Signature Certificate (DSC)",
                      "Passport and visa (for foreign nationals)",
                    ],
                  },
                  {
                    title: "Registered Office Documents",
                    items: [
                      "Utility bill not older than 2 months (electricity, water, etc.)",
                      "Rent agreement or lease deed (if applicable)",
                      "No Objection Certificate (NOC) from the landlord",
                      "Ownership proof (property tax receipt or sale deed)",
                    ],
                  },
                  {
                    title: "Business-Related Documents",
                    items: [
                      "LLP Agreement draft with profit-sharing and roles",
                      "Description of proposed business activity",
                      "Capital contribution statement by each partner",
                      "Business plan or project report (if applicable)",
                    ],
                  },
                  {
                    title: "Additional Requirements",
                    items: [
                      "Professional certification (for CA, CS, legal LLPs)",
                      "Sector-specific licenses or regulatory approvals",
                      "FDI approval (for LLPs with foreign investment)",
                      "NOC from relevant authorities (if required)",
                    ],
                  },
                ].map((card, idx) => (
                  <Grid
                    item
                    key={idx}
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      flex: { xs: "1 1 100%", sm: "1 1 50%", md: "1 1 25%" },
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        background: "#fff",
                        borderRadius: 3,
                        p: 4,
                        width: "100%",
                        maxWidth: 320,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#0f3d7c",
                          mb: 2,
                          textAlign: "center",
                          fontFamily: "'Open Sans', sans-serif",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <ul
                        style={{
                          paddingLeft: "1.2rem",
                          color: "#333",
                          lineHeight: 1.8,
                          margin: 0,
                          fontFamily: "'Open Sans', sans-serif",
                        }}
                      >
                        {card.items.map((item, i) => (
                          <li key={i} style={{ marginBottom: "8px" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Our Approach
          </Typography>
          <Box
            sx={{
              backgroundColor: "transparent",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    num: 1,
                    text: "Fill our Registration Form & Make the Payment",
                  },
                  {
                    num: 2,
                    text: "Expert Will Call You & Receive All Necessary Documents",
                  },
                  {
                    num: 3,
                    text: "Will Create DSC & the DIN Number of Director",
                  },
                  {
                    num: 4,
                    text: "MOA and AOA Drafting & Submit",
                  },
                  {
                    num: 5,
                    text: "Your Documents will be Filed & Submitted to the ROC",
                  },
                  {
                    num: 6,
                    text: "Congratulations! You've registered your company. Certificates will be sent by post. 👍",
                  },
                ].map((step) => (
                  <Grid
                    key={step.num}
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 cards per row on md+ screens
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#0f2555",
                        color: "#fff",
                        borderRadius: 4,
                        width: 280,
                        height: 200,
                        p: 3,
                        position: "relative",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
                        {step.text}
                      </Typography>

                      {/* Arrow except for the last card */}
                      {step.num !== 6 && (
                        <Typography
                          sx={{
                            mt: 2,
                            fontSize: 20,
                            fontWeight: "bold",
                            display: "inline-block",
                          }}
                        >
                          →
                        </Typography>
                      )}

                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 20,
                          fontSize: 100,
                          fontWeight: "bold",
                          color: "#b5b7bb",
                          opacity: 0.2,
                          pointerEvents: "none",
                        }}
                      >
                        {step.num}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Why Rekotax ?
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {[
                  {
                    icon: "fa-certificate",
                    text: "Govt. of India Authorized & Trusted",
                  },
                  {
                    icon: "fa-users",
                    text: "Trusted by 1,000+ Founders Nationwide",
                  },
                  {
                    icon: "fa-award",
                    text: "ISO-Certified for Quality Excellence",
                  },
                  {
                    icon: "fa-shield-alt",
                    text: "Bank-Level Data Security You Can Rely On",
                  },
                  {
                    icon: "fa-user-tie",
                    text: "Guided by Experienced Legal & Tax Experts",
                  },
                  { icon: "fa-clock", text: "Always On-Time. Every Time." },
                  {
                    icon: "fa-hands-helping",
                    text: "One-on-One Support from a Dedicated Expert",
                  },
                  {
                    icon: "fa-headset",
                    text: "Fast, Friendly & Always Available Support",
                  },
                  {
                    icon: "fa-rupee-sign",
                    text: "Premium Service at Startup-Friendly Prices",
                  },
                ].map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 per row on md+
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 340,
                        backgroundColor: "#0f2555",
                        color: "white",
                        borderRadius: 2,
                        p: 2.5,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
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
                        <i
                          className={`fas ${item.icon}`}
                          style={{ color: "#0f2555", fontSize: 20 }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: 15,
                          fontWeight: 600,
                          lineHeight: 1.4,
                          flex: 1,
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            LLP Registration: A Complete Guide
          </Typography>
          <Box
  sx={{
    fontFamily: "'Open Sans', sans-serif",
    lineHeight: 1.7,
    maxWidth: "1000px",
    mx: "auto",
    backgroundColor: "#f4f6f8",
    color: "#333",
    p: 3,
  }}
>
  {/* What is LLP Registration */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      mb: 4,
    }}
  >
    <Typography variant="h4" sx={{ color: "#0f3d7c", mb: 2 }}>
      What is LLP (Limited Liability Partnership) Registration?
    </Typography>
    <Typography>
      Limited Liability Partnership (LLP) is a hybrid business structure that
      offers the benefits of a traditional partnership with the limited
      liability feature of a private company. Regulated under the LLP Act, 2008,
      an LLP is a separate legal entity that allows partners to manage the
      business flexibly while protecting their personal assets from business
      debts.
    </Typography>
  </Box>

  {/* Why Choose LLP */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      mb: 4,
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2 }}>
      Why Choose LLP?
    </Typography>
    <ul>
      <li>Ideal for service-based or small businesses with low initial investment</li>
      <li>Provides operational flexibility and limited liability protection</li>
      <li>No minimum capital requirement to start</li>
      <li>Separate legal identity for long-term credibility and contracts</li>
      <li>Tax benefits and exemption from audit (if turnover under ₹40 lakh)</li>
    </ul>
  </Box>

  {/* Types of LLP */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      mb: 4,
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2 }}>
      Types of LLP Registrations
    </Typography>
    <ul>
      <li>
        <strong>Professional LLP:</strong> Formed by professionals like CAs, CS,
        Architects, etc., for delivering services under a regulated body.
      </li>
      <li>
        <strong>Business LLP:</strong> For commercial ventures in manufacturing,
        trading, or consulting.
      </li>
      <li>
        <strong>Foreign LLP:</strong> LLPs that involve Foreign Direct
        Investment (FDI) under automatic or approval route.
      </li>
    </ul>
  </Box>

  {/* Key Features */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      mb: 4,
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2 }}>
      Key Features of an LLP
    </Typography>
    <ul>
      <li><strong>Minimum Two Partners:</strong> No upper limit on number of partners</li>
      <li><strong>Limited Liability:</strong> Each partner’s liability is limited to their contribution</li>
      <li><strong>Separate Legal Entity:</strong> LLP can own assets and enter into contracts</li>
      <li><strong>Low Compliance Cost:</strong> Compared to private limited companies</li>
      <li><strong>No Mandatory Audit:</strong> Required only if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh</li>
      <li><strong>Perpetual Succession:</strong> LLP continues irrespective of changes in partners</li>
      <li><strong>Flexible Management:</strong> Managed based on LLP Agreement and mutual decisions</li>
    </ul>
  </Box>

  {/* Benefits */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      mb: 4,
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2 }}>
      Benefits of LLP Registration
    </Typography>

    <Typography variant="h6" sx={{ mt: 2 }}>Separate Legal Identity</Typography>
    <ul>
      <li>Can own property, open bank accounts, and file legal cases</li>
      <li>Builds credibility among clients and stakeholders</li>
    </ul>

    <Typography variant="h6" sx={{ mt: 2 }}>Limited Liability Protection</Typography>
    <ul>
      <li>Partners are not personally responsible for business losses</li>
      <li>Protects individual assets against firm liabilities</li>
    </ul>

    <Typography variant="h6" sx={{ mt: 2 }}>No Minimum Capital Requirement</Typography>
    <ul>
      <li>LLP can be formed with any amount of capital</li>
      <li>Capital contribution can be in cash, assets, or even services</li>
    </ul>

    <Typography variant="h6" sx={{ mt: 2 }}>Taxation Benefits</Typography>
    <ul>
      <li>No Dividend Distribution Tax (DDT)</li>
      <li>Lower effective tax rates compared to companies</li>
    </ul>

    <Typography variant="h6" sx={{ mt: 2 }}>Ease of Formation and Flexibility</Typography>
    <ul>
      <li>Simple and online incorporation process</li>
      <li>Flexible internal structure as per LLP Agreement</li>
    </ul>
  </Box>

  {/* Post-Registration */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      mb: 4,
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2 }}>
      Post-Registration Compliance for LLPs
    </Typography>
    <ul>
      <li><strong>Form LLP Agreement:</strong> Must be filed in Form 3 within 30 days of incorporation</li>
      <li><strong>Maintain Books of Accounts:</strong> Even if audit not mandatory</li>
      <li><strong>File Annual Returns:</strong> Form 11 (Annual Return) and Form 8 (Statement of Accounts & Solvency)</li>
      <li><strong>Income Tax Return:</strong> Mandatory filing irrespective of turnover</li>
      <li><strong>GST Filing:</strong> If registered under GST, regular returns must be filed</li>
    </ul>
  </Box>

  {/* Certificate of Incorporation */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2 }}>
      Certificate of Incorporation: Legal Proof of LLP
    </Typography>
    <Typography>
      The Certificate of Incorporation (COI) issued by the Registrar of
      Companies includes:
    </Typography>
    <ul>
      <li>LLP Identification Number (LLPIN)</li>
      <li>Date of Incorporation</li>
      <li>Registered name and jurisdiction</li>
    </ul>
    <Typography sx={{ mt: 2 }}>COI is essential to:</Typography>
    <ul>
      <li>Open a current bank account</li>
      <li>Enter into commercial agreements</li>
      <li>Apply for PAN, TAN, and licenses</li>
      <li>Prove the legal existence of the LLP</li>
    </ul>
  </Box>
</Box>


          <Box sx={{ width: "100%", overflowX: "auto", my: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#6b7280", // soft grey tone
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2rem", md: "2.8rem" },
                lineHeight: 1.3,
                bgcolor: "#fff",
                textAlign: "center", // ✅ center the text
              }}
            >
              Comparisons
            </Typography>
            <Box sx={{ px: { xs: 2, md: 6 }, my: 4 }}>
              <Box
                component="table"
                sx={{
                  px: { xs: 2, md: 4 },
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: { xs: "13px", sm: "15px" },
                  tableLayout: "fixed",
                  bgcolor: "#fff",
                  minWidth: { xs: 800, md: "100%" },
                  "& th, & td": {
                    border: "1px solid #ddd",
                    p: "12px 15px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    color: "#333", // dark body text
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  },
                  "& thead th": {
                    backgroundColor: "#0f3d7c",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                  "& tbody tr:nth-of-type(even)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "& tbody tr:nth-of-type(odd)": {
                    backgroundColor: "#ffffff",
                  },
                  "& tbody td:first-of-type": {
                    textAlign: "left",
                    fontWeight: 600,
                    backgroundColor: "#f3f3f3",
                  },
                  "& tbody td:nth-of-type(3)": {
                    backgroundColor: "rgba(15,61,124,0.10)", // highlight Private Limited column
                    color: "#000",
                  },
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th"> </Box>
                    <Box component="th">One Person Company</Box>
                    <Box component="th">Private Limited Company</Box>
                    <Box component="th">Proprietorship Firm</Box>
                    <Box component="th">Limited Liability Partnership</Box>
                    <Box component="th">Partnership Firm</Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  <Box component="tr">
                    <Box component="td">Act</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">No Specified Act</Box>
                    <Box component="td">
                      Limited Liability Partnership Act, 2008
                    </Box>
                    <Box component="td">Indian Partnership Act, 1932</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Registration Requirement</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Optional</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Number of members</Box>
                    <Box component="td">Only 1</Box>
                    <Box component="td">2 – 200</Box>
                    <Box component="td"> Only 1</Box>
                    <Box component="td">2 – Unlimited</Box>
                    <Box component="td">2 – 50</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Separate Legal Entity</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Liability Protection</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Audit</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Not mandatory</Box>
                    <Box component="td">Dependent</Box>
                    <Box component="td">Not mandatory</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Ownership Transferability</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Uninterrupted Existence</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Foreign Participation</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Tax Rates</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Low</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Low</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Compliance</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Less</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Less</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Get Expert Consultation
          </Typography>

          {/*F&A Section*/}
      <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: { xs: 6, md: 8 },
        fontFamily: "'Open Sans', sans-serif",
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#0f2555",
          mb: 5,
          textAlign: "center",
        }}
      >
        Frequently Asked Questions (FAQs)
      </Typography>

      {faqs.map((faq, index) => (
        <Box
          key={index}
          onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            overflow: "hidden",
            cursor: "pointer",
            backgroundColor:
              activeIndex === index ? "#e9efff" : "#f6f8fc",
            transition: "background-color 0.3s ease",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2.5,
              position: "relative",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#0f2555",
              "&::after": {
                content: `"${activeIndex === index ? "−" : "+"}"`,
                position: "absolute",
                right: 24,
                fontSize: "1.5rem",
                fontWeight: 700,
                transition: "transform 0.3s ease",
              },
            }}
          >
            {faq.q}
          </Box>

          {activeIndex === index && (
            <Box
              sx={{
                px: 3,
                pb: 3,
                fontSize: "1rem",
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              {faq.a}
            </Box>
          )}
        </Box>
      ))}
    </Box>

          <ContactSection />
          <Footer />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

/*
USAGE:
- Save as src/components/PrivateLimitedCompanyDocs.jsx
- Add Open Sans font link to public/index.html.
- Import and render: <PrivateLimitedCompanyDocs />
*/
