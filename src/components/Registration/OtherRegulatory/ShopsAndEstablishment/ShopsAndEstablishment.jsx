import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    Divider,
    MenuItem,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Stack,
    Snackbar,
    TextField
} from "@mui/material";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/Add"; // plus icon
import RemoveIcon from "@mui/icons-material/Remove"; // minus icon
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";

import Footer from "../../../Dashboard/Footer";
import ContactSection from "../../../Dashboard/ContactSection";
import WhyRekotax from "../../../Dashboard/WhyRekotax";


/**
 * LUT Registration - Material UI Version
 * -------------------------------------------------------------
 * How to use:
 * 1) Ensure Open Sans is loaded in your index.html head (optional but recommended):
 *    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
 * 2) Drop this file into your project (CRA, Vite, Next.js, etc.).
 * 3) import LUTRegistrationMUI from "./LUTRegistrationMUI"; and render <LUTRegistrationMUI />
 * 4) Colors follow Rekotax palette with primary headline color #0f2555.
 */

const initialForm = {
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    subject: "",
    message: "",
};
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const BrandColor = "#0f2555";
const Pill = ({ children }) => (
    <Box
        sx={{
            display: "inline-block",
            bgcolor: "rgba(255,255,255,0.1)",
            px: 2.5,
            py: 0.8,
            borderRadius: 5,
            fontSize: "0.95rem",
            mb: 3,
        }}
    >
        {children}
    </Box>
);

const FeatureItem = ({ children }) => (
    <ListItem sx={{ py: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 34 }}>
            <CheckCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary={children} />
    </ListItem>
);

const InfoCard = ({ title, desc }) => (
    <Paper
        elevation={3}
        sx={{
            bgcolor: "#f3f6fb",
            p: { xs: 3, md: 4 },
            textAlign: "center",
            borderRadius: 2,
            height: "100%",
            transition: "0.3s",
            "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
        }}
    >
        <Typography
            variant="h4"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 1.5, fontSize: "1.5rem" }}
        >
            {title}
        </Typography>
        <Typography sx={{ color: "#444" }}>{desc}</Typography>
    </Paper>
);
const GstinBox = ({ code, label }) => (
    <Grid item>
        <Box
            sx={{
                bgcolor: "#f3f6fb",
                px: 3,
                py: 2,
                borderRadius: 1.5,
                fontWeight: 600,
                fontSize: "1.2rem",
                color: "#0f2555",
                textAlign: "center",
                boxShadow: 2,
                transition: "0.3s",
                minWidth: 90,
                "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
            }}
        >
            {code}
        </Box>
        <Typography align="center" sx={{ mt: 1, fontSize: "0.9rem", color: "#444" }}>
            {label}
        </Typography>
    </Grid>
);




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

