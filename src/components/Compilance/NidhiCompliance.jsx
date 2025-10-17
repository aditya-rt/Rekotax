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

export default function NidhiCompliance({ webAppUrl, onSubmitted }) {
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
                        Compliances for NIdhi Companies in India

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

                        <br />
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
                    Compliance for Nidhi Companies (India)
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
                            What is Compliance for a Nidhi Company?
                        </Typography>
                        <Typography sx={{ fontSize: "1rem", mb: 2 }}>
                            <strong>Compliance</strong>  means operating your Nidhi within the framework of the <strong>Companies <br /> Act,
                                2013</strong>  and the <strong> Nidhi Rules, 2014</strong> (as amended), under the supervision of the<br />
                            <strong>Ministry of Corporate Affairs (MCA)</strong>  through the <strong>Registrar of Companies (RoC)</strong>. <br />
                            It covers admission of members, deposit and lending limits, maintenance of <br />
                            statutory registers, conduct of Board and General Meetings, and preparation <br />
                            and filing of financial statements and annual returns.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography>
                            In practice, the calendar includes annual filings like <strong> AOC-4, MGT-7/7A, ADT-1, DIR-3 <br />
                                KYC, </strong>plus Nidhi-specific returns such as <strong>NDH-1 </strong> (annual),<strong> NDH-3 </strong>(half-yearly), and <br />
                            where applicable <strong>NDH-2/NDH-4</strong> . It also includes event-based filings (for example <br />
                            <strong>  PAS-3, SH-7, CHG-1/4, INC-22, MGT-14</strong>) whenever relevant changes occur.
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
                            { title: "Stays Active", desc: "Keeps your Nidhi valid on MCA records and sustains its Nidhi status." },
                            { title: "Avoids Penalties", desc: "Delays in NDH and annual filings attract additional fees and can trigger restrictions on accepting deposits or granting loans." },
                            { title: "Protects Members", desc: "Strong governance and prudential compliance safeguard member deposits and reduce operational risk." },
                            { title: "Builds Credibility", desc: "Clean records improve trust with banks, auditors, stakeholders, and during regulatory reviews or due diligence." },

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
                {/* Nidhi Company Annual Compliance Section (content updated, styles/structure unchanged) */}
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

                    {/* Compliances for Newly Registered Nidhi Company */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Compliances for Newly Registered Nidhi Company (India)</h3>
                            <ul>
                                <li>
                                    <strong>First Board Meeting (within 30 days)</strong>
                                    <p>
                                        Hold the inaugural Board meeting to appoint authorised signatories, fix the financial year, and record directors’ disclosures (MBP-1 and DIR-8). Approve bank account opening and adopt a dated Nidhi compliance calendar. Proper notice, agenda and minutes establish an audit-ready precedent.
                                    </p>
                                </li>

                                <li>
                                    <strong>Appointment of First Auditor</strong>
                                    <p>
                                        The Board appoints the first statutory auditor within 30 days of incorporation, otherwise members appoint within the next 90 days. Obtain written consent and eligibility certificate and minute the decision. Keep the engagement letter aligned to later AGM actions and ADT-1 filing.
                                    </p>
                                </li>

                                <li>
                                    <strong>Bank Account Opening and Capital Receipt</strong>
                                    <p>
                                        Open the current account and receive subscription monies as per the Memorandum. Map each credit to the respective subscriber with UTR references and reconcile paid-up capital with the Register of Members. This alignment supports INC-20A filing and later diligence.
                                    </p>
                                </li>

                                <li>
                                    <strong>Issue of Share Certificates (within 60 days) and Stamp Duty</strong>
                                    <p>
                                        Prepare, execute and deliver share certificates to subscribers within 60 days and discharge applicable state stamp duty in time. Cross-reference certificate numbers, folios and allotments in the Register of Members to preserve title and avoid penalties.
                                    </p>
                                </li>

                                <li>
                                    <strong>Commencement of Business – INC-20A (within 180 days)</strong>
                                    <p>
                                        File INC-20A confirming receipt of subscription capital into the company bank account with clear banking evidence. Non-filing can restrict operations and attract penalties. Treat this as a mandatory milestone.
                                    </p>
                                </li>

                                <li>
                                    <strong>Registered Office Confirmation – INC-22 (if applicable)</strong>
                                    <p>
                                        If the permanent registered office is finalised post-incorporation, file INC-22 within 30 days with recent utility bill, title or lease proof and owner’s NOC. Update name board, letterheads and statutory imprints consistently.
                                    </p>
                                </li>

                                <li>
                                    <strong>Statutory Registers and Minutes</strong>
                                    <p>
                                        Maintain statutory registers for Members, Directors or KMP, Charges and Transfers along with deposit-related records as per Nidhi Rules. Open minutes books for Board and general meetings. Link resolutions to required filings.
                                    </p>
                                </li>

                                <li>
                                    <strong>Nidhi Onboarding Filings (NDH series)</strong>
                                    <p className="muted">
                                        For companies incorporated after 19 April 2022 under the Nidhi Amendment Rules, 2022, start deposit or lending activities only after you are declared a Nidhi.
                                    </p>
                                    <ul>
                                        <li>
                                            <strong>NDH-4 – Application for declaration as Nidhi</strong>
                                            <p>
                                                File within 120 days of incorporation after meeting entry criteria: at least 200 members, Net Owned Funds of at least ₹20 lakh, and promoters or directors meeting fit and proper criteria. If no decision is communicated within 45 days, approval is deemed granted.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>NDH-3 – Half-yearly return</strong>
                                            <p>
                                                Starts after you are declared a Nidhi. File within 30 days of each half-year end, practically 30 April and 30 October.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>Not part of onboarding for new incorporations</strong>
                                            <p>
                                                NDH-1 is a legacy annual return and NDH-2 is an extension application under the old framework. These are not onboarding steps for post-2022 incorporations.
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="callout" style={{ marginTop: 10 }}>
                                        <p>
                                            <strong>Important</strong>: Onboarding is NDH-4 once you have 200 members and ₹20 lakh NOF and within 120 days of incorporation. NDH-3 begins only after you are declared a Nidhi.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <strong>DPT-3</strong>
                                    <p>
                                        File the annual Return of Deposits and Exempt Borrowings by 30 June each year, reporting all outstanding amounts as on 31 March. Mandatory for every public company, including Nidhis. Ensure figures align with audited financials and attach auditor’s certificate where required.
                                    </p>
                                </li>

                                <li>
                                    <strong>Tax and Labour Registrations (as applicable)</strong>
                                    <p>
                                        Verify PAN or TAN activation. Obtain GST registration where thresholds or counterparties require it. Complete EPFO or ESIC and Professional Tax registrations as per state norms and headcount. Configure e-payment workflows early.
                                    </p>
                                </li>

                                <li>
                                    <strong>Year-One Filing Plan and Governance Rhythm</strong>
                                    <p>
                                        Publish a dated plan for Board meetings and a compliant AGM timeline. Back-schedule AOC-4, MGT-7 or 7A, ADT-1, DIR-3 KYC, and Nidhi returns (NDH-3 and, if applicable, NDH-1 for legacy cases). Assign clear ownership and reminders.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <section id="rk-roc-cta" aria-label="Done-for-you RoC compliance plan">
                        <div className="cta-wrap">
                            <h3>Want to know what applies to your Nidhi?</h3>
                            <p>Book a 10-minute clarity call. We will answer your questions and outline your exact next steps.</p>
                            <Button
                                href="#contact"
                                onClick={openContact}
                                disableElevation
                                sx={{
                                    color: "#fff",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    borderRadius: 999,
                                    px: 3,
                                    py: 1.25,
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    backgroundImage:
                                        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                                    border: "1px solid rgba(255,255,255,0.28)",
                                    boxShadow: "0 10px 30px rgba(15,37,85,0.35)",
                                    backdropFilter: "blur(14px) saturate(160%)",
                                    WebkitBackdropFilter: "blur(14px) saturate(160%)",
                                    textDecoration: "none !important",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.18)",
                                        borderColor: "rgba(255,255,255,0.38)",
                                        boxShadow: "0 12px 36px rgba(15,37,85,0.45)",
                                        textDecoration: "none !important",
                                        transform: "translateY(-1px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                        boxShadow: "0 8px 22px rgba(15,37,85,0.35)",
                                    },
                                }}
                            >
                                Talk to a compliance expert
                            </Button>
                        </div>
                    </section>

                    {/* Key Pillars (Nidhi) */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Key Pillars of Annual Compliance (Nidhi Company)</h3>
                            <ul>
                                <li>
                                    <strong>Board &amp; Member Meetings</strong>
                                    <p>
                                        Hold at least four Board meetings annually with a maximum 120 day gap and one AGM. Issue formal notices with agenda, record attendance, and maintain signed minutes. Approvals should cover accounts, auditor items, and deposit or lending policies under Nidhi Rules.
                                    </p>
                                </li>
                                <li>
                                    <strong>Financial Reporting (AOC-4)</strong>
                                    <p>
                                        Prepare audited financial statements and obtain Board or AGM approval. File AOC-4 within 30 days of the AGM with Auditor’s Report and Board’s Report. Ensure accurate mapping of figures and attachments.
                                    </p>
                                </li>
                                <li>
                                    <strong>Annual Return (MGT-7 / MGT-7A)</strong>
                                    <p>
                                        File within 60 days of the AGM capturing members, directors or KMP, and corporate events. Keep consistency with statutory registers and prior filings.
                                    </p>
                                </li>
                                <li>
                                    <strong>Auditors (ADT-1)</strong>
                                    <p>
                                        Appoint or ratify the statutory auditor at the AGM and file ADT-1 within 15 days. Verify eligibility, tenure and consent before filing.
                                    </p>
                                </li>
                                <li>
                                    <strong>Disclosures &amp; Nidhi Returns (DIR-3 KYC, MBP-1, NDH series)</strong>
                                    <p>
                                        Each director must complete annual KYC to keep DIN active. Directors disclose interests via MBP-1. File Nidhi returns NDH-3 half-yearly and NDH-1 annually if applicable for legacy cases. NDH-4 is for declaration or registration as a Nidhi at onboarding.
                                    </p>
                                </li>
                                <li>
                                    <strong>Registers &amp; Minutes</strong>
                                    <p>
                                        Maintain registers of members, directors or KMP, charges and transfers, along with deposit records mandated by Nidhi Rules. Keep minutes consecutively numbered, signed and inspection-ready.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* What You Must Track (Nidhi) */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>What You Must Track (Core Annual Items)</h3>
                            <ul>
                                <li>
                                    <strong>Board Meetings</strong>
                                    <p>
                                        Schedule at least four meetings with spacing of 120 days or less. Circulate agendas and papers in advance. Record attendance, resolutions and dissent in signed minutes and preserve proof of dispatch.
                                    </p>
                                </li>
                                <li>
                                    <strong>DPT-3</strong>
                                    <p>
                                        File by 30 June each year reporting outstanding deposits and exempt borrowings as on 31 March. Ensure alignment with audited financials. Attach auditor’s certificate where required.
                                    </p>
                                </li>
                                <li>
                                    <strong>AGM</strong>
                                    <p>
                                        Hold within six months from FY end (first AGM within nine months of the first FY). Approve accounts, auditor items and other member business. Serve notice with explanatory statement and file post-AGM forms on time.
                                    </p>
                                </li>
                                <li>
                                    <strong>AOC-4</strong>
                                    <p>
                                        File audited financials within 30 days of AGM with required attachments. Ensure the Board’s Report aligns with financials and mandated disclosures.
                                    </p>
                                </li>
                                <li>
                                    <strong>MGT-7 / 7A</strong>
                                    <p>
                                        File within 60 days of AGM. Cross-verify with registers and prior filings to avoid inconsistencies.
                                    </p>
                                </li>
                                <li>
                                    <strong>ADT-1</strong>
                                    <p>
                                        Notify MCA of auditor appointment or re-appointment within 15 days of AGM. Attach consent and eligibility confirmations.
                                    </p>
                                </li>
                                <li>
                                    <strong>Recurring NDH Series Filings (for registered Nidhis)</strong>
                                    <ul>
                                        <li>
                                            <strong>NDH-3 – Half-Yearly Return</strong>
                                            <p>
                                                File within 30 days of the close of each half-year. Practically by 30 April and 30 October.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>NDH-4 – Update or deemed continuation (if asked)</strong>
                                            <p>
                                                Monitor MCA instructions. If there are material changes in membership, NOF or management affecting eligibility, be ready to confirm or re-submit details.
                                            </p>
                                        </li>
                                    </ul>
                                    <p className="muted">
                                        <strong>Note</strong>: NDH-1 and NDH-2 are legacy forms under the pre-2022 regime and are not part of the recurring set for newly incorporated Nidhis.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Event-Based Compliances (Nidhi) */}
                    <div className="content-row" style={{ marginTop: 6 }}>
                        <div className="content-col-full">
                            <h3>Event-Based Compliances (When Specific Changes Occur)</h3>
                            <ul>
                                <li>
                                    <strong>PAS-3 (Allotment of Shares)</strong>
                                    <p>
                                        File for any share allotment approved under the Act and rules. Include list of allottees, consideration details and resolutions. Ensure authorised capital adequacy and supporting documents.
                                    </p>
                                </li>
                                <li>
                                    <strong>SH-7 (Change in Authorised Share Capital)</strong>
                                    <p>
                                        File when increasing or reclassifying authorised capital before issuing new shares. Pass the necessary resolution, amend MOA and pay prescribed fees.
                                    </p>
                                </li>
                                <li>
                                    <strong>CHG-1 / CHG-4 (Charges on Assets)</strong>
                                    <p>
                                        Use CHG-1 to register creation or modification of a charge within timelines. File CHG-4 upon satisfaction. Coordinate with lenders to avoid delays.
                                    </p>
                                </li>
                                <li>
                                    <strong>INC-22 (Change in Registered Office)</strong>
                                    <p>
                                        Notify change of registered office with supporting proofs like utility bills and NOC. Update letterheads, bank, GST and other licenses in sync.
                                    </p>
                                </li>
                                <li>
                                    <strong>MGT-14 (Certain Resolutions or Agreements)</strong>
                                    <p>
                                        File specified Board or Member resolutions where required by the Act. Timely filing prevents penalties.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-12 (Director or KMP Changes)</strong>
                                    <p>
                                        Intimate appointments, resignations or changes in designation of directors or KMP promptly. Attach resignation letters, consents and resolutions. Sync changes with registers and disclose in the next annual return.
                                    </p>
                                </li>
                                <li>
                                    <strong>NDH-2 / NDH-4 (Nidhi-Specific)</strong>
                                    <p>
                                        Use NDH-2 to seek extension if eligibility norms are not met in time. NDH-4 is used for declaration or registration as a Nidhi at onboarding. Monitor these to safeguard Nidhi recognition.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Illustrative Calendar (Nidhi) */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>Illustrative RoC Calendar for Nidhi (FY 2025–26)</h3>
                            <p className="muted">These dates are indicative and assume AGM on 30 September 2025. Re-compute from your actual AGM or FY dates.</p>
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
                                            <td>DPT-3</td>
                                            <td>Return of Deposits and Exempt Borrowings</td>
                                            <td>30 June</td>
                                        </tr>
                                        <tr>
                                            <td>NDH-3</td>
                                            <td>Half-yearly Nidhi return</td>
                                            <td>Apr 30, 2025 • Oct 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>DIR-3 KYC</td>
                                            <td>Director KYC filing</td>
                                            <td>Sep 30, 2025</td>
                                        </tr>
                                        <tr>
                                            <td>AGM</td>
                                            <td>Annual General Meeting</td>
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

                    {/* Documents Required (Nidhi) */}
                    <div className="content-row" style={{ marginTop: 50 }}>
                        <div className="content-col-full">
                            <h3>Documents Required (Core Set)</h3>
                            <ul>
                                <li>
                                    <strong>Audited Financials, Board’s Report, Auditor’s Report</strong>
                                    <p>
                                        Keep final, signed copies ready for AGM approval and AOC-4 filing. Ensure figures and notes reconcile with ledgers and returns.
                                    </p>
                                </li>
                                <li>
                                    <strong>DIR-3 KYC Proofs &amp; DSCs</strong>
                                    <p>
                                        Maintain PAN, identity or address proofs for each director and secure valid DSCs for signatories. Renew expiring DSCs before the window.
                                    </p>
                                </li>
                                <li>
                                    <strong>Statutory Registers &amp; Minutes</strong>
                                    <p>
                                        Update registers of members, directors or KMP, charges and transfers regularly, along with deposit records as per Nidhi Rules. Keep minutes page-numbered, signed and cross-referenced.
                                    </p>
                                </li>
                                <li>
                                    <strong>Supporting Papers for Specific Forms</strong>
                                    <p>
                                        Collate proofs for NDH-3, NDH-4, and other forms like PAS-3, SH-7, CHG-1 or CHG-4, MGT-14. Label annexures clearly to match form fields.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* ---------- CONTENT END ---------- */}
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
                                    "Skip costly late fees and status risks from delayed NDH and annual filings.",
                            },
                            {

                                title: "Better Credibility",
                                desc:
                                    "Clean MCA and NDH records help with banking relationships and regulatory reviews.",
                            },
                            {

                                title: "Operational Confidence",
                                desc:
                                    "Proper minutes, registers and prudential compliance reduce exposure and improve decisions.",
                            },
                            {

                                title: "Regulatory Confidence",
                                desc:
                                    "Transparent filings and timely responses improve confidence with auditors and authorities.",
                            },
                            {

                                title: "Faster Onboarding",
                                desc:
                                    "Vendors and partners often ask for MCA acknowledgements. Being compliant cuts delays.",
                            },
                            {

                                title: "Member Trust & Audit Readiness",
                                desc:
                                    "Clear deposit records and NDH returns reassure members and ease inspections.",
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

                {/* Rekotax | Our Approach (Card Layout) – MUI Box version (updated for Nidhi Company) */}
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
                                    Build an annual calendar from the last AGM and map every requirement -
                                    NDH-3 (half-yearly), AOC-4, MGT-7/7A, ADT-1, DIR-3 KYC, DPT-3, MSME-1
                                    - plus onboarding or exception items like NDH-4 (declaration as Nidhi)
                                    and event-based triggers (PAS-3, SH-7, CHG-1/4, INC-22, MGT-14,
                                    DIR-12) with clear owners and dates.
                                </p>
                            </article>

                            {/* 2. Prepare */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 2</span>
                                <div className="rk-icon">🗂️</div>
                                <h3>Prepare</h3>
                                <p>
                                    Collate audited financials, statutory registers, minutes, and
                                    supporting proofs; reconcile figures so attachments align perfectly
                                    with AOC-4, MGT-7/7A, DPT-3 and NDH forms. Keep MBP-1, DIR-8 and DSCs
                                    ready for sign-off.
                                </p>
                            </article>

                            {/* 3. Review */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 3</span>
                                <div className="rk-icon">🔍</div>
                                <h3>Review</h3>
                                <p>
                                    Conduct CA/CS checks for accuracy, applicability and annexures; verify
                                    NOF, membership counts and prudential ratios under Nidhi Rules.
                                    Resolve discrepancies before filing to avoid resubmissions and late
                                    fees.
                                </p>
                            </article>

                            {/* 4. File */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 4</span>
                                <div className="rk-icon">⚙️</div>
                                <h3>File</h3>
                                <p>
                                    E-file on the MCA portal with valid DSCs, pay statutory fees, and
                                    address any resubmission remarks until acknowledgements (SRNs) are
                                    issued for AOC-4, MGT-7/7A, ADT-1, DPT-3 and NDH returns.
                                </p>
                            </article>

                            {/* 5. Archive */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 5</span>
                                <div className="rk-icon">📑</div>
                                <h3>Archive</h3>
                                <p>
                                    Share challans and SRNs, update registers and minutes, and maintain a
                                    structured, audit-ready trail. Keep NDH, AGM and Board packs organized
                                    for diligence, inspections and banking or CSR partner reviews.
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
                                q: "What is annual compliance for a Nidhi Company in India?",
                                a: "It is the set of statutory requirements for a Nidhi incorporated as a Public Limited Company under the Companies Act, 2013 and governed by the Nidhi Rules, 2014—covering Board/AGM meetings, audited financials (AOC-4), annual return (MGT-7/7A), ADT-1, DIR-3 KYC, DPT-3, MSME-1 (if applicable), NDH-3 (after recognition), and maintenance of registers/minutes including deposit records."
                            },
                            {
                                q: "Do we need to file AOC-4 and MGT-7/7A even with zero revenue?",
                                a: "Yes. All active Nidhi Public Companies must file annual financial statements and the annual return irrespective of turnover or activity. Non-filing can trigger additional fees, show-cause notices, and compliance risks."
                            },
                            {
                                q: "How are AOC-4, MGT-7/7A, and ADT-1 due dates calculated?",
                                a: "They are linked to your AGM date: AOC-4 within 30 days, MGT-7/7A within 60 days, and ADT-1 within 15 days of the AGM. If the AGM date shifts, these windows shift accordingly."
                            },
                            {
                                q: "What is DIR-3 KYC and what happens if we miss it?",
                                a: "Annual KYC for each director (DIN holder), typically due by 30 September. Missing it deactivates the DIN; a fixed late fee applies for reactivation—file immediately to restore status."
                            },
                            {
                                q: "What is DPT-3 and who must file it for a Nidhi?",
                                a: "DPT-3 reports deposits and exempt borrowings outstanding as on 31 March and is generally due by 30 June. Nidhis also file DPT-3, classifying member deposits per the Rules and reporting other exempt borrowings where relevant."
                            },
                            {
                                q: "What is MSME-1 and when is it applicable to a Nidhi?",
                                a: "A half-yearly return (due April 30 and October 31) reporting dues to registered MSME vendors outstanding beyond 45 days—applicable where your vendors qualify and the threshold is breached."
                            },
                            {
                                q: "What are event-based compliances for a Nidhi Company?",
                                a: "Filings triggered by actions such as PAS-3 (allotment), SH-7 (authorised capital changes), CHG-1/CHG-4 (charges), INC-22 (registered office change), MGT-14 (specified resolutions), DIR-12 (director changes), and BEN-2 (SBO). NDH-4 is an onboarding declaration, not a change filing."
                            },
                            {
                                q: "What statutory registers and records must a Nidhi maintain?",
                                a: "Registers of Members, Directors/KMP, Charges, Transfers, and deposit-related registers mandated by Nidhi Rules; plus minutes of Board/Committee/AGM. Maintain physically or electronically with proper authentication and inspection access."
                            },
                            {
                                q: "What happens if we miss an MCA/RoC deadline?",
                                a: "Late filings usually attract additional fees and may lead to penalties, DIN deactivation for DIR-3 KYC lapses, and regulator notices. Chronic delays can escalate to director disqualification or strike-off."
                            },
                            {
                                q: "Can a Nidhi change its registered office and what must be filed?",
                                a: "Yes. File INC-22 within prescribed timelines with proofs (utility bill, title/lease, owner’s NOC). Inter-ROC/interstate moves may need additional approvals. Update stationery, bank, GST, and licenses."
                            },
                            {
                                q: "Who appoints the first auditor and how is it recorded for a Nidhi?",
                                a: "The Board appoints the first statutory auditor within 30 days of incorporation; otherwise members within the next 90 days. Keep consent/eligibility, minute the decision, and file ADT-1 post-AGM for ongoing appointments."
                            },
                            {
                                q: "Is a Secretarial Audit required for all Nidhi Companies?",
                                a: "No. MR-3 applies to specified classes per thresholds. Many smaller Nidhis are exempt, but all must maintain proper registers, minutes, disclosures, and NDH returns."
                            },
                            {
                                q: "What are NDH-3 and NDH-4 and how do they apply?",
                                a: "NDH-4 is the application for declaration as a Nidhi, filed within 120 days of incorporation after meeting eligibility (e.g., 200 members and ₹20 lakh NOF). After recognition, NDH-3 is filed half-yearly within 30 days of each half-year end."
                            },
                            {
                                q: "How should a Nidhi prepare for the AGM?",
                                a: "Issue AGM notice with agenda/explanatory statements on time; finalize audited financials and the Board’s Report; ensure deposit registers and NDH data are updated; arrange venue/virtual logistics; and file post-AGM forms within due dates."
                            },
                            {
                                q: "Do Nidhi Companies get any compliance relaxations like small companies?",
                                a: "No. A Nidhi is a Public Limited Company, so small company relaxations don’t apply. Nidhi-specific provisions and exemptions under the Nidhi Rules, 2014 may apply—verify current applicability."
                            },
                            {
                                q: "What documents are needed for annual filings of a Nidhi?",
                                a: "Audited financial statements, Board’s Report, Auditor’s Report, updated registers/minutes, NDH-3 data, and supporting papers for DPT-3, MSME-1, PAS-3, SH-7, CHG-1/4, MGT-14 (as applicable). Ensure valid DSCs for signatories."
                            },
                            {
                                q: "How do clean RoC and NDH records help with banking and regulators?",
                                a: "Timely, accurate filings with consistent NDH-3 data and well-maintained registers enhance credibility, speed vendor onboarding and due diligence, and reduce perceived risk with lenders and authorities."
                            },
                            {
                                q: "Can a Nidhi maintain statutory registers electronically?",
                                a: "Yes—if entries are accurate, authenticated, and inspection-ready. Use secure digital registers with backups and authorization trails."
                            },
                            {
                                q: "What common mistakes cause resubmission of forms for a Nidhi?",
                                a: "Mismatched figures across statements and NDH-3, missing annexures, expired DSCs, incorrect resolution references, and inconsistent dates. A CA/CS pre-check and documentation checklist reduce resubmissions."
                            },
                            {
                                q: "Can a compliance partner manage everything end to end for a Nidhi?",
                                a: "Yes. A CA/CS-led team can map your calendar, set up NDH workflows, prepare documents, e-file forms, share SRNs/challans, and maintain an audit-ready archive—so you stay compliant without operational strain."
                            }
                        ].map(({ q, a }, idx) => {
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
