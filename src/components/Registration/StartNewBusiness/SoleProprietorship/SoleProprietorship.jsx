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

export default function SoleProprietorship() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
  {
      q: "What is sole proprietorship registration?",
      a: "It is the process of legally recognizing a single individual as the owner of a business. It gives the proprietor the ability to operate under a trade name and obtain necessary licenses.",
    },
    {
      q: "Who can register a sole proprietorship in India?",
      a: "Any Indian citizen with valid identity and address proof can register a sole proprietorship, provided they meet basic compliance norms and licensing requirements.",
    },
    {
      q: "Is there any minimum requirement to start a sole proprietorship?",
      a: "No minimum capital or documentation is required by law, but you may need GST, MSME, or local licenses depending on your business activity.",
    },
    {
      q: "What is a sole proprietorship certificate?",
      a: "It is a license or registration certificate (like GST, Shop & Establishment, or Udyam) that serves as proof of your sole proprietorship's existence.",
    },
    {
      q: "What is the cost of registration of a sole proprietorship in India?",
      a: "It varies from ₹1,000 to ₹5,000 depending on the type of license and the state or municipality you’re operating in.",
    },
    {
      q: "What are the different types of sole proprietorship businesses?",
      a: "Common types include traders, freelancers, consultants, small retailers, and service providers. All are legally treated as the individual owner.",
    },
    {
      q: "What is the validity period of a sole proprietorship registration?",
      a: "Validity depends on the license obtained. For example, a Shop Act license may need renewal annually or every 3–5 years.",
    },
    {
      q: "Is GST registration mandatory for a sole proprietorship?",
      a: "It’s mandatory if your turnover exceeds ₹20/40 lakh, or if you sell interstate, online, or deal in taxable goods or services.",
    },
    {
      q: "What is the difference between a sole proprietorship and other business structures?",
      a: "Sole proprietorships have single ownership and unlimited liability, unlike LLPs and companies which offer separate legal identity and limited liability.",
    },
    {
      q: "How do I choose the correct business activity classification?",
      a: "Choose based on your product or service offering using NIC codes or categories provided under MSME or GST registration.",
    },
    {
      q: "Can a sole proprietorship operate under multiple business names?",
      a: "Yes, but each name may require separate registration, bank accounts, and compliance depending on how you structure the operations.",
    },
    {
      q: "Can I register a business name already in use by someone else?",
      a: "No, names that are identical or deceptively similar to an existing business, especially trademarks, should be avoided to prevent legal issues.",
    },
    {
      q: "Can I register a sole proprietorship without a physical office?",
      a: "Yes, you can use a residential or virtual office address as long as you can provide address proof and an NOC if required.",
    },
    {
      q: "How long does a sole proprietorship registration take in India?",
      a: "It generally takes 2–7 working days depending on the type of registration and documentation provided.",
    },
    {
      q: "Can I use my name as the business name without registration?",
      a: "Yes, but it’s recommended to register it under Udyam or GST to gain legal recognition and build trust.",
    },
    {
      q: "What is the difference between proprietorship and proprietorship firm registration?",
      a: "Proprietorship refers to the business model, while firm registration involves obtaining licenses like GST or Shop Act to give it formal identity.",
    },
    {
      q: "Is a PAN card different for a sole proprietorship business?",
      a: "No. The proprietor’s personal PAN is used for all business and tax-related purposes.",
    },
    {
      q: "Can a sole proprietorship avail of business loans?",
      a: "Yes, proprietors can apply for loans using their business proof such as GST registration, bank statements, and income tax filings.",
    },
    {
      q: "What happens to a sole proprietorship after the owner's death?",
      a: "The business ceases to exist, unless the legal heir continues operations in their own name or structure.",
    },
    {
      q: "What are the annual compliance requirements for a sole proprietorship?",
      a: "File annual ITR, maintain books of accounts, and renew any specific licenses as required by law.",
    }
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
              Sole Proprietorship Registration
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
              Register your Proprietorsip with Rekotax — experience fast setup, <br/>full legal compliance, 
              expert documentation, and dedicated support <br/> to launch your business effortlessly.
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
            To register your Proprietorship seamlessly, you’ll need to submit
            basic identity, address, and office-related documents.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              p: { xs: 2, md: 6 },
              backgroundColor: "transparent",
            }}
          >
            {/* Identity & Address Proof */}
            <Box
              sx={{
                backgroundColor: "#b5b7bb",
                p: 4,
                borderRadius: 2,
                width: { xs: "90%", md: 320 },
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Box
                  component="img"
                  src="https://img.icons8.com/fluency/96/identity-theft.png"
                  alt="ID Icon"
                  sx={{ height: 60 }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontSize: 20, color: "#1f2d5a", fontWeight: 700, mb: 2 }}
              >
                Identity & Address Proof
              </Typography>
              <ul
                style={{
                  paddingLeft: "18px",
                  color: "#333",
                  textAlign: "left",
                }}
              >
                <li>
                  <strong>PAN Card:</strong> Mandatory for tax registration and
                  identification
                </li>
                <li>
                  <strong>Aadhaar Card:</strong> Serves as both ID and address
                  proof
                </li>
                <li>
                  <strong>Passport:</strong> Useful especially for NRIs or IEC
                  registration
                </li>
                <li>
                  <strong>Voter ID Card:</strong> Acceptable alternative proof
                </li>
              </ul>
              <Typography
                sx={{
                  ml: 2,
                  color: "#0f2555",
                  fontSize: "0.95rem",
                  textAlign: "left",
                  mt: 1,
                }}
              >
                Ensure all documents carry up-to-date details
              </Typography>
            </Box>

            {/* Proof of Business Address */}
            <Box
              sx={{
                backgroundColor: "#b5b7bb",
                p: 4,
                borderRadius: 2,
                width: { xs: "90%", md: 320 },
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Box
                  component="img"
                  src="https://img.icons8.com/color/96/address--v1.png"
                  alt="Address Icon"
                  sx={{ height: 60 }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontSize: 20, color: "#1f2d5a", fontWeight: 700, mb: 2 }}
              >
                Proof of Business Address
              </Typography>
              <ul
                style={{
                  paddingLeft: "18px",
                  color: "#333",
                  textAlign: "left",
                }}
              >
                <li>
                  <strong>Owned Premises:</strong> Submit deed, tax receipt, or
                  utility bill
                </li>
                <li>
                  <strong>Rented Premises:</strong> Rent agreement + owner's NOC
                  + utility bill
                </li>
                <li>
                  <strong>Residential Use:</strong> Utility bills showing
                  correct address
                </li>
                <li>
                  <strong>Municipal Permissions:</strong> If required by local
                  authorities
                </li>
              </ul>
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
              Simplified Process to Register Your <br /> ole Proprietorship in
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
              Setting up your Sole Proprietorship is simpler than you think —
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
    p: { xs: 2, md: 6 },
    backgroundColor: "#f4f6f8",
  }}
