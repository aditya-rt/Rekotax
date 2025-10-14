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





export default function RefundPolicy({ webAppUrl, onSubmitted }) {

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
    Refund Policy
  </Typography>

  <Typography sx={{ mb: 2 }}>
    <strong>Effective Date:</strong> 31st Aug, 2024
    <br />
    <strong>Last Updated:</strong> 02nd Sep, 2025
  </Typography>

  <Typography sx={{ mb: 2 }}>
    This Refund Policy is formulated and published by{" "}
    <strong>VAMSAG CONSULTING PRIVATE LIMITED</strong>, operating under the brand
    name <strong>REKOTAX</strong> (hereinafter, the “Company”, “we”, “us”, or “our”).
    The Company operates the digital platform under the brand name “REKOTAX”
    (the “Platform”).
  </Typography>

  <Typography sx={{ mb: 2 }}>
    The present Policy governs the conditions and procedures under which refund
    requests may be made and considered for professional, regulatory, and
    consultancy services rendered via the Platform. By availing or subscribing to
    any service, the client (“you”, “your”, or “Client”) acknowledges and accepts
    that this Refund Policy shall govern any claim, dispute, or expectation
    regarding reimbursement or return of fees paid.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 1. Scope of Applicability */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    1. Scope of Applicability
  </Typography>
  <Typography sx={{ mb: 2 }}>
    In light of the customized, time-sensitive, and compliance-oriented nature of
    our services—such as regulatory filings, documentation, business registration
    processes, consultancy advice, and submissions to government authorities—the
    Company maintains a restricted and discretionary refund policy. Services once
    initiated or acted upon in part or full are not eligible for refund save and
    except in limited circumstances as described herein.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 2. Eligibility and Non-Eligibility for Refund */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    2. Eligibility and Non-Eligibility for Refund
  </Typography>
  <Typography sx={{ mb: 2 }}>
    Refunds may be considered where a duplicate payment has been erroneously
    processed for the same transaction; or where the service has not been
    initiated in any substantial manner and no documents, instructions, or
    communications have been received from the Client. A refund may also be
    approved in the event of a technical failure attributable solely to the
    Platform that renders initiation of the service impossible and where no
    deliverables have been issued.
  </Typography>
  <Typography sx={{ mb: 2 }}>
    No refund shall be considered where the Client unilaterally cancels after
    confirmation; fails to furnish required documentation or clarifications; or
    where delay/failure arises due to unavailability or downtime of government or
    statutory portals. Where obligations have been wholly or partly fulfilled in
    accordance with the agreed scope of work, or dissatisfaction stems from
    subjective expectations not expressly warranted in writing, such claims are
    ineligible for refund.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 3. Procedure for Claim and Timeframe */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    3. Procedure for Claim and Timeframe
  </Typography>
  <Typography sx={{ mb: 2 }}>
    Any claim seeking refund must be submitted by the Client in writing via email
    to{" "}
    <Link href="mailto:business@rekotax.com" underline="hover" color="#0f3d7c">
      business@rekotax.com
    </Link>{" "}
    with a detailed explanation and proof of payment. Such request must be
    received within <strong>7 (seven) calendar days</strong> from the date of
    payment. Claims received beyond this period shall be deemed time-barred.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 4. Mode and Timeline of Refund */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    4. Mode and Timeline of Refund
  </Typography>
  <Typography sx={{ mb: 2 }}>
    Where the Company, at its sole discretion, accepts a refund request, it shall
    be processed within a maximum of <strong>10 (ten) working days</strong>,
    exclusive of banking delays, via the same method through which payment was
    originally remitted. All refunds are subject to deduction of administrative
    costs, payment gateway fees, and government levies (if any). The Company is
    not liable for failed refunds arising from incorrect/incomplete bank or
    payment details provided by the Client.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 5. Finality and Non-Justiciability */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    5. Finality and Non-Justiciability
  </Typography>
  <Typography sx={{ mb: 2 }}>
    All determinations, rejections, approvals, or settlements with respect to
    refund requests shall be made by the Company in a fair and commercially
    reasonable manner and shall be final, conclusive, and binding on the Client.
    The Client agrees not to pursue or disseminate grievances relating to refund
    decisions through any public, regulatory, or judicial platform without first
    affording the Company a reasonable opportunity to resolve the issue amicably
    in writing.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 6. Grievance Redressal */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    6. Grievance Redressal
  </Typography>
  <Typography sx={{ mb: 2 }}>
    The Company has appointed a Grievance Redressal Officer to handle
    refund-related complaints and concerns. The Grievance Officer shall
    acknowledge complaints within <strong>24 hours</strong> of receipt and make
    best efforts to resolve them within <strong>2 to 15 business days</strong>,
    depending on the complexity of the issue.
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

  {/* 7. Right to Amend */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    7. Right to Amend
  </Typography>
  <Typography sx={{ mb: 2 }}>
    The Company reserves the right to amend, modify, or revise this Refund Policy
    in part or whole at any time without prior notice. Such revisions shall be
    effective upon publication on the Platform. Continued use of the services
    after updates constitutes acceptance of the amended terms.
  </Typography>

  <Divider sx={{ my: 3 }} />

  {/* 8. Contact Details */}
  <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
    8. Contact Details
  </Typography>
  <Typography sx={{ mb: 2 }}>
    For communications, claims, clarifications, or to submit a refund request:
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
    BY AVAILING OR ACCESSING SERVICES THROUGH REKOTAX, THE CLIENT UNEQUIVOCALLY
    AGREES TO BE BOUND BY THIS REFUND POLICY AND WAIVES ANY RIGHT TO SEEK
    RECOURSE CONTRARY TO ITS TERMS.
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
