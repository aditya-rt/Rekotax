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
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

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

export default function EightyG({ webAppUrl }) {
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
              Expert GST Registration Services in India
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
         12A/80G Registration 
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
Register your Proprietorsip with Rekotax — experience fast setup, full legal compliance, expert documentation, and dedicated support to launch your business effortlessly.         </Typography>
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
Know All About 12A & 80G Registration
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
What are 12A and 80G Registrations?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
             12A (now 12AB) registration grants income tax exemption to charitable or <br/>
             religious trusts, societies and Section 8 companies on their eligible income. <br/>
             80G registration enables donors to claim a deduction for donations made to<br/>
              your organisation, which improves fundraising and credibility.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
             Both registrations are applied online through the Income Tax e-filing portal using <br/>
             the prescribed forms and are subject to verification by the Exemptions wing. Orders <br/>
              specify the Unique Registration Number, effective date and validity.
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
                  fontSize: { xs: "1.6rem", md: "2rem" },
                  textAlign: "center",
                  mb: 2.5,
                  lineHeight: 1.2,
                  textWrap: "balance",
                }}
              >
Key Features of 12A & 80G Registration
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
12AB registration for exemption of income applied to charitable purposes
                </li>
                <li>
80G approval so donors can claim tax deduction on eligible donations
                </li>
                <li>
Online filing on the Income Tax portal with e-verification and document upload
                </li>
                <li>
Approvals issued with validity period and URN for compliance tracking
                </li>
                <li>
