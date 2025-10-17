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

export default function LLPCompliance({ webAppUrl, onSubmitted }) {
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
                        MCA Compliances for LLP in India

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
                        Your complete ROC and MCA partner for accurate, on-time filings. <br />
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
                    Compliance for Limited Liability Partnership (LLP) - India
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
                            What is Compliance for an LLP?

                        </Typography>
                        <Typography sx={{ fontSize: "1rem", mb: 2 }}>
                            Compliance means operating your LLP within the legal framework of the Limited <br />
                            Liability Partnership Act, 2008 and the LLP Rules, administered by the Ministry<br />
                            of Corporate Affairs (MCA) through the Registrar (RoC). It covers how designated <br />
                            partners are appointed, how partners' decisions are recorded, and how the <br />
                            Statement of Account and Solvency and the Annual Return are prepared and filed.<br />
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography>
                            In practice, compliance is a calendar of annual filings (LLP Form 8 - Statement of <br />
                            Account & Solvency, LLP Form 11 - Annual Return, and DIR-3 KYC for partners<br />
                            holding DIN, if applicable) plus event-based filings (LLP Form 3 - LLP Agreement <br />
                            or changes, LLP Form 4 - appointment/cessation or change in particulars of<br />
                            partners/designated partners, LLP Form 15 - change of registered office, <br />
                            LLP Form 5 - change of name, etc.) whenever relevant changes occur.
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
                            { title: "Stays Active", desc: "Keeps your LLP in good standing on MCA records and avoids strike-off or non-compliance flags." },
                            { title: "Avoids Penalties", desc: "Late filings can attract additional fees calculated per day; KYC lapses can impact DIN holders." },
                            { title: "Builds Credibility", desc: "Clean compliance helps with banking, tenders, counterparties, and due diligence." },
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
                {/* LLP Annual Compliance Section */}
                <Box
                    component="section"
                    sx={{
                        width: "100vw",
                        ml: "calc(50% - 50vw)",
                        mr: "calc(50% - 50vw)",
                        bgcolor: "#fff",
                        color: "#333",
                        fontFamily: "'Open Sans', sans-serif",
                        lineHeight: 1.7,
                        py: { xs: 3, md: 4 },
                        px: { xs: 2, sm: 3, md: 4 },

                        "--rk-navy": "#0f2555",
                        "--rk-ink": "#0f2555",
                        "--rk-line": "#e6ebf2",
                        "--rk-muted": "#475569",
                        "--rk-soft": "#f3f6fb",

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

                        "& .content-row": {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "40px",
                            justifyContent: "space-between",
                            mt: "28px",
                        },
                        "& .content-col": { flex: "1 1 55%", maxWidth: "55%" },
                        "& .content-col-full": { flex: "1 1 100%", maxWidth: "100%" },

                        "& .callout": {
                            background: "#f6f9ff",
                            border: "1px solid var(--rk-line)",
                            borderLeft: "4px solid var(--rk-navy)",
                            p: "14px 16px",
                            borderRadius: "8px",
                            color: "#203055",
                        },

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

                        "& ul, & ol": { m: "0 0 18px 20px" },
                        "& li": { m: "10px 0", color: "#243040" },
                        "& li p": { m: "6px 0" },

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

                        "@media (max-width: 992px)": {
                            "& .content-col": { flex: "1 1 100%", maxWidth: "100%" },
                        },
                    }}
                >
                    {/* ---------- CONTENT START ---------- */}

                    {/* Compliances for Newly Registered LLP */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Compliances for Newly Registered LLP (India)</h3>
                            <ul>
                                <li>
                                    <strong>First Partners’ Meeting / Initial Resolutions (within 30 days)</strong>
                                    <p>
                                        Record initial resolutions to appoint <em>Designated Partners</em>, approve authorised signatories, set the financial year, and adopt a dated compliance calendar. Ensure proper notice, agenda and minutes as per the LLP Agreement to establish an audit-ready precedent from the outset.
                                    </p>
                                </li>

                                <li>
                                    <strong>Execution and Filing of LLP Agreement</strong>
                                    <p>
                                        Execute the stamped LLP Agreement and file <strong>LLP Form 3</strong> within the prescribed timeline from incorporation. Include details of partners’ contribution, profit-sharing ratios, rights and duties. Timely filing validates internal governance and prevents penalties.
                                    </p>
                                </li>

                                <li>
                                    <strong>Bank Account Opening and Capital Contribution</strong>
                                    <p>
                                        Open the LLP’s current account and bring in partner contributions as per the LLP Agreement. Map each credit to the respective partner with UTR references and bank advices, and reconcile contribution in books with the <em>Partners’ Capital Accounts</em>. This alignment supports solvency declarations in Form 8 and later diligence.
                                    </p>
                                </li>

                                <li>
                                    <strong>Appointment of Auditor (if audit is applicable)</strong>
                                    <p>
                                        LLP audit is mandatory if turnover exceeds the prescribed threshold or partner contribution crosses the limit as per rules. Where applicable, appoint the auditor through partner resolution, obtain consent and eligibility certificate, and maintain the engagement letter for records.
                                    </p>
                                </li>

                                <li>
                                    <strong>Registered Office Confirmation (if changed after incorporation)</strong>
                                    <p>
                                        Where the permanent registered office is finalised post-incorporation, file <strong>LLP Form 15</strong> for change of registered office with proofs like recent utility bill, title or lease document, and owner’s NOC, as applicable. Update name board, letterheads and licenses for consistency.
                                    </p>
                                </li>

                                <li>
                                    <strong>Statutory Records and Minutes</strong>
                                    <p>
                                        Maintain records of partners or designated partners, contributions, and minutes or resolutions of partners’ meetings—physically or electronically—with proper authentication. Link resolutions to any filings they necessitate. These records are primary legal evidence during inspections and due diligence.
                                    </p>
                                </li>

                                <li>
                                    <strong>Tax and Labour Registrations (as applicable)</strong>
                                    <p>
                                        Verify PAN or TAN activation and obtain GST registration where thresholds or counterparties require it. Complete EPFO or ESIC and Professional Tax registrations based on state norms and headcount. Configure e-payment workflows early to avoid interest or late-fee exposures on statutory remittances.
                                    </p>
                                </li>

                                <li>
                                    <strong>Year-One Filing Plan and Governance Rhythm</strong>
                                    <p>
                                        Publish a dated plan for periodic partners’ meetings as per the LLP Agreement. Back-schedule statutory filings—<strong>LLP Form 11</strong> (Annual Return - by <em>30 May</em>) and <strong>LLP Form 8</strong> (Statement of Account and Solvency - by <em>30 October</em>) for LLPs with FY ending 31 March, plus <strong>DIR-3 KYC</strong> (for DIN or DPIN holders by 30 September). Assign clear ownership and implement reminders to ensure timely execution.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <section id="rk-roc-cta" aria-label="Done-for-you RoC compliance plan">
                        <div className="cta-wrap">
                            <h3>Want to know more about what applies to you?</h3>
                            <p>Book a 10-minute clarity call. We’ll answer your questions and outline your exact next steps.</p>
                            <a href="#contact">Talk to a compliance expert</a>
                        </div>
                    </section>

                    {/* Key Pillars (LLP) */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Key Pillars of Annual Compliance (LLP)</h3>
                            <ul>
                                <li>
                                    <strong>Partners’ Meetings &amp; Resolutions</strong>
                                    <p>
                                        Conduct partners’ meetings or circulate resolutions as per the LLP Agreement. Issue formal notices with agenda, record attendance or consent, and maintain signed minutes as legal proof of decisions. Documented decisions support approvals for accounts, admission or retirement of partners, borrowings, and key actions.
                                    </p>
                                </li>
                                <li>
                                    <strong>Statement of Account and Solvency (LLP Form 8)</strong>
                                    <p>
                                        Prepare financial statements and the solvency declaration, get them signed by designated partners and the auditor (if audit applies). File Form 8 by 30 October for FYs ending 31 March. Accurate mapping of figures and attachments avoids resubmissions and late fees.
                                    </p>
                                </li>
                                <li>
                                    <strong>Annual Return (LLP Form 11)</strong>
                                    <p>
                                        Submit a snapshot of partners or designated partners, contribution and changes during the year. File by 30 May, ensuring consistency with records and prior filings. The annual return is widely used for diligence by banks, investors and regulators.
                                    </p>
                                </li>
                                <li>
                                    <strong>Auditors (where audit is applicable)</strong>
                                    <p>
                                        Appoint or continue the auditor in line with LLP rules and the Agreement. Ensure eligibility and consent documents are in order before due dates. Continuity and timely filings help prevent compliance gaps and portal mismatches.
                                    </p>
                                </li>
                                <li>
                                    <strong>Disclosures (DIR-3 KYC, Interest Registers)</strong>
                                    <p>
                                        Each partner holding DIN or DPIN must complete annual KYC to keep the DIN or DPIN active. Maintain disclosures of partners’ interests and related-party dealings as per the Agreement and applicable laws. Keeping these current prevents conflicts of interest and improves transparency.
                                    </p>
                                </li>
                                <li>
                                    <strong>Registers &amp; Minutes</strong>
                                    <p>
                                        Maintain records of partners, designated partners, contributions and transfers, and minutes or resolutions. Keep minutes consecutively numbered, signed, and stored for inspection. Up-to-date records are essential evidence during audits, diligence, or legal proceedings.
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
                                    <strong>Partners’ Meetings / Written Consents</strong>
                                    <p>
                                        Schedule meetings or circulate written consents as per the LLP Agreement. Record attendance or consent, resolutions, and dissent (if any) in signed minutes or registers. Maintain proof of dispatch and acknowledgement of notices for a complete audit trail.
                                    </p>
                                </li>
                                <li>
                                    <strong>LLP Form 11</strong>
                                    <p>
                                        File the annual return by 30 May capturing partner details, contribution and changes. Cross-verify with internal records to avoid inconsistencies. Keep a copy signed by the required signatories and professionals, where applicable.
                                    </p>
                                </li>
                                <li>
                                    <strong>LLP Form 8</strong>
                                    <p>
                                        File the Statement of Account and Solvency by 30 October with required attachments. Ensure figures align with books and include mandated declarations. Any mismatch or missing annexures can lead to resubmission and additional fees.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-3 KYC</strong>
                                    <p>
                                        Each DIN or DPIN holder must complete annual KYC by 30 September to keep the DIN or DPIN active. Failure triggers deactivation and a fixed late fee before reactivation. Track all designated partners to prevent accidental lapses.
                                    </p>
                                </li>
                                <li>
                                    <strong>Income Tax &amp; GST Timelines</strong>
                                    <p>
                                        Track ITR due dates (and tax audit if applicable) and periodic GST returns, if registered. Align books closure with Form 8 timelines to avoid last-minute rush. Consistent compliance reduces interest and penalty exposures.
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
                                    <strong>LLP Form 3 (LLP Agreement / Changes)</strong>
                                    <p>
                                        File for execution of the initial LLP Agreement or any change in the Agreement. Attach the signed, stamped Agreement and relevant resolutions. Timely filing keeps governance aligned with operations.
                                    </p>
                                </li>
                                <li>
                                    <strong>LLP Form 4 (Partners / Designated Partners)</strong>
                                    <p>
                                        Intimate admission, cessation, change in designation or particulars of partners or designated partners. Attach consents, proofs and resolutions as required. Sync changes with internal records and the next annual return.
                                    </p>
                                </li>
                                <li>
                                    <strong>LLP Form 5 (Change of Name)</strong>
                                    <p>
                                        File for change of name after partner approval and name reservation. Update seals, name boards, stationery and licenses in sync. Maintain copies of approvals and updated Agreement.
                                    </p>
                                </li>
                                <li>
                                    <strong>LLP Form 15 (Change in Registered Office)</strong>
                                    <p>
                                        Notify any change of registered office address with supporting proofs like utility bills and NOC. Different timelines can apply based on jurisdiction. Update all statutory stations (letterheads, bank, GST and other licenses) in sync.
                                    </p>
                                </li>
                                <li>
                                    <strong>Other Filings (as applicable)</strong>
                                    <p>
                                        Charge-related filings where applicable, conversions, compounding or strike-off (e.g., LLP Form 24). Check specific rules and timelines before action. Coordinating with banks or authorities early helps avoid delays and extra fees.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Illustrative Calendar (LLP) */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>Illustrative RoC Calendar (FY 2025–26) - LLP</h3>
                            <p className="muted">
                                These dates are indicative for LLPs with FY ending 31 March. Re-compute from your actual FY and applicability.
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
                                            <td>DIR-3 KYC</td>
                                            <td>DIN or DPIN KYC for partners or designated partners</td>
                                            <td>Sep 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>LLP Form 11</td>
                                            <td>Annual Return of the LLP</td>
                                            <td>May 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>LLP Form 8</td>
                                            <td>Statement of Account and Solvency</td>
                                            <td>Oct 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>Tax Audit (if applicable)</td>
                                            <td>Audit under Income-tax Act where thresholds apply</td>
                                            <td>As per Income-tax timelines</td>
                                        </tr>
                                        <tr>
                                            <td>ITR Filing</td>
                                            <td>Income Tax Return for the LLP</td>
                                            <td>As per Income-tax timelines</td>
                                        </tr>
                                        <tr>
                                            <td>GST Returns (if registered)</td>
                                            <td>Monthly or Quarterly returns and annual return, as applicable</td>
                                            <td>As per GST calendar</td>
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
                                    <strong>Financials, Statement of Account &amp; Solvency (Form 8), Audit Report (if applicable)</strong>
                                    <p>
                                        Keep final, signed copies ready for Form 8 filing. Ensure figures and notes reconcile across trial balance, ledgers, and returns. Include all mandated declarations to reduce resubmission risk.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-3 KYC Proofs &amp; DSCs</strong>
                                    <p>
                                        Maintain PAN and identity or address proofs for each DIN or DPIN holder and secure valid DSCs for signatories. Expired DSCs delay filings—renew before the compliance window. Store KYC acknowledgements as part of your audit trail.
                                    </p>
                                </li>
                                <li>
                                    <strong>Statutory Records &amp; Minutes</strong>
                                    <p>
                                        Update records of partners or designated partners, contributions and transfers regularly. Keep minutes or resolutions page-numbered, signed and cross-referenced with filings. These are primary evidence during inspections and due diligence.
                                    </p>
                                </li>
                                <li>
                                    <strong>Supporting Papers for Specific Forms</strong>
                                    <p>
                                        Collate proofs for LLP Forms 3, 4, 5, 15 and others (agreements, consents, bank letters, resolutions). Label annexures clearly to match form fields and narratives. Good documentation speeds approval and reduces clarification calls.
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
                                    "Skip costly late fees and avoid DIN/DPIN deactivation risks due to KYC lapses.",
                            },
                            {

                                title: "Better Credibility",
                                desc:
                                    "Clean MCA records help with loans, tenders, investor diligence and partnerships.",
                            },
                            {

                                title: "Operational Confidence",
                                desc:
                                    "Proper resolutions, records and disclosures reduce exposure and improve decision-making.",
                            },
                            {

                                title: "Funding & Banking Ready",
                                desc:
                                    "Investors and lenders check MCA and tax filings first. Clean, on-time compliance improves confidence and can reduce the “risk premium” on your cost of capital.",
                            },
                            {

                                title: "Faster Deals & Onboarding",
                                desc:
                                    "Large customers and marketplaces demand ROC acknowledgements, KYC and records during vendor onboarding. Being compliant cuts back-and-forth, so you start billing sooner.",
                            },
                            {

                                title: "ESOP & Exit Readiness",
                                desc:
                                    "Well-maintained records support partner admission or exit, conversion to company if planned, and smoother diligence in M&A or strategic alliances.",
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

                {/* Rekotax | Our Approach (Card Layout) – MUI Box version */}
                <Box
                    component="section"
                    id="rk-approach"
                    aria-label="Our Approach to Annual Compliance"
                    sx={{
                        // CSS vars
                        "--rk-navy": "#0f2555",
                        "--rk-ink": "#162338",
                        "--rk-muted": "#5a6a83",
                        "--rk-line": "#e6ebf2",
                        "--rk-soft": "#f6f9ff",
                        "--rk-white": "#ffffff",
                        "--rk-shadow": "0 10px 24px rgba(15,37,85,.10)",
                        "--rk-accent": "#023691",
                        "--rk-green": "#18a870",
                        "--rk-amber": "#e7a500",

                        fontFamily:
                            '"Open Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                        p: "36px 4%",
                        background: "#fff",

                        "& .rk-wrap": { maxWidth: 1100, m: "0 auto" },
                        "& .rk-head": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            mb: "16px",
                        },
                        "& .rk-title": {
                            fontSize: "30px",
                            lineHeight: 1.2,
                            color: "var(--rk-ink)",
                            fontWeight: 800,
                            m: 0,
                        },
                        "& .rk-sub": { color: "var(--rk-muted)", m: "4px 0 0", fontSize: "15px" },

                        // Grid
                        "& .rk-grid": {
                            display: "grid",
                            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                            gap: "16px",
                        },
                        "@media (max-width:1080px)": {
                            "& .rk-grid": { gridTemplateColumns: "repeat(3, 1fr)" },
                        },
                        "@media (max-width:720px)": {
                            "& .rk-grid": { gridTemplateColumns: "repeat(2, 1fr)" },
                        },
                        "@media (max-width:520px)": {
                            "& .rk-grid": { gridTemplateColumns: "1fr" },
                        },

                        // Card
                        "& .rk-card": {
                            background: "var(--rk-soft)",
                            border: "1px solid var(--rk-line)",
                            borderRadius: "16px",
                            p: "18px 16px",
                            boxShadow: "var(--rk-shadow)",
                            position: "relative",
                            overflow: "hidden",
                            // connector line for large screens
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: "50%",
                                right: "-8px",
                                transform: "translateY(-50%)",
                                width: "16px",
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, transparent, var(--rk-line), transparent)",
                            },
                        },
                        "& .rk-grid > .rk-card:last-child::after": { display: "none" },
                        "@media (max-width:1080px)": {
                            "& .rk-card::after": { display: "none" },
                        },

                        "& .rk-badge": {
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "#fff",
                            border: "1px solid var(--rk-line)",
                            borderRadius: "999px",
                            px: "10px",
                            py: "6px",
                            fontWeight: 800,
                            fontSize: "12px",
                            color: "var(--rk-ink)",
                        },
                        "& .rk-icon": {
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            display: "inline-grid",
                            placeItems: "center",
                            background: "#eef3ff",
                            color: "var(--rk-accent)",
                            fontWeight: 800,
                            mb: "10px",
                            fontSize: "18px",
                        },
                        "& .rk-card h3": {
                            m: "0 0 6px",
                            fontSize: "18px",
                            color: "var(--rk-ink)",
                            fontWeight: 800,
                        },
                        "& .rk-card p": {
                            m: 0,
                            color: "#2c3649",
                            lineHeight: 1.65,
                            fontSize: "15px",
                        },
                    }}
                >
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <div className="rk-wrap">
                        <div className="rk-head">
                            <div>
                                <h2 className="rk-title">Our Approach</h2>
                                <p className="rk-sub">
                                    A five-step, CA/CS-led process that keeps your filings accurate, on
                                    time, and audit-ready.
                                </p>
                            </div>
                        </div>

                        <div className="rk-grid" role="list">
                            {/* 1. Plan */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 1</span>
                                <div className="rk-icon">📅</div>
                                <h3>Plan</h3>
                                <p>
                                    Build an annual calendar from the LLP’s FY end and map every
                                    requirement - LLP Form 11 (by 30 May), LLP Form 8 (by 30 October),
                                    DIR-3 KYC (by 30 September for DIN/DPIN holders) - plus event-based
                                    triggers like LLP Form 3, 4, 5, and 15 with owners and dates.
                                </p>
                            </article>

                            {/* 2. Prepare */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 2</span>
                                <div className="rk-icon">🗂️</div>
                                <h3>Prepare</h3>
                                <p>
                                    Collate financials, partners’ records, resolutions, LLP Agreement
                                    updates, and supporting proofs; reconcile figures and finalize drafts
                                    so attachments align perfectly with each LLP form.
                                </p>
                            </article>

                            {/* 3. Review */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 3</span>
                                <div className="rk-icon">🔍</div>
                                <h3>Review</h3>
                                <p>
                                    Conduct CA/CS checks for accuracy, applicability, and annexures;
                                    resolve discrepancies before filing to avoid resubmissions and
                                    additional fees.
                                </p>
                            </article>

                            {/* 4. File */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 4</span>
                                <div className="rk-icon">⚙️</div>
                                <h3>File</h3>
                                <p>
                                    E-file on the MCA portal with valid DSCs, pay statutory fees, and
                                    respond to any resubmission remarks until acknowledgements (SRNs) are
                                    issued.
                                </p>
                            </article>

                            {/* 5. Archive */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 5</span>
                                <div className="rk-icon">📑</div>
                                <h3>Archive</h3>
                                <p>
                                    Share challans and SRNs, update partners’ records and minutes, and
                                    maintain a structured, audit-ready trail for diligence and
                                    inspections.
                                </p>
                            </article>
                        </div>
                    </div>
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
                                q: "What is annual compliance for an LLP in India?",
                                a: "It is the set of statutory requirements under the LLP Act, 2008 and LLP Rules administered by MCA/RoC - primarily the Annual Return (LLP Form 11), the Statement of Account and Solvency (LLP Form 8), DIR-3 KYC for DIN/DPIN holders, and proper maintenance of partners' records, resolutions, and minutes."
                            },
                            {
                                q: "Do I need to file LLP Form 8 and LLP Form 11 even if my LLP has zero revenue?",
                                a: "Yes. All active LLPs must file the annual return and the statement of account and solvency irrespective of turnover or activity level. Non-filing can trigger additional fees, show-cause notices, and compliance risks."
                            },
                            {
                                q: "How are LLP Form 11 and LLP Form 8 due dates calculated?",
                                a: "For LLPs with FY ending on 31 March, Form 11 is due by 30 May and Form 8 by 30 October. These timelines are independent of any AGM because LLPs do not hold AGMs."
                            },
                            {
                                q: "What is DIR-3 KYC and what happens if I miss it?",
                                a: "DIR-3 KYC is the annual KYC for each partner/designated partner holding DIN/DPIN, typically due by 30 September. Missing it deactivates the DIN and a fixed late fee applies for reactivation. File immediately to restore status."
                            },
                            {
                                q: "Is DPT-3 applicable to LLPs?",
                                a: "Generally no. DPT-3 is a company-specific return under the Companies Act. LLPs are not required to file DPT-3, though borrowings and obligations must be properly disclosed in accounts and tax filings."
                            },
                            {
                                q: "Is MSME-1 applicable to LLPs?",
                                a: "Typically no. MSME-1 is prescribed for companies. However, LLPs must still comply with the MSMED Act on timely payments to MSME vendors, including potential interest on delayed payments."
                            },
                            {
                                q: "What are event-based compliances for an LLP?",
                                a: "Filings triggered by specific actions include: LLP Form 3 (execution/change of LLP Agreement), LLP Form 4 (admission/cessation or change in particulars/designation of partners), LLP Form 5 (change of name), and LLP Form 15 (change of registered office). For closure, LLP Form 24 may apply."
                            },
                            {
                                q: "What statutory records and registers must an LLP maintain?",
                                a: "Maintain records of partners and designated partners, their contributions and profit-sharing, resolutions/minutes, and registers or logs of changes. These may be kept physically or electronically with proper authentication."
                            },
                            {
                                q: "What happens if I miss an MCA/RoC deadline?",
                                a: "Late filings attract additional fees (often calculated per day for many forms) and may lead to penalties, deactivation of DIN for KYC lapses, and notices. Chronic delays can escalate into strike-off proceedings for non-operational LLPs."
                            },
                            {
                                q: "Can an LLP change its registered office and what must be filed?",
                                a: "Yes. File LLP Form 15 within prescribed timelines with valid proofs (utility bill, title/lease, NOC). Moves across jurisdictions may involve additional steps. Update stationery, bank, GST, and licenses to reflect the new address."
                            },
                            {
                                q: "Do LLPs need statutory auditors like companies?",
                                a: "Audit for LLPs is threshold-based under the LLP Rules and the Income-tax Act. If your turnover or contribution exceeds prescribed limits, appoint an auditor via partners’ resolution and maintain the engagement letter and reports."
                            },
                            {
                                q: "Is Secretarial Audit applicable to LLPs?",
                                a: "Secretarial Audit under MR-3 is a company requirement and typically does not apply to LLPs. Nevertheless, LLPs should maintain robust governance, records, and controls."
                            },
                            {
                                q: "Is BEN-2 (Significant Beneficial Owner) applicable to LLPs?",
                                a: "Generally no. The SBO framework and BEN-2 are designed for companies. LLPs should maintain transparent partner records and provide UBO information to banks or authorities when requested."
                            },
                            {
                                q: "How should an LLP prepare for annual filings?",
                                a: "Finalize books, prepare the Statement of Account and Solvency (Form 8), compile partner details for Form 11, pass necessary resolutions, ensure valid DSCs, and set an internal timeline that precedes statutory due dates."
                            },
                            {
                                q: "Do small LLPs get any compliance relaxations?",
                                a: "Small LLP classification reduces certain fees and penalties. Core annual obligations - Form 11, Form 8, KYC, taxation, and record-keeping - continue to apply."
                            },
                            {
                                q: "What documents are needed for annual LLP filings?",
                                a: "Financial statements, the solvency declaration and attachments for Form 8, partners/contribution details for Form 11, updated LLP Agreement or amendments (if any), resolutions/minutes, and valid DSCs for signatories."
                            },
                            {
                                q: "How do clean RoC records help an LLP with banking and investors?",
                                a: "Timely, accurate filings and organized records increase credibility, speed up loan sanctions, vendor onboarding, and due diligence, and reduce perceived risk for lenders and investors."
                            },
                            {
                                q: "Can an LLP maintain statutory records electronically?",
                                a: "Yes, provided entries are accurate, authenticated, and accessible for inspection. Many LLPs use secure digital records with backups, version control, and authorization trails."
                            },
                            {
                                q: "What are common mistakes that cause resubmission of LLP forms?",
                                a: "Mismatched figures, missing annexures or signatures, expired DSCs, incorrect partner details, outdated LLP Agreement references, and inconsistent dates. A CA/CS pre-check and a documentation checklist reduce resubmissions."
                            },
                            {
                                q: "Can a compliance partner manage everything end-to-end for an LLP?",
                                a: "Yes. A CA/CS-led team can map the calendar, prepare documents, e-file forms, share SRNs/challans, and maintain an audit-ready archive - so you stay compliant without operational strain."
                            }
                        ] .map(({ q, a }, idx) => {
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