export default function ShopsAndEstablishment({ webAppUrl }) {
    const theme = useTheme();
    const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const footerRef = useRef(null);
    const aboutRef = useRef(null);

    const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
    const handleAccordionToggle = (idx) => {
        setExpanded((prev) => (prev === idx ? null : idx));
    };
    const [snack, setSnack] = useState({
        open: false,
        severity: "success",
        msg: "",
    });
    const [showReqWarn, setShowReqWarn] = React.useState(false);

    const [form, setForm] = React.useState(initialForm);
    const [errors, setErrors] = React.useState({});

    const [submitting, setSubmitting] = React.useState(false);
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
            const WEB_APP_URL =

                "https://script.google.com/macros/s/AKfycbyl91p6yvHwzHv_h36eZ_yN-NU1IWrL8oHAlwUgzsIc68XbTTWj_QxLClIOlp8Cza7l_g/exec";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const next = { ...form, [name]: value };
        setForm(next);
        if (showReqWarn && requiredOk(next)) setShowReqWarn(false);
    };

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY) {
                setShow(false);   // scrolling down → hide
            } else {
                setShow(true);    // scrolling up → show
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    return (
        <Box sx={{ fontFamily: "'Open Sans', sans-serif", overflowX: "clip" }}>
            {/* Hero Section */}
            <Box
                sx={{
                    // brand gradient background
                    color: "#fff",
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "transparent",
                    backgroundImage: `
                 radial-gradient(1000px 600px at 76% 60%, rgba(2,54,145,0.20), rgba(2,54,145,0) 60%),
                 radial-gradient(800px 420px at 20% 10%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%),
                 linear-gradient(118deg, #0f2555 0%, #023691 100%)
               `,
                    backgroundBlendMode: "screen, normal, normal",
                    backgroundRepeat: "no-repeat",

                    // page gutters & top offset for fixed AppBar
                    maxWidth: "100%",
                    mx: "auto",

                    // remove forced height that creates excess bottom space
                    minHeight: "auto",

                    // give just enough vertical rhythm
                    pt: { xs: "120px", md: "140px" },
                    pb: { xs: 6, md: 8 },

                    // if your next section already has big top padding, gently pull it up on desktop
                    mb: { xs: 0, md: -1 },
                    mt: { xs: -8, md: -14 },
                }}
            >
                {/* HERO */}
                <Container maxWidth="lg">
                    {/* top pill, centered */}
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                        <Box
                            sx={{
                                display: "inline-block",
                                bgcolor: "rgba(255,255,255,0.12)",
                                px: 2.5,
                                py: 0.4,
                                borderRadius: 999,
                                fontSize: "0.95rem",
                            }}
                        >
                            Expert Shops & Establishment Registration Services in India
                        </Box>
                    </Box>

                    {/* one-line heading */}
                    <Typography
                        component="h1"
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            lineHeight: 1.12,

                            // Fluid sizes that stay compact enough to fit one line on wide screens
                            fontSize: {
                                xs: "clamp(1.6rem, 6vw, 2.2rem)",
                                sm: "clamp(1.8rem, 5vw, 2.6rem)",
                                md: "clamp(2.1rem, 3.4vw, 3.0rem)",
                                lg: "clamp(2.3rem, 2.6vw, 3.4rem)",
                                xl: "clamp(2.5rem, 2vw, 3.8rem)",
                            },

                            textAlign: "center",
                            mb: 2,

                            // Wrap on small, force single-line on md+
                            whiteSpace: { xs: "normal", md: "nowrap" },

                            // Prevent awkward hyphen/word breaks on large screens
                            wordBreak: { xs: "break-word", md: "keep-all" },
                            hyphens: { xs: "auto", md: "manual" },

                            // Ensure the headline can use full row width
                            display: "block",
                            maxWidth: "100%",
                            mx: "auto",
                            px: { xs: 2, md: 0 },
                        }}
                    >
                        Shops & Establishment Registration
                    </Typography>



                    {/* sub copy */}
                    <Typography
                        sx={{
                            fontSize: { xs: "1rem", md: "1rem" },
                            maxWidth: 980,
                            mx: "auto",
                            textAlign: "center",
                            mb: 4,
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        Register your Shops & Establishment Registration
 with Rekotax — experience fast setup, full legal compliance, expert documentation, and dedicated support to launch your business effortlessly.                    </Typography>

                    {/* CTAs centered */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mb: 4,
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#fff",
                                color: "#0f2555",
                                fontWeight: 700,
                                px: 4,
                                py: 1.2,
                                borderRadius: 10,
                                "&:hover": { bgcolor: "#f0f0f0" },
                            }}
                        >
                            Start Registration
                        </Button>
                        <Button
                            variant="outlined"
                            href="tel:+919220580062"
                            sx={{
                                color: "#fff",
                                borderColor: "rgba(255,255,255,0.7)",
                                px: 4,
                                py: 1.2,
                                borderRadius: 10,
                                "&:hover": { borderColor: "#fff" },
                            }}
                        >
                            +91-9220580062
                        </Button>
                    </Box>

                    {/* highlight bar (single white pill with 3 items) */}
                    <Box
                        sx={{
                            maxWidth: 980,
                            mx: "auto",
                            bgcolor: "#fff",
                            color: "#0f2555",
                            borderRadius: { xs: 2, md: 999 },
                            px: { xs: 1.5, md: 2.5 },
                            py: { xs: 1, md: 1 },
                            boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: "initial", sm: "space-between" },
                            gap: { xs: 1, md: 3 },
                            flexWrap: { xs: "wrap", sm: "nowrap" },
                        }}
                    >
                        {[
                            "Typical approvals: 5-7 days*",
                            "CA/CS assisted end-to-end",
                            "Paperless & transparent tracking",
                        ].map((text, i) => (
                            <Typography
                                key={text}
                                sx={{
                                    // Stack as full-width cards on xs, inline equal columns on sm+
                                    flex: { xs: "0 0 100%", sm: 1 },
                                    width: { xs: "100%", sm: "auto" },
                                    textAlign: "center",
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    fontWeight: 700,
                                    px: { xs: 1.25, md: 2 },
                                    py: { xs: 1, md: 0 },

                                    // Card look on small screens
                                    bgcolor: { xs: "#f7f9ff", sm: "transparent" },
                                    border: { xs: "1px solid rgba(15,37,85,0.10)", sm: "none" },
                                    borderRadius: { xs: 2, sm: 0 },
                                    boxShadow: { xs: "0 6px 16px rgba(0,0,0,0.08)", sm: "none" },

                                    // Spacing between stacked cards
                                    mb: { xs: 0.5, sm: 0 },

                                    position: "relative",

                                    // Vertical separators only on sm+
                                    ...(i < 2 && {
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            right: 0,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            height: 22,
                                            width: 1,
                                            // backgroundColor: "rgba(15,37,85,0.18)",
                                            display: { xs: "none", sm: "block" },
                                        },
                                    }),
                                }}
                            >
                                {text}
                            </Typography>
                        ))}
                    </Box>


                    <Typography
                        sx={{
                            mt: 2,
                            textAlign: "center",
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.6)",
                        }}
                    >
                        *Subject to government verification & completeness of documents.
                    </Typography>
                </Container>
            </Box>
            {/*content */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                {/* Title */}
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        color: "#0f2555",
                        fontWeight: 700,
                        mb: 4,
                        mt: 2,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Know All About Shops & Establishment Registration

                </Typography>

                {/* What is GST + GSTIN (left) AND Contact Form (right) */}
                <Grid
                    container
                    spacing={{ xs: 3, md: 6 }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{
                        maxWidth: { xs: "100%", md: 1200, lg: 1280 },
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 4 },
                        mt: { xs: 1, md: 2 },
                        flexWrap: { xs: "wrap", sm: "nowrap" },   // keep side-by-side from sm+
                    }}
                >
                    {/* LEFT: Content */}
                    <Grid item xs={12} sm={7} md={7} zeroMinWidth sx={{ minWidth: 0 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#0f2555",
                                fontWeight: 700,
                                mb: 1.5,
                                fontSize: { xs: "1.5rem", md: "1.8rem" },
                            }}
                        >
                            What is Shops & Establishment Registration?

                        </Typography>
                        {/* Para 1 */}
                        <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
                          Shops and Establishment Registration is a state law requirement for shops, commercial <br/>
                          establishments, and offices operating within a state. It governs conditions of work <br/>
                          like working hours, weekly holidays, leave, wages, and employee welfare, and it <br/> 
                          mandates registration within the prescribed timeline from the date of commencement.
                        </Typography>

                        {/* Para 2 */}
                        <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
                            LUT registration is <strong>mandatory</strong> for any exporter who wishes to export goods or <br />
                            services without paying integrated tax and claiming refunds later. With LUT,<br /> businesses can
                            save time, improve liquidity, and expand globally without tax <br />blockages.
                        </Typography>

                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ mt: 4 }}>
                            {/* Heading */}
                            <Typography
                                variant="h4"
                                component="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: "#0f2555",
                                    fontSize: { xs: "1rem", md: "2rem" },
                                    textAlign: "center",
                                    mb: 1.5,
                                    lineHeight: 1.2,
                                    textWrap: "balance",
                                }}
                            >
                              Key Features of Shops & Establishment Registration

                            </Typography>

                            {/* Bulleted list */}
                            <Box
                                component="ul"
                                sx={{
                                    maxWidth: 900,
                                    mx: "auto",
                                    color: "#333",
                                    fontSize: { xs: "1rem", md: "1.05rem" },
                                    lineHeight: 1.8,
                                    pl: { xs: 3, md: 4 }, // indent bullets
                                    m: 0,
                                    "& > li": { mb: 1 },
                                }}
                            >
                                <li>
