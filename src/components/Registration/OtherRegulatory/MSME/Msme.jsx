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

export default function Msme({ webAppUrl }) {
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
              Expert MSME/UDYAM Registration Services in India
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
         MSME/UDYAM Registration 
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
Register your MSME/UDYAM Registration
 with Rekotax — experience fast setup, full legal compliance, expert documentation, and dedicated support to launch your business effortlessly.
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
Know All About MSME / Udyam Registration
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
What is MSME / Udyam Registration?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
              Udyam Registration is the online government registration for Micro, Small <br/> 
              and Medium Enterprises in India. It provides a unique Udyam Registration <br/>
               Number and an e-certificate with a QR code for verification. The registration <br/>
               is based on investment in plant and machinery or equipment and the enterprise turnover.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
              Udyam is mandatory to access MSME benefits like Priority Sector Lending, credit <br/>
               guarantee under CGTMSE, interest subventions where notified, GeM onboarding <br/>
               support, TReDS invoice discounting, and delayed payment protection through MSME Samadhaan.
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
Key Features of Udyam Registration
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
Single online registration on the Udyam portal with Aadhaar-based e-verification
                </li>
                <li>
Classification by investment and turnover with auto-fetch from PAN and GST returns
                </li>
                <li>
Applies to manufacturing and services enterprises across India
                </li>
                <li>
Exports are excluded from turnover for classification purposes
                </li>
                <li>
Certificate issued digitally with Udyam Registration Number and QR code
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
            Who is Eligible for Udyam?                </Typography>

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
        <strong>Proprietorship, Partnership, LLP, <br/> Company</strong> and other
        entities engaged in manufacturing or services can register.
      </>
    ),
  },
  {
    title: "Investment and Turnover Limits",
    desc: (
      <>
        <strong>Micro:</strong> Investment ≤ ₹1 crore and Turnover ≤ ₹5 crore
        <br />
        <strong>Small:</strong> Investment ≤ ₹10 crore and Turnover ≤ ₹50 crore
        <br />
        <strong>Medium:</strong> Investment ≤ ₹50 crore and Turnover ≤ ₹250 crore
      </>
    ),
  },
  {
    title: "Documents",
    desc: (
      <>
        <strong>Aadhaar</strong> of proprietor or authorized <br/> signatory,{" "}
        <strong>PAN</strong> and <strong>GSTIN</strong> (where applicable), bank
        details and basic enterprise information.
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
           Benefits of MSME / Udyam Registration
         </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
Registration unlocks finance, market access, protection against delayed payments, and government support schemes.

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
    title: "Priority Sector Lending",
    desc: <>Better access to bank credit with targeted schemes for <strong>MSMEs</strong>.</>,
  },
  {
    title: "Credit Guarantees",
    desc: <>Collateral-free loans under <strong>CGTMSE</strong> and similar programs, subject to eligibility.</>,
  },
  {
    title: "Government Market Access",
    desc: <>Facilitated onboarding on <strong>GeM</strong> and procurement preference in many tenders.</>,
  },
  {
    title: "Invoice Financing",
    desc: <>Discount receivables via <strong>TReDS</strong> platforms for improved working capital.</>,
  },
  {
    title: "Delayed Payment Protection",
    desc: <>Claim interest on delayed payments through <strong>MSME Samadhaan</strong> portal.</>,
  },
  {
    title: "Subsidies and Reimbursements",
    desc: <>Eligibility for <strong>ISO reimbursement</strong>, technology upgradation and other schemes as notified.</>,
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
Simplified Process for MSME / Udyam Registration
          </Typography>

          {(() => {
         const steps = [
  {
    number: "1",
    title: "Keep KYC Ready",
    desc:
      "Aadhaar of proprietor/authorized signatory, PAN of the entity, GSTIN (if applicable), bank details, and basic enterprise info like NIC codes and number of employees.",
  },
  {
    number: "2",
    title: "Register on Udyam Portal",
    desc:
      "Create your application on the official Udyam portal using Aadhaar-based OTP. Link PAN and GST to enable auto-fetch of turnover and investment data.",
  },
  {
    number: "3",
    title: "Enter Enterprise Details",
    desc:
      "Provide name, constitution, address, NIC activity codes, commencement date, bank account, and employment details. Confirm investment and turnover ranges.",
  },
  {
    number: "4",
    title: "Validate and Submit",
    desc:
      "Submit the self-declaration. Data from ITR and GSTR is used for classification wherever available. No physical documents are uploaded unless requested.",
  },
  {
    number: "5",
    title: "Get Udyam Certificate",
    desc:
      "Download the Udyam Registration Certificate (with QR code). Share it with banks, buyers, and on GeM or TReDS as needed.",
  },
  {
    number: "6",
    title: "Update When Required",
    desc:
      "Update details on growth or changes. Annual reclassification can occur based on updated ITR and GST data as per rules.",
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
    MSME (Udyam) Registration in India – A Complete Guide
  </Typography>

  {/* Introduction */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mb: 2 }}>
    Introduction
  </Typography>
  <Typography paragraph>
    The <strong>MSME (Udyam) Registration</strong> system, introduced by the
    Ministry of Micro, Small and Medium Enterprises, provides official
    recognition to businesses operating in manufacturing or service sectors.
    Registered MSMEs gain access to various government schemes, subsidies, and
    credit facilities aimed at promoting growth and competitiveness.
  </Typography>
  <Typography paragraph>
    At <strong>Rekotax</strong>, we simplify the entire MSME registration
    process—right from document preparation to obtaining your{" "}
    <strong>Udyam Certificate</strong>—ensuring your enterprise gets all the
    benefits without any hassle.
  </Typography>

  {/* What is MSME (Udyam) Registration? */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    What is MSME (Udyam) Registration?
  </Typography>
  <Typography paragraph>
    Udyam registration is a government-issued identification for Micro, Small,
    and Medium Enterprises under the <strong>MSME Development Act, 2006</strong>.
    The registration provides a unique{" "}
    <strong>Udyam Registration Number (URN)</strong> and an e-certificate that
    confirms the status of the business as an MSME.
  </Typography>

  {/* Who can apply */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Who Can Apply for MSME Registration?
  </Typography>
  <Typography>
    Any business entity involved in the manufacturing, production, processing,
    or service activities can apply for MSME registration. Eligible forms include:
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Proprietorships",
      "Partnership Firms",
      "Limited Liability Partnerships (LLPs)",
      "Private or Public Limited Companies",
      "Hindu Undivided Family (HUF)",
      "Self-Help Groups, Co-operative Societies, or Trusts",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={<strong>{item}</strong>} />
      </ListItem>
    ))}
  </List>

  {/* Classification table */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    MSME Classification (Based on Investment &amp; Turnover)
  </Typography>
  <Typography>
    The Government of India revised the definition of MSMEs effective July 2020,
    combining manufacturing and service sectors into one composite classification:
  </Typography>

  <Table sx={{ mt: 2 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Category
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Investment in Plant &amp; Machinery/Equipment
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Annual Turnover
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        ["Micro Enterprise", "Up to ₹1 crore", "Up to ₹5 crore"],
        ["Small Enterprise", "Up to ₹10 crore", "Up to ₹50 crore"],
        ["Medium Enterprise", "Up to ₹50 crore", "Up to ₹250 crore"],
      ].map(([cat, invest, turn]) => (
        <TableRow key={cat}>
          <TableCell>
            <strong>{cat}</strong>
          </TableCell>
          <TableCell>{invest}</TableCell>
          <TableCell>{turn}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  {/* Key Benefits */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Key Benefits of MSME (Udyam) Registration
  </Typography>
  <Typography>Udyam registration provides enterprises with multiple advantages:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Priority sector lending: Easier access to collateral-free loans from banks and NBFCs.",
      "Interest subsidy: Reduction in interest rates on term loans under various schemes.",
      "Government tenders: Relaxations and preferences in public procurement tenders.",
      "Delayed payment protection: MSME Act ensures timely payment from buyers with interest on delay.",
      "Tax & subsidy benefits: Access to subsidy programs and concessions under central and state schemes.",
      "Ease of business expansion: Credibility with customers, vendors, and investors.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Why Register */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Why Register as an MSME?
  </Typography>
  <Typography>
    Even small or new businesses should obtain Udyam registration due to the
    long-term advantages:
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Legal identity: Recognition as a registered business under government records.",
      "Financial security: Protection against payment defaults and eligibility for credit support.",
      "Policy support: Priority in government schemes for technology, export, and skill development.",
      "Market access: Easier participation in global and national trade fairs.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Documents Required */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Documents Required for MSME Registration
  </Typography>
  <Typography>Keep the following ready before applying for registration:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Aadhaar number of the proprietor, partner, or director.",
      "PAN card of the business or applicant.",
      "Business address proof – electricity bill, rent agreement, or property papers.",
      "Bank account details – passbook or cancelled cheque.",
      "NIC code – classification of business activity.",
      "Investment and turnover details – based on ITR and GST data auto-fetched from government databases.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Step-by-Step Process */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Step-by-Step Process of MSME (Udyam) Registration
  </Typography>
  <Typography>The Udyam registration process is completely online and paperless:</Typography>
  <List sx={{ listStyleType: "decimal", pl: 4 }}>
    {[
      'Visit the Udyam portal: Go to udyamregistration.gov.in.',
      "Enter Aadhaar and PAN details: Validate using OTP and link to your business credentials.",
      "Provide business information: Name, type, activity, employee count, investment, and turnover details.",
      "Submit application: Review and submit the details for verification.",
      "Auto-verification: The system fetches data from Income Tax and GST portals for confirmation.",
      "Download certificate: Receive the Udyam Registration Certificate with a unique URN number.",
    ].map((item) => (
      <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
        <ListItemText
          primary={
            item.startsWith("Visit the Udyam portal") ? (
              <>
                Visit the Udyam portal: Go to{" "}
                <a href="https://udyamregistration.gov.in" target="_blank" rel="noreferrer">
                  udyamregistration.gov.in
                </a>
                .
              </>
            ) : (
              item
            )
          }
        />
      </ListItem>
    ))}
  </List>

  {/* Penalties */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Penalties for False Information
  </Typography>
  <Typography paragraph>
    Providing incorrect information in the Udyam application can lead to penalties
    under Section 27 of the MSME Act, 2006, including fines up to ₹1,000 for the
    first offence and higher penalties for repeated violations.
  </Typography>

  {/* How Rekotax Can Help */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    How Rekotax Can Help You
  </Typography>
  <Typography>We provide seamless MSME registration and compliance assistance:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Eligibility check: Evaluate your investment and turnover as per latest norms.",
      "Document preparation: Assistance in gathering required proofs and declarations.",
      "Filing support: Accurate online filing and issue resolution.",
      "Advisory support: Guidance on credit schemes, subsidies, and MSME benefits.",
      "Dedicated assistance: A single expert guides you throughout the process.",
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
    MSME (Udyam) registration is essential for small and medium businesses to
    gain government recognition and financial protection. It strengthens
    credibility, eases funding access, and opens a gateway to several growth
    incentives.
  </Typography>
  <Typography paragraph>
    With <strong>Rekotax</strong>, you can complete your MSME registration
    smoothly and unlock a world of business opportunities with just a few clicks.
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
    q: "What is MSME (Udyam) Registration?",
    a: "An online registration under the Ministry of MSME that legally recognizes Micro, Small, and Medium Enterprises based on investment and turnover, enabling access to subsidies, credit, and tender benefits."
  },
  {
    q: "Who should register under Udyam?",
    a: "Manufacturing and service enterprises in India—including proprietorships, partnerships, LLPs, and companies—that want MSME benefits."
  },
  {
    q: "What are the MSME classification limits?",
    a: "Micro: Investment ≤ ₹1 crore & Turnover ≤ ₹5 crore; Small: Investment ≤ ₹10 crore & Turnover ≤ ₹50 crore; Medium: Investment ≤ ₹50 crore & Turnover ≤ ₹250 crore."
  },
  {
    q: "What are the key benefits of Udyam Registration?",
    a: "Collateral-free/priority loans, subsidized interest, protection against delayed payments, concessions (e.g., electricity, IP fees), and advantages in government tenders."
  },
  {
    q: "Which documents are required for Udyam?",
    a: "Aadhaar of proprietor/authorized signatory, PAN (entity/individual), business address & bank details, and basic investment/turnover info (auto-fetched from ITR/GST where available)."
  },
  {
    q: "Is Udyam registration mandatory?",
    a: "Not mandatory, but strongly recommended for credibility, easier finance, and access to MSME incentives."
  },
  {
    q: "Is there a government fee for Udyam?",
    a: "No. It’s free and fully online via the official portal (udyamregistration.gov.in)."
  },
  {
    q: "Can traders apply for Udyam?",
    a: "Retail and wholesale traders are eligible for priority sector lending benefits under Udyam as per the 2021 MSME circular."
  },
  {
    q: "How are investment and turnover verified?",
    a: "Through Income Tax Returns and GST returns. Ensure your filings are accurate for correct classification."
  },
  {
    q: "How do I print or verify my Udyam Certificate?",
    a: "Use the “Print/Verify” option on the Udyam portal with your URN and OTP sent to the registered mobile/email."
  },
  {
    q: "Can I update my details after registration?",
    a: "Yes. You can amend address, contacts, turnover, investment, and GST details anytime; review annually for accuracy."
  },
  {
    q: "What if I cross the MSME limits?",
    a: "The system reclassifies you automatically to the next category; if you fall below, you may be downgraded—based on financial filings."
  },
  {
    q: "Is Udyog Aadhaar still valid?",
    a: "No. Udyog Aadhaar (UAM) has been replaced by Udyam. Existing UAM holders should re-register on the Udyam portal."
  },
  {
    q: "Can a business have multiple Udyam registrations?",
    a: "No. Only one Udyam per entity. Multiple branches/verticals can be added via separate NIC codes under the same registration."
  },
  {
    q: "How does Udyam help in government tenders?",
    a: "MSMEs may get EMD exemptions and relaxations in prior experience/turnover criteria on platforms like GeM and eProcure (as per tender terms)."
  },
  {
    q: "Is MSME registration linked with GST?",
    a: "Yes, GST data (where applicable) is integrated for turnover verification. Non-GST entities can register with self-declared details, later cross-verified with ITR."
  },
  {
    q: "Can foreign-owned/subsidiary companies register?",
    a: "Yes, if incorporated in India and meeting MSME thresholds. The registration applies to the Indian entity only."
  },
  {
    q: "What is the validity of Udyam registration?",
    a: "Lifetime validity. No renewal needed; financial data updates annually from filings."
  },
  {
    q: "Common reasons for rejection?",
    a: "Mismatched Aadhaar/PAN, incorrect turnover/investment data, duplicate applications, or technical errors. Ensure details match tax filings."
  },
  {
    q: "How can Rekotax help with Udyam registration?",
    a: "Eligibility check, documentation, precise online filing, and post-registration guidance—ensuring error-free submission and smooth access to MSME benefits."
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
