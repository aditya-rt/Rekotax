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
            sx={{ color: "#0f2555", fontWeight: 500, mb: 1.5, fontSize: "1.5rem" }}
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

export default function LutRegistration({ webAppUrl }) {
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
                            Expert LUT Registration Services in India
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
                        Fast, Accurate, and Hassle-free LUT Registration
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
                        LUT Registration allows exporters to supply goods or services without upfront IGST payment, ensuring better cash flow and global competitiveness. At Rekotax, we simplify the entire filing process so you can expand internationally while we handle the compliances.
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
                            "Typical approvals: 1-3 days*",
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
                        fontWeight: 600,
                        mb: 4,
                        mt: 2,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Know All About LUT Registration
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
                            What is LUT Registration?
                        </Typography>
                        {/* Para 1 */}
                        <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
                            A <strong>Letter of Undertaking (LUT)</strong> is a document that allows exporters to supply <br />
                            goods or services <strong>without paying IGST upfront</strong>. It is filed with the GST <br />
                            department to ensure smooth export operations and better <strong>working capital <br /> management</strong>.
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
                                    fontWeight: 500,
                                    color: "#0f2555",
                                    fontSize: { xs: "1.6rem", md: "2rem" },
                                    textAlign: "center",
                                    mb: 2.5,
                                    lineHeight: 1.2,
                                    textWrap: "balance",
                                }}
                            >
                                Key Features of LUT Registration
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
                                    Valid for <strong>one financial year</strong> and must be renewed annually
                                </li>
                                <li>
                                    Can be filed <strong>online via GST portal</strong> with minimal documents
                                </li>
                                <li>
                                    Applicable for <strong>zero-rated supplies</strong> including exports and SEZ sales
                                </li>
                                <li>
                                    Eliminates the need for <strong>tax refund claims</strong> after export
                                </li>
                                <li>
                                    Mandatory for businesses with <strong>clean compliance history</strong>
                                </li>
                            </Box>
                        </Box>



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
                        Who Can Apply for LUT?                    </Typography>

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
                            { title: "Exporters of Goods", desc: "Businesses engaged in exporting goods directly or through third parties." },
                            { title: "Exporters of Services", desc: "Service providers who supply services outside India under GST law." },
                            { title: "SEZ Supplies", desc: "Suppliers making zero-rated supplies to Special Economic Zones (SEZs)." },
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
                                    <Typography variant="h6" sx={{ fontWeight: 500, color: "#0f2555", mb: 1 }}>
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
                        Why Should You File LUT?                    </Typography>

                    <Typography sx={{ mb: 5, color: "#444" }}>
                        Filing an <strong>LUT</strong> is not just a compliance formality,
                        it gives exporters a <strong>strategic edge</strong> by freeing up funds and
                        ensuring global trade runs smoothly. Instead of paying IGST and waiting for refunds, LUT helps you operate with ease and efficiency.
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
                            { title: "No Upfront Tax", desc: "Export without paying IGST upfront and save working capital." },
                            { title: "Improved Liquidity", desc: "Avoid funds getting blocked in refunds and keep cash flow smooth." },
                            { title: "Faster Operations", desc: "Seamless export process with reduced compliance delays." },
                            { title: "Global Competitiveness", desc: "Boost your international trade with tax-free export compliance." },
                            { title: "Annual Validity", desc: "A single LUT is valid for the entire financial year, making compliance easier." },
                            { title: "Hassle-Free Refunds", desc: "Avoid lengthy refund claims and enjoy direct export benefits." }
                        ]
                            .map((card) => (
                                <Box key={card.title} sx={{ display: "flex", fontWeight: 500 }}>
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
                            fontWeight: 600,
                            color: "#0f2555",
                            mb: 6,
                        }}
                    >
                        Simplified Process for LUT Registration
                    </Typography>

                    {(() => {
                        const steps = [
                            {
                                number: "1",
                                title: "Login to GST Portal",
                                desc:
                                    "Visit the official GST portal and log in using your valid credentials (username and password) to access your dashboard.",
                            },
                            {
                                number: "2",
                                title: "Navigate to Services Tab",
                                desc:
                                    "On the dashboard, go to the 'Services' tab, select 'User Services,' and then click on 'Furnish Letter of Undertaking (LUT).'",
                            },
                            {
                                number: "3",
                                title: "Select Financial Year",
                                desc:
                                    "Choose the financial year for which you want to file the LUT. If you have a previously filed LUT, you can view it here.",
                            },
                            {
                                number: "4",
                                title: "Fill Form GST RFD-11",
                                desc:
                                    "Fill in the required details in the online form. You will need to provide details of two independent witnesses and self-declare the undertaking.",
                            },
                            {
                                number: "5",
                                title: "Sign and Submit",
                                desc:
                                    "Review the form carefully and submit it using either a Digital Signature Certificate (DSC) or an Electronic Verification Code (EVC).",
                            },
                            {
                                number: "6",
                                title: "Download Acknowledgment",
                                desc:
                                    "Once submitted, an Application Reference Number (ARN) will be generated. You can download the acknowledgment for your records.",
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
                                                    fontWeight: 600,
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
                        py: { xs: 6, md: 10 },
                        fontFamily: "'Open Sans', sans-serif",
                        color: "#333",
                        lineHeight: 1.7,
                        backgroundColor: "#fff",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2rem", md: "2.5rem" },
                            fontWeight: 600,
                            textAlign: "center",
                            color: "#0f2555",
                            mb: 4,
                        }}
                    >
                        LUT Registration Under GST - A Complete Guide for Exporters
                    </Typography>

                    {/* Introduction to LUT Registration */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Introduction to LUT Registration
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        For businesses engaged in international trade, managing cash flow is critical. The Goods and Services Tax (GST) regime
                        provides a powerful tool for exporters called the <strong>Letter of Undertaking (LUT)</strong>. This facility allows
                        businesses to export goods or services without paying the Integrated GST (IGST) upfront, preventing working capital from
                        being blocked in refunds.
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        Filing an LUT is a crucial compliance step for exporters seeking to optimize financial operations and gain a competitive
                        edge globally. At <strong>Rekotax</strong>, we simplify the LUT registration process so your export operations remain
                        smooth, compliant, and efficient.
                    </Typography>

                    {/* What is a Letter of Undertaking (LUT)? */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        What is a Letter of Undertaking (LUT)?
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        A Letter of Undertaking (LUT) is submitted under <strong>Form GST RFD-11</strong> by an exporter on the GST portal. By
                        filing an LUT, the exporter undertakes to follow GST rules - either export the goods or services within the prescribed
                        time or pay IGST with interest if they fail to do so. It effectively functions like a waiver from furnishing a bond for
                        zero-rated exports without immediate tax payment.
                    </Typography>

                    {/* Who should file for LUT */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Who Should File for LUT Registration?
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>LUT registration is intended for any GST-registered taxpayer who exports goods or services, including:</Typography>
                    <ul>
                        <li>
                            <strong>Exporters of Goods:</strong> Businesses shipping products to countries outside India.
                        </li>
                        <li>
                            <strong>Exporters of Services:</strong> Professionals and companies providing services to clients located abroad.
                        </li>
                        <li>
                            <strong>Suppliers to Special Economic Zones (SEZs):</strong> Supplies to SEZ units or developers are treated as zero-rated.
                        </li>
                    </ul>
                    <Typography sx={{ mb: 4 }}>
                        In short, any business making <strong>zero-rated supplies</strong> can opt for LUT to avoid the pay-and-refund cycle.
                    </Typography>

                    {/* Eligibility criteria */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Eligibility Criteria for Filing an LUT
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>To use the LUT facility, the applicant must:</Typography>
                    <ul>
                        <li>Be registered under GST.</li>
                        <li>
                            Not have been prosecuted for any offence under the CGST Act or any other existing law where the tax evaded exceeds{" "}
                            <strong>₹250 lakhs</strong>.
                        </li>
                    </ul>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        If these conditions are not met, the exporter must furnish an <strong>export bond</strong> with a bank guarantee to export
                        without payment of IGST.
                    </Typography>

                    {/* Benefits */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Benefits of LUT Registration
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        <ul >
                            <li>
                                <strong>Improved Working Capital:</strong> No upfront IGST payment keeps funds available for core operations.
                            </li>
                            <li>
                                <strong>Simplified Compliance:</strong> Skips the lengthy refund process otherwise required after export.
                            </li>
                            <li>
                                <strong>Annual Validity:</strong> One LUT remains valid for the entire financial year.
                            </li>
                            <li>
                                <strong>Enhanced Global Competitiveness:</strong> Better liquidity and lower costs help you price competitively.
                            </li>
                            <li>
                                <strong>Hassle-Free Exports:</strong> Fully online, quick, and transparent filing.
                            </li>
                        </ul>
                    </Typography>

                    {/* Documents required */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Documents Required for LUT Registration
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        <ul>
                            <li>
                                <strong>GST portal login credentials</strong> for the taxpayer.
                            </li>
                            <li>
                                <strong>Details of two independent witnesses</strong> (name, occupation, address).
                            </li>
                            <li>
                                <strong>Digital Signature Certificate (DSC)</strong> for companies or LLPs, or <strong>EVC</strong> verification via OTP for others.
                            </li>
                        </ul>
                    </Typography>
                    {/* Step-by-step process */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Step-by-Step Process for LUT Registration
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        <ol>
                            <li>
                                <strong>Login to GST Portal:</strong> Use official credentials to access your dashboard.
                            </li>
                            <li>
                                <strong>Navigate to LUT Application:</strong> Go to Services - User Services - Furnish Letter of Undertaking (LUT).
                            </li>
                            <li>
                                <strong>Select Financial Year:</strong> Choose the year for which the LUT is being filed.
                            </li>
                            <li>
                                <strong>Fill Form GST RFD-11:</strong> Tick the self-declarations and provide witness details.
                            </li>
                            <li>
                                <strong>Sign and Submit:</strong> Sign with DSC or EVC to complete submission.
                            </li>
                            <li>
                                <strong>Download Acknowledgment:</strong> An ARN is generated instantly for your records.
                            </li>
                        </ol>
                    </Typography>
                    {/* Consequences */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Consequences of Non-Compliance
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        If an exporter files an LUT but fails to meet conditions (for example, export not completed within three months or payment
                        for services not received within one year), the LUT facility can be revoked. In such cases, the exporter must:
                    </Typography>
                    <ul>
                        <li>
                            Pay applicable IGST along with <strong>18% interest</strong>.
                        </li>
                        <li>Furnish an export bond for future exports.</li>
                    </ul>

                    {/* How Rekotax helps */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        How Rekotax Can Help You
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        <ul>
                            <li>
                                <strong>End-to-end assistance:</strong> Eligibility check, filing, and acknowledgment download.
                            </li>
                            <li>
                                <strong>Error-free filing:</strong> Accurate details for smooth, instant submission.
                            </li>
                            <li>
                                <strong>Timely renewals:</strong> Reminders and filing before every financial year.
                            </li>
                            <li>
                                <strong>Expert GST advisory:</strong> Complete support for ongoing GST compliance.
                            </li>
                        </ul>
                    </Typography>
                    {/* Conclusion */}
                    <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 500, fontSize: "25px", mb: 2, mt: 4 }}>
                        Conclusion
                    </Typography>
                    <Typography sx={{
                        color: "#333", // or theme.palette.text.primary
                        fontWeight: 400, // normal weight, not 200
                        fontSize: "1.05rem", // adjust size for comfortable reading
                        lineHeight: 1.8,
                        mb: 2,
                    }}>
                        The Letter of Undertaking is an indispensable tool for Indian exporters, improving liquidity and simplifying compliance so
                        you can focus on growth instead of refunds and delays.
                    </Typography>
                    <Typography>
                        At <strong>Rekotax</strong>, we make LUT filing simple and reliable. Contact us to file your LUT quickly and correctly and
                        unlock the full potential of your export business.
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
                            LUT Registration FAQs
                        </Typography>
                        {[
                            {
                                q: "What is a Letter of Undertaking (LUT) in GST?",
                                a: "An LUT (filed in Form GST RFD-11) lets exporters supply goods or services without paying IGST upfront, subject to complying with GST export conditions."
                            },
                            {
                                q: "Who is eligible to file an LUT for exports?",
                                a: "Any GST-registered exporter of goods or services, including suppliers to SEZ units/developers, provided they have not been prosecuted for tax evasion exceeding ₹250 lakhs."
                            },
                            {
                                q: "What are the main benefits of filing an LUT?",
                                a: "Better working capital, simpler compliance by avoiding refund claims, fully online process, and improved global competitiveness."
                            },
                            {
                                q: "Is it mandatory to file an LUT for all exports?",
                                a: "No. Zero-rated exports can be done by filing an LUT (no IGST upfront) or by paying IGST and claiming a refund later. Most exporters prefer the LUT route."
                            },
                            {
                                q: "What is the validity of an LUT?",
                                a: "One financial year. You must file a fresh LUT for each new financial year."
                            },
                            {
                                q: "What documents are required for LUT registration?",
                                a: "GST portal login, details of two independent witnesses (name, address, occupation), and DSC for companies/LLPs or EVC (OTP) for others."
                            },
                            {
                                q: "What is the difference between an LUT and a Bond?",
                                a: "LUT is a simple undertaking available to eligible exporters. A Bond with bank guarantee is required if the exporter is not eligible for an LUT (e.g., past prosecution over ₹250 lakhs)."
                            },
                            {
                                q: "What happens if I fail to export after filing an LUT?",
                                a: "You must pay IGST with interest at 18% per annum. The LUT facility may be revoked and a bond may be required for future exports."
                            },
                            {
                                q: "Can a single LUT cover multiple export shipments?",
                                a: "Yes. One LUT covers all export shipments made during the financial year for which it is filed."
                            },
                            {
                                q: "How can Rekotax help with LUT filing?",
                                a: "Rekotax handles end-to-end filing, ensures accurate submission, manages documentation, and reminds you for timely annual renewals."
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
