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

export default function Trademark({ webAppUrl }) {
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
              Expert Trademark Registration  Services in India
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
            Trademark Registration 

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
Register your Trademark Registration 
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
Know All About Trademark Registration
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
What is Trademark Registration?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
             Trademark Registration grants exclusive rights over a brand name, logo, label,<br/>
              slogan, or any mark capable of distinguishing your goods or services. <br/>
              Registration under the Trade Marks Act, 1999 helps prevent imitation and <br/>
              enables legal action against infringers.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
             Applications are filed class-wise based on the Nice Classification (Classes 1–45). <br/>
             Once accepted and registered, the mark is valid for 10 years and can be renewed <br/>
             indefinitely in 10-year blocks.
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
Key Features of Trademark Registration
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
Protects brand identity (word, logo, device, label, color/shape, sound marks)
                </li>
                <li>
Filed and tracked online via the IP India portal with e-payments
                </li>
                <li>
Undergoes examination, advertisement in Journal, and potential opposition period
                </li>
                <li>
Registration enables legal enforcement, ®usage, and licensing/franchising
                </li>
                <li>
Validity of 10 years from filing date; renewable indefinitely
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
         Who Should Apply for a Trademark?
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
    title: "Businesses & Startups",
    desc: (
      <>
        Companies, LLPs, partnerships, and proprietorships protecting brand{" "}
        <strong>names, logos, products,</strong> or <strong>services</strong>.
      </>
    ),
  },
  {
    title: "Professionals & Creators",
    desc: (
      <>
        Consultants, designers, artists, and agencies safeguarding distinctive{" "}
        <strong>brand identities</strong>.
      </>
    ),
  },
  {
    title: "NGOs & Institutions",
    desc: (
      <>
        Trusts, societies, and educational bodies protecting{" "}
        <strong>names, emblems,</strong> or <strong>program labels</strong>.
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
           Benefits of Trademark Registration
         </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
A registered trademark is a powerful intangible asset that builds trust and market value.

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
    title: "Exclusive Rights",
    desc: (
      <>
        Legal monopoly over the mark for listed goods/services in selected
        classes.
      </>
    ),
  },
  {
    title: "Brand Protection",
    desc: (
      <>
        Strong remedy against imitation, cybersquatting, and unfair competition.
      </>
    ),
  },
  {
    title: "Asset & Licensing",
    desc: (
      <>
        Enables licensing, franchising, and valuation for investments or exits.
      </>
    ),
  },
  {
    title: "Customer Trust",
    desc: (
      <>
        The <strong>®</strong> symbol signals authenticity, reliability, and
        consistent quality.
      </>
    ),
  },
  {
    title: "Global Expansion",
    desc: (
      <>
        Supports foreign filings (e.g., <strong>Madrid Protocol</strong>) using
        the home application.
      </>
    ),
  },
  {
    title: "Simple Online Process",
    desc: (
      <>
        Digital filing, e-sign, tracking, and e-certificates on the IP India
        portal.
      </>
    ),
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
Simplified Process for IEC Registration
          </Typography>

          {(() => {
         const steps = [
  {
    number: "1",
    title: "Pre-Filing Search",
    desc:
      "Conduct a trademark availability search to check for identical or similar marks in relevant classes and refine your filing strategy.",
  },
  {
    number: "2",
    title: "Identify Classes",
    desc:
      "Map your goods/services to the correct Nice Classes (1–45). Choose word/logo/combined mark and draft precise descriptions.",
  },
  {
    number: "3",
    title: "File TM Application",
    desc:
      "File Form TM-A online with applicant KYC, mark representation, and class details; pay the government fee.",
  },
  {
    number: "4",
    title: "Examination & Reply",
    desc:
      "Address the examination report (if issued) with a reasoned reply and evidence. Attend hearing if scheduled by the Registry.",
  },
  {
    number: "5",
    title: "Journal Publication",
    desc:
      "On acceptance, the mark is advertised for public opposition (4 months). Defend if any opposition is filed.",
  },
  {
    number: "6",
    title: "Registration & Renewal",
    desc:
      "If unopposed or opposition succeeds in your favour, receive the Registration Certificate. Renew every 10 years.",
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
    Trademark Registration in India – A Complete Guide
  </Typography>

  {/* Introduction */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mb: 2 }}>
    Introduction
  </Typography>
  <Typography paragraph>
    A <strong>Trademark</strong> is a visual identity—name, logo, symbol, design,
    or slogan—that distinguishes your brand from others. Registration under the{" "}
    <strong>Trademarks Act, 1999</strong> grants exclusive legal rights to use
    the mark and protects it from misuse or duplication.
  </Typography>
  <Typography paragraph>
    <strong>Rekotax</strong> helps startups, MSMEs, and growing brands secure and
    manage trademarks end-to-end—from search and filing to examination,
    objections, and renewal—so your brand identity stays protected.
  </Typography>

  {/* What is TM Registration */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    What is Trademark Registration?
  </Typography>
  <Typography paragraph>
    Trademark registration provides legal ownership of a brand name, logo,
    tagline, or product identity. The owner gets the exclusive right to use the
    mark and prevent others from using a confusingly similar mark for related
    goods/services. Registered trademarks are valid for{" "}
    <strong>10 years</strong> and can be renewed indefinitely every 10 years.
  </Typography>

  {/* Who can apply */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Who Can Apply for a Trademark?
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Individual entrepreneurs, startups, and proprietors",
      "Partnership firms and LLPs",
      "Private or Public Limited Companies",
      "Trusts, NGOs, and educational institutions",
      "Foreign companies seeking protection in India",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Types of marks */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Types of Marks That Can Be Registered
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Word Mark: Brand name, slogan, or tagline (e.g., REKOTAX, NIKE)",
      "Logo Mark: Symbolic or graphic representation (e.g., Apple logo)",
      "Combination Mark: Text + design elements",
      "Shape, Color, or Sound Mark: Distinct packaging, color pattern, or jingle",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Classes table */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Trademark Classes in India
  </Typography>
  <Typography>
    The Registry follows the <strong>NICE Classification</strong>:{" "}
    <strong>45 classes</strong> (Classes 1–34 for goods, 35–45 for services).
  </Typography>
  <Table sx={{ mt: 2 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Class Range
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Category
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Examples
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        ["1 – 34", "Goods", "Manufactured items like clothing, cosmetics, food, electronics"],
        ["35 – 45", "Services", "Consulting, legal, IT, education, financial, marketing, etc."],
      ].map(([a, b, c]) => (
        <TableRow key={a}>
          <TableCell>{a}</TableCell>
          <TableCell>{b}</TableCell>
          <TableCell>{c}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <Typography paragraph>
    Choosing the correct class is critical—filing under the wrong class can make
    a mark unenforceable. Rekotax helps identify the right classes for your
    activities.
  </Typography>

  {/* Key benefits */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Key Benefits of Trademark Registration
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Exclusive ownership: Only the registered proprietor can use the mark for listed goods/services.",
      "Legal protection: Strong remedy against imitation, infringement, and cybersquatting.",
      "Brand credibility: Enhances customer trust and investor confidence.",
      "Asset creation: A trademark is an intangible asset that can be sold, licensed, or franchised.",
      "Global protection: Facilitates international filings via the Madrid Protocol.",
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
  <List sx={{ pl: 3 }}>
    {[
      "Applicant’s details: Name, address, nationality",
      "Business proof: Incorporation/registration certificate (as applicable)",
      "Logo or word mark image: High-resolution file (optional for word mark only)",
      "Power of Attorney (TM-48): Authorising agent/consultant to file",
      "Description of goods/services: Clear identification under the correct class",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Process */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Step-by-Step Process of Trademark Registration
  </Typography>
  <List sx={{ listStyleType: "decimal", pl: 4 }}>
    {[
      "Trademark Search: Check availability on IP India to avoid conflicts.",
      "Application Filing: File Form TM-A online with the appropriate class and description.",
      "Examination: Registry examines and may issue an examination report.",
      "Objection (if any): Reply within the stipulated time with arguments/evidence.",
      "Publication: Accepted marks are published for 4 months for public opposition.",
      "Registration: If unopposed, the mark proceeds to registration and certificate is issued.",
      "Renewal: Every 10 years to keep the registration valid indefinitely.",
    ].map((item) => (
      <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Govt Fees */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Government Fees (Indicative)
  </Typography>
  <Table sx={{ mt: 2 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Applicant Type
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Government Fee (per class)
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        ["Individual / Startup / MSME", "₹4,500"],
        ["Company / LLP / Other Entities", "₹9,000"],
      ].map(([a, b]) => (
        <TableRow key={a}>
          <TableCell>{a}</TableCell>
          <TableCell>{b}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  {/* Why register early */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Why Register Early?
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Priority claim: First-to-file principle protects you from future conflicts.",
      "Brand consistency: Secure identity before expansion or franchising.",
      "Avoid disputes: Prevent costly legal battles with competitors.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* How Rekotax helps */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    How Rekotax Can Help You
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Trademark search & class selection: Comprehensive analysis to avoid conflicts.",
      "End-to-end filing: From TM-A submission to follow-ups with the Registry.",
      "Response management: Drafting replies for objections or oppositions.",
      "Renewal & monitoring: Alerts for renewals and infringement tracking.",
      "International filing: Guidance under the Madrid Protocol for global protection.",
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
    Trademark registration secures your brand’s identity and builds a legal
    shield around your reputation. With <strong>Rekotax</strong>, your brand is
    protected at every step—from name search to final registration—with expert
    handling and compliance assurance.
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
    q: "What is a trademark and why should I register it?",
    a: "A trademark is a brand identifier (name, logo, tagline, shape, colour combo, or sound). Registration grants exclusive rights in chosen classes, deters misuse, builds brand value, and enables legal action for infringement."
  },
  {
    q: "Who can apply for a trademark in India?",
    a: "Individuals, startups/MSMEs, proprietorships, partnerships, LLPs, companies, trusts and societies can apply. Foreign applicants can file directly in India or via the Madrid Protocol designating India."
  },
  {
    q: "What is the difference between ™, ® and ℠ symbols?",
    a: "™ (and ℠ for services) indicates a claimed but unregistered mark. ® may be used only after registration is granted and valid; misuse of ® can attract penalties."
  },
  {
    q: "What are trademark classes and how do I choose the right one(s)?",
    a: "India uses the Nice Classification—45 classes (1–34 goods, 35–45 services). Choose classes covering current and foreseeable goods/services; many brands file in multiple classes."
  },
  {
    q: "Should I file a word mark or a logo/device mark?",
    a: "A word mark generally offers broader protection for the name; a device/logo protects stylization. Many applicants file both, budget permitting."
  },
  {
    q: "How important is a trademark search before filing?",
    a: "Very. A comprehensive availability search (including similar/phonetic hits, domains, marketplaces) reduces objections/oppositions and rebranding risk."
  },
  {
    q: "What is the process to register a trademark in India?",
    a: "Search & class mapping → File Form TM-A → Examination & report → Response/hearing (if needed) → Journal publication for 4-month opposition → Registration & certificate."
  },
  {
    q: "How long does trademark registration take?",
    a: "Timelines vary by objections/oppositions and registry workload. Distinctive, unopposed marks may register in several months; contested cases take longer."
  },
  {
    q: "What documents are needed to file a trademark?",
    a: "Applicant details; brand name/logo image (for device mark); class(es) and description; TM-48 (if using an agent); priority docs (if any); MSME/Startup proof for reduced fee."
  },
  {
    q: "What are the filing fees and categories?",
    a: "Govt fee is per class, per mark. Individuals/Startups/Small Enterprises (MSMEs) pay a reduced fee versus larger entities. Professional fees are separate."
  },
  {
    q: "What is the validity of a trademark and how do I renew it?",
    a: "Registration is valid for 10 years from the application date and is renewable every 10 years. Renew before expiry to avoid surcharge/restoration."
  },
  {
    q: "What is the difference between objection and opposition?",
    a: "An objection is raised by the Examiner during examination; an opposition is filed by a third party after journal publication. Both require timely, reasoned responses."
  },
  {
    q: "Can I claim use of the mark before registration?",
    a: "Yes. File as proposed-to-be-used or claim a prior date of first use with evidence (invoices, ads, website, packaging). Prior use can strengthen rights."
  },
  {
    q: "How do Madrid Protocol international filings work?",
    a: "With an Indian base application/registration, file an International Application via Madrid designating multiple countries. Each office examines under local law; renewals are managed centrally."
  },
  {
    q: "Can a trademark be assigned or licensed?",
    a: "Yes. Trademarks may be assigned (with/without goodwill) or licensed. Record assignments/licences with the Registry to perfect rights against third parties."
  },
  {
    q: "What is trademark infringement vs. passing off?",
    a: "Infringement is unauthorized use of a similar/identical mark against a registered owner’s rights. Passing off protects unregistered marks based on goodwill and misrepresentation."
  },
  {
    q: "Can descriptive or generic terms be registered?",
    a: "Purely descriptive/generic terms are ordinarily refused unless they have acquired distinctiveness (secondary meaning). Distinct stylization may help but usually needs evidence."
  },
  {
    q: "What if I need to change the mark or add classes after filing?",
    a: "Material alteration of the mark isn’t allowed on the same application—file a fresh application. Add new business lines by filing additional class applications."
  },
  {
    q: "How do I monitor and enforce my trademark rights?",
    a: "Use watch services for new filings, monitor marketplaces/domains/social media, and act quickly with cease-and-desist letters, takedowns, customs recordals, and legal actions."
  },
  {
    q: "How does Rekotax help with trademark registration and protection?",
    a: "We handle strategy, searches, class selection, filing, prosecution (objections/hearings), opposition defence, renewals/monitoring, Madrid filings, assignments/licensing, and enforcement support."
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