Periodic renewal or revalidation as per current rules
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
            Who is Eligible for 12A & 80G Registration?                </Typography>

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
    title: "Constitution",
    desc: (
      <>
        <strong>Public charitable or religious trust</strong>, <strong>society</strong>, or
        <strong> Section 8 company</strong> with valid registration under relevant law.
      </>
    ),
  },
  {
    title: "Objects & Activities",
    desc: (
      <>
        Objects must be <strong>charitable</strong> as per law. Activities should be genuine.
        No private benefit to founders or related parties.
      </>
    ),
  },
  {
    title: "Compliance",
    desc: (
      <>
        Maintain <strong>books of account</strong>, apply income for <strong>charitable purposes</strong>,
        and file returns and statements as required.
      </>
    ),
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
Benefits of 12A & 80G
         </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
Registrations strengthen credibility, reduce tax outgo and enhance ability to raise funds for programs.


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
    title: "Tax Exemption",
    desc: <> <strong>12AB</strong> provides exemption on income applied to charitable purposes as per the Act.</>,
  },
  {
    title: "Donor Incentive",
    desc: <> <strong>80G</strong> allows donors to claim deduction on eligible donations, boosting fundraising.</>,
  },
  {
    title: "Credibility",
    desc: <>Government approval improves transparency and trust among donors and partners.</>,
  },
  {
    title: "Grant Readiness",
    desc: <>Better access to CSR partners and institutional grants that require <strong>12A</strong> and <strong>80G</strong>.</>,
  },
  {
    title: "Operational Flexibility",
    desc: <>Plan programs with tax efficiency and structured donor engagement.</>,
  },
  {
    title: "Compliance Framework",
    desc: <>Clear validity, reporting, and audit framework helps long-term governance.</>,
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
Simplified Process for 12A & 80G Registration
          </Typography>

          {(() => {
const steps = [
  {
    number: "1",
    title: "Organise Foundational Documents",
    desc:
      "Trust deed or MOA/AOA with registration certificate, PAN, address proof, details of trustees/directors, activity note and financial statements (if available).",
  },
  {
    number: "2",
    title: "Create e-Filing Access",
    desc:
      "Log in to the Income Tax e-filing portal for the NGO. Ensure DSC or Aadhaar OTP is available for the authorised signatory.",
  },
  {
    number: "3",
    title: "Prepare Online Forms",
    desc:
      "Initiate the prescribed application for 12AB and 80G (as applicable). Fill entity, object and activity details and attach supporting documents.",
  },
  {
    number: "4",
    title: "Submit & Respond",
    desc:
      "Submit the application with e-verification. Respond to any queries/notices from the Exemptions authority with clarifications and additional proofs.",
  },
  {
    number: "5",
    title: "Obtain Orders",
    desc:
      "Receive approval orders specifying URN, effective date and validity. Download and store for records and donor communication.",
  },
  {
    number: "6",
    title: "Comply & Renew",
    desc:
      "Maintain books, file returns and statements on time. Apply for renewal or revalidation within the prescribed window to keep approvals active.",
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
    12A &amp; 80G Registration in India – A Complete Guide
  </Typography>

  {/* Introduction */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mb: 2 }}>
    Introduction
  </Typography>
  <Typography paragraph>
    Charitable organisations in India—<strong>public trusts, registered
    societies, and Section 8 companies</strong>—can obtain tax registrations
    under the Income Tax Act to strengthen compliance and fundraising.{" "}
    <strong>12A (now 12AB)</strong> provides income-tax exemption to the NGO
    on eligible income, while <strong>80G</strong> enables donors to claim
    deductions for eligible donations.
  </Typography>
  <Typography paragraph>
    With <strong>Rekotax</strong>, you get end-to-end support—from eligibility
    review and documentation to e-filing, clarifications, and post-approval
    donor enablement—so your organisation can focus on impact.
  </Typography>

  {/* What is 12A & 80G */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    What is 12A (12AB) &amp; 80G Registration?
  </Typography>
  <Typography paragraph>
    These are <strong>income-tax exemptions and approvals</strong> granted by
    the Exemptions wing via the Income Tax e-filing portal. On approval, you
    receive orders with a <strong>Unique Registration Number (URN)</strong>,
    effective date, and validity. 12AB covers exemption for the entity; 80G
    allows donors to claim deductions for donations made to the entity,
    subject to conditions.
  </Typography>

  {/* Who can apply */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Who Can Apply?
  </Typography>
  <Typography>Eligible applicants include:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Public charitable or religious trusts registered under the relevant state law.",
      "Registered societies formed for charitable purposes.",
      "Section 8 companies (Companies Act, 2013) with charitable objects.",
      "Entities with genuine charitable activities, proper governance, and books of account.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* 12A vs 80G table */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    12A vs 80G – What’s the Difference?
  </Typography>
  <Table sx={{ mt: 1 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Particulars
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          12A (12AB)
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          80G
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        ["Purpose", "Exempts NGO’s eligible income applied to charitable purposes", "Allows donors to claim tax deduction on eligible donations"],
        ["Who benefits", "The organisation", "The donor"],
        ["Application", "Online on e-filing portal (prescribed forms)", "Online on e-filing portal (can be with/after 12AB)"],
        ["Validity", "Granted with a specific validity period; renewal/revalidation required", "Granted with validity; periodic renewal/revalidation required"],
        ["Compliance", "Maintain books, apply income to objects, file returns/statements", "Issue proper donation receipts; report donations in prescribed statements"],
      ].map(([a, b, c]) => (
        <TableRow key={a}>
          <TableCell>{a}</TableCell>
          <TableCell>{b}</TableCell>
          <TableCell>{c}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  {/* Key Benefits */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Key Benefits
  </Typography>
  <Typography>Approvals build credibility and expand funding options:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Tax efficiency: 12AB shields eligible income; 80G makes donations more attractive.",
      "Fundraising edge: Improves access to CSR and institutional grants.",
      "Donor trust: Government approvals and URN improve transparency.",
      "Governance discipline: Clear reporting and validity cycles reinforce compliance.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Why apply early */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Why Apply Even If You’re New?
  </Typography>
  <Typography>Early approvals help you:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Signal credibility to donors and partners from day one.",
      "Structure finances tax-efficiently as activity scales.",
      "Unlock CSR and institutional opportunities that mandate 12A/80G.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Documents required */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Documents Required
  </Typography>
  <Typography>Keep clear scans and PDFs ready:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Foundational documents: Trust deed / registration certificate; MOA/AOA for Section 8.",
      "PAN of the entity; IDs and contact details of trustees/directors.",
      "Registered office proof (electricity bill, rent agreement, NOC as applicable).",
      "Bank account proof (cancelled cheque/passbook).",
      "Activity note, programme details, photos/links; website/app (if any).",
      "Financial statements and audit report (if available for prior years).",
      "Earlier approval orders if applying for renewal/revalidation.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Process */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Step-by-Step Process
  </Typography>
  <Typography>Applications are filed on the Income Tax e-filing portal:</Typography>
  <List sx={{ listStyleType: "decimal", pl: 4 }}>
    {[
      "Account setup: Ensure the NGO’s e-filing account is active; set up DSC/Aadhaar e-verify.",
      "Select application: Initiate the relevant 12AB and/or 80G application flow.",
      "Fill details: Entity profile, objects, key persons, bank, activity summary.",
      "Upload documents: Foundational deeds, financials, programme evidence.",
      "e-Verification & submit: Verify via DSC or Aadhaar OTP and submit.",
      "Clarifications: Respond to any notices/queries from Exemptions.",
      "Orders & URN: Download approval orders; diarise renewal timelines.",
    ].map((item) => (
      <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Non-compliance notes */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Non-Compliance &amp; Practical Notes
  </Typography>
  <Typography paragraph>
    Late filings, non-genuine activities, or diversion of funds may lead to
    denial, cancellation, or tax exposure. Maintain books, issue compliant
    donation receipts, and file the required returns/statements to preserve
    approvals.
  </Typography>

  {/* How Rekotax helps */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    How Rekotax Can Help You
  </Typography>
  <Typography>We provide a founder-friendly, compliant glidepath:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Eligibility & gap check: Review objects, governance, and documentation.",
      "Application drafting: Precise activity note and annexures that match requirements.",
      "Portal filing & follow-ups: Accurate e-filing and responses to queries.",
      "Donor enablement: 80G receipt formats and reporting checklist.",
      "Renewal reminders: Track validity and revalidation timelines.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Conclusion */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Conclusion
  </Typography>
  <Typography paragraph>
    12AB and 80G registrations are essential for sustainable fundraising and
    tax efficiency. Secure approvals correctly, maintain robust governance,
    and focus on delivering measurable impact.
  </Typography>
  <Typography paragraph>
    <strong>Rekotax</strong> can manage the entire process—clear, quick,
    and compliant.
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
    q: "What is 12A registration and why is it important for NGOs?",
    a: "12A registration grants an NGO exemption on eligible income under the Income-tax Act. With 12A, income applied to charitable purposes isn’t taxed, boosting program viability and donor confidence."
  },
  {
    q: "What is 80G registration and how does it help donors?",
    a: "80G registration allows donors to claim tax deduction on eligible donations made to your NGO, improving fundraising by making contributions tax-efficient for donors."
  },
  {
    q: "Who can apply for 12A/80G?",
    a: "Trusts, Registered Societies, and Section 8 Companies set up for charitable purposes (education, medical relief, poverty relief, environment, monuments, general public utility, etc.)."
  },
  {
    q: "Is 12A mandatory before applying for 80G?",
    a: "Yes. Practically, NGOs should hold or apply for 12A before seeking 80G, since donor deductions generally require the NGO itself to be tax-exempt."
  },
  {
    q: "Which forms are used—Form 10A and 10AB?",
    a: "Fresh/provisional registration is usually via Form 10A, while renewals, conversions, or subsequent approvals use Form 10AB on the e-filing portal."
  },
  {
    q: "What is the validity of 12A and 80G registrations?",
    a: "Approvals typically have a fixed tenure (often 5 years) and must be renewed before expiry. New NGOs may receive provisional approval that must be converted to regular approval within the prescribed window."
  },
  {
    q: "What documents are required for 12A/80G applications?",
    a: "Trust deed/MOA & registration certificate, NGO PAN, bylaws, trustee/director KYC (PAN/Aadhaar), financials (if available), activity report, bank details/cancelled cheque, and any relevant registrations (CSR-1/DARPAN)."
  },
  {
    q: "What is the online process to obtain 12A & 80G?",
    a: "Login on incometax.gov.in → choose Form 10A/10AB → fill details & upload proofs → e-verify via DSC/OTP → respond to clarifications → download approval orders/certificates."
  },
  {
    q: "What ongoing conditions must an NGO meet to retain 12A/80G?",
    a: "Apply income to charitable objects, avoid benefit to specified persons, maintain books, file ITR-7 and audits (Form 10B/10BB) on time, and comply with other applicable laws."
  },
  {
    q: "What are donor compliance requirements under 80G?",
    a: "File annual Form 10BD (donation statement) and issue Form 10BE to donors. Donation receipts must carry NGO details, 80G number, donor details, amount, mode, and date."
  },
  {
    q: "Are all donations eligible for 80G deduction?",
    a: "Only eligible donations to approved institutions qualify, subject to limits, payment modes, and statutory caps for the relevant year. Prefer banking channels over cash."
  },
  {
    q: "Can religious or mixed-purpose organizations get 80G?",
    a: "Purely charitable objects are preferred. Exclusively religious entities generally don’t qualify. Mixed objects require evaluation of dominant purpose and expenditure patterns."
  },
  {
    q: "What if the NGO runs significant commercial activities?",
    a: "Any incidental business must be subordinate to charitable objects; profits must fund charity. Excessive commercial focus risks exemption/approvals—maintain separate books as required."
  },
  {
    q: "Do we need FCRA to receive foreign donations?",
    a: "Yes. Obtain FCRA registration or prior permission and use the designated bank account. FCRA compliance is separate from 12A/80G."
  },
  {
    q: "Is audit compulsory for NGOs with 12A/80G?",
    a: "Audit depends on thresholds. Where applicable, file Form 10B/10BB with ITR-7 on time. Additional audits (state trust laws/FCRA) may apply based on funding and operations."
  },
  {
    q: "How do we convert provisional approval to regular approval?",
    a: "Apply within the prescribed window (often via Form 10AB) once conditions like activity commencement/financials are met. Track dates to avoid lapse."
  },
  {
    q: "Common reasons for rejection or queries?",
    a: "Vague objects, activity-object mismatch, private benefit, weak documentation, inconsistent financials, non-filing of returns/audits, or lack of on-ground evidence."
  },
  {
    q: "Can an NGO lose its 12A/80G status after approval?",
    a: "Yes—due to non-compliance, diversion of funds, misstatements, or failure to renew/respond to notices. Maintain timely filings and accurate disclosures."
  },
  {
    q: "How should 80G receipts and donor certificates be drafted?",
    a: "Include NGO name/address/PAN, 80G approval number, donor name/PAN, amount, mode, date, and purpose (if any). File 10BD annually and issue 10BE to donors."
  },
  {
    q: "How does Rekotax help with 12A & 80G registrations?",
    a: "End-to-end support: eligibility review, document vetting, drafting & filing Forms 10A/10AB, handling queries, and donor compliance (10BD/10BE) after approval."
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
