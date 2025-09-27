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

export default function PublicCompany() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
   {
      q: "1. What is a Public Limited Company?",
      a: "A Public Limited Company (PLC) is a company incorporated under the Companies Act, 2013, which offers its shares to the general public and is listed on a recognized stock exchange.",
    },
    {
      q: "2. What is the minimum number of shareholders required to form a PLC?",
      a: "A minimum of 7 shareholders is required to incorporate a Public Limited Company in India.",
    },
    {
      q: "3. What is the minimum number of directors required in a Public Company?",
      a: "A Public Company must have at least 3 directors as per the Companies Act, 2013.",
    },
    {
      q: "4. Is there a minimum capital requirement for forming a Public Company?",
      a: "There is no specific minimum capital requirement for incorporating a Public Company, but a realistic capital should be decided based on business needs.",
    },
    {
      q: "5. Can a Public Company raise funds from the general public?",
      a: "Yes, a Public Company can raise capital by issuing shares or debentures to the public through a prospectus.",
    },
    {
      q: "6. Is it mandatory for a Public Company to get listed?",
      a: "No, not all Public Companies are listed. A company may remain unlisted and still be termed a Public Company if it meets the required conditions.",
    },
    {
      q: "7. Are statutory audits mandatory for Public Companies?",
      a: "Yes, every Public Company is required to undergo an annual statutory audit by a qualified Chartered Accountant.",
    },
    {
      q: "8. What are the compliance requirements for a Public Company?",
      a: "Public Companies must comply with several provisions including board meetings, shareholder meetings, disclosures, and filings with the Registrar of Companies and SEBI, if listed.",
    },
    {
      q: "9. What is the difference between a Public and a Private Company?",
      a: "The key differences include the number of shareholders, ability to raise funds from the public, listing on stock exchanges, and regulatory compliances.",
    },
    {
      q: "10. Can foreign nationals be shareholders or directors in a Public Company?",
      a: "Yes, foreign nationals can be shareholders or directors, subject to FDI guidelines and other regulatory approvals.",
    },
    {
      q: "11. What is the role of a Company Secretary in a Public Limited Company?",
      a: "In a Public Company, appointing a qualified Company Secretary is mandatory to ensure compliance with secretarial standards and ROC filings.",
    },
    {
      q: "12. What is the significance of issuing a prospectus?",
      a: "A prospectus is a formal legal document that invites the public to subscribe to shares and contains vital information about the company’s financials and operations.",
    },
    {
      q: "13. Are there any restrictions on managerial remuneration in a Public Company?",
      a: "Yes, Section 197 of the Companies Act, 2013 prescribes limits on managerial remuneration that a Public Company can pay to its directors and KMPs.",
    },
    {
      q: "14. What is the timeline for holding the first Board Meeting?",
      a: "A Public Company must hold its first Board Meeting within 30 days from the date of incorporation.",
    },
    {
      q: "15. How often must Annual General Meetings (AGMs) be conducted?",
      a: "AGMs must be held every calendar year with not more than 15 months between two AGMs.",
    },
    {
      q: "16. Can Public Companies accept deposits?",
      a: "Yes, but only in compliance with the Companies (Acceptance of Deposits) Rules, 2014 and after obtaining shareholder approval and credit ratings.",
    },
    {
      q: "17. What is the role of SEBI in relation to Public Companies?",
      a: "SEBI regulates listed Public Companies, ensuring investor protection, disclosure norms, and corporate governance standards are followed.",
    },
    {
      q: "18. What is the requirement of independent directors?",
      a: "Every listed Public Company must have at least one-third of the total number of directors as independent directors as per SEBI Listing Obligations.",
    },
    {
      q: "19. Are internal audits mandatory for Public Companies?",
      a: "Yes, Public Companies meeting certain thresholds related to turnover and paid-up capital must conduct internal audits as per Section 138 of the Companies Act.",
    },
    {
      q: "20. What are the penalties for non-compliance by a Public Company?",
      a: "Penalties can include monetary fines, disqualification of directors, and even imprisonment depending on the nature and severity of non-compliance.",
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
              Public Company Registration
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
              Register your Public Company with Rekotax — experience fast setup,
              <br /> full legal compliance, expert documentation, and dedicated
              support to launch your
              <br /> business effortlessly.
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
            To register your Public Company seamlessly, you’ll need to submit
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
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              maxWidth: 1200,
              mx: "auto",
              my: 6,
              px: 2,
              fontFamily: "'Open Sans', sans-serif",
            }}
          ></Box>

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
           Setting up your Public Company is simpler than you think — especially with 
           Rekotax guiding every step. 
