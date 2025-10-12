import React from "react";
import { useRef } from "react";
import Footer from "../Footer";
import ContactSection from "../ContactSection";
import WhyRekotax from "../WhyRekotax";
import ClientTestimonials from "../ClientTestimonials";

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

const cardData = [
    {
        title: "Mandatory Documents for Seamless Registration",
        items: [
            "Partnership Deed detailing roles, capital, and profit-sharing",
            "Self-attested PAN card of each partner",
            "Residential address proof (Aadhaar, Voter ID, Passport)",
            "Business address proof of the registered office",
            "Recent passport-size photographs of all partners",
        ],
    },
    {
        title: "Supporting Documents Based on Business Setup",
        items: [
            "Rent agreement for business premises",
            "No Objection Certificate (NOC) from landlord",
            "Latest utility bill (electricity, water, etc.)",
            "Recent bank statements of all partners",
        ],
    },
    {
        title: "Key Clauses Your Partnership Deed Must Cover",
        items: [
            "Names and addresses of all partners",
            "Nature and scope of the business",
            "Capital contribution by each partner",
            "Profit and loss sharing ratio",
            "Defined roles, duties, and responsibilities of partners",
        ],
    },
];



export default function About({ webAppUrl, onSubmitted }) {

    const BRAND_PRIMARY = "#0f3d7c";   // solid brand color
    const BRAND_SECONDARY = "#023691";
    const BRAND_GRADIENT = "linear-gradient(11deg, #0f2555 0%, #023691 100%)";
    const aboutRef = useRef(null);

    // const aboutRef = useRef(null);
    // helper to check required fields (Message is optional)


    const footerRef = useRef(null);
    const WEB_APP_URL =
        webAppUrl ||
        "https://script.google.com/macros/s/AKfycbyl91p6yvHwzHv_h36eZ_yN-NU1IWrL8oHAlwUgzsIc68XbTTWj_QxLClIOlp8Cza7l_g/exec";

    const initialForm = {
        name: "",
        countryCode: "+91",
        phone: "",
        email: "",
        subject: "",
        message: "",
    };
    // Controls single-open accordion behavior
    const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
    const handleAccordionToggle = (idx) => {
        setExpanded((prev) => (prev === idx ? null : idx));
    };

    const [form, setForm] = React.useState(initialForm);
    const [errors, setErrors] = React.useState({});
    const [submitting, setSubmitting] = React.useState(false);
    const [snack, setSnack] = React.useState({
        open: false,
        severity: "success",
        msg: "",
    });
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const requiredOk = (f) => {
        const digits = (f.phone || "").replace(/\D/g, "");
        return (
            !!f.name?.trim() &&
            !!f.countryCode?.trim() &&
            !!f.email?.trim() && emailRe.test(f.email.trim()) &&
            !!f.subject?.trim() &&
            digits.length >= 10
        );
    };

    const [showReqWarn, setShowReqWarn] = React.useState(false);
    const isFormValid = requiredOk(form);
    const nameRe = /^[A-Za-z][A-Za-z\s'.-]{1,}$/;

    const validateField = (name, value) => {
        const v = (value ?? "").trim();
        switch (name) {
            case "name":
                if (!v) return "Name is required";
                if (!nameRe.test(v)) return "Enter a valid name";
                return "";
            case "phone": {
                const digits = v.replace(/\D/g, "");
                if (!digits) return "Phone is required";
                if (digits.length < 10 || digits.length > 15) return "Enter a valid phone";
                return "";
            }
            case "email":
                if (!v) return "Email is required";
                if (!emailRe.test(v)) return "Enter a valid email";
                return "";
            case "subject":
                if (!v) return "Subject is required";
                return "";
            case "message":
                if (!v) return "Message is required";
                if (v.length < 5) return "Message is too short";
                return "";
            default:
                return "";
        }
    };
    // put this inside your component (top-level)
    const fieldSx = {
        // input / single-line
        "& .MuiInputBase-input": { color: "#fff" },
        // textarea / multiline
        "& .MuiInputBase-inputMultiline, & textarea": { color: "#fff" },
        // label color (default + focused)
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
        // (optional) underline colors for filled variant
        "& .MuiFilledInput-underline:before": { borderBottomColor: "rgba(255,255,255,0.3)" },
        "& .MuiFilledInput-underline:hover:before": { borderBottomColor: "rgba(255,255,255,0.5)" },
        "& .MuiFilledInput-underline:after": { borderBottomColor: "#fff" },
    };

    const validateForm = (data) => {
        const fields = ["name", "phone", "email", "subject", "message"];
        const out = {};
        fields.forEach((f) => {
            const msg = validateField(f, data[f]);
            if (msg) out[f] = msg;
        });
        return out;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const next = { ...form, [name]: value };
        setForm(next);
        if (showReqWarn && requiredOk(next)) setShowReqWarn(false);
    };


    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;
        if (!requiredOk(form)) {
            setShowReqWarn(true);
            return;
        }
        setSubmitting(true);

        try {
            const data = new URLSearchParams({
                name: form.name.trim(),
                countryCode: form.countryCode,
                phone: form.phone,
                email: form.email,
                subject: form.subject,
                message: form.message,
            });

            const res = await fetch(WEB_APP_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: data.toString(),
            });

            const json = await res.json();

            if (json?.ok) {
                setShowReqWarn(false);
                // success: show toast + clear
                setSnack({ open: true, severity: "success", msg: "Thank you for submitting. We’ll reach out soon." });
                setForm({ ...initialForm });
                setErrors({});
            } else {
                setSnack({
                    open: true,
                    severity: "error",
                    msg: json?.error || "Could not submit. Please try again.",
                });
            }
        } catch (err) {
            console.error(err);
            setSnack({ open: true, severity: "error", msg: "Network error. Please try again." });
        } finally {
            setSubmitting(false);
        }
    }


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
                        mt: { xs: 2, md: 10 },
                    }}
                >
                    {/* LEFT: text (narrower, like your reference) */}
                    <Grid item xs={12} md={5} zeroMinWidth sx={{ minWidth: 0 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600, mb: 4, lineHeight: 1, fontSize: {
                                    xs: "clamp(1.6rem, 6vw, 2.2rem)",
                                    sm: "clamp(1.8rem, 5vw, 2.6rem)",
                                    md: "clamp(2.1rem, 3.4vw, 3.0rem)",
                                    lg: "clamp(2.3rem, 2.6vw, 3.4rem)",
                                    xl: "clamp(2.5rem, 2vw, 3.8rem)",
                                },
                            }}

                        >
                            Empowering Businesses to Grow Confidently with Reliable, Transparent, and End-to-End Compliance Solutions       </Typography>

                        <Typography sx={{ mb: 2, fontSize: "1rem" }}>
                            Rekotax is a business consultancy that empowers startups, MSMEs, and enterprises with seamless company registration, tax, and compliance management. We combine technology, expertise, and personalized support to keep your business compliant, efficient, and ready for the next stage of growth.
                        </Typography>





                    </Grid>


                </Grid>



                <Box sx={{
                    bgcolor: "#FFFFFF", mt: { xs: 6, md: 8 },
                    py: { xs: 6, md: 5 },
                    mx: "calc(50% - 50vw)",
                    width: "100vw",
                    px: 0,
                }}>
                    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 0 } }}>
                        {/* Title */}
                        <Typography
                            component="h1"
                            variant="h2"
                            sx={{
                                color: "#0f2555",
                                fontWeight: 600,
                                mb: 2,
                                mt: 2,
                                fontSize: { xs: "2rem", md: "2.5rem" },
                                wordBreak: { xs: "break-word", md: "keep-all" },
                                hyphens: { xs: "auto", md: "manual" },
                                maxWidth: "100%",
                                textAlign: "left",   // <- left align
                                mx: 0,               // <- don’t auto-center
                            }}
                        >
                            Redefining How Businesses Experience Professional Services
                        </Typography>

                        {/* What is GST + GSTIN (left) AND Contact Form (right) */}
                        <Grid
                            container
                            spacing={{ xs: 3, md: 6 }}
                            alignItems="flex-start"
                            justifyContent="space-between"
                            sx={{
                                // maxWidth: { xs: "100%", md: 1200, lg: 1280 },
                                // mx: "auto",
                                // px: { xs: 2, sm: 3, md: 4 },
                                mt: { xs: 1, md: 2 },
                                flexWrap: { xs: "wrap", sm: "nowrap" },   // keep side-by-side from sm+
                            }}
                        >
                            {/* LEFT: Content */}
                            <Grid item xs={12} sm={7} md={7} zeroMinWidth sx={{ minWidth: 0 }}>

                                {/* Para 1 */}
                                <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>

                                    For a long time, we have seen how entrepreneurs and businesses struggle to find <br />
                                    trustworthy compliance and taxation partners. The market is flooded with <br />
                                    unprofessional service providers who overpromise, underdeliver, and often leave<br />
                                    clients helpless after taking their money. Social media is full of stories of <br />
                                    frustrated founders and business owners forced to take legal action against <br />
                                    their consultants — a situation that damages both trust and the business ecosystem.
                                </Typography>

                                {/* Para 2 */}
                                <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
                                    We decided to change that. Rekotax was founded with a mission to restore trust, <br />
                                    transparency, and professionalism in the world of business compliance. We are<br />
                                    continuously building a platform where entrepreneurs can access reliable,<br />
                                    affordable, and expert-driven support for company registration, taxation, <br />
                                    compliance, and financial management — all under one roof.
                                </Typography>
                                <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
                                    Our vision is simple yet powerful: to make compliance effortless, trustworthy, and <br />
                                    growth-oriented. We’re not just another service provider; we’re your long-term<br />
                                    partner in building a business that runs right from day one.
                                </Typography>





                            </Grid>



                            <Grid item xs={12} sm={5} md={5} zeroMinWidth sx={{ minWidth: 0 }}>
                                <Box
                                    component="img"
                                    src="./who1.png"
                                    alt="Office / team"
                                    loading="lazy"
                                    sx={{
                                        width: "100%",
                                        display: "block",
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        objectFit: "cover",
                                        aspectRatio: { xs: "16 / 9", md: "4 / 3" },
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Container>
                </Box>

                <Box sx={{ mt: 0, p: 0, mx: 0, overflow: "visible" }} ref={aboutRef}>
                    <WhyRekotax fullBleed />
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
