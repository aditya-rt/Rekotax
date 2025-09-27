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


export default function SectionAndCompany() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

const cardData = [
  {
    title: "Why Choose a Section 8 Company?",
    items: [
      "Ideal for NGOs, trusts, foundations, and charitable organizations",
      "Provides a credible and formal legal structure for social activities",
      "Eligible for various tax exemptions under Income Tax Act",
      "Can receive domestic and foreign donations (FCRA registration needed)",
      "Enhances public trust and brand value for donors and stakeholders",
    ],
  },
  {
    title: "Key Features of a Section 8 Company",
    items: [
      "Non-profit nature – profits must be used only for charitable objectives",
      "No dividend distribution – members cannot share company income",
      "Separate legal entity – recognized as an independent legal body",
      "Limited liability – members' personal assets are protected",
      "Mandatory Central Government license before incorporation",
      "High compliance standards and transparent record-keeping",
      "Eligible for tax benefits like 12A and 80G exemptions",
    ],
  },
  {
    title: "Advantages of Section 8 Registration",
    items: [
      "Legal recognition and structured framework with MCA legitimacy",
      "Enhanced credibility for donors, CSR funders and government grants",
      "Tax exemptions and benefits under Income Tax Act",
      "Limited liability protection encouraging risk-free social entrepreneurship",
      "Separate legal entity – can own property, open bank accounts, and enter contracts",
    ],
  },
  {
    title: "Post-Registration Compliance",
    items: [
      "Annual filings of returns and financial statements with ROC",
      "Maintain books of accounts with statutory audit by a qualified CA",
      "Conduct Annual General Meeting (AGM) once a year",
      "Timely income tax return and applicable TDS filings",
      "Comply with license terms to ensure charitable objectives are maintained",
    ],
  },
  {
    title: "Certificate of Incorporation (COI)",
    items: [
      "Contains Company Identification Number (CIN), date of incorporation and official details",
      "Required to open a dedicated NGO bank account",
      "Needed to apply for PAN, TAN, 12A/80G tax exemptions and FCRA registration",
      "Mandatory to receive CSR funds from companies",
    ],
  },
];

const steps = [
    {
      num: 1,
      title: "Choose Name & Apply in RUN",
      desc: "Select a unique name suitable for a non-profit entity and file a name reservation request through the RUN (Reserve Unique Name) service on the MCA portal.",
    },
    {
      num: 2,
      title: "Obtain DSC & DIN",
      desc: "Apply for Digital Signature Certificates (DSC) for all directors and obtain Director Identification Numbers (DIN) for filing incorporation documents.",
    },
    {
      num: 3,
      title: "Draft MOA, AOA & Declarations",
      desc: "Prepare the Memorandum and Articles of Association, declarations in Form INC-14 and INC-15 by professionals and promoters, and other required affidavits.",
    },
    {
      num: 4,
      title: "File SPICe+ Form with MCA",
      desc: "File the integrated SPICe+ form along with e-MOA, e-AOA, and necessary attachments including declarations, KYC, and address proof to initiate incorporation.",
    },
    {
      num: 5,
      title: "Get License & Incorporation Certificate",
      desc: "Once reviewed, the Registrar issues the Section 8 License and Certificate of Incorporation (COI) with CIN — officially recognizing the NGO as a company.",
    },
    {
      num: 6,
      title: "Apply for PAN, TAN & Bank Account",
      desc: "After incorporation, apply for the company’s PAN and TAN, open a current bank account, and initiate compliance for 12A, 80G, and CSR registration if required.",
    },
  ];