Mandatory for <strong>shops, offices, warehouses, service providers, eateries, and commercial establishments  </strong>                               </li>
                                <li>
State-specific registration - administered by the <strong>Labour Department or Municipal authorities</strong>
                                </li>
                                <li>
Captures key details like <strong>employer, manager, number of employees, nature of business, and premises</strong> 
                                </li>
                                <li>
Prescribes <strong>working hours, weekly off, leave, and notice requirements for employee welfare</strong> 
                                    </li>
                                <li>
Validity may be <strong>lifetime or periodic </strong>with renewals depending on the state
                                </li>
                            </Box>
                        </Box>


                        {/* <Typography
                            variant="h3"
                            sx={{
                                color: "#0f2555",
                                fontWeight: 700,
                                mb: 2,
                                mt:3,
                                fontSize: { xs: "1.6rem", md: "1.7rem" },
                            }}
                        >
                            GSTIN Structure Explained
                        </Typography> */}

                        {/* <Box
                            sx={{
                                display: "inline-block",
                                bgcolor: "#0f2555",
                                color: "#fff",
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                                fontWeight: 600,
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                letterSpacing: 2,
                                mb: 2,
                                boxShadow: 3,
                            }}
                        >
                            22ABCDE1234F1Z5
                        </Box> */}

                        {/* <Grid container spacing={1.5} wrap="wrap">
                            <GstinBox code="22" label="State Code" />
                            <GstinBox code="ABCDE1234F" label="PAN Number" />
                            <GstinBox code="1" label="Entity Code" />
                            <GstinBox code="Z" label="Default Letter" />
                            <GstinBox code="5" label="Check Digit" />
                        </Grid> */}
                    </Grid>

                    {/* RIGHT: Contact form */}
                    <Grid item xs={12} sm={5} md={5} zeroMinWidth sx={{ minWidth: 0 }}>
                        <Paper elevation={6} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, width: "100%" }}>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 600, color: "#0f2555", textAlign: "center", mb: 1 }}
                            >
                                Get Expert Consultation
                            </Typography>

                            <Stack spacing={2}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    label="Name*"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name || ""}
                                />

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <TextField
                                        select
                                        size="small"
                                        variant="outlined"
                                        name="countryCode"
                                        label="Code"
                                        value={form.countryCode}
                                        onChange={handleChange}
                                        sx={{ width: { xs: "100%", sm: 140 }, flexShrink: 0 }}
                                        SelectProps={{ MenuProps: { PaperProps: { sx: { minWidth: 220 } } } }}
                                    >
                                        <MenuItem value="+91">+91 (IN)</MenuItem>
                                        <MenuItem value="+971">+971 (AE)</MenuItem>
                                        <MenuItem value="+61">+61 (AU)</MenuItem>
                                        <MenuItem value="+49">+49 (DE)</MenuItem>
                                        <MenuItem value="+1">+1 (US)</MenuItem>
                                        <MenuItem value="+86">+86 (CN)</MenuItem>
                                    </TextField>

                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        label="Mobile No.*"
                                        name="phone"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const digits = e.target.value.replace(/\D/g, "");
                                            handleChange({ target: { name: "phone", value: digits } });
                                        }}
                                        error={Boolean(errors.phone)}
                                        helperText={errors.phone || ""}
                                    />
                                </Stack>

                                <TextField
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    label="Your email*"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email || ""}
                                />

                                <TextField
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    label="Subject*"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    error={Boolean(errors.subject)}
                                    helperText={errors.subject || ""}
                                />

                                <TextField
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    label="Message"
                                    multiline
                                    minRows={3}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    error={Boolean(errors.message)}
                                    helperText={errors.message || ""}
                                />

                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        mt: 0.5,
                                        borderRadius: 10,
                                        px: 5,
                                        py: 0.9,
                                        alignSelf: { xs: "stretch", sm: "center" },
                                        backgroundColor: "#0f2555",
                                        ":hover": { backgroundColor: "#0c1e46" },
                                    }}
                                >
                                    SUBMIT
                                </Button>
                            </Stack>

                            <Snackbar
                                open={snack.open}
                                autoHideDuration={1400}
                                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            >
                                <Alert
                                    onClose={() => setSnack((s) => ({ ...s, open: false }))}
                                    severity={snack.severity}
                                    variant="filled"
                                    sx={{ width: "100%" }}
                                >
                                    {snack.msg}
                                </Alert>
                            </Snackbar>
                        </Paper>
                    </Grid>
                </Grid>


                {/* Threshold Limits */}
                <Box sx={{ mt: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{ color: "#0f2555", fontWeight: 600, mb: 3, textAlign: "left" }}
                    >
                      Who Needs Shops & Establishment Registration
              </Typography>

                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="stretch"
                        sx={{
                            // ensure the grid doesn't stack on md+
                            flexWrap: { xs: "wrap", md: "nowrap" },
                        }}
                    >
                        {[
  {
    title: "Shops and Offices",
    desc: <>Retail outlets, boutiques, showrooms, and offices engaged in trade or service activities at a fixed premises.</>,
  },
  {
    title: "Commercial Establishments",
    desc: <>Consultancies, IT firms, agencies, warehouses, restaurants, cafes, and other service enterprises.</>,
  },
  {
    title: "Warehouses and Agencies",
    desc: <>Agencies, warehouses, godowns, and distribution points carrying on trade or support services.</>,
  },
]
.map((card) => (
                            <Grid
                                item
                                key={card.title}
                                xs={12}      // 1 per row on phones
                                sm={6}       // 2 per row on tablets
                                md={4}       // 3 per row on md+ (single row)
                                sx={{ display: "flex", minWidth: 0 }}
                            >
                                <Paper
                                    elevation={6}
                                    sx={{
                                        flex: 1,
                                        bgcolor: "#f5f8ff",
                                        borderRadius: 3,
                                        p: { xs: 3, md: 4 },
                                        textAlign: "center",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f2555", mb: 1 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography sx={{ lineHeight: 1.6 }}>{card.desc}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>



                {/* Benefits Section */}
                <Box sx={{ mt: 14 }}>
                    <Typography
                        variant="h4"
                        sx={{ color: "#0f2555", fontWeight: 600, mb: 3, mt: 4, textAlign: "left" }}
                    >
                        Benefits of Shops & Establishment Registration           </Typography>

                    <Typography sx={{ mb: 5, color: "#444" }}>
Registration ensures legal operation, strengthens credibility, and streamlines labor compliance for inspections and audits.

                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gap: { xs: 2, md: 3 },                     // spacing between cards
                            gridTemplateColumns: {
                                xs: "1fr",                                // 1 per row (phones)
                                sm: "repeat(2, 1fr)",                     // 2 per row (tablets)
                                md: "repeat(3, 1fr)",                     // 3 per row (md+)
                            },
                            alignItems: "stretch",
                        }}
                    >
                        {[
  {
    title: "Legal Recognition",
    desc: <>Operate lawfully within the state with a valid registration certificate.</>,
  },
  {
    title: "Smoother Licensing",
    desc: <>Facilitates <strong>bank account opening</strong>, <strong>other license applications</strong>, and <strong>tenders</strong>.</>,
  },
  {
    title: "Employee Welfare",
    desc: <>Supports fair <strong>working hours</strong>, <strong>weekly off</strong>, and <strong>leave</strong> as per state norms.</>,
  },
  {
    title: "Inspection Ready",
    desc: <>Clear documentation and registers make <strong>inspections and audits</strong> easier.</>,
  },
  {
    title: "Credibility",
    desc: <>Improves trust with stakeholders, landlords, and authorities.</>,
  },
  {
    title: "Simple Online Process",
    desc: <>Most states offer <strong>online application</strong>, <strong>e-sign</strong>, and <strong>e-payment</strong>.</>,
  },
]


                            .map((card) => (
                                <Box key={card.title} sx={{ display: "flex" }}>
                                    {/* If InfoCard already renders a Paper, just keep it; otherwise use a Paper here */}
                                    <InfoCard title={card.title} desc={card.desc} />
                                </Box>
                            ))}
                    </Box>

                </Box>



                {/* Steps - exactly 3 per row (2 rows), scrollable on mobile */}
                <Box sx={{ mt: 10, mb: { xs: 6, md: 10 } }}>
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.2rem" },
                            fontWeight: 700,
                            color: "#0f2555",
                            mb: 6,
                        }}
                    >
Simplified Process for Shops & Establishment Registration
                    </Typography>

                    {(() => {
                  const steps = [
  {
    number: "1",
    title: "Prepare Your Documents",
    desc:
      "Keep entity PAN, incorporation or firm deed, proof of principal place of business, rent agreement with owner NOC if rented, signatory ID, photo, list of employees with designation, and manager details. Have a board or partner authorization if applicable.",
  },
  {
    number: "2",
    title: "Create State Portal Account",
    desc:
      "Register on your State Labour Department or Municipal portal. Verify mobile and email via OTP and complete the profile such as nature of business, date of commencement, and local jurisdiction if asked.",
  },
  {
    number: "3",
    title: "Fill Registration Form",
    desc:
      "Enter legal name, trade name, constitution, address, signatory, manager, number of employees, and business category. Some states ask for shift details and weekly off day.",
  },
  {
    number: "4",
    title: "Upload Documents",
    desc:
      "Upload KYC and address proofs in the prescribed size and format. Attach photograph of the premises if required and any declarations mandated by the state.",
  },
  {
    number: "5",
    title: "e-Sign and Pay Fees",
    desc:
      "e-Sign using DSC or Aadhaar as permitted. Pay the registration fee or consolidated fee as applicable. Some states auto-approve while others may schedule scrutiny or inspection.",
  },
  {
    number: "6",
    title: "Get Certificate & Comply",
    desc:
      "Download the Shops and Establishment Registration Certificate. Display it at the premises and maintain registers, notices, and records. Track renewal or amendments in case of changes to name, address, employees, or ownership.",
  },
];



                        const rows = [steps.slice(0, 3), steps.slice(3, 6)];

                        return rows.map((row, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    flexWrap: { xs: "nowrap", md: "nowrap" },
                                    gap: { xs: 2, md: 2 },            // vertical gap on xs, horizontal on md
                                    overflowX: { xs: "visible", md: "visible" }, // no horizontal scroll on xs
                                    px: { xs: 0, md: 0 },
                                    mb: idx === 0 ? 3 : 0,
                                    scrollSnapType: { xs: "none", md: "none" },
                                    justifyContent: { xs: "stretch", md: "center" },
                                }}
                            >
                                {row.map((step) => (
                                    <Box
                                        key={step.number}
                                        sx={{
                                            // Mobile/tablet: fixed card width for swipe
                                            // Desktop: exact 1/3 of the row minus the two gaps (2 * 16px = 32px)
                                            flex: {
                                                xs: "0 0 100%",
                                                md: "0 0 calc((100% - 32px) / 3)",
                                            },
                                            maxWidth: { xs: "100%", md: "none" },
                                            display: "flex",
                                        }}
                                    >
                                        <Paper
                                            elevation={6}
                                            sx={{
                                                bgcolor: "#f9fbff",
                                                borderRadius: 2,
                                                p: { xs: 3, md: 4 },
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                "&:hover": {
                                                    transform: { xs: "none", md: "translateY(-5px)" },
                                                    boxShadow: {
                                                        xs: "0 8px 16px rgba(0,0,0,0.08)",
                                                        md: "0 12px 28px rgba(0,0,0,0.12)",
                                                    },
                                                },
                                            }}
                                        >
                                            {/* Step number circle */}
                                            <Box
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: "50%",
                                                    bgcolor: "#0f2555",
                                                    color: "#fff",
                                                    fontWeight: 700,
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

                                            {/* Title and description (left-aligned like your screenshot) */}
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "#0f2555",
                                                    mb: 1,
                                                    fontSize: "1.1em",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {step.title}
                                            </Typography>
                                            <Typography sx={{ fontSize: "0.95em", lineHeight: 1.6, color: "#333", textAlign: "left" }}>
                                                {step.desc}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                ))}
                            </Box>
                        ));
                    })()}
                </Box>

                <Box sx={{ mt: 0, p: 0, mx: 0, overflow: "visible" }} ref={aboutRef}>
                    <WhyRekotax fullBleed />
                </Box>

              <Box
  sx={{
    maxWidth: 1100,
    mx: "auto",
    px: { xs: 2, md: 4 },
    py: { xs: 4, md: 8 },
    backgroundColor: "#fff",
    color: "#333",
    lineHeight: 1.7,
  }}
