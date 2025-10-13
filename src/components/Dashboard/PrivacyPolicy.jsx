import React from "react";
import { useRef } from "react";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import WhyRekotax from "./WhyRekotax";
import ClientTestimonials from "./ClientTestimonials";

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
    Divider,
    Link,
    Paper,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Snackbar,
    Alert,
} from "@mui/material";
import { Stack, MenuItem } from "@mui/material";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const theme = createTheme({
    typography: {
        fontFamily:
            'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        h6: { fontWeight: 700 },
    },
    palette: {
        primary: { main: "#0f2555" },
        background: { default: "transparent" },
    },
    shape: { borderRadius: 12 },
});





export default function PrivacyPolicy({ webAppUrl, onSubmitted }) {

    const BRAND_PRIMARY = "#0f3d7c";   // solid brand color
    const BRAND_SECONDARY = "#023691";
    const BRAND_GRADIENT = "linear-gradient(11deg, #0f2555 0%, #023691 100%)";
    const aboutRef = useRef(null);

    // const aboutRef = useRef(null);
    // helper to check required fields (Message is optional)


    const footerRef = useRef(null);

    // Controls single-open accordion behavior
    const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
    const handleAccordionToggle = (idx) => {
        setExpanded((prev) => (prev === idx ? null : idx));
    };


    return (
        <Box
            sx={{
                // brand gradient background
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                minHeight: "100vh",
                bgcolor: "transparent",
                backgroundImage: `
      /* subtle brand-tinted glows (optional, kept) */
      radial-gradient(1000px 600px at 76% 60%, rgba(2,54,145,0.20), rgba(2,54,145,0) 60%),
      radial-gradient(800px 420px at 20% 10%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%),
      /* main brand gradient */
      linear-gradient(118deg, #0f2555 0%, #023691 100%)
    `,
                backgroundBlendMode: "screen, normal, normal",
                backgroundRepeat: "no-repeat",

                // page gutters & top offset for fixed AppBar
                maxWidth: "100%",
                mx: "auto",
                px: { xs: 1, sm: 2, md: 3 },

                pt: { xs: "88px", md: "94px" },
                mt: { xs: -12, md: -15 },
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {/* Hero compo */}
                <Grid
                    container
                    alignItems="center"
                    justifyContent={{ xs: "center", md: "space-between" }}
                    columnSpacing={{ xs: 2, sm: 4, md: 10 }}
                    rowSpacing={{ xs: 4, sm: 5, md: 0 }}
                    sx={{
                        // center the whole hero section and add responsive gutters
                        maxWidth: { xs: "100%", md: 1200, lg: 1280 },
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 6 },
                        flexWrap: { xs: "wrap", md: "nowrap" },
                        mt: { xs: 2, md: 3 },
                    }}
                >



                </Grid>

<Box
  sx={{
    fontFamily: "Arial, sans-serif",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 3, sm: 4 },
    width: "100vw",
    maxWidth: "none",
    ml: "calc(50% - 50vw)",
    mr: "calc(50% - 50vw)",
    lineHeight: 1.6,
    color: "#1a1a1a",
    bgcolor: "#fff",
  }}
>
  <Typography variant="h4" sx={{ color: "#0f3d7c", fontWeight: 700, mb: 1 }}>
    Privacy Policy
  </Typography>

  <Typography sx={{ mb: 2 }}>
    <strong>Effective Date:</strong> 31st Aug, 2024
    <br />
    <strong>Last Updated:</strong> 02nd Sep, 2025
  </Typography>

  <Typography sx={{ mb: 2 }}>
    At <strong>VAMSAG CONSULTING PRIVATE LIMITED</strong>, operating under the brand name{" "}
    <strong>REKOTAX</strong> (hereinafter referred to as the{" "}
    <strong>"Company," "we," "us,"</strong> or <strong>"our"</strong>), we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, maintain, store, disclose, and safeguard your information when you access or use our website (
    <Link href="https://www.rekotax.com" underline="hover" color="#0f3d7c" target="_blank" rel="noopener">
      www.rekotax.com
    </Link>
    ), mobile applications, or any other medium (collectively, the “Platform”). By using the Platform, you consent to the practices described herein. If you do not agree, please refrain from using the Platform.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 1. Information We Collect */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    1. Information We Collect
  </Typography>
  <Typography sx={{ mb: 1 }}>
    We collect information you provide voluntarily (e.g., name, contact details, PAN, Aadhaar, GSTIN, other statutory credentials, and documents/forms needed for services like incorporation, tax filings, and GST compliance).
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We also automatically collect technical/usage data when you access the Platform (e.g., IP address, device and browser info, OS, access date/time, pages visited, actions taken). Cookies or similar technologies may be used to improve experience and analyze trends. You may disable cookies in your browser, though some features may not function properly.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 2. Use of Information */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    2. Use of Information
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We use collected information for lawful business purposes including service provision, account management, customer support, transactional communications, service enhancement, promotions (where applicable), analytics, legal compliance, and fraud prevention. We only process data consistent with its collection purpose and for executing our services.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 3. Sharing and Disclosure */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    3. Sharing and Disclosure
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We do not sell or rent your personal information to third parties for marketing. We may share information on a strict need-to-know basis (and under confidentiality) with regulators (e.g., MCA, GSTN, Income Tax Department), payment gateways, verification agencies, cloud providers, technical support, or other vendors involved in delivering/ supporting our services, in accordance with Indian law and this Policy.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 4. Data Retention */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    4. Data Retention
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We retain personal data only as long as necessary for ongoing engagements, recordkeeping, legal compliance, dispute resolution, and enforcement. When no longer needed, we securely delete or anonymize it.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 5. Data Security */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    5. Data Security
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We implement appropriate technical and organizational safeguards (e.g., secure servers, encryption, restricted access, and periodic audits). While we follow industry practices, no system is fully secure; users accept the inherent risks of internet transmission.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 6. Your Rights and Choices */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    6. Your Rights and Choices
  </Typography>
  <Typography sx={{ mb: 2 }}>
    Subject to Indian law, you may access, correct, update, or request deletion of your personal data. Where processing is based on consent, you may withdraw consent at any time without affecting prior lawful processing. You may also opt out of non-essential promotional communications.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 7. Third-Party Links */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    7. Third-Party Links
  </Typography>
  <Typography sx={{ mb: 2 }}>
    The Platform may link to third-party sites/apps. We do not control and are not responsible for their privacy practices or content. Please review their policies.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 8. Children's Privacy */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    8. Children’s Privacy
  </Typography>
  <Typography sx={{ mb: 2 }}>
    Our services are intended for individuals at least 18 years of age. We do not knowingly collect data from minors. If we learn we have inadvertently collected such data without verifiable parental consent, we will delete it promptly.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 9. Data Protection Compliance */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    9. Data Protection Compliance
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We comply with the <strong>Information Technology Act, 2000</strong> and applicable rules, including the 2011 SPDI Rules, and are aligning practices with the <strong>Digital Personal Data Protection Act, 2023</strong> as it becomes fully enforced. We collect, process, and store sensitive personal data lawfully, fairly, and transparently.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 10. Grievance Redressal Officer */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    10. Grievance Redressal Officer
  </Typography>
  <Typography sx={{ mb: 2 }}>
    For complaints or concerns regarding personal information, contact our Grievance Officer. We acknowledge complaints within <strong>24 hours</strong> and aim to resolve them within <strong>3 to 15 business days</strong>, subject to complexity.
  </Typography>
  <Typography sx={{ mb: 2 }}>
    <strong>Name:</strong> Grievance Redressal Officer
    <br />
    <strong>Email:</strong>{" "}
    <Link href="mailto:grievance@rekotax.com" underline="hover" color="#0f3d7c">
      grievance@rekotax.com
    </Link>
    <br />
    <strong>Registered Address:</strong> VAMSAG CONSULTING PRIVATE LIMITED,
    <br />
    KH NO 166, G/F, ST NO 8, KAPIL VIHAR ROD MUKANDPUR,
    <br />
    Badli (North West Delhi), North West Delhi, Delhi, Delhi, India, 110042
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 11. Changes to This Policy */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    11. Changes to This Policy
  </Typography>
  <Typography sx={{ mb: 2 }}>
    We may revise this Policy to reflect legal, service, or practice changes. Material updates will be notified via email or prominent notice on the Platform. Continued use after updates constitutes acceptance.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 12. Contact Information */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    12. Contact Information
  </Typography>
  <Typography sx={{ mb: 2 }}>
    For questions or to exercise your rights:
    <br />
    <strong>Email:</strong>{" "}
    <Link href="mailto:business@rekotax.com" underline="hover" color="#0f3d7c">
      business@rekotax.com
    </Link>
    <br />
    <strong>Registered Address:</strong> VAMSAG CONSULTING PRIVATE LIMITED,
    <br />
    KH NO 166, G/F, ST NO 8, KAPIL VIHAR ROD MUKANDPUR,
    <br />
    Badli (North West Delhi), North West Delhi, Delhi, Delhi, India, 110042
  </Typography>

  <Divider sx={{ my: 3 }} />

  <Typography sx={{ fontWeight: 700 }}>
    BY ACCESSING OR USING REKOTAX, YOU CONFIRM THAT YOU HAVE READ, UNDERSTOOD, AND CONSENTED TO
    THE COLLECTION, USE, AND DISCLOSURE OF YOUR INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY.
  </Typography>
</Box>


            </ThemeProvider>
            <Box sx={{ mt: 0, mx: 0 }} ref={aboutRef}>
                <ClientTestimonials fullBleed />
            </Box>
            <Box sx={{ mt: -6, mx: -6 }} ref={footerRef}>
                <ContactSection />
            </Box>

            <Box sx={{ mt: 0, mx: 0 }} ref={footerRef}>
                <Footer />
            </Box>
        </Box>
    );
}

/*
USAGE:
- Save as src/components/PrivateLimitedCompanyDocs.jsx
- Add Open Sans font link to public/index.html.
- Import and render: <PrivateLimitedCompanyDocs />
*/
