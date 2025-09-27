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

export default function ProducerCompany() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: "What is a Producer Company?",
      a: "A Producer Company is a special type of company formed under the Companies Act, 2013, for farmers, producers, or agriculturists to collectively engage in production, harvesting, processing, marketing, and selling of their products or produce.",
    },
    {
      q: "Who can form a Producer Company in India?",
      a: "A Producer Company can be formed by any of the following: ten or more individual producers, two or more producer institutions, or a combination of both.",
    },
    {
      q: "What is the minimum capital required for a Producer Company?",
      a: "The minimum authorized capital required to register a Producer Company is ₹5 lakh.",
    },
    {
      q: "Can a Producer Company be converted into a Private Limited Company?",
      a: "No, a Producer Company cannot be converted into any other type of company like a Private Limited or Public Limited Company.",
    },
    {
      q: "What are the objectives of a Producer Company?",
      a: "Objectives include production, harvesting, grading, pooling, marketing, exporting of primary produce, and providing technical services, education, or welfare measures to members.",
    },
    {
      q: "Is GST registration mandatory for a Producer Company?",
      a: "GST registration is mandatory if the annual turnover exceeds the prescribed threshold limit or if the company is engaged in inter-state supply of goods or services.",
    },
    {
      q: "Can a Producer Company accept deposits from the public?",
      a: "No, a Producer Company cannot accept deposits from the public. It can only raise funds through its members or by issuing shares and debentures as per law.",
    },
    {
      q: "What documents are required to incorporate a Producer Company?",
      a: "Required documents include PAN, Aadhaar, address proof of all directors, passport-sized photos, utility bill of the registered office, and a NOC from the property owner.",
    },
    {
      q: "How many directors are required in a Producer Company?",
      a: "A Producer Company must have at least 5 and not more than 15 directors on its board.",
    },
    {
      q: "Is audit mandatory for a Producer Company?",
      a: "Yes, a Producer Company must get its books audited annually by a Chartered Accountant as per the Companies Act.",
    },
    {
      q: "Can a Producer Company issue bonus shares?",
      a: "Yes, a Producer Company can issue bonus shares to its members in proportion to the shares held by them out of accumulated profits.",
    },
    {
      q: "Can a Producer Company distribute patronage bonus?",
      a: "Yes, a Producer Company can distribute patronage bonus to members in proportion to their participation in the business of the company.",
    },
    {
      q: "Is there any limit on the number of members in a Producer Company?",
      a: "No, there is no maximum limit on the number of members in a Producer Company.",
    },
    {
      q: "Can foreigners or foreign companies become members of a Producer Company?",
      a: "No, only Indian producers or producer institutions can become members. Foreign nationals or entities are not allowed to be members.",
    },
    {
      q: "What are the annual compliance requirements for a Producer Company?",
      a: "A Producer Company must file annual returns, financial statements, income tax returns, conduct board meetings, and comply with secretarial standards.",
    },
    {
      q: "What is the validity of a Producer Company registration?",
      a: "Once registered, a Producer Company has perpetual succession and remains valid until it is legally wound up or struck off.",
    },
    {
      q: "Can a Producer Company be registered online?",
      a: "Yes, the registration process for a Producer Company can be completed entirely online through the Ministry of Corporate Affairs (MCA) portal.",
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
              Producer Company Registration
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
              Register your Producer Company with Rekotax — experience fast
              setup, <br />
              full legal compliance, expert documentation, and dedicated support{" "}
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
            To register your Producer Company seamlessly, you’ll need to submit
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
              Simplified Process to Register Your <br /> Producer Company in
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
              Setting up your Producer Company is simpler than you think —
              especially with Rekotax guiding every step. Here’s a streamlined
              breakdown of the entire process:
            </Typography>
          </Box>
     <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Open Sans', sans-serif",
    backgroundColor: "#f4f6f8",
  }}
