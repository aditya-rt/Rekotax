import React from "react";
import { useRef } from "react";
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

export default function PrivateLimitedCompanyDocs() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);

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
              Private Limited Company Registration
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
              Register your Private Limited Company with Rekotax — experience
              fast setup,
              <br />
              full legal compliance, expert documentation, and dedicated support
              to launch <br />
              your business effortlessly.
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
            To register your Private Limited seamlessly, you’ll need to submit
            basic identity, address, and office-related documents.
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
              Simplified Process to Register Your <br /> Private Limited in
              India
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
              Setting up your Private Limited is simpler than you think —
              especially with Rekotax guiding every step. Here’s a streamlined
              breakdown of the entire process:
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    num: 1,
                    title: "Reserve Company Name",
                    desc: "Choose 3–6 unique name options that reflect your business. We’ll help you check availability and ensure it ends with “(OPC) Private Limited”.",
                  },
                  {
                    num: 2,
                    title: "Get DSC & DIN",
                    desc: "Apply for Digital Signature Certificate and Director Identification Number to sign and file incorporation forms online.",
                  },
                  {
                    num: 3,
                    title: "Submit Incorporation Docs",
                    desc: "Prepare and submit MOA, AOA, INC-3 (Nominee consent), INC-9 (Director declaration) using the SPICe+ form on the MCA portal.",
                  },
                  {
                    num: 4,
                    title: "Pay Government Fees",
                    desc: "Pay applicable government and stamp duties based on the state and authorized capital - we’ll calculate and manage this for you.",
                  },
                  {
                    num: 5,
                    title: "Get Certificate of Incorporation",
                    desc: "Registrar verifies your application and issues the Certificate of Incorporation (COI) with your unique CIN - you’re now legally registered!",
                  },
                  {
                    num: 6,
                    title: "Post-Incorporation Compliance",
                    desc: "Open a current account, apply for PAN, TAN & GST, and set up accounting and compliance systems. We’ll guide you through everything.",
                  },
                ].map((step) => (
                  <Grid
                    key={step.num}
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 per row on md+
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        width: "100%",
                        maxWidth: 360,
                        boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            backgroundColor: "#0f3d7c",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.2em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          {step.num}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: "#0f3d7c", mb: 1.5 }}
                        >
                          {step.title}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "0.95em",
                            lineHeight: 1.6,
                            textAlign: "left",
                            color: "#333",
                          }}
                        >
                          {step.desc}
                        </Typography>
                      </CardContent>
                    </Card>
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
            Private Limited Registration: A Complete Guide
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="md">
              {/* Section 1 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}
                >
                  Private Limited Company Registration in India
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Private Limited Company (Pvt Ltd) is one of the most credible,
                  scalable, and legally structured business entities in India.
                  It is governed by the Companies Act, 2013 and offers
                  entrepreneurs limited liability, a separate legal identity,
                  and better access to funding. It is ideal for startups,
                  growing businesses, and ventures seeking equity investments.
                </Typography>
              </Box>

              {/* Section 2 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Why Choose a Private Limited Company?
                </Typography>
                <Typography
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  <ul>
                    <li>
                      Offers limited liability protection to its shareholders
                    </li>
                    <li>
                      Enhances business credibility and trust with clients and
                      investors
                    </li>
                    <li>Facilitates easy equity fundraising</li>
                    <li>Ensures perpetual succession and stability</li>
                    <li>Enables smooth transfer of ownership</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 3 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px  #0f3d7c",
                    pb: 1,
                  }}
                >
                  Types of Private Limited Companies
                </Typography>
                <Typography
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px  #0f3d7c",
                    pb: 1,
                  }}
                >
                  <ul>
                    <li>
                      <strong>Company Limited by Shares:</strong> Shareholders’
                      liability is limited to the amount unpaid on their shares.
                    </li>
                    <li>
                      <strong>Company Limited by Guarantee:</strong> Members
                      guarantee a pre-decided amount in case of winding up.
                    </li>
                    <li>
                      <strong>Unlimited Company:</strong> No limit on liability,
                      though rarely chosen.
                    </li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 4 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Eligibility Criteria
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  <ul>
                    <li>
                      Minimum two directors (at least one Indian resident)
                    </li>
                    <li>Minimum two shareholders (can be same as directors)</li>
                    <li>Maximum 200 shareholders and 15 directors</li>
                    <li>Registered office address in India</li>
                    <li>Valid DIN and DSC for directors</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 5 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Benefits of Private Limited Company Registration
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Separate Legal Identity
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  <ul>
                    <li>The company exists independently from its owners</li>
                    <li>Can own assets, enter contracts, sue or be sued</li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Limited Liability
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  <ul>
                    <li>
                      Shareholders’ personal assets are protected from business
                      losses
                    </li>
                    <li>Risk is confined to the amount invested</li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Ease of Fundraising
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  <ul>
                    <li>Preferred structure for angel investors and VCs</li>
                    <li>
                      Can issue equity shares, preference shares, and debentures
                    </li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Business Continuity
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  <ul>
                    <li>
                      Uninterrupted existence regardless of changes in ownership
                    </li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Transferability of Shares
                </Typography>
                <Typography
                  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  <ul>
                    <li>
                      Shares can be transferred with minimal legal formalities
                    </li>
                  </ul>
                </Typography>
              </Box>
              {/* Section 6 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Documents Required
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  1. Directors & Shareholders
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ul>
                    <li>PAN and Aadhaar Card</li>
                    <li>Address proof (Bank Statement/Utility Bill)</li>
                    <li>Passport-size photographs</li>
                    <li>Email ID and Mobile number</li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  2. Company Address Proof
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ul>
                    <li>Electricity Bill/Property Tax Receipt</li>
                    <li>Rent Agreement/NOC from property owner</li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  3. Company Details
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ul>
                    <li>Name options (2–3 preferences)</li>
                    <li>Nature of business</li>
                    <li>Share capital structure</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 7 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Private Limited Company Registration Process
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ol>
                    <li>Apply for DSC (Digital Signature Certificate)</li>
                    <li>Obtain DIN (Director Identification Number)</li>
                    <li>Name approval via RUN or SPICe+</li>
                    <li>Prepare MOA, AOA and other incorporation documents</li>
                    <li>File SPICe+ form with MCA</li>
                    <li>
                      Receive Certificate of Incorporation (COI) with PAN & TAN
                    </li>
                  </ol>
                </Typography>
              </Box>

              {/* Section 8 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Post-Incorporation Compliances
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ul>
                    <li>Open company bank account</li>
                    <li>Conduct first board meeting within 30 days</li>
                    <li>Appointment of auditor</li>
                    <li>
                      Issue share certificates and maintain statutory registers
                    </li>
                    <li>File annual returns and financials (AOC-4, MGT-7)</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 9 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Cost of Registration
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  The cost of registering a Private Limited Company in India
                  typically ranges between ₹8,000 to ₹25,000 depending on state,
                  professional services, and share capital.
                </Typography>
              </Box>

              {/* Section 10 */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0f3d7c",
                    mb: 2,
                    fontWeight: 700,
                    borderBottom: "2px solid #0f3d7c",
                    pb: 1,
                  }}
                >
                  Certificate of Incorporation (COI)
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  The COI includes:
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ul>
                    <li>Company Identification Number (CIN)</li>
                    <li>Date of Incorporation</li>
                    <li>Company name and status</li>
                  </ul>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  It is required to:
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  <ul>
                    <li>Open a business bank account</li>
                    <li>Apply for government registrations and licenses</li>
                    <li>Enter into legal agreements</li>
                  </ul>
                </Typography>
              </Box>
            </Container>
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
                    <Box component="th">Public Company</Box>
                    <Box component="th">Limited Liability Partnership</Box>
                    <Box component="th">Partnership Firm</Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  <Box component="tr">
                    <Box component="td">Act</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">
                      Limited Liability Partnership Act, 2008
                    </Box>
                    <Box component="td">Indian Partnership Act, 1932</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Registration Requirement</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Optional</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Number of members</Box>
                    <Box component="td">Only 1</Box>
                    <Box component="td">2 – 200</Box>
                    <Box component="td">7 – Unlimited</Box>
                    <Box component="td">2 – Unlimited</Box>
                    <Box component="td">2 – 50</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Separate Legal Entity</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Liability Protection</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Audit</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Dependent</Box>
                    <Box component="td">Not mandatory</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Ownership Transferability</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Uninterrupted Existence</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Foreign Participation</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Allowed (with sectoral conditions)</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Tax Rates</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">High</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Low</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Compliance</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Very High</Box>
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
          <Box
            sx={{
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
              bgcolor: "transparent",
            }}
          >
            <Container maxWidth="md">
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  color: "#0f2555",
                  fontWeight: 700,
                  mb: { xs: 8, md: 4 },
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Frequently Asked Questions (FAQs)
              </Typography>

              {[
                {
                  q: "Is there a minimum capital requirement for Private Limited Company registration?",
                  a: "No, there is no minimum paid-up capital requirement. You can start with any amount suitable for your business.",
                  defaultExpanded: true,
                },
                {
                  q: "How long does it take to complete Private Limited Company registration in India?",
                  a: "Typically, registration takes 7–10 working days, subject to government approvals and timely document submission.",
                },
                {
                  q: "What documents are required for Private Limited Company registration?",
                  a: "PAN, Aadhaar, address proof of directors, business address proof, photographs, and proposed company details are required.",
                },
                {
                  q: "What are the major differences between Private Limited Company registration and LLP registration?",
                  a: "A Pvt Ltd company has higher compliance but better investor preference and structured ownership. LLPs are more flexible.",
                },
                {
                  q: "Can I register a private limited company with a similar name to an existing business?",
                  a: "No, the proposed name must be unique and not identical or deceptively similar to any existing company or trademark.",
                },
                {
                  q: "Is GST registration mandatory after private limited company registration?",
                  a: "GST is mandatory if turnover exceeds ₹40 lakhs (₹20 lakhs for services) or for interstate trade and online selling.",
                },
                {
                  q: "What happens if my company doesn’t commence business after registration?",
                  a: "If your company fails to commence business within 180 days, ROC may strike it off. Compliance filings are still necessary.",
                },
                {
                  q: "Can my private limited company convert to a public company later?",
                  a: "Yes, a private company can be converted to a public limited company by following due legal procedures and compliances.",
                },
                {
                  q: "What are the annual compliance requirements after private limited company registration?",
                  a: "You must hold board meetings, file AOC-4 & MGT-7, maintain records, and file income tax returns yearly.",
                },
                {
                  q: "Is a company seal mandatory after a private limited company registration?",
                  a: "No, a company seal is not mandatory by law, but it may be used for formal documentation.",
                },
                {
                  q: "What are the tax benefits of private limited company registration compared to other structures?",
                  a: "Pvt Ltd companies enjoy corporate tax rates, depreciation, and deductions not available to sole proprietors or partnerships.",
                },
                {
                  q: "Can a private limited company apply for trademark registration?",
                  a: "Yes, a registered company can file for trademark protection for its brand, logo, or product name.",
                },
                {
                  q: "Is Udyog Aadhaar (Udyam) registration required for a private limited company?",
                  a: "It's optional but recommended to avail MSME benefits like subsidies, loans, and protection under delayed payment laws.",
                },
                {
                  q: "Can I register a Private Limited company by myself?",
                  a: "Yes, it can be done online on the MCA portal. However, professional help ensures accuracy and timely approvals.",
                },
                {
                  q: "How to check Pvt Limited Company registration?",
                  a: "You can verify company status on the MCA portal by entering the CIN or company name.",
                },
                {
                  q: "Who can register a Private Limited Company in India?",
                  a: "Any two or more individuals (at least one Indian resident) aged 18 or above can register a Pvt Ltd company.",
                },
                {
                  q: "How many directors are required to start a Private Limited Company?",
                  a: "A minimum of 2 and a maximum of 15 directors can be appointed. At least one must be an Indian resident.",
                },
                {
                  q: "Can a Private Limited Company be converted to another business type?",
                  a: "Yes, it can be converted to an LLP or Public Limited Company with necessary approvals and filings.",
                },
                {
                  q: "What is the Cost of Private Limited Company Registration?",
                  a: "It usually ranges between ₹8,000 to ₹25,000, depending on state, share capital, and professional services.",
                },
                {
                  q: "What are MoA & AoA?",
                  a: "MoA defines your company's purpose and scope. AoA outlines the rules and management structure of the company.",
                },
                {
                  q: "What is the SPICe+ Form?",
                  a: "SPICe+ is an integrated MCA form for name reservation, incorporation, PAN, TAN, GST, EPFO, ESIC and more.",
                },
                {
                  q: "What are the restrictions on a Private Limited Company?",
                  a: "It cannot publicly raise capital, limits shareholders to 200, and restricts share transfers under Companies Act, 2013.",
                },
                {
                  q: "Can NRIs and foreign nationals register a Private Limited Company in India?",
                  a: "Yes, they can invest and become directors, provided one Indian resident director is appointed and all FEMA rules are followed.",
                },
              ].map(({ q, a, defaultExpanded }, idx) => (
                <Accordion
                  key={idx}
                  defaultExpanded={Boolean(defaultExpanded)}
                  sx={{
                    borderBottom: "1px solid #ddd",
                    boxShadow: "none",
                    "&:before": { display: "none" }, // remove default divider
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          width: 24,
                          height: 24,
                        }}
                      >
                        {/* Show + when collapsed, − when expanded via CSS trick */}
                        <AddIcon
                          sx={{
                            color: "#0f2555",
                            ".Mui-expanded &": { display: "none" },
                          }}
                        />
                        <RemoveIcon
                          sx={{
                            color: "#0f2555",
                            display: "none",
                            ".Mui-expanded &": { display: "inline-block" },
                          }}
                        />
                      </Box>
                    }
                    sx={{
                      px: 0,
                      "& .MuiAccordionSummary-content": {
                        m: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 15, md: 16 },
                        fontWeight: 600,
                        color: "#0f2555",
                        lineHeight: 1.5,
                        pr: 2,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pt: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: 14, md: 15 },
                        color: "#444",
                        lineHeight: 1.7,
                        fontWeight: 400,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Container>
          </Box>
          
          <ContactSection/>
          <Footer/>
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
