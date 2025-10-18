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

export default function CompilanceForEpfo({ webAppUrl, onSubmitted }) {
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
                        EPFO & ESIC Compliances in India


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
                        Your trusted partner for seamless Labour Law compliance with precision and punctuality.
                        <br />
                        From employee registrations to monthly contribution filings, we handle it end-to-end with expert oversight and proactive EPF/ESIC compliance alerts.
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
                    EPFO & ESIC Compliance (India)

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
                            What is Labour Law Compliance (EPFO & ESIC)?

                        </Typography>
                        <Typography sx={{ fontSize: "1rem", mb: 2 }}>
                            <strong> EPFO & ESIC compliance</strong>  EPFO & ESIC compliance means implementing employee <br />social security obligations
                            under the <strong>Employees' Provident Funds & <br /> Miscellaneous ProvisionsAct, 1952</strong> and
                            the <strong>Employees' State Insurance Act, 1948</strong> <br /> together withcurrent notifications
                            and portal procedures. It applies to establishments <br />that meet coverage
                            thresholds and to eligible employees based on prescribed wage definitions.


                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography>
                            In practice, this involves registration and KYC (employer code and sub‑codes where <br />
                            needed), monthly filings (EPF ECR upload and challan payment, ESIC contribution<br />
                            statement and challan), member life‑cycle events (UAN/IP creation, transfers,<br />
                            exits, KYC fixes), and record keeping & inspections (registers, returns, <br />
                            reconciliations, and replies).
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
                        Why is EPFO & ESIC Compliance Necessary?
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
                            { title: "Employee Protection", desc: "Ensures retirement savings, insurance and medical benefits are available to the workforce." },
                            { title: "Avoids Interest & Damages", desc: "Timely filings reduce exposure to statutory interest, damages and penalties on delays." },
                            { title: "Banking & Claims Continuity", desc: " Clean challans and acknowledgements enable smooth settlements and employee claims." },
                            { title: "Vendor & Multi‑state Governance", desc: " Monitoring contractor coverage and obtaining sub‑codes prevents principal employer risk as you scale across locations." },


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

                    {/* EPF/ESIC Compliances (India) */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>EPF (EPFO) and ESIC Compliances (India)</h3>
                            <ul>
                                <li>
                                    <strong>Check Applicability and Coverage</strong>
                                    <p>
                                        Determine whether your establishment meets the employee threshold for EPF (typically 20 or more) and ESIC
                                        (typically 10 or more in notified areas). Identify covered employees based on PF wages (Basic plus DA) and ESI
                                        wage threshold. Applicability drives registration, form selection and timelines.
                                    </p>
                                </li>

                                <li>
                                    <strong>Establishment Registration and KYC</strong>
                                    <p>
                                        Obtain EPFO and ESIC employer codes, map authorised signatories, and complete bank KYC. Maintain a clear
                                        repository of incorporation documents, PAN, address proof and signatory DSC for seamless portal access and filings.
                                    </p>
                                </li>

                                <li>
                                    <strong>Monthly Payroll Mapping and Filings</strong>
                                    <p>
                                        Configure salary structures correctly (PF wage base and ESI gross), generate EPF ECR files and ESIC monthly
                                        contribution statements, and pay challans on time. Reconcile payroll with contributions and ledgers monthly to stay
                                        audit ready.
                                    </p>
                                </li>

                                <li>
                                    <strong>Employee Life-cycle Events</strong>
                                    <p>
                                        Handle UAN/IP creation for joinees, transfers in or out, exits and KYC corrections. Track ESI threshold movement
                                        and apply exit after the contribution period when employees cross the wage limit. Preserve acknowledgements and
                                        member-wise records.
                                    </p>
                                </li>

                                <li>
                                    <strong>Inspections, Notices and Records</strong>
                                    <p>
                                        Maintain statutory registers, challans, returns and inspection correspondence. Respond to notices with
                                        reconciliations and proofs. Keep contractor compliance monitored to mitigate principal employer exposure.
                                    </p>
                                </li>

                                <li>
                                    <strong>Annual and Periodic Returns</strong>
                                    <p>
                                        Submit applicable annual or half-yearly returns as notified. Keep calendars, owners and backups to avoid delays.
                                        Align books, registers and portal data to ensure consistency for diligence and reviews.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <section id="rk-roc-cta" aria-label="Done-for-you EPF and ESIC compliance plan">
                        <div className="cta-wrap">
                            <h3>Unsure what applies for your team size and states?</h3>
                            <p>Book a 10 minute clarity call. We will map applicability, contribution rates, forms and due dates.</p>
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

                    {/* Key Pillars */}
                    <div className="content-row">
                        <div className="content-col-full">
                            <h3>Key Pillars of EPF and ESIC Compliance</h3>
                            <ul>
                                <li>
                                    <strong>Correct Classification</strong>
                                    <p>
                                        Define covered employees, PF wage base (Basic plus DA) and ESI gross. Confirm establishment type and locations to
                                        determine sub-codes and inspectorate jurisdiction. Proper scoping prevents rework and delays.
                                    </p>
                                </li>
                                <li>
                                    <strong>Banking Trail and Challans</strong>
                                    <p>
                                        Ensure challans match payroll and contribution statements. Maintain UTR, bank proofs and portal acknowledgements.
                                        Clean trails simplify inspections and refunds or adjustments if required.
                                    </p>
                                </li>
                                <li>
                                    <strong>Portal Reporting Discipline</strong>
                                    <p>
                                        Use EPFO Unified Portal for ECR and member KYC, and the ESIC portal for contribution filing. Validate attachments
                                        and member details to avoid clarification cycles or rejections.
                                    </p>
                                </li>
                                <li>
                                    <strong>Contractor and Multi-state Coverage</strong>
                                    <p>
                                        Monitor contractor codes and challans, and obtain sub-codes for branches across states when required. Principal
                                        employer must track vendor compliance to mitigate cascading risk.
                                    </p>
                                </li>
                                <li>
                                    <strong>Documentation and Governance</strong>
                                    <p>
                                        Maintain wage registers, muster rolls, contribution summaries, inspection notes and board authorisations. Keep
                                        internal records aligned with what is reported on portals and in books.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* What You Must Track */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>What You Must Track (Core EPF and ESIC Items)</h3>
                            <ul>
                                <li>
                                    <strong>Employee Counts and Thresholds</strong>
                                    <p>
                                        Track headcount against EPF and ESIC applicability. For ESI, also confirm the area is notified and employees are
                                        within the wage threshold during the contribution period.
                                    </p>
                                </li>
                                <li>
                                    <strong>Member-wise Contributions</strong>
                                    <p>
                                        Maintain UAN/IP wise records of wages, contributions and challans. Reconcile with payroll and ledgers monthly. Keep
                                        corrections documented with proofs.
                                    </p>
                                </li>
                                <li>
                                    <strong>Joinees and Exits</strong>
                                    <p>
                                        Generate UAN/IP for joinees in time and process exits with proper last working day and wage closure. Update KYC and
                                        dependency records where applicable.
                                    </p>
                                </li>
                                <li>
                                    <strong>Inspections and Clarifications</strong>
                                    <p>
                                        Respond with reconciliations, member data and proof of payment. Maintain a tracker of notices, due dates and
                                        submissions to stay compliant end to end.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Event-Based Compliances */}
                    <div className="content-row" style={{ marginTop: 6 }}>
                        <div className="content-col-full">
                            <h3>Event Based EPF and ESIC Compliances</h3>
                            <ul>
                                <li>
                                    <strong>EPF ECR and Challan (Monthly)</strong>
                                    <p>
                                        Upload the ECR with member-wise PF wages, verify split between EPF and EPS, and generate challan. Pay on or before
                                        the statutory due date and archive bank proof and acknowledgement.
                                    </p>
                                </li>
                                <li>
                                    <strong>ESIC Contribution and Challan (Monthly)</strong>
                                    <p>
                                        File the monthly contribution statement for insured persons and pay the challan. Track threshold crossings and apply
                                        exit after the contribution period when wages exceed the limit.
                                    </p>
                                </li>
                                <li>
                                    <strong>Member KYC/Name Corrections</strong>
                                    <p>
                                        Rectify member details with documentary evidence to avoid claim delays. Sync PAN/Aadhaar and bank details for
                                        seamless settlements.
                                    </p>
                                </li>
                                <li>
                                    <strong>Sub-codes and Branch Additions</strong>
                                    <p>
                                        Obtain sub-codes for new branches or states as required and map employees accordingly. Keep inspectorate communication
                                        and approvals on file.
                                    </p>
                                </li>
                                <li>
                                    <strong>Contractor On-boarding</strong>
                                    <p>
                                        Collect contractor code details and monthly challans. Verify coverage, especially where large headcount is through
                                        vendors, to prevent principal employer liability.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Illustrative Calendar */}
                    <div className="content-row" style={{ marginTop: 10 }}>
                        <div className="content-col-full">
                            <h3>Illustrative EPF and ESIC Calendar (FY 2025–26)</h3>
                            <p className="muted">
                                Dates below are indicative for planning. Always compute from actual wage period and statutory notifications.
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
                                            <td>EPF ECR Filing and Payment</td>
                                            <td>Member-wise PF wages and contributions</td>
                                            <td>On or before 15th of following month</td>
                                        </tr>
                                        <tr>
                                            <td>ESIC Contribution and Challan</td>
                                            <td>Monthly insured person contributions</td>
                                            <td>On or before 15th of following month</td>
                                        </tr>
                                        <tr>
                                            <td>Half-Yearly ESIC Return</td>
                                            <td>Aggregate contributions for the period</td>
                                            <td>As notified</td>
                                        </tr>
                                        <tr>
                                            <td>Annual EPF Statements/Returns</td>
                                            <td>As applicable by notification</td>
                                            <td>Within statutory timeline</td>
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
                                    <strong>Entity and Signatory</strong>
                                    <p>
                                        Incorporation certificate, PAN, address proof, bank cancelled cheque, authorised signatory KYC and DSC. Store in a
                                        central repository for filings.
                                    </p>
                                </li>
                                <li>
                                    <strong>Payroll and Member Master</strong>
                                    <p>
                                        Employee list with UAN/IP, wage structure, join/exit dates, and monthly payroll. Validate before ECR or contribution
                                        uploads.
                                    </p>
                                </li>
                                <li>
                                    <strong>Challans, Returns and Acks</strong>
                                    <p>
                                        Copies of ECR, ESIC statements, challans, bank proofs and portal acknowledgements. Keep reconciliations for inspections
                                        and audits.
                                    </p>
                                </li>
                                <li>
                                    <strong>Contractor Proofs</strong>
                                    <p>
                                        Contractor registration codes, monthly challans and member coverage evidence where applicable. Align with principal
                                        employer records.
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

                                title: "Avoid Damages and Interest",
                                desc: "Timely filings reduce exposure to damages and interest on delays."
                            },
                            {

                                title: "Audit Readiness",
                                desc: "Accurate registers and acknowledgements speed inspections and claims."
                            },
                            {

                                title: "Workforce Confidence",
                                desc: "Transparent contributions and KYC help employees access benefits faster"
                            },
                            {

                                title: "Vendor Governance",
                                desc: "Monitoring contractor coverage reduces principal employer risk."
                            },
                            {

                                title: "Multi‑state Scale",
                                desc: "Sub‑codes and standard processes enable compliant expansion."
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

                {/* Rekotax | Our Approach (Card Layout) – MUI Box version (EPF & ESIC) */}
                <Box
                    component="section"
                    id="rk-approach"
                    aria-label="Our Approach to EPF and ESIC Compliance"
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
                                    A five-step, CA/CS-led process that makes EPF and ESIC compliance effortless and reliable.
                                </p>
                            </div>
                        </div>

                        <div className="rk-grid" role="list">
                            {/* 1. Plan */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 1</span>
                                <div className="rk-icon">📅</div>
                                <h3>Plan</h3>
                                <p>Set timelines, responsibilities, and checkpoints for stress-free compliance.</p>
                            </article>

                            {/* 2. Prepare */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 2</span>
                                <div className="rk-icon">🗂️</div>
                                <h3>Prepare</h3>
                                <p>Keep data accurate and ready, so every filing is smooth and error-free.</p>
                            </article>

                            {/* 3. Review */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 3</span>
                                <div className="rk-icon">🔍</div>
                                <h3>Review</h3>
                                <p>Double-check everything to prevent compliance issues or inspection risks.</p>
                            </article>

                            {/* 4. File */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 4</span>
                                <div className="rk-icon">⚙️</div>
                                <h3>File</h3>
                                <p>Submit filings on time, ensuring continuity and peace of mind.</p>
                            </article>

                            {/* 5. Archive */}
                            <article className="rk-card" role="listitem">
                                <span className="rk-badge">Step 5</span>
                                <div className="rk-icon">📑</div>
                                <h3>Archive</h3>
                                <p>Store records securely for quick access during audits or claims.</p>
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
                                q: "What is EPFO and who needs to register for EPF?",
                                a: "EPFO administers provident fund, pension (EPS) and insurance. An establishment is typically liable when employee strength reaches the prescribed threshold (commonly 20). Once covered, eligible employees must be enrolled and contributions paid as per law."
                            },
                            {
                                q: "What is ESIC and when does ESI coverage apply?",
                                a: "ESIC provides medical and cash benefits. Coverage usually applies when an establishment employs the prescribed minimum number of persons (commonly 10) in ESI-notified areas and employees fall within the notified wage threshold. Local notifications may vary."
                            },
                            {
                                q: "What are PF wages and the EPF wage ceiling?",
                                a: "PF wages generally mean Basic plus Dearness Allowance and eligible retaining allowances. A default wage ceiling is prescribed for EPF calculations. Employers may opt for higher coverage through policy and consent. Align salary structures with the EPF base to avoid under or over deduction."
                            },
                            {
                                q: "What is the ESIC wage threshold?",
                                a: "Employees drawing gross wages up to the notified monthly limit are typically covered. If wages exceed the limit during a contribution period, ESI normally continues until that period ends and exits thereafter, subject to rules."
                            },
                            {
                                q: "By when are EPF and ESIC challans due each month?",
                                a: "EPF ECR filing, EPF challan payment, and ESIC monthly contribution statements are generally due on or before the 15th of the following month. Check the latest portal instructions for any exceptions."
                            },
                            {
                                q: "What is a UAN and how is it used?",
                                a: "The Universal Account Number uniquely identifies an EPF member across employers, links multiple PF accounts, enables KYC, and allows employees to view contributions and claim benefits online. Accurate KYC prevents claim delays."
                            },
                            {
                                q: "What is an ESIC IP number?",
                                a: "An Insurance Person number uniquely identifies an employee covered under ESIC. It is used to access medical care and cash benefits such as sickness, maternity, disability and dependants’ benefits, subject to eligibility and contributions."
                            },
                            {
                                q: "What is an ECR and why is it important?",
                                a: "The Electronic Challan-cum-Return is the monthly EPF statement uploaded on the EPFO portal, listing member-wise wages and contribution split between EPF and EPS. Accurate ECRs ensure correct challans, prevent interest or damages, and support future claims."
                            },
                            {
                                q: "How should contractors be handled for EPF and ESI?",
                                a: "Principal employers must ensure contractors hold valid registrations and deposit contributions for deployed workers on time. Obtain contractor codes and challans, reconcile headcount, and keep proofs to mitigate principal employer liability."
                            },
                            {
                                q: "Do we need separate sub-codes for branches in other states?",
                                a: "Where operations span multiple locations, sub-codes may be required to manage local compliance, inspections, and employee mapping. Sub-codes improve reporting accuracy and claim servicing."
                            },
                            {
                                q: "What records should be maintained for EPF and ESIC?",
                                a: "Maintain employee masters with UAN and IP, wage registers, contribution statements, challans, returns, bank proofs, inspection correspondence, and contractor documentation. Consistent records support audits and benefit processing."
                            },
                            {
                                q: "What happens if we delay EPF or ESIC payments?",
                                a: "Delays may attract statutory interest, damages, or penalties under the respective Acts and notifications. Timely filing and payment with regular reconciliations minimize exposure and protect employee benefits."
                            },
                            {
                                q: "How do EPF and EPS contributions differ?",
                                a: "Employer contributions are apportioned between the Provident Fund and the Pension Scheme as per rules and wage ceilings. The correct split in ECR ensures accurate pensionable service and future benefits."
                            },
                            {
                                q: "Can an establishment opt for voluntary EPF coverage below the threshold?",
                                a: "Voluntary coverage may be available with employer and employee consent and subject to EPFO approval. Once opted in, the establishment must comply with regular contribution and filing requirements."
                            },
                            {
                                q: "What if employee details such as name, KYC, or bank are incorrect?",
                                a: "Prompt KYC and master data corrections prevent claim rejections and settlement delays. Align PAN, Aadhaar, and bank details with portal records and retain supporting proofs for audit trails."
                            },
                            {
                                q: "How are ESIC benefits accessed by employees?",
                                a: "Insured persons use their IP number to access ESIC network hospitals and dispensaries. Subject to contribution and eligibility, benefits include medical, sickness, maternity, disablement, and dependants’ benefits."
                            },
                            {
                                q: "How do we treat new joinees and exits for EPF and ESIC?",
                                a: "Create or map UAN and IP for joinees promptly. Process exits with accurate last working day and wage details. Keep acknowledgements to enable smooth future claims and inspections."
                            },
                            {
                                q: "How do we manage employees who cross the ESIC wage limit mid-period?",
                                a: "If wages exceed the threshold during a contribution period, contributions typically continue until the period ends, after which the employee may exit ESIC coverage, subject to rules and notifications."
                            },
                            {
                                q: "How do inspections work and how can we stay audit-ready?",
                                a: "Inspecting officers may review registers, challans, returns, contractor compliance, and employee records. Regular reconciliations, document control, and timely responses keep establishments inspection-ready."
                            },
                            {
                                q: "Can we get expert help to manage EPF and ESIC end-to-end?",
                                a: "Yes. A specialist partner can plan applicability, streamline payroll mappings, file monthly returns, and maintain records, reducing risk and ensuring employees receive benefits without delays."
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