Here’s a streamlined breakdown of the entire process:
            </Typography>
          </Box>

          <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    maxWidth: 1200,
    mx: "auto",
    my: 6,
    px: 2,
    fontFamily: "'Open Sans', sans-serif",
    backgroundColor: "#f4f6f8",
  }}
>
  {/* Step 1 */}
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: 3,
      width: 300,
      p: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: { xs: "0 0 100%", sm: "0 0 calc(50% - 30px)", md: "0 0 calc(33.333% - 30px)" },
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
      1
    </Box>
    <Typography
      sx={{
        fontSize: "1.1em",
        fontWeight: 700,
        color: "#0f3d7c",
        mb: 1,
      }}
    >
      Reserve Company Name
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Choose 3–6 unique name options that reflect your business. We’ll help you check availability and ensure it ends with “(OPC) Private Limited”.
    </Typography>
  </Box>

  {/* Step 2 */}
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: 3,
      width: 300,
      p: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: { xs: "0 0 100%", sm: "0 0 calc(50% - 30px)", md: "0 0 calc(33.333% - 30px)" },
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
      2
    </Box>
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Get DSC & DIN
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Apply for Digital Signature Certificate and Director Identification Number to sign and file incorporation forms online.
    </Typography>
  </Box>

  {/* Step 3 */}
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: 3,
      width: 300,
      p: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: { xs: "0 0 100%", sm: "0 0 calc(50% - 30px)", md: "0 0 calc(33.333% - 30px)" },
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
      3
    </Box>
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Submit Incorporation Docs
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Prepare and submit MOA, AOA, INC-3 (Nominee consent), INC-9 (Director declaration) using the SPICe+ form on the MCA portal.
    </Typography>
  </Box>

  {/* Step 4 */}
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: 3,
      width: 300,
      p: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: { xs: "0 0 100%", sm: "0 0 calc(50% - 30px)", md: "0 0 calc(33.333% - 30px)" },
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
      4
    </Box>
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Pay Government Fees
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Pay applicable government and stamp duties based on the state and authorized capital — we’ll calculate and manage this for you.
    </Typography>
  </Box>

  {/* Step 5 */}
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: 3,
      width: 300,
      p: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: { xs: "0 0 100%", sm: "0 0 calc(50% - 30px)", md: "0 0 calc(33.333% - 30px)" },
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
      5
    </Box>
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Get Certificate of Incorporation
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Registrar verifies your application and issues the Certificate of Incorporation (COI) with your unique CIN — you’re now legally registered!
    </Typography>
  </Box>

  {/* Step 6 */}
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: 3,
      width: 300,
      p: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: { xs: "0 0 100%", sm: "0 0 calc(50% - 30px)", md: "0 0 calc(33.333% - 30px)" },
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
      6
    </Box>
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Post-Incorporation Compliance
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Open a current account, apply for PAN, TAN & GST, and set up accounting and compliance systems. We’ll guide you through everything.
    </Typography>
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
           Public Company Registration: A Complete Guide
          </Typography>
        <Box
  sx={{
    fontFamily: "'Open Sans', sans-serif",
    lineHeight: 1.7,
    p: 3,
    maxWidth: "1000px",
    mx: "auto",
    backgroundColor: "#f4f6f8",
    color: "#333",
  }}
