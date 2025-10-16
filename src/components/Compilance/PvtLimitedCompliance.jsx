import React from "react";
import {
    Gavel,
    Group,
    WorkspacePremium,
    Security,
    AccountBalance,
    AccessTime,
    Handshake,
    HeadsetMic,
    CurrencyRupee,
    Link
} from "@mui/icons-material";
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Button,
    useTheme,
    useMediaQuery,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    MenuItem,
    Stack,
    Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef, useState, useEffect } from "react";
import Footer from "../Dashboard/Footer.jsx";
import ContactSection from "../Dashboard/ContactSection.jsx";
import WhyRekotax from "../Dashboard/WhyRekotax.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClientTestimonials from "../Dashboard/ClientTestimonials.jsx";
import Contact from "../Navbar/Contact.jsx";

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

export default function PvtLimitedCompliance({ webAppUrl, onSubmitted }) {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const footerRef = useRef(null);
    const contactRef = useRef(null);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const aboutRef = useRef(null);
    const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
    const handleAccordionToggle = (idx) => {
        setExpanded((prev) => (prev === idx ? null : idx));
    };
      const [mobileOpen, setMobileOpen] = useState(false);
      const [contactOpen, setContactOpen] = useState(false);
      const openContact = () => setContactOpen(true);
      const closeContact = () => setContactOpen(false);
    

    const datas = [
        {
            title: "Stays Active",
            body:
                "Keeps your company valid on MCA records and avoids strike-off risks.",
        },
        {
            title: "Avoids Penalties",
            body:
                "Late filings can attract daily additional fees; KYC lapses deactivate DINs.",
        },
        {
            title: "Builds Credibility",
            body:
                "Clean records help with banking, tenders, investors, and due diligence.",
        },
        {
            title: "Improves Governance",
            body:
                "Proper minutes, registers, and disclosures reduce operational risk.",
        },
    ];
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

    const [snack, setSnack] = React.useState({
        open: false,
        severity: "success",
        msg: "",
    });
    const [showReqWarn, setShowReqWarn] = React.useState(false);

    const [form, setForm] = React.useState(initialForm);
    const [errors, setErrors] = React.useState({});
    const [submitting, setSubmitting] = React.useState(false);

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
    const handleChange = (e) => {
        const { name, value } = e.target;
        const next = { ...form, [name]: value };
        setForm(next);
        if (showReqWarn && requiredOk(next)) setShowReqWarn(false);
    };
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
    return (
        <Box sx={{ fontFamily: "'Open Sans', sans-serif", overflowX: "clip" }}>
            {/* Hero */}

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
                            Stay Compliant, Stay Confident
                        </Box>
                    </Box>

                    {/* one-line heading */}
                    <Typography
                        component="h1"
                        variant="h2"
                        sx={{
                            fontWeight: 600,
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
                        MCA Compliances for Companies in India

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
                        Your complete ROC and MCA partner for accurate, on-time filings.

                        From annual returns to event-based filings, we manage it end-to-end with CA/CS oversight and proactive reminders.
                    </Typography>

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
                            Start Compliance Now
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
                            "Paperless workflow",
                            "CA/CS Reviewed documents",
                            "ROC ready deliverables",
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
                        fontWeight: 600,
                        mb: 4,
                        mt: 2,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Compliance for Private Limited Company (India
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
                                fontWeight: 500,
                                mb: 1.5,
                                fontSize: { xs: "1.5rem", md: "1.8rem" },
                            }}
                        >
                            What is Compliance for a Private Limited Company?

                        </Typography>
                        <Typography sx={{ fontSize: "1rem", mb: 2 }}>
                            <strong>Compliance</strong> means running your company within the legal framework of the <br />
                            <strong>Companies Act, 2013</strong>,overseen by the <strong>Ministry of Corporate Affairs (MCA)</strong><br />
                            through the <strong>Registrar of Companies (RoC)</strong>. It governs how directors are<br />
                            appointed, how Board/AGM meetings are conducted, and how financial<br />
                            statements and annual returns are prepared and filed.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography>
                            In practice, compliance is a calendar of annual filings (AOC-4, MGT-7/7A, ADT-1, <br />
                            DIR-3 KYC, DPT-3, MSME-1 if applicable) plus event-based filings (PAS-3, SH-7, <br />
                            CHG-1/4, INC-22, MGT-14, DIR-12, etc.) whenever relevant changes occur.
                        </Typography>

                        <Divider sx={{ my: 2 }} />


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
                        Why is Compliance Necessary?
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
                            { title: "Stays Active", desc: "Keeps your company valid on MCA records and avoids strike-off risks." },
                            { title: "Avoids Penalties", desc: "Late filings can attract daily additional fees; KYC lapses deactivate DINs." },
                            { title: "Builds Credibility", desc: "Clean records help with banking, tenders, investors, and due diligence." },
                            { title: "Improves Governance", desc: "Proper minutes, registers, and disclosures reduce operational risk." },

                        ].map((card) => (
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
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#0f2555", mb: 1 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography sx={{ lineHeight: 1.6 }}>{card.desc}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>



                {/* Benefits Section */}
                <Box
                    component="section"
                    sx={{
                        // full-bleed white section with no side gutters
                        width: "100vw",
                        ml: "calc(50% - 50vw)",
                        mr: "calc(50% - 50vw)",
                        bgcolor: "#fff",
                        color: "#333",
                        fontFamily: "'Open Sans', sans-serif",
                        lineHeight: 1.7,
                        // page padding
                        py: { xs: 3, md: 4 },
                        px: { xs: 2, sm: 3, md: 4 },

                        // CSS variables (used below)
                        "--rk-navy": "#0f2555",
                        "--rk-ink": "#0f2555",
                        "--rk-line": "#e6ebf2",
                        "--rk-muted": "#475569",
                        "--rk-soft": "#f3f6fb",

                        // Typography rules
                        "& h2": {
                            fontSize: { xs: "2rem", md: "2.5rem" },
                            textAlign: "center",
                            color: "var(--rk-ink)",
                            mb: "35px",
                            fontWeight: 700,
                            letterSpacing: "-.2px",
                        },
                        "& h3": {
                            fontSize: { xs: "1.5rem", md: "1.8rem" },
                            fontWeight: 700,
                            color: "var(--rk-ink)",
                            mb: "10px",
                        },
                        "& h4": {
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "var(--rk-ink)",
                            mb: "12px",
                        },
                        "& p": { fontSize: "1rem", mb: "18px", color: "#26323f" },
                        "& .muted": { color: "var(--rk-muted)" },

                        // Layout helpers
                        "& .content-row": {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "40px",
                            justifyContent: "space-between",
                            mt: "28px",
                        },
                        "& .content-col": { flex: "1 1 55%", maxWidth: "55%" },
                        "& .content-col-full": { flex: "1 1 100%", maxWidth: "100%" },

                        // Callout
                        "& .callout": {
                            background: "#f6f9ff",
                            border: "1px solid var(--rk-line)",
                            borderLeft: "4px solid var(--rk-navy)",
                            p: "14px 16px",
                            borderRadius: "8px",
                            color: "#203055",
                        },

                        // Cards grid
                        "& .threshold-cards-container": {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "24px",
                            justifyContent: "center",
                            mt: "16px",
                        },
                        "& .threshold-card": {
                            flex: "1 1 260px",
                            maxWidth: "340px",
                            background: "var(--rk-soft)",
                            p: "18px",
                            borderRadius: "10px",
                            textAlign: "left",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
                            transition: "all .25s ease",
                            border: "1px solid var(--rk-line)",
                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 10px 16px rgba(0,0,0,0.12)",
                                background: "#eef3fb",
                            },
                            "& p": { m: 0, color: "#3a4654" },
                        },

                        // Lists
                        "& ul, & ol": { m: "0 0 18px 20px" },
                        "& li": { m: "10px 0", color: "#243040" },
                        "& li p": { m: "6px 0" },

                        // Table
                        "& .table-wrap": {
                            overflow: "auto",
                            border: "1px solid var(--rk-line)",
                            borderRadius: "10px",
                        },
                        "& table": { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
                        "& th, & td": {
                            p: "12px 14px",
                            borderBottom: "1px solid var(--rk-line)",
                            textAlign: "left",
                            fontSize: "15px",
                        },
                        "& thead th": {
                            background: "#f3f6ff",
                            color: "var(--rk-ink)",
                            position: "sticky",
                            top: 0,
                        },

                        // CTA block (blue gradient)
                        "& #rk-roc-cta": { py: "18px" },
                        "& #rk-roc-cta .cta-wrap": {
                            maxWidth: "1100px",
                            m: "0 auto",
                            background: "linear-gradient(135deg,#0E2B63 0%, #103B78 100%)",
                            borderRadius: "20px",
                            p: { xs: "22px", md: "26px 28px" },
                            boxShadow: "0 12px 28px rgba(16,59,120,.18)",
                            color: "#fff",
                            "& *": { color: "#fff !important" },
                            "& h3": {
                                m: "0 0 8px",
                                fontWeight: 500,
                                fontSize: { xs: "22px", md: "26px" },
                                lineHeight: 1.25,
                                letterSpacing: "-.2px",
                            },
                            "& p": { m: "0 0 14px", fontSize: { xs: "16px", md: "18px" }, lineHeight: 1.6 },
                            "& a": {
                                color: "#fff !important",
                                textDecoration: "underline",
                                fontWeight: 500,
                                fontSize: { xs: "16px", md: "18px" },
                            },
                        },

                        // Responsive
                        "@media (max-width: 992px)": {
                            "& .content-col": { flex: "1 1 100%", maxWidth: "100%" },
                        },
                    }}
                >
                    {/* ---------- CONTENT START ---------- */}

                    {/* Compliances for Newly Registered Private Limited Company */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Compliances for Newly Registered Private Limited Company (India)</h3>
                            <ul>
                                <li>
                                    <strong>First Board Meeting (within 30 days)</strong>
                                    <p>
                                        Hold the inaugural Board meeting within thirty days to constitute governance formally,
                                        approve authorised signatories and the financial year, and record director disclosures (MBP-1 and DIR-8). Approve opening of the company’s bank account and adopt a dated
                                        compliance calendar for the first year. Ensure proper notice, agenda and minutes to
                                        establish an audit-ready precedent from the outset.
                                    </p>
                                </li>

                                <li>
                                    <strong>Appointment of First Auditor</strong>
                                    <p>
                                        The Board must appoint the first statutory auditor within thirty days of incorporation;
                                        failing which, shareholders appoint within the next ninety days. Obtain the auditor’s
                                        written consent and eligibility certificate and record the decision in the minutes.
                                        Maintain the engagement letter and working papers to align subsequent AGM actions and
                                        ADT-1 filing.
                                    </p>
                                </li>

                                <li>
                                    <strong>Bank Account Opening and Capital Receipt</strong>
                                    <p>
                                        Open the company’s current account and receive subscription monies strictly as per the
                                        Memorandum of Association. Map each credit to the respective subscriber with UTR references
                                        and bank advices, and reconcile paid-up capital between books, bank statements and the
                                        Register of Members. This alignment preserves cap-table integrity and supports INC-20A and
                                        later diligence.
                                    </p>
                                </li>

                                <li>
                                    <strong>Issue of Share Certificates (within 60 days) and Stamp Duty</strong>
                                    <p>
                                        Prepare, execute and deliver share certificates to all subscribers within sixty days of
                                        incorporation, and discharge the applicable state stamp duty within the prescribed window.
                                        Cross-reference certificate numbers, folios and allotments in the Register of Members.
                                        Accurate and timely issuance avoids defects in title and prevents avoidable penalties.
                                    </p>
                                </li>

                                <li>
                                    <strong>Commencement of Business – INC-20A (within 180 days)</strong>
                                    <p>
                                        File INC-20A within one hundred eighty days confirming receipt of subscription capital into
                                        the company bank account, enclosing clear banking evidence. This filing activates borrowing
                                        capacity and confirms operational readiness. Non-filing may trigger restrictions and
                                        monetary penalties; treat it as a mandatory milestone.
                                    </p>
                                </li>

                                <li>
                                    <strong>Registered Office Confirmation – INC-22 (if applicable)</strong>
                                    <p>
                                        Where the permanent registered office is finalised post-incorporation, file INC-22 within
                                        thirty days with a recent utility bill, title/lease proof and owner’s NOC, as applicable.
                                        Update name board, letterheads and statutory imprints with the legal name, CIN and address.
                                        Consistency across records, signage and licenses prevents downstream discrepancies.
                                    </p>
                                </li>

                                <li>
                                    <strong>Statutory Registers and Minutes</strong>
                                    <p>
                                        Establish and maintain statutory registers for Members, Directors/KMP, Charges and
                                        Transfers—physically or electronically—with proper authentication. Open minutes books for
                                        Board and shareholder meetings, ensure serial numbering and timely signatures, and link
                                        resolutions to filings they necessitate. These records are primary legal evidence during
                                        inspections and due diligence.
                                    </p>
                                </li>

                                <li>
                                    <strong>Tax and Labour Registrations (as applicable)</strong>
                                    <p>
                                        Verify PAN/TAN activation and obtain GST registration where thresholds or counterparties
                                        require it. Complete EPFO/ESIC and Professional Tax registrations based on state norms and
                                        headcount. Configure e-payment workflows early to avoid interest or late-fee exposures on
                                        statutory remittances.
                                    </p>
                                </li>

                                <li>
                                    <strong>Year-One Filing Plan and Governance Rhythm</strong>
                                    <p>
                                        Publish a dated plan for four Board meetings with gaps not exceeding one hundred twenty days
                                        and a compliant AGM timeline. Back-schedule statutory filings—AOC-4 (30 days from AGM),
                                        MGT-7/7A (60 days), ADT-1 (15 days), DIR-3 KYC (by 30 September), DPT-3 (by 30 June) and
                                        MSME-1 where applicable. Assign clear ownership across CS/CA/Finance and implement reminders
                                        to ensure timely execution.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <section id="rk-roc-cta" aria-label="Done-for-you RoC compliance plan">
                        <div className="cta-wrap">
                            <h3>Want to know more about what applies to you?</h3>
                            <p>
                                Book a 10-minute clarity call. We’ll answer your questions and outline your exact next
                                steps..
                            </p>
                            <Button
                                variant="contained"
                                color="primary"
                                href="#contact"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    px: 2.5,
                                    py: 1,
                                    textDecoration: "none !important",
                                    "&:hover": { textDecoration: "none !important" },
                                }}
                                onClick={openContact}
                            >
                                Talk to a compliance experts
                            </Button>



                        </div>
                    </section>

                    {/* Key Pillars */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Key Pillars of Annual Compliance (Private Limited)</h3>
                            <ul>
                                <li>
                                    <strong>Board &amp; Shareholder Meetings</strong>
                                    <p>
                                        Hold at least four Board meetings annually with a maximum 120-day gap, plus one AGM.
                                        Issue formal notices with agenda, record attendance, and maintain signed minutes as legal
                                        proof of decisions. Properly documented meetings support approvals for accounts, auditor
                                        matters, borrowings, and key corporate actions.
                                    </p>
                                </li>
                                <li>
                                    <strong>Financial Reporting (AOC-4)</strong>
                                    <p>
                                        Prepare audited financial statements (Balance Sheet, P&amp;L, notes, cash flow if
                                        applicable) and get Board/AGM approval. File AOC-4 within 30 days of the AGM along with the
                                        Auditor’s Report and Board’s Report. Accurate mapping of figures and attachments avoids
                                        resubmissions and late fees.
                                    </p>
                                </li>
                                <li>
                                    <strong>Annual Return (MGT-7 / MGT-7A)</strong>
                                    <p>
                                        Submit a complete snapshot of share capital, members, directors/KMP, and corporate events
                                        for the year. File within 60 days of the AGM, ensuring consistency with registers and prior
                                        filings. The annual return is widely used for diligence by banks, investors, and regulators.
                                    </p>
                                </li>
                                <li>
                                    <strong>Auditors (ADT-1)</strong>
                                    <p>
                                        Appoint or ratify the statutory auditor at the AGM and file ADT-1 within 15 days. Ensure
                                        auditor eligibility, tenure, and consent documents are in order before filing. Auditor
                                        continuity and timely filings help prevent compliance gaps and portal mismatches.
                                    </p>
                                </li>
                                <li>
                                    <strong>Disclosures (DIR-3 KYC, MBP-1, BEN-2)</strong>
                                    <p>
                                        Every director must complete annual KYC to keep the DIN active and avoid penalties.
                                        Directors disclose interests via MBP-1; significant beneficial ownership is reported in
                                        BEN-2 when thresholds are met. Keeping these current prevents conflicts of interest and
                                        improves transparency.
                                    </p>
                                </li>
                                <li>
                                    <strong>Registers &amp; Minutes</strong>
                                    <p>
                                        Maintain statutory registers of members, directors/KMP, charges, share transfers, and
                                        others as applicable. Keep Board/AGM minutes consecutively numbered, signed, and stored for
                                        inspection. Up-to-date registers are essential evidence during audits, diligence, or legal
                                        proceedings.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* What You Must Track */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>What You Must Track (Core Annual Items)</h3>
                            <ul>
                                <li>
                                    <strong>Board Meetings</strong>
                                    <p>
                                        Schedule at least four meetings with ≤120-day spacing; circulate agendas and papers in
                                        advance. Record attendance, resolutions, and dissent (if any) in signed minutes. Maintain
                                        proof of dispatch and acknowledgement of notices for a complete audit trail.
                                    </p>
                                </li>
                                <li>
                                    <strong>AGM</strong>
                                    <p>
                                        Hold the AGM within six months from FY end (first AGM within nine months of the first FY).
                                        Approve accounts, auditor-related items, and other shareholder business. Serve notice with
                                        an explanatory statement, and file post-AGM forms within their statutory windows.
                                    </p>
                                </li>
                                <li>
                                    <strong>AOC-4</strong>
                                    <p>
                                        File audited financials within 30 days of AGM with all required attachments. Ensure Board’s
                                        Report aligns with financials and includes mandated disclosures. Any mismatch or missing
                                        annexures can lead to resubmission and additional fees.
                                    </p>
                                </li>
                                <li>
                                    <strong>MGT-7 / 7A</strong>
                                    <p>
                                        File the annual return within 60 days of AGM capturing share capital, members,
                                        directors/KMP, penalties/compounding, etc. Cross-verify with registers and prior filings to
                                        avoid inconsistencies. Keep a copy signed by the required professionals, where applicable.
                                    </p>
                                </li>
                                <li>
                                    <strong>ADT-1</strong>
                                    <p>
                                        Notify MCA of auditor appointment/re-appointment within 15 days of AGM. Attach consent
                                        letters and eligibility confirmations as per the Act and rules. Late filing can create a
                                        mismatch between MCA records and your actual auditor of record.
                                    </p>
                                </li>
                                <li>
                                    <strong>DPT-3</strong>
                                    <p>
                                        Report deposits and exempt borrowings outstanding as on 31 March by 30 June annually.
                                        Classify each item correctly (deposit vs. exempt) to avoid scrutiny or penalties. Keep
                                        backup documentation like loan agreements, ledgers, and bank proofs.
                                    </p>
                                </li>
                                <li>
                                    <strong>MSME-1 (if applicable)</strong>
                                    <p>
                                        Half-yearly return of outstanding dues &gt;45 days to MSME vendors (April 30 and October
                                        31). Validate vendor MSME status and calculate aging accurately. Consistent reporting avoids
                                        notices and demonstrates supplier discipline.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-3 KYC</strong>
                                    <p>
                                        Each director must complete annual KYC by September 30 to keep the DIN active. Failure
                                        triggers DIN deactivation and a fixed late fee before reactivation. Track all directors
                                        (including non-executive) to prevent accidental lapses.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Event-Based Compliances */}
                    <div className="content-row" style={{ marginTop: 6 }}>
                        <div className="content-col-full">
                            <h3>Event-Based Compliances (When Specific Changes Occur)</h3>
                            <ul>
                                <li>
                                    <strong>PAS-3 (Allotment of Shares)</strong>
                                    <p>
                                        File for any share allotment—private placement, rights issue, ESOP exercise, or conversion.
                                        Include list of allottees, consideration details, and relevant resolutions. Ensure authorized
                                        capital adequacy and valuation/offer documents, where required.
                                    </p>
                                </li>
                                <li>
                                    <strong>SH-7 (Change in Authorised Share Capital)</strong>
                                    <p>
                                        File when increasing or reclassifying authorised capital before issuing new shares. Pass the
                                        necessary resolution, amend MOA, and pay prescribed fees. Keep the capital structure
                                        consistent across MOA, registers, and filings.
                                    </p>
                                </li>
                                <li>
                                    <strong>CHG-1 / CHG-4 (Charges on Assets)</strong>
                                    <p>
                                        Use CHG-1 to register creation or modification of a charge within statutory timelines. File
                                        CHG-4 upon satisfaction to release the encumbrance officially. Coordinate with lenders to
                                        avoid delays that may attract heavy additional fees.
                                    </p>
                                </li>
                                <li>
                                    <strong>INC-22 (Change in Registered Office)</strong>
                                    <p>
                                        Notify any change of registered office address with supporting proofs like utility bills and
                                        NOC. Different timelines apply for intra-city vs. inter-ROC jurisdiction moves. Update all
                                        statutory stations (letterheads, bank, GST, and other licenses) in sync.
                                    </p>
                                </li>
                                <li>
                                    <strong>MGT-14 (Certain Resolutions/Agreements)</strong>
                                    <p>
                                        File specified Board/Shareholder resolutions where the Act demands (e.g., approval of
                                        financials, borrowings beyond limits). Check applicability carefully—many private companies
                                        are exempt for routine Board items. When required, file within the stipulated window to
                                        avoid penalties.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-12 (Director/KMP Changes)</strong>
                                    <p>
                                        Intimate appointments, resignations, or changes in designation of directors/KMP promptly.
                                        Attach resignation letters, consent/appointment forms, and relevant resolutions. Sync
                                        changes with registers and disclose in the next annual return.
                                    </p>
                                </li>
                                <li>
                                    <strong>BEN-2 (Significant Beneficial Owner)</strong>
                                    <p>
                                        Report individuals holding significant beneficial ownership through indirect or layered
                                        holdings when thresholds are met. Maintain evidence trails to support SBO determination.
                                        Timely filing enhances transparency and reduces enforcement risk.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Illustrative Calendar */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>Illustrative RoC Calendar (FY 2025–26)</h3>
                            <p className="muted">
                                These dates are indicative and assume AGM on 30 September 2025. Re-compute from your actual
                                AGM date.
                            </p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Compliance</th>
                                            <th>What it Covers</th>
                                            <th>Illustrative Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>MSME-1</td>
                                            <td>Outstanding dues to MSMEs (&gt; 45 days)</td>
                                            <td>Apr 30, 2025 • Oct 31, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>DPT-3</td>
                                            <td>Return of deposits / exempt borrowings</td>
                                            <td>Jun 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>DIR-3 KYC</td>
                                            <td>Director KYC filing</td>
                                            <td>Sep 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>AGM</td>
                                            <td>Annual General Meeting (standard FY)</td>
                                            <td>Sep 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>ADT-1</td>
                                            <td>Auditor appointment (15 days from AGM)</td>
                                            <td>Oct 14, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>AOC-4</td>
                                            <td>Financial statements (30 days from AGM)</td>
                                            <td>Oct 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>MGT-14</td>
                                            <td>Board resolution filing (if applicable)</td>
                                            <td>Oct 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>MGT-7 / 7A</td>
                                            <td>Annual return (60 days from AGM)</td>
                                            <td>Nov 29, 2025</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Documents Required */}
                    <div className="content-row" style={{ marginTop: 50 }}>
                        <div className="content-col-full">
                            <h3>Documents Required (Core Set)</h3>
                            <ul>
                                <li>
                                    <strong>Audited Financials, Board’s Report, Auditor’s Report</strong>
                                    <p>
                                        Keep final, signed copies ready for AGM approval and AOC-4 filing. Ensure figures and notes
                                        reconcile across trial balance, ledgers, and returns. Include all mandated disclosures to
                                        reduce resubmission risk.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-3 KYC Proofs &amp; DSCs</strong>
                                    <p>
                                        Maintain PAN, identity/address proofs for each director and secure valid DSCs for
                                        signatories. Expired DSCs delay filings—renew before the compliance window. Store KYC
                                        acknowledgements as part of your audit trail.
                                    </p>
                                </li>
                                <li>
                                    <strong>Statutory Registers &amp; Minutes</strong>
                                    <p>
                                        Update registers of members, directors/KMP, charges, and transfers regularly. Keep Board/AGM
                                        minutes page-numbered, signed, and cross-referenced with filings. These are primary evidence
                                        during inspections and due diligence.
                                    </p>
                                </li>
                                <li>
                                    <strong>Supporting Papers for Specific Forms</strong>
                                    <p>
                                        Collate proofs for DPT-3, MSME-1, PAS-3, SH-7, CHG-1/4, MGT-14, etc. (agreements, bank
                                        letters, valuation/offer documents, resolutions). Label annexures clearly to match form
                                        fields and narratives. Good documentation speeds approval and reduces clarification calls.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>


                </Box>



                {/* Steps - exactly 3 per row (2 rows), scrollable on mobile */}
                <Box sx={{ mt: 10, mb: { xs: 6, md: 10 } }}>
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.2rem" },
                            fontWeight: 600,
                            color: "#0f2555",
                            mb: 6,
                        }}
                    >
                        Why Stay Compliant?
                    </Typography>

                    {(() => {
                        const steps = [
                            {

                                title: "Penalty Avoidance",
                                desc:
                                    "Skip costly late fees (often ₹100/day) and DIN deactivation risks for DIR-3 KYC.",
                            },
                            {

                                title: "Better Credibility",
                                desc:
                                    "Clean MCA records help with loans, tenders, investor diligence, and partnerships.",
                            },
                            {

                                title: "Operational Confidence",
                                desc:
                                    "Proper minutes, registers, and disclosures reduce exposure and improve decision-making.",
                            },
                            {

                                title: "Funding & Banking Ready",
                                desc:
                                    "Investors and lenders check MCA filings first. Clean, on-time compliance improves confidence, speeds up loan sanctions, and can reduce the “risk premium” on your cost of capital.",
                            },
                            {

                                title: "Faster Deals & Onboarding",
                                desc:
                                    "Large customers and marketplaces demand ROC acknowledgements, KYC, and registers during vendor onboarding. Being compliant cuts back-and-forth, so you start billing sooner.",
                            },
                            {

                                title: "ESOP & Exit Readiness",
                                desc:
                                    "Well-maintained registers and returns keep your cap table clear—vital for ESOP grants, secondary sales, M&A, or IPO diligence. Fewer red flags, smoother negotiations, better outcomes.",
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
                                q: "What is annual compliance for a Private Limited Company in India?",
                                a: "It is the set of statutory requirements under the Companies Act, 2013 and MCA/RoC rules—covering Board/AGM meetings, audited financial statements (AOC-4), annual return (MGT-7/7A), auditor appointment (ADT-1), DIR-3 KYC, DPT-3, MSME-1 (if applicable), and proper maintenance of registers/minutes."
                            },
                            {
                                q: "Do I need to file AOC-4 and MGT-7/7A even if my company has zero revenue?",
                                a: "Yes. All active Private Limited Companies must file annual financial statements and the annual return irrespective of turnover or activity. Non-filing can trigger additional fees, show-cause notices, and compliance risks."
                            },
                            {
                                q: "How are AOC-4, MGT-7/7A, and ADT-1 due dates calculated?",
                                a: "They are tied to your AGM date: AOC-4 within 30 days of AGM, MGT-7/7A within 60 days of AGM, and ADT-1 within 15 days of AGM. If the AGM date shifts, these windows shift accordingly."
                            },
                            {
                                q: "What is DIR-3 KYC and what happens if I miss it?",
                                a: "It is annual KYC for each director (DIN holder), typically due by 30 September. Missing it deactivates the DIN; a fixed late fee applies for reactivation, and you should file immediately to restore status."
                            },
                            {
                                q: "What is DPT-3 and who must file it?",
                                a: "DPT-3 reports deposits and exempt borrowings outstanding as on 31 March and is generally due by 30 June each year. Most companies with loans/advances captured under the rules must file, even if they do not accept public deposits."
                            },
                            {
                                q: "What is MSME-1 and when is it applicable?",
                                a: "MSME-1 is a half-yearly return (April 30 and October 31) reporting outstanding dues to MSME vendors beyond 45 days. It applies where your vendors qualify as MSMEs and payments breach the threshold."
                            },
                            {
                                q: "What are event-based compliances for a Private Limited Company?",
                                a: "Filings triggered by specific actions: PAS-3 (share allotments), SH-7 (authorised capital changes), CHG-1/CHG-4 (creation/satisfaction of charges), INC-22 (change of registered office), MGT-14 (specified resolutions), DIR-12 (director/KMP changes), BEN-2 (significant beneficial ownership)."
                            },
                            {
                                q: "What statutory registers and records must a company maintain?",
                                a: "Core registers include Members, Directors/KMP, Charges, Transfers, Renewed/Duplicate Share Certificates (as applicable), ESOP/Buy-back (where relevant), plus Board/Committee/AGM minutes. They may be maintained physically or electronically with proper authentication."
                            },
                            {
                                q: "What happens if I miss an MCA/RoC deadline?",
                                a: "Late filings usually attract additional fees (often ₹100/day for many forms) and may lead to penalties, DIN deactivation (for DIR-3 KYC), and notices. Chronic delays can escalate to director disqualification or strike-off proceedings."
                            },
                            {
                                q: "Can a company change its registered office and what must be filed?",
                                a: "Yes. File INC-22 within prescribed timelines with valid proofs (utility bill, title/lease, NOC). Inter-ROC or interstate moves may need additional approvals; update stationery, bank, GST, and licenses to reflect the new address."
                            },
                            {
                                q: "Who appoints the first auditor and how is it recorded?",
                                a: "The Board appoints the first statutory auditor within 30 days of incorporation; otherwise shareholders appoint within the next 90 days. Keep the auditor’s consent and eligibility certificate, minute the decision, and later file ADT-1 post-AGM."
                            },
                            {
                                q: "Is a Secretarial Audit required for all Private Limited Companies?",
                                a: "No. Secretarial Audit (MR-3) applies only to specified classes of companies (e.g., larger or listed entities). Most small private companies are exempt, but proper registers, minutes, and disclosures must still be maintained."
                            },
                            {
                                q: "What is BEN-2 and when should it be filed?",
                                a: "BEN-2 reports Significant Beneficial Owners (SBOs) where individuals hold prescribed thresholds through direct or indirect holdings. File when SBO conditions are met to enhance ownership transparency."
                            },
                            {
                                q: "How should a company prepare for the AGM?",
                                a: "Issue AGM notice with agenda/explanatory statements, finalize audited financials and the Board’s Report, prepare venue/virtual logistics, and ensure registers/attendance sheets are ready. Post-AGM, file statutory forms within due dates."
                            },
                            {
                                q: "Do startups and small companies get any compliance relaxations?",
                                a: "Some exemptions exist (e.g., Small Company thresholds), but core annual obligations like AOC-4, MGT-7/7A, and Board/AGM requirements still apply. Confirm applicability based on current rules."
                            },
                            {
                                q: "What documents are needed for annual filings?",
                                a: "Audited financial statements, Board’s Report, Auditor’s Report, updated registers/minutes, and supporting papers for DPT-3, MSME-1, PAS-3, SH-7, CHG-1/4, MGT-14 (where applicable). Valid DSCs for signatories are essential."
                            },
                            {
                                q: "How do clean RoC records help with banking and investors?",
                                a: "Timely, accurate filings and organized registers increase credibility, speed up loan sanctions, vendor onboarding, and due diligence, and can reduce the perceived risk premium with lenders and investors."
                            },
                            {
                                q: "Can I maintain statutory registers electronically?",
                                a: "Yes, provided entries are accurate, authenticated, and available for inspection. Use secure digital registers and keep robust backups with version control and authorization trails."
                            },
                            {
                                q: "What are common mistakes that cause resubmission of forms?",
                                a: "Mismatched figures across statements, missing annexures, outdated DSCs, incorrect resolution references, and inconsistent dates. A CA/CS pre-check and a documentation checklist greatly reduce resubmissions."
                            },
                            {
                                q: "Can a compliance partner manage everything end-to-end?",
                                a: "Yes. A CA/CS-led team can map your calendar, prepare documents, e-file forms, share SRNs/challans, and maintain an audit-ready archive—so you stay compliant without operational strain."
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

            <Box sx={{ mt: 0, mx: 0 }} ref={aboutRef}>
                <ClientTestimonials fullBleed />
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
                  <Contact open={contactOpen} onClose={closeContact} />
            
        </Box>
    );
}