>
  {[
    {
      number: "1",
      title: "Business Name & Structure Setup",
      desc: "Choose a unique business name that reflects your activity. Clearly define the type of business and services/products you offer.",
    },
    {
      number: "2",
      title: "Document Preparation",
      desc: "Collect PAN, Aadhaar, photos, and address proof. Secure valid proof of business premises like a rent agreement or utility bill.",
    },
    {
      number: "3",
      title: "Essential Registrations",
      desc: "Apply for a PAN card (if not already available). Register for GST if applicable and obtain a Shop & Establishment License from the local authority.",
    },
    {
      number: "4",
      title: "Banking Setup",
      desc: "Open a current account in your business name using the registered documents to enable proper financial operations.",
    },
    {
      number: "5",
      title: "Additional Licenses",
      desc: "Register for Professional Tax if applicable in your state. Apply for required sector-specific licenses like FSSAI, Trade License, etc.",
    },
    {
      number: "6",
      title: "Optional & Ongoing Compliance",
      desc: "Consider MSME (Udyam) registration for benefits. Set up bookkeeping, accounting, and tax compliance systems from the start.",
    },
  ].map((step, index) => (
    <Box
      key={index}
      sx={{
        backgroundColor: "#ffffff",
        color: "#333",
        borderRadius: 2,
        width: { xs: "90%", sm: "45%", md: "30%" },
        p: 4,
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
        {step.number}
      </Box>
      <Typography
        variant="h6"
        sx={{ fontSize: "1.1em", fontWeight: 700, color: "#0f3d7c", mb: 2 }}
      >
        {step.title}
      </Typography>
      <Typography
        sx={{ fontSize: "0.95em", lineHeight: 1.6, textAlign: "left" }}
      >
        {step.desc}
      </Typography>
    </Box>
  ))}
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
           Sole Proprietorship Registration: A Complete Guide
          </Typography>
   <Box
  sx={{
    backgroundColor: "#f4f6f8",
    py: { xs: 6, md: 8 },
    px: { xs: 2, md: 4 },
    fontFamily: "'Open Sans', sans-serif",
    color: "#333",
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
        What is a Sole Proprietorship?
      </Typography>
      <Typography sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
        A sole proprietorship is a business owned and operated by one
        individual. It is the simplest business structure available in India,
        offering full control to the owner with minimal compliance requirements.
        This model is ideal for freelancers, local traders, professionals, and
        home-based entrepreneurs looking to start small and scale with time.
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
      <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        Who Should Choose This Structure?
      </Typography>
      <ul>
        <li>Freelancers and independent service providers</li>
        <li>Retailers, resellers, and small shop owners</li>
        <li>Professionals such as CAs, doctors, and consultants</li>
        <li>Digital creators, online sellers, and tutors</li>
        <li>Artisans and small manufacturers</li>
      </ul>
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
      <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        Why Register a Sole Proprietorship?
      </Typography>
      <ul>
        <li>Establishes legal recognition and credibility</li>
        <li>Allows opening of a business bank account</li>
        <li>Required for GST and other tax registrations</li>
        <li>Makes you eligible for government schemes and loans</li>
        <li>Helps build professional trust and contractual validity</li>
      </ul>
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
      <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        Step-by-Step Registration Process
      </Typography>
      <ul>
        <li>
          <strong>Choose a Business Name:</strong> Ensure it's unique and
          reflects your activity.
        </li>
        <li>
          <strong>Get Basic Documents:</strong> PAN, Aadhaar, and proof of
          business address.
        </li>
        <li>
          <strong>Apply for Registrations:</strong> GST, Shop & Establishment,
          and other applicable licenses.
        </li>
        <li>
          <strong>Open a Current Account:</strong> Use your documents to start
          banking operations.
        </li>
        <li>
          <strong>Register under MSME (Optional):</strong> For additional
          benefits like subsidies and tenders.
        </li>
      </ul>
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
      <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        Key Characteristics
      </Typography>
      <ul>
        <li>
          <strong>Single Owner:</strong> One person is fully responsible and
          controls the business.
        </li>
        <li>
          <strong>No Legal Separation:</strong> The business and owner are
          treated as one legal entity.
        </li>
        <li>
          <strong>Unlimited Liability:</strong> Personal assets can be used to
          cover business liabilities.
        </li>
        <li>
          <strong>Simplified Taxation:</strong> Income is taxed as part of the
          owner’s personal income.
        </li>
        <li>
          <strong>Minimal Compliance:</strong> No ROC filing, no complex
          procedures.
        </li>
      </ul>
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
      <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        Benefits of Going Legal
      </Typography>

      <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#0f3d7c" }}>
        Professional Image
      </Typography>
      <ul>
        <li>Gain trust with suppliers and customers</li>
        <li>Boost brand perception</li>
      </ul>

      <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#0f3d7c" }}>
        Banking & Finance Access
      </Typography>
      <ul>
        <li>Get business loans and credit cards</li>
        <li>Apply for digital payment gateways</li>
      </ul>

      <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#0f3d7c" }}>
        Compliance Ready
      </Typography>
      <ul>
        <li>File GST and ITR returns with proper documentation</li>
        <li>Participate in tenders and secure licenses</li>
      </ul>

      <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#0f3d7c" }}>
        Future Growth
      </Typography>
      <ul>
        <li>Easy to upgrade to a company or LLP later</li>
        <li>Build a track record for investors and banks</li>
      </ul>
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
      <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        Documents Required
      </Typography>
      <ul>
        <li>PAN and Aadhaar Card</li>
        <li>Proof of Business Address (Rent Agreement or Utility Bill)</li>
        <li>Passport-sized Photographs</li>
        <li>GST Registration Certificate (if applicable)</li>
        <li>Shop and Establishment License</li>
        <li>Bank KYC Documents</li>
      </ul>
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