const faqs = [
  {
    q: "What is a Section 8 Company?",
    a: "A Section 8 Company is a non-profit organization registered under the Companies Act, 2013, with the primary objective of promoting charitable causes like education, art, science, sports, and social welfare. Profits, if any, must be reinvested in the organization’s objectives.",
  },
  {
    q: "How many people are required to register a Section 8 Company?",
    a: "A minimum of two directors and two shareholders are required to incorporate a Section 8 Company. The same individuals can act as both shareholders and directors.",
  },
  {
    q: "Is there any minimum capital requirement for a Section 8 Company?",
    a: "No, there is no minimum capital requirement for incorporating a Section 8 Company. It can be registered with any amount of capital as per the organization's objectives.",
  },
  {
    q: "What documents are required for Section 8 Company registration?",
    a: "Key documents include PAN and Aadhaar of directors, address proof, photographs, MOA, AOA, digital signatures, a detailed project plan, and a registered office address with NOC.",
  },
  {
    q: "Can a Section 8 Company accept foreign donations?",
    a: "Yes, a Section 8 Company can accept foreign contributions, but only after obtaining registration under the Foreign Contribution Regulation Act (FCRA).",
  },
  {
    q: "Can family members be directors in a Section 8 Company?",
    a: "Yes, family members can be directors of a Section 8 Company as long as the organization operates for charitable purposes and is not managed for personal gain.",
  },
  {
    q: "Is a registered office address mandatory for Section 8 Company registration?",
    a: "Yes, a valid registered office address in India is required to receive official correspondence and legal notices from regulatory authorities.",
  },
  {
    q: "How long does it take to register a Section 8 Company in India?",
    a: "The registration process typically takes 15 to 25 working days, depending on document verification, approvals from the Registrar of Companies, and name approval timelines.",
  },
  {
    q: "Do Section 8 Companies need to file annual returns?",
    a: "Yes, like any other company, Section 8 Companies must file annual returns, income tax returns, and maintain proper books of accounts in compliance with MCA regulations.",
  },
  {
    q: "Can a Section 8 Company be converted into a private limited company?",
    a: "No, conversion of a Section 8 Company into a for-profit private limited company is not permitted, as the company is incorporated with charitable objectives.",
  },
  {
    q: "Are tax exemptions available to Section 8 Companies?",
    a: "Yes, Section 8 Companies can apply for tax exemptions under Sections 12AB, 80G, and other provisions of the Income Tax Act, subject to eligibility and proper registration.",
  },
  {
    q: "Can I operate a Section 8 Company from a residential address?",
    a: "Yes, a residential property can be used as the registered office of a Section 8 Company if a No Objection Certificate (NOC) is provided by the property owner.",
  },
  {
    q: "What are the benefits of registering a Section 8 Company?",
    a: "Section 8 Companies enjoy benefits such as separate legal identity, limited liability, credibility with donors, eligibility for government schemes, and tax exemptions for donors and the company.",
  },
  {
    q: "Can I register a Section 8 Company on my own?",
    a: "While technically possible, due to legal and procedural complexities, it is highly recommended to seek professional assistance for drafting documents, filing forms, and obtaining licenses.",
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
              Section 8 Company (NGO) Registration
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
            To register your Section 8 (Company) NGO seamlessly, you’ll need to
            submit basic identity, address, and office-related documents.
          </Typography>
          <Box
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              background: "transparent",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="xl">
              <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{
                  flexWrap: { xs: "wrap", md: "nowrap" }, // keep 4 in one row on md+
                }}
              >
                {cardData.map((card, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={3} // 4 cards per row on desktop
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        background: "transparent",
                        borderRadius: 3,
                        p: 4,
                        width: "100%",
                        maxWidth: 320,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#2a2a2a",
                          mb: 2,
                          textAlign: "center",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <ul
                        style={{
                          paddingLeft: "1.2rem",
                          margin: 0,
                          color: "#333",
                          fontSize: "1rem",
                          lineHeight: 1.8,
                        }}
                      >
                        {card.items.map((item, i) => (
                          <li key={i} style={{ marginBottom: "10px" }}>
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
              Simplified Process to Register Your <br /> Section 8 Company (NGO)
              in India
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
              Setting up your NGO is simpler than you think — especially with
              Rekotax guiding every step. Here’s a streamlined breakdown of the
              entire process:
            </Typography>
          </Box>
          <Box
      sx={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundColor: "#f4f6f8",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
        >
          {steps.map((step) => (
            <Grid
              key={step.num}
              item
              xs={12}
              sm={6}
              md={4} // 3 cards in one row on desktop
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  p: 4,
                  width: "100%",
                  maxWidth: 320,
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
                  sx={{
                    fontWeight: 700,
                    color: "#0f3d7c",
                    mb: 2,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    fontSize: "0.95em",
                    lineHeight: 1.6,
                    textAlign: "left",
                  }}
                >
                  {step.desc}
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
           Section 8 Company (NGO) Registration: A Complete Guide
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
      <Typography variant="h4" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        What is Section 8 Company Registration?
      </Typography>
      <Typography
        sx={{
          color: "#333",
          fontWeight: 400,
          fontSize: "1.05rem",
          lineHeight: 1.8,
        }}
      >
        A Section 8 Company is a type of non-profit organization (NGO)
        registered under the Companies Act, 2013. It is formed with the
        objective of promoting charitable activities such as education,
        art, science, social welfare, religion, environmental protection,
        or other similar causes. Unlike traditional companies, Section 8
        Companies cannot distribute profits among members and must
        reinvest earnings into the cause.
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
        Why Choose a Section 8 Company?
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
          <li>Ideal for NGOs, trusts, foundations, and charitable organizations</li>
          <li>Provides a credible and formal legal structure for social activities</li>
          <li>Eligible for various tax exemptions under Income Tax Act</li>
          <li>Can receive domestic and foreign donations (FCRA registration needed)</li>
          <li>Enhances public trust and brand value for donors and stakeholders</li>
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
          borderBottom: "2px solid #0f3d7c",
          pb: 1,
        }}
      >
        Key Features of a Section 8 Company
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
          <li><strong>Non-Profit Nature:</strong> Profits must be used for charitable objectives only.</li>
          <li><strong>No Dividend Distribution:</strong> Members cannot share company income.</li>
          <li><strong>Separate Legal Entity:</strong> Recognized as an independent legal body.</li>
          <li><strong>Limited Liability:</strong> Members' personal assets are protected.</li>
          <li><strong>Charitable Objectives:</strong> Must fall within the scope allowed by law.</li>
          <li><strong>Mandatory Central Government License:</strong> Required before incorporation.</li>
          <li><strong>High Compliance Standards:</strong> Transparent record-keeping and filing needed.</li>
          <li><strong>Eligible for Tax Benefits:</strong> Can apply for 80G and 12A exemptions.</li>
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
        Advantages of Section 8 Company Registration
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}
      >
        Legal Recognition & Structured Framework
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        <ul>
          <li>Incorporation under MCA provides legitimacy to your NGO.</li>
          <li>Offers a robust and transparent legal framework.</li>
        </ul>
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}
      >
        Credibility with Donors & Institutions
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        <ul>
          <li>Preferred by donors, government bodies, and CSR funders.</li>
          <li>Eligible to apply for grants, schemes, and foreign contributions.</li>
        </ul>
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}
      >
        Tax Exemptions & Benefits
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        <ul>
          <li>Eligible for 12A and 80G certifications for income tax relief.</li>
          <li>Exemptions under Income Tax Act for both organization and donors.</li>
        </ul>
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}
      >
        Limited Liability Protection
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        <ul>
          <li>Members are not personally liable for the debts of the company.</li>
          <li>Promotes risk-free social entrepreneurship.</li>
        </ul>
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}
      >
        Separate Legal Entity
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
        <ul>
          <li>Can own property, open bank accounts, and enter contracts.</li>
          <li>Continues to exist beyond the lifetime of its members.</li>
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
        Post-Registration Compliance for Section 8 Companies
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
        <ul>
          <li><strong>Annual Filings:</strong> File returns and financial statements with ROC.</li>
          <li><strong>Maintain Books of Accounts:</strong> Must follow prescribed accounting practices.</li>
          <li><strong>Conduct Annual General Meeting (AGM):</strong> Mandatory once a year.</li>
          <li><strong>Tax Filing:</strong> File income tax returns and applicable TDS.</li>
          <li><strong>Statutory Audit:</strong> Annual audit of books by a qualified CA.</li>
          <li><strong>Comply with License Terms:</strong> Ensure charitable objectives are maintained.</li>
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
        Certificate of Incorporation: Legal Identity for Your NGO
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        Once registered, the Section 8 Company receives a Certificate of Incorporation (COI)
        from the Ministry of Corporate Affairs (MCA), which acts as official proof of existence.
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        <ul>
          <li>Company Identification Number (CIN)</li>
          <li>Date of Incorporation</li>
          <li>Official registration details</li>
        </ul>
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
        The COI is required to:
      </Typography>
      <Typography sx={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
        <ul>
          <li>Open a dedicated NGO bank account</li>
          <li>Apply for PAN, TAN, and tax exemptions (12A/80G)</li>
          <li>Register under FCRA for foreign donations</li>
          <li>Receive CSR funds from companies</li>
        </ul>
      </Typography>
    </Box>

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