>
  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: "16px",
      width: "300px",
      padding: "30px 25px 25px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: "0 0 calc(33.333% - 30px)",
      boxSizing: "border-box",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Box
      sx={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0f3d7c",
        color: "white",
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
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Name Approval via RUN
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Select and submit unique name options with "Producer Company Limited" suffix using the RUN service on the MCA portal.
    </Typography>
  </Box>

  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: "16px",
      width: "300px",
      padding: "30px 25px 25px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: "0 0 calc(33.333% - 30px)",
      boxSizing: "border-box",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Box
      sx={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0f3d7c",
        color: "white",
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
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Obtain DSC & DIN
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Apply for Digital Signature Certificate and DIN for all proposed directors to enable online signing and submission of forms.
    </Typography>
  </Box>

  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: "16px",
      width: "300px",
      padding: "30px 25px 25px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: "0 0 calc(33.333% - 30px)",
      boxSizing: "border-box",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Box
      sx={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0f3d7c",
        color: "white",
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
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Draft Legal Documents
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Prepare MOA and AOA specifying objectives like production, harvesting, marketing, and member benefits as per Producer Company norms.
    </Typography>
  </Box>

  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: "16px",
      width: "300px",
      padding: "30px 25px 25px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: "0 0 calc(33.333% - 30px)",
      boxSizing: "border-box",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Box
      sx={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0f3d7c",
        color: "white",
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
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      File SPICe+ Form
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Submit SPICe+ (Part A and B), AGILE-PRO, INC-9, DIR-2, and other necessary attachments for incorporation through the MCA portal.
    </Typography>
  </Box>

  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: "16px",
      width: "300px",
      padding: "30px 25px 25px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: "0 0 calc(33.333% - 30px)",
      boxSizing: "border-box",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Box
      sx={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0f3d7c",
        color: "white",
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
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Receive Incorporation Certificate
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Upon successful verification, the Registrar of Companies issues the Certificate of Incorporation (COI) along with PAN and TAN.
    </Typography>
  </Box>

  <Box
    sx={{
      backgroundColor: "#ffffff",
      color: "#333",
      borderRadius: "16px",
      width: "300px",
      padding: "30px 25px 25px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
      flex: "0 0 calc(33.333% - 30px)",
      boxSizing: "border-box",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Box
      sx={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0f3d7c",
        color: "white",
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
    <Typography sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 1 }}>
      Start Operations & Compliances
    </Typography>
    <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}>
      Open a current bank account, maintain statutory registers, file annual returns, and fulfill Producer Company compliance requirements.
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
            Producer Company Registration: A Complete Guide
          </Typography>
        <Box
  sx={{
    fontFamily: "'Open Sans', sans-serif",
    lineHeight: 1.7,
    padding: "20px",
    maxWidth: "1000px",
    margin: "auto",
    backgroundColor: "#f4f6f8",
    color: "#333",
  }}
>
  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h1" sx={{ fontSize: "2em", color: "#0f3d7c", mb: 1 }}>
      What is a Producer Company?
    </Typography>
    <Typography>
      A Producer Company is a company registered under the Companies Act, 2013
      with the objective of benefiting primary producers, such as farmers,
      artisans, and others engaged in production. It combines the benefits of a
      cooperative society with the structure and regulatory framework of a
      private limited company, providing better access to capital, technology,
      and markets for its members.
    </Typography>
  </Box>

  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h2" sx={{ fontSize: "1.5em", color: "#0f3d7c", borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Why Register a Producer Company?
    </Typography>
    <ul>
      <li>Legal recognition for farmers and producers to operate collectively</li>
      <li>Limited liability protection for members and directors</li>
      <li>Separate legal entity for easier contracts and operations</li>
      <li>Improves bargaining power and access to government schemes</li>
    </ul>
  </Box>

  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h2" sx={{ fontSize: "1.5em", color: "#0f3d7c", borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Types of Producer Activities Allowed
    </Typography>
    <ul>
      <li><strong>Production & Processing:</strong> Activities related to agriculture, horticulture, forestry, or animal husbandry</li>
      <li><strong>Procurement & Marketing:</strong> Buying and selling produce or services of members</li>
      <li><strong>Storage & Distribution:</strong> Warehousing, transport, and logistics for farm output</li>
      <li><strong>Education & Training:</strong> Offering knowledge services to producers and their families</li>
      <li><strong>Consulting Services:</strong> Technical, financial, and business assistance to members</li>
    </ul>
  </Box>

  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h2" sx={{ fontSize: "1.5em", color: "#0f3d7c", borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Key Characteristics of a Producer Company
    </Typography>
    <ul>
      <li><strong>Minimum 10 Members:</strong> Individuals or 2 institutions acting as members</li>
      <li><strong>Limited Liability:</strong> Members' liability is limited to their shareholding</li>
      <li><strong>Separate Legal Entity:</strong> Can hold assets, enter contracts, and sue or be sued</li>
      <li><strong>No External Shareholding:</strong> Only producers can become members</li>
      <li><strong>Annual Patronage Bonus:</strong> Profits distributed based on member participation</li>
      <li><strong>Perpetual Succession:</strong> Continued existence despite changes in membership</li>
      <li><strong>Professional Management:</strong> Managed by a Board of Directors with 5–15 members</li>
      <li><strong>Mandatory Internal Audit:</strong> Regular auditing of company accounts</li>
      <li><strong>Eligible for Credit & Grants:</strong> Avail funding from NABARD, SFAC, etc.</li>
      <li><strong>Inclusive Growth Model:</strong> Empowers marginal and small producers</li>
    </ul>
  </Box>

  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h2" sx={{ fontSize: "1.5em", color: "#0f3d7c", borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Benefits of Producer Company Registration
    </Typography>
    <Typography variant="h3" sx={{ fontSize: "1.2em", color: "#0f3d7c", mt: 2 }}>
      Collective Power for Small Producers
    </Typography>
    <ul>
      <li>Members gain better pricing, logistics, and market access</li>
      <li>Collective input sourcing and bulk selling improve profits</li>
    </ul>
    <Typography variant="h3" sx={{ fontSize: "1.2em", color: "#0f3d7c", mt: 2 }}>
      Government Scheme Eligibility
    </Typography>
    <ul>
      <li>Access to grants, subsidies, and low-interest credit</li>
      <li>Priority under programs by NABARD, SFAC, and other bodies</li>
    </ul>
    <Typography variant="h3" sx={{ fontSize: "1.2em", color: "#0f3d7c", mt: 2 }}>
      Tax & Financial Advantages
    </Typography>
    <ul>
      <li>Tax exemptions under Section 80P for certain activities</li>
      <li>Eligibility for subsidies, capital assistance, and training funds</li>
    </ul>
    <Typography variant="h3" sx={{ fontSize: "1.2em", color: "#0f3d7c", mt: 2 }}>
      Improved Governance
    </Typography>
    <ul>
      <li>Transparent management with regular member meetings</li>
      <li>Professional Board ensures structured decision-making</li>
    </ul>
    <Typography variant="h3" sx={{ fontSize: "1.2em", color: "#0f3d7c", mt: 2 }}>
      Enhanced Credibility
    </Typography>
    <ul>
      <li>Legal status improves trust with banks, buyers, and partners</li>
      <li>Eligible to apply for tenders, licenses, and contracts</li>
    </ul>
    <Typography variant="h3" sx={{ fontSize: "1.2em", color: "#0f3d7c", mt: 2 }}>
      Perpetual Succession & Ownership
    </Typography>
    <ul>
      <li>Membership changes don’t affect company continuity</li>
      <li>Assets and reputation grow under a sustainable model</li>
    </ul>
  </Box>

  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h2" sx={{ fontSize: "1.5em", color: "#0f3d7c", borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Post-Registration Compliance
    </Typography>
    <ul>
      <li><strong>Annual Filing:</strong> File AOC-4 and MGT-7 with the Registrar of Companies</li>
      <li><strong>General Meetings:</strong> Hold an Annual General Meeting (AGM) every year</li>
      <li><strong>Director Meetings:</strong> Conduct at least 4 board meetings annually</li>
      <li><strong>Accounting & Auditing:</strong> Maintain proper books and conduct annual audits</li>
      <li><strong>Income Tax & GST:</strong> File IT returns and applicable GST returns timely</li>
    </ul>
  </Box>

  <Box
    sx={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    }}
  >
    <Typography variant="h2" sx={{ fontSize: "1.5em", color: "#0f3d7c", borderBottom: "2px solid #0f3d7c", pb: 1 }}>
      Certificate of Incorporation: Your Legal Identity
    </Typography>
    <Typography>
      The Certificate of Incorporation (COI) issued by the Registrar of Companies (ROC) confirms that your Producer Company is legally registered.
    </Typography>
    <ul>
      <li>Includes the Company Identification Number (CIN)</li>
      <li>Mentions official date of incorporation and registered name</li>
      <li>Serves as proof for legal, financial, and operational needs</li>
    </ul>
    <Typography>Uses of COI:</Typography>
    <ul>
      <li>Open a current bank account</li>
      <li>Apply for PAN, TAN, and statutory licenses</li>
      <li>Enter into supply agreements and contracts</li>
      <li>Establish brand credibility with stakeholders</li>
    </ul>
  </Box>
</Box>


      

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