>
  <Typography
    variant="h3"
    sx={{ textAlign: "center", color: "#0f2555", fontWeight: 600, mb: 4 }}
  >
    Shops &amp; Establishment Registration in India – A Complete Guide
  </Typography>

  {/* Introduction */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 2, mb: 1.5 }}>
    Introduction
  </Typography>
  <Typography paragraph>
    The Shops &amp; Establishments Act (state-specific) regulates conditions of work in shops,
    offices, restaurants, theatres and other commercial establishments. It covers working hours,
    weekly holidays, leave, wages, safety and employee welfare.
  </Typography>
  <Typography paragraph>
    Most states mandate registration within a prescribed timeline from starting operations. With{" "}
    <strong>Rekotax</strong>, you get end-to-end assistance for registration, amendments and
    renewals so your premises stays compliant and inspection-ready.
  </Typography>

  {/* What is it */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    What is Shops &amp; Establishment Registration?
  </Typography>
  <Typography paragraph>
    It is a state-level registration for any premises where trade, business or services are carried
    on. On approval, the authority issues a <strong>Shops &amp; Establishment Registration
    Certificate</strong> (often called a trade license in some jurisdictions) which must be
    displayed at the premises.
  </Typography>

  {/* Who needs it */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Who Needs Shops &amp; Establishment Registration?
  </Typography>
  <Typography paragraph>Registration is typically required for the following:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      <><strong>Retail &amp; service outlets:</strong> Shops, showrooms, salons, gyms, cafes, restaurants, eateries.</>,
      <><strong>Offices &amp; agencies:</strong> IT/ITES, consulting, marketing, staffing, brokerage and other service firms.</>,
      <><strong>Warehouses &amp; godowns:</strong> Storage, distribution and logistics premises.</>,
      <><strong>Startups &amp; established entities:</strong> Proprietorships, Partnerships, LLPs and Companies operating from a commercial address.</>,
      <><strong>Multi-state presence:</strong> Each branch/premises must register under the respective state’s Act.</>,
    ].map((item, idx) => (
      <ListItem key={idx} sx={{ py: 0 }}>
        <ListItemText primaryTypographyProps={{ component: "span" }} primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Applicability & timelines */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Applicability &amp; Timelines
  </Typography>
  <Typography paragraph>
    Rules, fees, and validity differ by state. Many states require registration{" "}
    <strong>within 30 days of commencement</strong> (check your state portal/notification). Some
    states grant lifetime certificates; others require periodic renewal.
  </Typography>

  <Box
    sx={{
      background: "#f4f6f8",
      p: 2,
      borderLeft: "4px solid #0f2555",
      borderRadius: 1,
      my: 2,
    }}
  >
    <Typography sx={{ m: 0 }}>
      <strong>Tip:</strong> If you change <em>name, address, manager, employee count or nature of
      business</em>, file an amendment within the state-prescribed time.
    </Typography>
  </Box>

  {/* Key features */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Key Features of Registration
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      <><strong>State-specific online portals:</strong> Apply, pay fees and download certificates digitally in most states.</>,
      <><strong>Employee welfare norms:</strong> Working hours, weekly off, leave, overtime, safety and display requirements.</>,
      <><strong>Mandatory display:</strong> Certificate and prescribed notices must be displayed at a visible spot.</>,
      <><strong>Inspection readiness:</strong> Maintain registers/records as specified by the state rules.</>,
    ].map((item, idx) => (
      <ListItem key={idx} sx={{ py: 0 }}>
        <ListItemText primaryTypographyProps={{ component: "span" }} primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Registration / Renewal / Amendment table */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Registration, Renewal &amp; Amendment
  </Typography>
  <Table sx={{ my: 2 }}>
    <TableHead>
      <TableRow>
        {["Action", "Who needs it", "Purpose", "Typical timeline"].map((h) => (
          <TableCell key={h} sx={{ background: "#0f2555", color: "#fff", fontWeight: 700 }}>
            {h}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        ["Registration", "Newly opened shops/establishments", "Operate lawfully under state labour regulations", "Often within 30 days of start (state-specific)"],
        ["Renewal", "States with fixed validity", "Extend certificate validity", "As per state cycle / lifetime in some states"],
        ["Amendment", "On business detail changes", "Keep records correct for inspections", "Within prescribed days (state-specific)"],
      ].map((row, idx) => (
        <TableRow key={idx}>
          {row.map((cell, i) => (
            <TableCell key={i} sx={{ fontSize: "0.95em" }}>
              {i === 0 ? <strong>{cell}</strong> : cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>

  {/* Benefits */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Benefits of Registration
  </Typography>
  <Typography paragraph>Getting registered provides tangible operational and compliance advantages:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      <><strong>Legal recognition:</strong> Lawful operation at your commercial premises.</>,
      <><strong>Smoother licensing:</strong> Helpful for bank account opening, other licenses and tenders.</>,
      <><strong>Inspection-ready:</strong> Clear documentation for labour inspections.</>,
      <><strong>Stakeholder trust:</strong> Boosts credibility with landlords, vendors and authorities.</>,
    ].map((item, idx) => (
      <ListItem key={idx} sx={{ py: 0 }}>
        <ListItemText primaryTypographyProps={{ component: "span" }} primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Why register even if small */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Why Register Even If You’re Small?
  </Typography>
  <Typography paragraph>Even micro establishments benefit from timely registration:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      <><strong>Avoid penalties:</strong> Non-registration can lead to fines and prosecution.</>,
      <><strong>Lease &amp; utilities:</strong> Landlords and utilities often insist on registration proof.</>,
      <><strong>Hiring readiness:</strong> Provides a framework for lawful work conditions and records.</>,
      <><strong>Future expansion:</strong> Easier to add employees, open branches and apply for other approvals.</>,
    ].map((item, idx) => (
      <ListItem key={idx} sx={{ py: 0 }}>
        <ListItemText primaryTypographyProps={{ component: "span" }} primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Documents Required */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Documents Required
  </Typography>
  <Typography paragraph>Keep clear, legible copies as per your state portal’s format/size limits:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      <><strong>Entity proof:</strong> PAN; Incorporation Certificate / Partnership Deed / LLP Agreement.</>,
      <><strong>Premises proof:</strong> Electricity bill / property tax; <strong>rent agreement &amp; owner NOC</strong> if rented.</>,
      <><strong>Signatory/Manager KYC:</strong> PAN, Aadhaar, photo and contact details.</>,
      <><strong>Employee details:</strong> Count, designations, weekly off day; shift details where asked.</>,
      <><strong>Board/Partner authorization:</strong> If an authorised person is filing.</>,
      <><strong>State-specific declarations:</strong> Prescribed forms, undertakings and premises photo if required.</>,
    ].map((item, idx) => (
      <ListItem key={idx} sx={{ py: 0 }}>
        <ListItemText primaryTypographyProps={{ component: "span" }} primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Step-by-step process */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Step-by-Step Registration Process
  </Typography>
  <Typography paragraph>
    The flow below reflects most state portals (exact fields vary by state):
  </Typography>
  <List sx={{ listStyleType: "decimal", pl: 4 }}>
    {[
      "Create account: Register on your State Labour/Municipal portal and verify contacts.",
      "Fill the form: Legal name, trade name, address, nature of business, manager, employee count.",
      "Upload documents: KYC, address proof, authorization and any state-mandated forms.",
      "Pay fees & e-sign: Pay online and e-sign via Aadhaar/DSC as permitted.",
      "Scrutiny/inspection: Some states auto-approve; others may schedule verification.",
      "Download certificate: Display it at the premises and maintain required registers.",
    ].map((step, idx) => (
      <ListItem key={idx} sx={{ display: "list-item", py: 0 }}>
        <ListItemText primary={step} />
      </ListItem>
    ))}
  </List>

  {/* Penalties */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Penalties for Non-Compliance
  </Typography>
  <Typography paragraph>
    States can levy fines for late/failed registration, not maintaining registers, or violating
    working-hour and leave provisions. Repeated non-compliance may invite prosecution. Check your
    state rules for exact amounts.
  </Typography>

  {/* How Rekotax helps */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    How Rekotax Can Help You
  </Typography>
  <Typography paragraph>We make registration simple and accurate:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      <><strong>State assessment:</strong> Applicability, timelines, fees and validity mapping.</>,
      <><strong>Documentation &amp; filing:</strong> End-to-end preparation, portal filing and fee payment.</>,
      <><strong>Inspection readiness:</strong> Guidance on displays, registers and notices.</>,
      <><strong>Lifecycle support:</strong> Amendments, renewals and responses to authority queries.</>,
      <><strong>Dedicated expert:</strong> One-on-one assistance till certificate download.</>,
    ].map((item, idx) => (
      <ListItem key={idx} sx={{ py: 0 }}>
        <ListItemText primaryTypographyProps={{ component: "span" }} primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Conclusion */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 4, mb: 1.5 }}>
    Conclusion
  </Typography>
  <Typography paragraph>
    Shops &amp; Establishment Registration gives your premises legal standing and a clear framework
    for employee welfare. Register on time, keep records updated, and stay inspection-ready to
    operate with confidence.
  </Typography>
  <Typography paragraph>
    <strong>Rekotax</strong> can handle the entire process so you can focus on running and scaling
    your business.
  </Typography>
</Box>



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
                                fontWeight: 600,
                                mb: { xs: 6, md: 5 },
                                fontFamily: "'Open Sans', sans-serif",
                            }}
                        >
                            Frequently Asked Questions (FAQs)
                        </Typography>
                        {[
  {
    q: "What is Shops & Establishment Registration?",
    a: "A state-level registration under the Shops & Establishments Act regulating working conditions in shops, offices, eateries and other commercial premises—covering hours, weekly holidays, leave, wages and employee welfare. Registration is required within the prescribed timeline after starting business."
  },
  {
    q: "Who needs to register under the Act?",
    a: "Retail shops, commercial offices, warehouses, restaurants/cafés, service agencies, salons, clinics, coaching centres and similar premises-based businesses. (Factories are usually covered under the Factories Act instead.)"
  },
  {
    q: "What is the timeline for registration after commencement?",
    a: "Many states require registration within 30 days of starting operations (exact timelines vary by state). Early filing avoids penalties and eases other licences/inspections."
  },
  {
    q: "What documents are required?",
    a: "Entity PAN and incorporation/firm deed, premises proof (electricity bill/property tax), rent agreement & owner NOC (if rented), KYC of proprietor/authorised signatory with photo, manager details, employee count and weekly off, plus any state-specific declarations/photos."
  },
  {
    q: "Is the process online?",
    a: "In most states, yes—apply on the Labour/Municipal portal with e-payment and e-sign. Some jurisdictions may still do physical verification or inspection before approval."
  },
  {
    q: "What is the validity of the certificate?",
    a: "State-specific. Some issue lifetime certificates; others require renewal (e.g., every 1–5 years). Track the validity on your certificate and renew on time."
  },
  {
    q: "Do I need separate registration for each branch or state?",
    a: "Yes. Registration is premises-specific. Each branch/outlet must register in the respective state and display its certificate at that location."
  },
  {
    q: "What are my obligations after registration?",
    a: "Display the certificate, follow working hours/weekly off/leave norms, maintain prescribed registers/records, display required notices and amend details on changes within the stipulated time."
  },
  {
    q: "What changes require amendment?",
    a: "Change in establishment name, address, nature of business, employee strength, manager/authorised person or ownership. File the amendment promptly and display the updated certificate."
  },
  {
    q: "Are inspections conducted?",
    a: "Yes. Authorities may conduct pre/post-approval or periodic inspections. Keep registers, attendance, wage/leave records and required notices up to date."
  },
  {
    q: "What are the penalties for non-compliance?",
    a: "Penalties are state-specific and can include fines for late registration/renewal and for not maintaining registers/notices. Repeated non-compliance may invite higher fines or prosecution."
  },
  {
    q: "Is this the same as Trade License or GST?",
    a: "No. Shops & Establishment regulates employment conditions. A Trade License authorises a specific trade at a premises. GST is a tax registration. Many businesses need all, depending on activity/jurisdiction."
  },
  {
    q: "Do home offices or small setups also need registration?",
    a: "Generally yes, if commercial activity is conducted from a fixed premises in a state where the Act applies—subject to local zoning/HOA norms and owner/society NOC where required."
  },
  {
    q: "Are part-time or contractual staff covered?",
    a: "Typically yes. Declare total employees (including part-time/contract). Maintain records of engagement, hours, wages and weekly off as per state rules and allied labour laws."
  },
  {
    q: "Which registers and notices should be maintained?",
    a: "Commonly attendance, wages, leave, working hours/overtime, holiday list and notices for opening/closing hours and weekly off. Many states allow e-registers—follow current state formats."
  },
  {
    q: "What are typical government fees?",
    a: "State-specific; often based on employee strength, nature of business and chosen validity. Portals usually compute fees dynamically at checkout."
  },
  {
    q: "How to close registration on shutdown or relocation?",
    a: "Apply online for surrender/cancellation with reasons and proofs. Clear pending compliances and retain the cancellation order. For relocation within the state, file an amendment; for another state, obtain a new registration there and cancel the old one."
  },
  {
    q: "Does the Act mandate minimum wages or ESI/EPF?",
    a: "The Act focuses on working conditions. You must additionally comply with Minimum Wages, Payment of Wages, Bonus, Gratuity, EPF and ESI as applicable by thresholds."
  },
  {
    q: "Do restaurants and cafés need additional licences?",
    a: "Yes—typically FSSAI registration/licence, Trade License, Fire NOC, signage/music permissions where applicable, and GST as triggered. City/state requirements vary."
  },
  {
    q: "How does Rekotax help with Shops & Establishment registration?",
    a: "End-to-end support: state-wise applicability check, document prep, online filing, fee payment, amendments/renewals and post-registration compliance (registers, notices, inspection readiness) for quicker, audit-ready outcomes."
  }
]


                            .map(({ q, a }, idx) => {
                                const isOpen = expanded === idx;
                                return (
                                    <Accordion
                                        key={idx}
                                        elevation={0}
                                        disableGutters
                                        square
                                        expanded={expanded === idx}
                                        onChange={() => handleAccordionToggle(idx)}
                                        sx={{
                                            mb: 1.5,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                            transition: "box-shadow .3s ease, transform .2s ease",
                                            "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.10)" },
                                            "&:before": { display: "none" }, // remove default divider
                                        }}
                                    >
                                        <AccordionSummary
                                            sx={{
                                                px: 2.5,
                                                py: 1.75,
                                                bgcolor: "#fff",
                                                transition: "background .3s ease",
                                                "&:hover": { bgcolor: "#f7f9fc" },
                                                "& .MuiAccordionSummary-content": { m: 0 },
                                            }}
                                            expandIcon={
                                                <Box sx={{ display: "grid", placeItems: "center" }}>
                                                    {isOpen ? (
                                                        <RemoveIcon sx={{ color: "#0f2555", fontWeight: 700 }} />
                                                    ) : (
                                                        <AddIcon sx={{ color: "#0f2555", fontWeight: 700 }} />
                                                    )}
                                                </Box>
                                            }
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
                                                {idx + 1}. {q}
                                            </Typography>
                                        </AccordionSummary>

                                        <AccordionDetails
                                            sx={{
                                                px: 2.5,
                                                py: 1.75,
                                                bgcolor: "#fafbfc",
                                                color: "#444",
                                                fontSize: "0.95rem",
                                                lineHeight: 1.6,
                                                fontFamily: "'Open Sans', sans-serif",
                                            }}
                                        >
                                            {a}
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                    </Container>

                </Box>


            </Container>

            <Box
                sx={{
                    mt: 0,
                    mb: 0,
                    pb: 0,
                    mx: { xs: 2, md: -4 },
                }}
                ref={footerRef}
            >
                <ContactSection />
            </Box>


            <Box
                sx={{
                    mt: 0,
                    mb: 0,
                    pb: 0,
                    mx: { xs: 2, md: -4 },
                }}
                ref={footerRef}
            >
                <Footer />
            </Box>


        </Box>


    );
}