>
  {/* Section 1 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h4" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
      Understanding Public Limited Company
    </Typography>
    <Typography>
      A Public Limited Company (PLC) is a robust corporate structure that allows businesses to raise capital from the public through share issuance. Governed under the Companies Act, 2013, it offers limited liability to shareholders, transparency in governance, and potential for large-scale operations. Its structure is ideal for medium to large enterprises aiming for market expansion, funding through IPOs, and broader public participation.
    </Typography>
  </Box>

  {/* Section 2 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Why Opt for a Public Limited Company?
    </Typography>
    <ul>
      <li>Enables fundraising by issuing shares to the general public.</li>
      <li>Offers limited liability protection to all shareholders.</li>
      <li>Enhances brand reputation and market credibility.</li>
      <li>Ideal structure for companies targeting growth through stock markets.</li>
      <li>Governed by a transparent regulatory framework ensuring investor trust.</li>
    </ul>
  </Box>

  {/* Section 3 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Key Features of a Public Limited Company
    </Typography>
    <ul>
      <li><strong>Minimum 3 Directors:</strong> A minimum of three directors is required; one must be an Indian resident.</li>
      <li><strong>Minimum 7 Shareholders:</strong> At least seven shareholders are mandatory to incorporate a PLC.</li>
      <li><strong>No Upper Shareholder Limit:</strong> A public company can have unlimited shareholders.</li>
      <li><strong>Separate Legal Identity:</strong> The company exists independently of its promoters and shareholders.</li>
      <li><strong>Share Transferability:</strong> Shares are freely transferable and can be traded publicly after listing.</li>
      <li><strong>Stock Exchange Listing:</strong> Companies can list on recognized stock exchanges to raise funds via IPO.</li>
      <li><strong>Transparency & Disclosure:</strong> Mandated to publish financials and adhere to SEBI regulations, ensuring public trust.</li>
    </ul>
  </Box>

  {/* Section 4 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Benefits of Registering a Public Company
    </Typography>

    <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>Access to Capital</Typography>
    <ul>
      <li>Can raise funds from individuals, institutions, and the public through share issuance.</li>
      <li>Eligible to issue securities via Initial Public Offering (IPO).</li>
    </ul>

    <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>Enhanced Brand Visibility</Typography>
    <ul>
      <li>Listed companies gain instant credibility with investors, banks, and stakeholders.</li>
      <li>Corporate governance boosts investor confidence and brand image.</li>
    </ul>

    <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>Limited Liability Shield</Typography>
    <ul>
      <li>Personal assets of shareholders are protected against company losses or liabilities.</li>
      <li>Each shareholder’s risk is confined to their shareholding value.</li>
    </ul>

    <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>Perpetual Succession</Typography>
    <ul>
      <li>The company continues to exist despite changes in ownership or management.</li>
      <li>Ensures long-term business stability and continuity.</li>
    </ul>

    <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>Transferability of Shares</Typography>
    <ul>
      <li>Public shares can be freely traded or transferred without restrictions (post-listing).</li>
      <li>Offers liquidity to shareholders and attracts investment.</li>
    </ul>
  </Box>

  {/* Section 5 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Mandatory Requirements for Public Company Incorporation
    </Typography>
    <ul>
      <li>Minimum 3 Directors and 7 Shareholders.</li>
      <li>DIN (Director Identification Number) and DSC (Digital Signature Certificate) for all directors.</li>
      <li>Registered office in India with valid address proof and NOC from the premises owner.</li>
      <li>Memorandum of Association (MoA) and Articles of Association (AoA).</li>
      <li>Consent from directors in Form DIR-2 and declaration in INC-9.</li>
    </ul>
  </Box>

  {/* Section 6 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Documents Required for Registration
    </Typography>
    <ul>
      <li>PAN card and identity proof (Aadhaar, Passport, Voter ID) of all directors and shareholders.</li>
      <li>Latest passport-size photographs of directors.</li>
      <li>Proof of registered office – electricity bill or rent agreement (not older than 2 months).</li>
      <li>NOC from property owner if premises are rented.</li>
      <li>Digital Signature Certificates (DSC) for directors.</li>
      <li>DIN application, if not already allotted.</li>
    </ul>
  </Box>

  {/* Section 7 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Post-Incorporation Compliance Checklist
    </Typography>
    <ul>
      <li>Appointment of Auditor within 30 days.</li>
      <li>Commencement of Business declaration in Form INC-20A.</li>
      <li>Holding of first board meeting within 30 days of incorporation.</li>
      <li>Allotment of shares and issuance of share certificates.</li>
      <li>Maintenance of statutory registers and records.</li>
      <li>Filing of annual returns, financial statements, and ROC compliances.</li>
      <li>Timely GST registration and tax filings, as applicable.</li>
    </ul>
  </Box>

  {/* Section 8 */}
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 3,
      mb: 4,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Certificate of Incorporation (COI): Official Proof of Registration
    </Typography>
    <Typography sx={{ mb: 2 }}>
      The Ministry of Corporate Affairs issues the Certificate of Incorporation upon successful registration. It confirms the company’s existence as a legal entity and includes:
    </Typography>
    <ul>
      <li>Company Identification Number (CIN)</li>
      <li>Date of incorporation and legal recognition</li>
      <li>Authorized and paid-up capital details</li>
      <li>Jurisdiction of the Registrar of Companies (ROC)</li>
    </ul>
    <Typography sx={{ mt: 2 }}>
      The COI enables the company to commence legal operations, open a current account, apply for licenses, and participate in tenders or contracts as a recognized corporate body.
    </Typography>
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
                onClick={() =>
                  setActiveIndex(activeIndex === index ? -1 : index)
                }
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
