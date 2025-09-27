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

export default function NidhiCompany() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: "What is a Nidhi Company?",
      a: "A Nidhi Company is a type of Non-Banking Financial Company (NBFC) formed under Section 406 of the Companies Act, 2013, to promote savings and mutual benefit among its members. It primarily deals with accepting deposits and lending money to its members.",
    },
    {
      q: "What are the basic requirements to incorporate a Nidhi Company?",
      a: "To incorporate a Nidhi Company, a minimum of 7 members and 3 directors are required. The company must be limited by shares with a paid-up capital of at least ₹10 lakh.",
    },
    {
      q: "Can a Nidhi Company accept deposits from the general public?",
      a: "No, a Nidhi Company can only accept deposits and provide loans to its registered members. It cannot deal with non-members or the general public.",
    },
    {
      q: "What is Form NDH-4 and when is it filed?",
      a: "NDH-4 is filed within 120 days of incorporation to declare the company as a Nidhi. The company must have at least 200 members and Net Owned Funds of ₹20 lakh before filing NDH-4.",
    },
    {
      q: "What are Net Owned Funds in a Nidhi Company?",
      a: "Net Owned Funds refer to the aggregate paid-up equity capital and free reserves, reduced by accumulated losses and intangible assets. A minimum of ₹20 lakh is required within 120 days of incorporation.",
    },
    {
      q: "Is it mandatory for a Nidhi Company to obtain RBI approval?",
      a: "No, RBI approval is not required for Nidhi Companies as they are exempted from core provisions applicable to NBFCs. However, they are governed by the Nidhi Rules, 2014.",
    },
    {
      q: "What kind of loans can a Nidhi Company provide?",
      a: "Nidhi Companies can grant secured loans to members against gold, silver, immovable property, fixed deposits, or other approved securities.",
    },
    {
      q: "What is the maximum deposit a member can make in a Nidhi Company?",
      a: "A member can deposit up to 20 times the Net Owned Funds of the company, subject to the limits prescribed under Nidhi Rules and the company’s internal policy.",
    },
    {
      q: "Are Nidhi Companies allowed to advertise their services?",
      a: "No, Nidhi Companies are prohibited from advertising their deposit schemes or solicitations to the public. They can only promote within their member base.",
    },
    {
      q: "How is a Nidhi Company different from an NBFC?",
      a: "While both are financial institutions, Nidhi Companies cater only to members and do not require RBI registration, unlike NBFCs which operate on a larger scale and require RBI compliance.",
    },
    {
      q: "Can a Nidhi Company open branches?",
      a: "Yes, but only after filing NDH-4 and being recognized as a Nidhi Company. It can open up to 3 branches in the same district and must fulfill certain profitability criteria for more.",
    },
    {
      q: "Is a registered office mandatory for a Nidhi Company?",
      a: "Yes, a registered office in India is mandatory to receive official communication and serve as the base for operational activities.",
    },
    {
      q: "What are the annual compliance requirements for a Nidhi Company?",
      a: "A Nidhi Company must file annual returns, income tax returns, NDH-1 (annual return), and NDH-3 (half-yearly return) and comply with ROC and MCA regulations.",
    },
    {
      q: "Can a Nidhi Company provide unsecured loans?",
      a: "No, loans given by a Nidhi Company must be secured by collateral such as gold, property, or fixed deposit. Unsecured loans are not permitted.",
    },
    {
      q: "Are there any restrictions on who can be a member of a Nidhi Company?",
      a: "Any Indian citizen can become a member of a Nidhi Company, provided they agree to follow the rules and regulations laid down by the company.",
    },
    {
      q: "Can a Nidhi Company invest in shares or securities?",
      a: "No, Nidhi Companies are not allowed to trade or invest in shares, securities, or other financial instruments.",
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
              Nidhi Company Registration
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
              Register your Nidhi Company with Rekotax — experience fast setup,{" "}
              <br />
              full legal compliance,expert documentation, and dedicated support{" "}
              <br />
              to launch your business effortlessly.
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
            To register your Nidhi Company seamlessly, you’ll need to submit
            basic identity, address, and office-related documents.
          </Typography>

          <Box
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              background: "transparent",
              p: { xs: 2, md: 6 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              {/* Director & Member Documents */}
              <Box
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  p: 4,
                  maxWidth: 400,
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    color: "#2a2a2a",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Director & Member Documents
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Self-attested PAN Card copy for all directors and members
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Identity proof: Aadhaar/Voter ID/Driving License/Passport
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Address proof: Latest bank statement or utility bill (within
                    2 months)
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Recent passport-size photograph of each person
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Digital Signature Certificate (DSC) for each proposed
                    director
                  </li>
                </ul>
              </Box>

              {/* Registered Office Proof */}
              <Box
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  p: 4,
                  maxWidth: 400,
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    color: "#2a2a2a",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Registered Office Proof
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Recent utility bill (electricity, gas, or phone) as address
                    proof
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    No Objection Certificate (NOC) from the property owner
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Rent agreement or lease deed if the office is rented
                  </li>
                </ul>
              </Box>

              {/* Legal Declarations */}
              <Box
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  p: 4,
                  maxWidth: 400,
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    color: "#2a2a2a",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Legal Declarations
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Declaration from directors regarding non-disqualification
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Form DIR-2: Consent to act as a director
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Professional certification from CA/CS/CMA for document
                    verification
                  </li>
                </ul>
              </Box>

              {/* Important Notes */}
              <Box
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  p: 4,
                  maxWidth: 400,
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    color: "#2a2a2a",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Important Notes
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    All documents must be self-attested and clearly legible
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Foreign nationals must submit notarized and apostilled
                    documents
                  </li>
                  <li
                    style={{
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Ensure consistency of name, address, and details across
                    documents
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>

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
              Setting up your Nidhi Company is simpler than you think —
              especially with Rekotax guiding every step. Here’s a streamlined
              breakdown of the entire process:
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              maxWidth: "1200px",
              margin: "0 auto",
              p: { xs: 3, md: 6 },
              fontFamily: "'Open Sans', sans-serif",
              backgroundColor: "#f4f6f8",
            }}
          >
            {/* Step 1 */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                width: 300,
                p: 4,
                textAlign: "center",
                flex: "0 0 calc(33.333% - 30px)",
                boxSizing: "border-box",
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
                  backgroundColor: "#0f3d7c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
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
                Name Reservation (RUN)
              </Typography>
              <Typography
                sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
              >
                Choose a unique name for your Nidhi Company and submit it
                through the RUN (Reserve Unique Name) form on the MCA portal,
                ending with “Nidhi Limited”.
              </Typography>
            </Box>

            {/* Step 2 */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                width: 300,
                p: 4,
                textAlign: "center",
                flex: "0 0 calc(33.333% - 30px)",
                boxSizing: "border-box",
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
                  backgroundColor: "#0f3d7c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                2
              </Box>
              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: 700,
                  color: "#0f3d7c",
                  mb: 1,
                }}
              >
                Obtain DSC & DIN
              </Typography>
              <Typography
                sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
              >
                Apply for Digital Signature Certificate and Director
                Identification Number for all proposed directors to enable
                digital filing.
              </Typography>
            </Box>

            {/* Step 3 */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                width: 300,
                p: 4,
                textAlign: "center",
                flex: "0 0 calc(33.333% - 30px)",
                boxSizing: "border-box",
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
                  backgroundColor: "#0f3d7c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                3
              </Box>
              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: 700,
                  color: "#0f3d7c",
                  mb: 1,
                }}
              >
                Draft Incorporation Documents
              </Typography>
              <Typography
                sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
              >
                Prepare MOA, AOA, DIR-2, INC-9 and other declarations. These
                should state that the company intends to function as a Nidhi and
                comply with Nidhi Rules, 2014.
              </Typography>
            </Box>

            {/* Step 4 */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                width: 300,
                p: 4,
                textAlign: "center",
                flex: "0 0 calc(33.333% - 30px)",
                boxSizing: "border-box",
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
                  backgroundColor: "#0f3d7c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                4
              </Box>
              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: 700,
                  color: "#0f3d7c",
                  mb: 1,
                }}
              >
                File SPICe+ Form
              </Typography>
              <Typography
                sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
              >
                Submit the SPICe+ form online along with e-MOA, e-AOA, AGILE-PRO
                and other necessary documents to apply for incorporation, PAN,
                TAN, and EPFO/ESIC registration.
              </Typography>
            </Box>

            {/* Step 5 */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                width: 300,
                p: 4,
                textAlign: "center",
                flex: "0 0 calc(33.333% - 30px)",
                boxSizing: "border-box",
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
                  backgroundColor: "#0f3d7c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                5
              </Box>
              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: 700,
                  color: "#0f3d7c",
                  mb: 1,
                }}
              >
                Certificate of Incorporation
              </Typography>
              <Typography
                sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
              >
                Once approved, the Registrar of Companies (RoC) issues the
                Certificate of Incorporation (COI) with the Company
                Identification Number (CIN).
              </Typography>
            </Box>

            {/* Step 6 */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                width: 300,
                p: 4,
                textAlign: "center",
                flex: "0 0 calc(33.333% - 30px)",
                boxSizing: "border-box",
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
                  backgroundColor: "#0f3d7c",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                6
              </Box>
              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: 700,
                  color: "#0f3d7c",
                  mb: 1,
                }}
              >
                Post-Incorporation Filing
              </Typography>
              <Typography
                sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
              >
                Open a bank account, ensure ₹10 lakh capital, 200 members, and
                ₹20 lakh Net Owned Funds within 120 days, then file Form NDH-4
                for Nidhi Company status.
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
            Nidhi Company Registration: A Complete Guide
          </Typography>
          <Box
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              lineHeight: 1.7,
              p: 3,
              maxWidth: "1000px",
              m: "auto",
              backgroundColor: "#f4f6f8",
              color: "#333",
            }}
          >
            {/* Introduction */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                mb: 4,
              }}
            >
              <Typography variant="h4" sx={{ color: "#0f3d7c", mb: 1 }}>
                What is Nidhi Company ?
              </Typography>
              <Typography>
                A Nidhi Company is a type of Non-Banking Financial Company
                (NBFC) governed by Section 406 of the Companies Act, 2013 and
                the Nidhi Rules, 2014. Its primary objective is to promote
                savings and thrift among its members and to lend money only to
                its members for mutual benefit. It is ideal for those looking to
                start a small finance business focused on community-based
                savings and lending.
              </Typography>
            </Box>

            {/* Why Choose */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#0f3d7c",
                  borderBottom: "2px solid #0f3d7c",
                  pb: 1,
                }}
              >
                Why Choose a Nidhi Company?
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Ideal for promoting savings and lending within a close-knit
                  community
                </li>
                <li>Low regulatory compliance compared to other NBFCs</li>
                <li>Ownership and control remain with the members</li>
                <li>Cost-effective model for small-scale finance operations</li>
              </ul>
            </Box>

            {/* Key Features */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#0f3d7c",
                  borderBottom: "2px solid #0f3d7c",
                  pb: 1,
                }}
              >
                Key Features of a Nidhi Company
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  <strong>Member-Only Transactions:</strong> Can take deposits
                  and lend only to its members
                </li>
                <li>
                  <strong>Minimum 200 Members:</strong> Required within 120 days
                  of incorporation
                </li>
                <li>
                  <strong>Net Owned Funds:</strong> Minimum of ₹20 lakh required
                  within 120 days
                </li>
                <li>
                  <strong>NDH-4 Filing:</strong> Must be filed within 120 days
                  to seek Nidhi status
                </li>
                <li>
                  <strong>Prohibited Activities:</strong> Cannot deal in chit
                  funds, hire purchase, insurance, or securities
                </li>
                <li>
                  <strong>Branches:</strong> Can open branches after 3 years of
                  profitable operations
                </li>
                <li>
                  <strong>Loan Limits:</strong> Loans are subject to caps based
                  on deposits held
                </li>
              </ul>
            </Box>

            {/* Benefits */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#0f3d7c",
                  borderBottom: "2px solid #0f3d7c",
                  pb: 1,
                }}
              >
                Benefits of Nidhi Company Registration
              </Typography>

              <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>
                Encourages Financial Discipline
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Promotes savings among members</li>
                <li>Facilitates internal lending and borrowing</li>
              </ul>

              <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>
                Low Regulatory Compliance
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>No need for RBI approval</li>
                <li>Regulated by MCA under Nidhi Rules</li>
              </ul>

              <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>
                Easy and Affordable
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Lower setup and compliance costs than NBFCs</li>
                <li>Easy to manage with basic statutory compliance</li>
              </ul>

              <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>
                Member-Based Structure
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Owned and controlled by members</li>
                <li>Deposits and benefits remain within the group</li>
              </ul>

              <Typography variant="h6" sx={{ color: "#0f3d7c", mt: 2 }}>
                Safe and Regulated Savings
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Transparent framework under Companies Act and Nidhi Rules
                </li>
                <li>Operations limited to secured member interaction</li>
              </ul>
            </Box>

            {/* Post-Incorporation Compliance */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#0f3d7c",
                  borderBottom: "2px solid #0f3d7c",
                  pb: 1,
                }}
              >
                Mandatory Post-Incorporation Compliance
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  <strong>Form NDH-4:</strong> Must be filed within 120 days of
                  incorporation for Nidhi recognition
                </li>
                <li>
                  <strong>Minimum Members:</strong> Ensure at least 200 members
                  within 120 days
                </li>
                <li>
                  <strong>Net Owned Fund:</strong> Must raise at least ₹20 lakh
                  capital within 120 days
                </li>
                <li>
                  <strong>Annual Filing:</strong> File financials and annual
                  returns with MCA
                </li>
                <li>
                  <strong>Statutory Registers:</strong> Maintain proper books,
                  registers, and records
                </li>
                <li>
                  <strong>Board Meetings:</strong> Conduct regular board and
                  general meetings
                </li>
              </ul>
            </Box>

            {/* Certificate of Incorporation */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#0f3d7c",
                  borderBottom: "2px solid #0f3d7c",
                  pb: 1,
                }}
              >
                Certificate of Incorporation: Your Legal Identity
              </Typography>
              <Typography>
                The Certificate of Incorporation (COI) from MCA includes:
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Company Identification Number (CIN)</li>
                <li>Date of Incorporation</li>
                <li>Company name and registration details</li>
              </ul>
              <Typography>You’ll need the COI to:</Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Open a current bank account</li>
                <li>Apply for PAN, TAN, and licenses</li>
                <li>File Form NDH-4 and post-incorporation filings</li>
                <li>Operate legally as a financial entity</li>
              </ul>
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
