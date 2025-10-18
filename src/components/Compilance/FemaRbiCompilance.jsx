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

export default function FemaRbiCompilance({ webAppUrl, onSubmitted }) {
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
                        FEMA/RBI Compliances in India


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
                        Your trusted partner for seamless FEMA and RBI compliance with precision and punctuality.]<br />
                        From foreign investment reports to cross-border remittance filings, we handle it end-to-end with expert oversight and proactive FEMA/RBI compliance alerts.
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
                    FEMA and RBI Compliance (India)                </Typography>

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
                            What is FEMA Compliance?

                        </Typography>
                        <Typography sx={{ fontSize: "1rem", mb: 2 }}>
                            <strong>FEMA compliance</strong> means conducting all cross-border transactions and capital <br />account
                            activities in line with the <strong>Foreign Exchange Management Act, 1999,</strong> the <br /> related
                            <strong> RBI Master Directions,</strong> and notifications under FEMA. It applies to all entity <br />types
                            and individuals that receive foreign investment, make overseas investments, <br />borrow
                            or lend in foreign currency, or remit funds across borders.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography>
                            In practice, this covers a calendar of periodic returns (for example: <strong>FLA return</strong> for <br />
                            foreign liabilities and assets,<strong>ECB-2 </strong> monthly return for external commercial <br />borrowings,
                            <strong>ODI APR</strong> for overseas direct investment) plus event-based filings<br /> through RBI portals
                            such as <strong>SMF on FIRMS</strong> (for example: <strong>FC-GPR</strong>  for fresh FDI <br />allotments, <strong>FC-TRS</strong>  for
                            transfers,<strong> ODI forms</strong> for overseas investments, and <br /> <strong>ECB reporting</strong>) whenever a
                            transaction or change occurs.
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
                        Why is FEMA Compliance Necessary?
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
                            { title: "Banking Continuity", desc: "Ensures smooth credit of remittances, allotments, and repatriations without blocks at AD banks." },
                            { title: "Avoids Penalties", desc: " Prevents late submission fees (LSF), compounding proceedings, and delays in approvals." },
                            { title: "Investor and Lender Confidence", desc: "Clean compliance supports due diligence for FDI, VC funds, lenders, and partners." },
                            { title: "Deal Readiness", desc: "Accurate reporting and documentation reduce friction in future rounds, exits, and cross-border deals." },


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

                    {/* FEMA/RBI Compliances */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>FEMA and RBI Compliances (India)</h3>
                            <ul>
                                <li>
                                    <strong>Identify the Transaction Category</strong>
                                    <p>
                                        Classify the activity correctly under FEMA and RBI rules. Typical buckets include FDI in
                                        capital instruments, transfers between residents and non-residents, ODI, ECB, trade
                                        remittances and current account payments under LRS. Correct classification drives the
                                        portal, form, and timeline.
                                    </p>
                                </li>
                                <li>
                                    <strong>Coordinate With the AD Bank</strong>
                                    <p>
                                        Select the Authorised Dealer bank, complete KYC, and obtain FIRC/AD bank advice for
                                        inward remittances. Maintain a clear trail of UTR numbers, SWIFT messages, and purpose
                                        codes to support filings and diligence.
                                    </p>
                                </li>
                                <li>
                                    <strong>FDI Allotments and Reporting</strong>
                                    <p>
                                        Comply with pricing guidelines, pass Board resolutions, issue securities, and report on
                                        FIRMS (SMF). Use FC-GPR for fresh allotments within the prescribed window with valuation
                                        and CS certificates.
                                    </p>
                                </li>
                                <li>
                                    <strong>Transfers Between Resident and Non-Resident</strong>
                                    <p>
                                        Report secondary transfers on FIRMS via FC-TRS within the stipulated timeline. Ensure
                                        payment mode, pricing, and counterpart KYC align with FEMA conditions.
                                    </p>
                                </li>
                                <li>
                                    <strong>Overseas Direct Investment (ODI)</strong>
                                    <p>
                                        File ODI forms on FIRMS, obtain UIN where applicable, and meet post-investment
                                        obligations. Submit the Annual Performance Report (APR) for each ODI entity and track
                                        disinvestments and restructuring.
                                    </p>
                                </li>
                                <li>
                                    <strong>External Commercial Borrowings (ECB)</strong>
                                    <p>
                                        Obtain LRN, comply with ECB framework, and file the monthly ECB-2 return for drawdowns,
                                        outstanding, and repayments. Track end-use, all-in cost ceiling, and average maturity.
                                    </p>
                                </li>
                                <li>
                                    <strong>Annual and Periodic Returns</strong>
                                    <p>
                                        File the FLA return for entities with foreign investment and submit ODI APR and ECB-2
                                        where applicable. Use calendars and owner assignments to avoid LSF.
                                    </p>
                                </li>
                                <li>
                                    <strong>Document Control and Governance</strong>
                                    <p>
                                        Maintain a central repository of FIRCs, KYC, approvals, valuation reports, agreements,
                                        share certificates, and filings. Align statutory registers and cap tables with
                                        FEMA-reported positions.
                                    </p>
                                </li>
                                <li>
                                    <strong>Change Management and Ongoing Monitoring</strong>
                                    <p>
                                        Track changes in shareholding/control, pricing, repayment schedules, and ODI structure.
                                        Trigger event-based filings promptly on FIRMS and via AD bank. Quarterly reviews keep you
                                        transaction-ready.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <section id="rk-roc-cta" aria-label="Done-for-you FEMA and RBI compliance plan">
                        <div className="cta-wrap">
                            <h3>Unsure which FEMA or RBI rules apply to you?</h3>
                            <p>Book a 10 minute clarity call. We will map your transaction type, portal, forms, and timelines.</p>
                            <a href="#contact">Talk to a compliance expert</a>
                        </div>
                    </section>

                    {/* Key Pillars */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Key Pillars of FEMA and RBI Compliance</h3>
                            <ul>
                                <li>
                                    <strong>Correct Classification</strong>
                                    <p>
                                        Define whether it is FDI, transfer, ODI, ECB, trade remittance, or LRS. The correct
                                        bucket determines the portal and form. Early classification avoids rework and LSF.
                                    </p>
                                </li>
                                <li>
                                    <strong>Banking Trail and KYC</strong>
                                    <p>
                                        Secure FIRC/AD advice and remitter KYC through the AD bank. Preserve UTR, SWIFT, and
                                        purpose code evidence for each inflow/outflow.
                                    </p>
                                </li>
                                <li>
                                    <strong>FIRMS Portal Reporting</strong>
                                    <p>
                                        Use SMF on FIRMS for capital instruments and ODI. FC-GPR for fresh allotments, FC-TRS for
                                        transfers, DI for downstream. Submit accurate attachments to prevent clarifications.
                                    </p>
                                </li>
                                <li>
                                    <strong>ECB Compliance</strong>
                                    <p>
                                        Register the loan, monitor parameters, and file ECB-2 monthly. Track drawdowns,
                                        repayments, and term changes. Respect end-use and cost benchmarks.
                                    </p>
                                </li>
                                <li>
                                    <strong>Annual Disclosures</strong>
                                    <p>
                                        File FLA and ODI APR. Reconcile with audited financials and ledgers. Calendarize deadlines
                                        with reminders for zero slippage.
                                    </p>
                                </li>
                                <li>
                                    <strong>Documentation and Governance</strong>
                                    <p>
                                        Maintain valuation reports, approvals, agreements, cap table updates, and share
                                        certificates. Keep filings consistent with registers and accounting.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* What You Must Track */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>What You Must Track (Core FEMA and RBI Items)</h3>
                            <ul>
                                <li>
                                    <strong>Inward Remittances</strong>
                                    <p>
                                        Capture UTR and FIRC for every credit. Obtain remitter KYC via AD bank. Map each inflow to
                                        the correct purpose and filing.
                                    </p>
                                </li>
                                <li>
                                    <strong>Capital Instrument Allotments</strong>
                                    <p>
                                        Issue within pricing rules and Board approvals. File FC-GPR on time with valuation and CS
                                        certificates. Align cap table, registers, and certificates.
                                    </p>
                                </li>
                                <li>
                                    <strong>Transfers Between Resident and Non-Resident</strong>
                                    <p>
                                        Keep consideration proofs and price confirmations. File FC-TRS within the window. Update
                                        registers and beneficiary records.
                                    </p>
                                </li>
                                <li>
                                    <strong>ODI Positions</strong>
                                    <p>
                                        Track UIN, equity/debt infusions, guarantees, and restructuring. File ODI forms and APR.
                                        Monitor disinvestment/impairment.
                                    </p>
                                </li>
                                <li>
                                    <strong>ECB Lifecycle</strong>
                                    <p>
                                        Maintain LRN, drawdowns, and repayment schedules. File ECB-2 monthly and track term
                                        changes. Keep lender communications.
                                    </p>
                                </li>
                                <li>
                                    <strong>Annual FLA and Other Returns</strong>
                                    <p>
                                        Prepare FLA (audited/provisional). Ensure consistency across ledgers and prior filings.
                                        Archive acknowledgements and workings.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Event-Based Compliances */}
                    <div className="content-row" style={{ marginTop: 6 }}>
                        <div className="content-col-full">
                            <h3>Event Based FEMA and RBI Compliances</h3>
                            <ul>
                                <li>
                                    <strong>FC-GPR (Fresh Allotment)</strong>
                                    <p>
                                        Report the issue of capital instruments against foreign inflow. Ensure pricing complies
                                        with RBI valuation norms. Keep approvals, list of allottees, pre/post shareholding,
                                        valuation and CS certificates. Match each allotment with FIRC, AD KYC and UTR. File FC-GPR
                                        within the stipulated days to avoid LSF.
                                    </p>
                                </li>
                                <li>
                                    <strong>FC-TRS (Transfer)</strong>
                                    <p>
                                        Report transfers between a resident and a non-resident (sale/gift, listed/unlisted).
                                        Verify consideration, pricing and payment route; maintain agreements/notes and fund
                                        proofs. Obtain AD KYC where required. File within the window to align RBI ownership data.
                                    </p>
                                </li>
                                <li>
                                    <strong>Downstream Investment (DI)</strong>
                                    <p>
                                        Report indirect foreign investment when an Indian entity with foreign investment invests
                                        in another Indian entity. Check caps, routes and conditions; prepare approvals and working
                                        for indirect foreign shareholding %. File DI on FIRMS in time and update registers/cap
                                        tables.
                                    </p>
                                </li>
                                <li>
                                    <strong>ODI Forms and APR</strong>
                                    <p>
                                        For JV/WOS abroad, file ODI forms and obtain/update UIN. Track subsequent infusions,
                                        guarantees and restructurings and report promptly. Submit APR for each foreign entity and
                                        report disinvestment/impairment/write-offs with proofs.
                                    </p>
                                </li>
                                <li>
                                    <strong>ECB-2 (Monthly Return)</strong>
                                    <p>
                                        Report ECBs monthly (drawdowns, outstanding, interest/fees, repayments). Keep LRN and AD
                                        confirmations aligned. Monitor end-use, cost and maturity. File on time and submit change
                                        requests for term revisions. Track hedging/covenants.
                                    </p>
                                </li>
                                <li>
                                    <strong>Buyback, Capital Reduction, or Bonus/ESOP to Non-Residents</strong>
                                    <p>
                                        Check eligibility, pricing and sectoral conditions. Obtain approvals and sequence FEMA
                                        reporting. Report on FIRMS where applicable; keep pricing/vesting/grant workings for ESOPs.
                                        Align certificates/demat entries/acks.
                                    </p>
                                </li>
                                <li>
                                    <strong>Change in Control or Shareholding</strong>
                                    <p>
                                        Assess if government route, sectoral caps or conditions are triggered. Update Entity
                                        Master, file FC-GPR/FC-TRS and DI if thresholds are crossed. Realign SBO (BEN-2) where
                                        applicable. Notify AD bank; keep KYC, consideration proofs and approvals together.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Illustrative Calendar */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>Illustrative FEMA and RBI Calendar (FY 2025–26)</h3>
                            <p className="muted">
                                Dates below are indicative for planning. Always compute from the actual transaction date and the
                                applicable FEMA timeline.
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
                                            <td>FC-GPR</td>
                                            <td>Report fresh allotment against foreign inflow</td>
                                            <td>Within the prescribed days from allotment (example: 30 days)</td>
                                        </tr>
                                        <tr>
                                            <td>FC-TRS</td>
                                            <td>Report transfer between resident and non-resident</td>
                                            <td>Within the prescribed days from transfer completion (example: 60 days)</td>
                                        </tr>
                                        <tr>
                                            <td>FLA Return</td>
                                            <td>Annual disclosure of foreign liabilities and assets</td>
                                            <td>Example: Jul 15, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>ECB-2</td>
                                            <td>Monthly return for external commercial borrowings</td>
                                            <td>Example: 7th of the following month</td>
                                        </tr>
                                        <tr>
                                            <td>ODI APR</td>
                                            <td>Annual performance report for overseas entities</td>
                                            <td>Example: By Dec 31, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>Downstream Investment</td>
                                            <td>Reporting of indirect foreign investment</td>
                                            <td>Within the prescribed days from the event</td>
                                        </tr>
                                        <tr>
                                            <td>ESOP/Corporate Actions</td>
                                            <td>Reporting of corporate actions involving non-residents</td>
                                            <td>Within the prescribed days from the event</td>
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
                                    <strong>Banking Evidences</strong>
                                    <p>
                                        FIRC/AD bank advice, remitter KYC, UTR and SWIFT messages. Purpose codes and credit
                                        narratives matching the filing. These are base proofs for FC-GPR/FC-TRS.
                                    </p>
                                </li>
                                <li>
                                    <strong>Corporate Approvals and Valuation</strong>
                                    <p>
                                        Board/shareholder approvals and valuation certificates. Demonstrate price compliance.
                                        Keep cap table, register entries, and share certificates aligned.
                                    </p>
                                </li>
                                <li>
                                    <strong>Agreements and Supporting Papers</strong>
                                    <p>
                                        Share subscription/transfer agreements, loan agreements for ECB, JV/WOS charters for ODI.
                                        Ensure attachments match FIRMS/ECB narratives. Label annexures clearly.
                                    </p>
                                </li>
                                <li>
                                    <strong>Return Working Papers and Acknowledgements</strong>
                                    <p>
                                        Computations for FLA, APR, ECB-2; copies of filed forms, ARN/SRN, and portal
                                        acknowledgements. Archive for audit trails and diligence.
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

                                title: "Avoid Late Submission Fees",
                                desc: "On time filings reduce LSF exposure and the risk of compounding proceedings.",
                            },
                            {

                                title: "Banking Continuity",
                                desc: "Clean documentation ensures smooth credit of inflows and repatriations at AD banks.",
                            },
                            {

                                title: "Investor Confidence",
                                desc: "Accurate, timely reporting supports fund raises, loans, and strategic partnerships.",
                            },
                            {

                                title: "Deal Readiness",
                                desc: "Well kept records and acknowledgements speed diligence for future rounds and exits.",
                            },
                            {

                                title: "Faster Approvals",
                                desc: "Structured filings with correct attachments reduce clarification cycles and delays.",
                            },
                            {

                                title: "Global Scalability",
                                desc: "Consistent compliance across FDI, ODI, and ECB enables confident international growth.",
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

                {/* Rekotax | Our Approach (Card Layout) – MUI Box version (FEMA & RBI) */}
                <Box
                    component="section"
                    id="rk-approach"
                    aria-label="Our Approach to FEMA and RBI Compliance"
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

                        fontFamily: '"Open Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
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
                                background: "linear-gradient(90deg, transparent, var(--rk-line), transparent)",
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
                                    A five-step, CA/CS-led process that ensures your FEMA and RBI compliances are precise, timely, and globally credible.
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
                                    Map your year of inflows and outflows into a simple timeline with clear owners and checkpoints.
                                    You get clarity up front so there are no last minute surprises, blocked credits, or avoidable fees.
                                </p>
                            </article>

                            {/* 2. Prepare */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 2</span>
                                <div className="rk-icon">🗂️</div>
                                <h3>Prepare</h3>
                                <p>
                                    Organize evidence in one place&mdash;bank proofs, approvals, and transaction trails that match your books.
                                    This makes every submission straightforward and reduces back and forth with banks.
                                </p>
                            </article>

                            {/* 3. Review */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 3</span>
                                <div className="rk-icon">🔍</div>
                                <h3>Review</h3>
                                <p>
                                    We stress test each transaction for risks like pricing gaps, ownership mismatches, or missed timelines.
                                    Issues are fixed before they become delays so your deals keep moving.
                                </p>
                            </article>

                            {/* 4. File */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 4</span>
                                <div className="rk-icon">⚙️</div>
                                <h3>File</h3>
                                <p>
                                    Submissions are handled end to end with clear status updates and quick clarifications.
                                    You see faster acknowledgements, cleaner audits, and uninterrupted banking.
                                </p>
                            </article>

                            {/* 5. Archive */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 5</span>
                                <div className="rk-icon">📑</div>
                                <h3>Archive</h3>
                                <p>
                                    Create a living record of proofs and approvals that is easy to search and share.
                                    Future rounds, lender reviews, and exits become faster because your trail is already ready.
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
                                q: "What is FEMA/RBI compliance and why does it matter?",
                                a: "FEMA/RBI compliance ensures cross-border transactions and capital account activities follow India’s foreign exchange rules. It keeps remittances smooth, prevents delays/penalties, and builds credibility with banks, investors, and regulators."
                            },
                            {
                                q: "Who needs to comply with FEMA in India?",
                                a: "Any entity or individual handling foreign investment, transfers with non-residents, overseas investments, external borrowings, or cross-border remittances. If money or ownership crosses borders, FEMA likely applies."
                            },
                            {
                                q: "What are FIRMS and the Single Master Form (SMF)?",
                                a: "FIRMS is RBI’s portal for reporting capital account transactions. SMF is the unified route to report fresh allotments, transfers, ODI, etc., so RBI/AD banks have an accurate view of foreign ownership."
                            },
                            {
                                q: "What is FC-GPR and when is it required?",
                                a: "FC-GPR reports the issue of capital instruments to non-residents against inward remittances. It ties allotment to pricing rules, approvals, and the banking trail so FDI is recognized in official records."
                            },
                            {
                                q: "What is FC-TRS and when does it apply?",
                                a: "FC-TRS captures secondary transfers of shares/CCPS between residents and non-residents. It validates pricing, payment route, and KYC and ensures RBI records reflect ownership changes."
                            },
                            {
                                q: "What is the Entity Master and Business User registration?",
                                a: "The Entity Master stores a company’s foreign investment profile on FIRMS. Business User access lets authorized users file/update transactions. Keeping it accurate avoids portal errors and filing blocks."
                            },
                            {
                                q: "What is the FLA return and who must file it?",
                                a: "Entities with foreign investment must file the annual Foreign Liabilities and Assets (FLA) return. It reconciles foreign equity/debt positions with financials and supports a clean compliance history."
                            },
                            {
                                q: "What is Overseas Direct Investment (ODI) and APR?",
                                a: "ODI covers Indian investments into JV/WOS abroad. Each ODI event needs reporting and an Annual Performance Report (APR) to track the foreign entity’s status and India’s ownership over time."
                            },
                            {
                                q: "What is an External Commercial Borrowing (ECB)?",
                                a: "ECB is a foreign loan raised by an Indian entity. Borrowers must follow the ECB framework and submit monthly ECB-2 returns so maturities, costs, and repayments stay within permitted limits."
                            },
                            {
                                q: "How does LRS work for individuals and founders?",
                                a: "Under the Liberalised Remittance Scheme, resident individuals can remit up to the permitted limit per FY for purposes like investments, education, or travel. Banks monitor limits and documentation under FEMA."
                            },
                            {
                                q: "What is Downstream Investment (DI)?",
                                a: "DI occurs when an Indian company with foreign ownership invests in another Indian company. Reporting captures indirect foreign shareholding and checks compliance with sectoral caps."
                            },
                            {
                                q: "Do pricing guidelines apply to all FDI deals?",
                                a: "Yes—pricing guidelines apply especially to unlisted securities and many transfers. Independent valuation and approved payment routes help avoid scrutiny and re-submissions."
                            },
                            {
                                q: "Why are AD banks, FIRC, and KYC so important?",
                                a: "AD banks verify purpose and parties. FIRC/AD advice and counterparty KYC create the official trail for inflows/outflows—critical to link banking entries with filings and due diligence."
                            },
                            {
                                q: "What are Late Submission Fees and compounding?",
                                a: "Delayed filings can attract Late Submission Fees (LSF). Material contraventions may require compounding. Timely reporting and tidy documentation reduce both cost and risk."
                            },
                            {
                                q: "What documents are typically needed for FDI reporting?",
                                a: "Bank proofs (FIRC/AD advice/UTR), counterparty KYC, approvals/resolutions, valuation certificates, and transaction agreements. A consistent, complete set speeds acknowledgements."
                            },
                            {
                                q: "Do startups with no revenue still have FEMA obligations?",
                                a: "Yes—FEMA is triggered by cross-border capital flows (FDI, transfers with non-residents, ECB, ODI), not by revenue or turnover."
                            },
                            {
                                q: "What mistakes most often delay FEMA filings?",
                                a: "Wrong classification, missing KYC, pricing mismatches, inconsistent dates, and incomplete attachments. A pre-check and unified document set prevent most issues."
                            },
                            {
                                q: "How long should we keep FEMA records?",
                                a: "Maintain acknowledgements, approvals, KYC, and bank trails with corporate records for multiple years. A clean archive accelerates audits, investor diligence, and exits."
                            },
                            {
                                q: "Can a partner manage FEMA end-to-end for us?",
                                a: "Yes—experts can map applicability, coordinate with AD banks, prepare filings, and track acknowledgements while your team focuses on operations."
                            },
                            {
                                q: "How do we know what applies and when?",
                                a: "Start with a simple calendar mapped to funding, transfers, borrowings, and overseas plans. Assign owners, set reminders, and review quarterly so nothing slips."
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
