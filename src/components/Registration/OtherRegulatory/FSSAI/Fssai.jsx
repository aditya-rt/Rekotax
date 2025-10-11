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
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

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

export default function Fssai({ webAppUrl }) {
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
              Expert FSSAI Registration Services in India
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
            FSSAI Registration 
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
Register your FSSAI Registration  with Rekotax — experience fast setup, full legal compliance, expert documentation, and dedicated support to launch your business effortlessly.
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
Know All About FSSAI Registration
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
What is FSSAI Registration/Licence?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
             FSSAI Registration/Licence is a mandatory approval for every Food Business   <br/>Operator 
            engaged in manufacture, processing, packaging, storage, transport,<br/> distribution
              or sale of food in India. It is granted under the Food Safety and <br/>Standards Act 
              through the FSSAI FOSCOS portal.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
            Depending on the scale and nature of operations, FBOs must obtain Basic <br/>
            Registration, State Licence, or Central Licence. The 14-digit FSSAI number <br/>
             must be displayed at the premises and printed on labels, invoices, menus <br/>
             and delivery packages where applicable.
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
Key Features of FSSAI Registration
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
Mandatory for all food businesses—manufacturers, repackers, processors, wholesalers, retailers, restaurants, caterers, cloud kitchens, transporters and warehouses            </li>
                <li>
Three tiers based on turnover/capacity & activity: Basic Registration, State Licence, Central Licence
                </li>
                <li>
Online filing via FOSCOS with e-payment, document upload and inspections where applicable
                </li>
                <li>
Requires Food Safety Management System (FSMS) and adherence to hygiene & labelling norms
                </li>
                <li>
Licence details must be displayed at the premises and on labels as prescribed
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
            Who Needs FSSAI Registration/Licence
?                </Typography>

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
    title: "Manufacturers & Processors",
    desc: (
      <>
        Food manufacturing units, repackers, relabellers, dairies, bakeries,
        beverages and edible oil units, flour mills, and similar facilities.
      </>
    ),
  },
  {
    title: "Food Service & Retail",
    desc: (
      <>
        Restaurants, hotels, cafes, cloud kitchens, caterers, sweet shops,
        retailers, wholesalers, and home-based sellers.
      </>
    ),
  },
  {
    title: "Transport, Storage & Others",
    desc: (
      <>
        Transporters, cold chains, warehouses, e-commerce FBOs, importers/
        exporters, and multi-state operators.
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
           Benefits of FSSAI Registration
         </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
FSSAI compliance builds trust, enables market access and ensures hygienic, safe food operations.

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
    desc: (
      <>
        Operate lawfully as a food business with a valid FSSAI number and
        licence.
      </>
    ),
  },
  {
    title: "Market Access",
    desc: (
      <>
        Essential for tie-ups with marketplaces, aggregators, hotels, airlines
        and modern retail.
      </>
    ),
  },
  {
    title: "Consumer Trust",
    desc: (
      <>
        Visible licence details and compliant labels enhance credibility and
        brand value.
      </>
    ),
  },
  {
    title: "Hygiene & Safety",
    desc: (
      <>
        FSMS-based controls reduce contamination risk and improve audit
        readiness.
      </>
    ),
  },
  {
    title: "Traceability",
    desc: (
      <>
        Structured records and labelling support recalls and supply-chain
        transparency.
      </>
    ),
  },
  {
    title: "Simple Online Process",
    desc: (
      <>
        End-to-end online filing on <strong>FOSCOS</strong> with e-payments and
        digital certificates.
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
Simplified Process for FSSAI Registration/Licence
          </Typography>

          {(() => {
    const steps = [
  {
    number: "1",
    title: "Prepare Your Documents",
    desc:
      "Keep entity PAN, incorporation/firm deed, premises proof, rent agreement with owner NOC (if rented), signatory ID & photo, product/activity list, layout/equipment (for manufacturers), FSMS/hygiene plan and water test (if applicable).",
  },
  {
    number: "2",
    title: "Create FOSCOS Account",
    desc:
      "Register on the FSSAI FOSCOS portal. Verify mobile and email via OTP and complete the FBO profile with business category, location and contact details.",
  },
  {
    number: "3",
    title: "Choose Category & Fill Form",
    desc:
      "Select Basic Registration, State Licence or Central Licence based on turnover/capacity and activity. Enter entity details, premises, commodities, and proposed capacity.",
  },
  {
    number: "4",
    title: "Upload Documents",
    desc:
      "Upload KYC, premises proof, layout/equipment list, FSMS plan, product list and activity-specific declarations in the prescribed size and format.",
  },
  {
    number: "5",
    title: "Pay Fees & Facilitate Inspection",
    desc:
      "Pay the applicable fee online. Respond to queries and facilitate inspection if scheduled by the authority. Provide clarifications promptly on the portal.",
  },
  {
    number: "6",
    title: "Get Licence & Comply",
    desc:
      "Download the FSSAI certificate. Display the 14-digit number at the premises and print on labels/menus/bills as applicable. Maintain hygiene records and track renewals/modifications on change of details.",
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
    FSSAI Registration in India – A Complete Guide
  </Typography>

  {/* Introduction */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mb: 2 }}>
    Introduction
  </Typography>
  <Typography paragraph>
    Any business involved in the manufacture, processing, storage, distribution,
    or sale of food in India must obtain a food licence under the{" "}
    <strong>Food Safety and Standards Authority of India (FSSAI)</strong>. The
    licence/registration ensures traceability, hygiene standards, and consumer
    safety across the food value chain.
  </Typography>
  <Typography paragraph>
    With <strong>Rekotax</strong>, you get end-to-end support—eligibility
    mapping, documentation, online filing, inspections coordination, and
    post-licence compliance—so you stay audit-ready and market-ready.
  </Typography>

  {/* What is FSSAI */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    What is FSSAI Registration/Licence?
  </Typography>
  <Typography paragraph>
    It is a statutory <strong>food business registration/licence</strong> issued
    by FSSAI (through State/Central authorities) based on business scale and
    activity. On approval, the FBO receives a <strong>14-digit FSSAI number</strong> to
    be displayed on premises and printed on product packages/menus as applicable.
  </Typography>

  {/* Who needs it */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Who Needs FSSAI?
  </Typography>
  <Typography>
    All <strong>Food Business Operators (FBOs)</strong> including manufacturers,
    repackers, transporters, warehouses, wholesalers, retailers, e-commerce
    FBOs, hotels, restaurants, cloud kitchens, caterers, home-based sellers, and
    importers/exporters require the appropriate FSSAI registration/licence.
  </Typography>

  {/* Categories & Applicability table */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Categories &amp; Applicability
  </Typography>
  <Typography>
    FSSAI has three broad categories depending on turnover/capacity and activity:
  </Typography>

  <Table sx={{ mt: 2 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Category
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Typical Applicability
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Issued By
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        [
          "FSSAI Registration (Basic)",
          "Micro & small FBOs with low turnover (e.g., petty manufacturers, hawkers, small retailers, small storage units)",
          "State authority",
        ],
        [
          "State Licence",
          "Medium-sized manufacturers/processors, restaurants, large retailers/warehouses operating within a state",
          "State authority",
        ],
        [
          "Central Licence",
          "Large manufacturers, importers/exporters, 100% EOUs, multi-state operations or units exceeding specified capacity/turnover",
          "Central authority",
        ],
      ].map(([cat, app, by]) => (
        <TableRow key={cat}>
          <TableCell>
            <strong>{cat}</strong>
          </TableCell>
          <TableCell>{app}</TableCell>
          <TableCell>{by}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  {/* Key Benefits */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Key Benefits
  </Typography>
  <Typography>FSSAI compliance delivers tangible operational and market advantages:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Legal permission: Lawful operation for food activities with a verifiable FSSAI number.",
      "Market credibility: Builds trust with customers, marketplaces, and aggregators.",
      "Easier B2B onboarding: Essential for tie-ups with hotels, airlines, modern trade, and e-commerce.",
      "Recall & traceability: Structured labelling and hygiene systems reduce risk.",
      "Access to tenders & exports: Often mandatory for institutional and international business.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Why apply small */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Why Apply Even If You’re Small?
  </Typography>
  <Typography>Early compliance prevents penalties and speeds growth:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Hygiene assurance: Standardised processes for handling, storage, and transport.",
      "Brand protection: Legally compliant labels and declarations reduce disputes.",
      "Scale readiness: Smooth upgrades from Registration → State → Central as you grow.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Documents Required */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Documents Required
  </Typography>
  <Typography>Exact list varies by category and activity; commonly required:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Entity KYC: PAN; Incorporation/Partnership/LLP documents; authorised signatory ID & photo.",
      "Premises proof: Electricity bill/property tax; rent agreement & owner NOC if rented.",
      "Layout & equipment list for manufacturing/processing units; capacity details.",
      "Food safety management plan (FSMS) / hygiene & sanitation plan; water test report if applicable.",
      "Product list with categories (veg/non-veg); shelf life & labelling details where required.",
      "Import/Export: IEC copy; source/supply chain details.",
      "Other activity-specific affidavits/undertakings prescribed by the authority.",
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
  <Typography>
    Licensing is online via the FOSCOS portal (FSSAI) with inspections where applicable:
  </Typography>
  <List sx={{ listStyleType: "decimal", pl: 4 }}>
    {[
      "Determine category: Map turnover/capacity and activity to Registration/State/Central.",
      "Create portal account: Fill FBO profile with premises and activity details.",
      "Prepare documents: FSMS plan, layout, water report, product list, KYC, NOC, etc.",
      "File application & pay fee: Submit form with attachments; choose correct commodity codes.",
      "Inspection/clarifications: Provide additional info; facilitate site inspection if scheduled.",
      "Grant of licence: Download certificate; display FSSAI number; print on labels/menus/bills.",
    ].map((item) => (
      <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Non-Compliance */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Non-Compliance & Practical Notes
  </Typography>
  <Typography paragraph>
    Operating without a valid licence/registration, misbranding, unsafe food, or hygiene violations
    can attract fines, suspension, or prosecution. Keep <strong>renewals</strong> and{" "}
    <strong>modifications</strong> (change in label, address, capacity, products) updated, maintain{" "}
    <strong>records</strong>, and train staff in food safety practices.
  </Typography>

  {/* How Rekotax can help */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    How Rekotax Can Help You
  </Typography>
  <Typography>We provide a compliance-first, business-friendly approach:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Eligibility & activity mapping: Correct category and commodity selection.",
      "Documentation & FSMS: Checklists, templates, and guidance on hygiene systems.",
      "Accurate filing: End-to-end portal filing, responses, and inspection support.",
      "Labelling & declarations: Practical guidance to align with packaging norms.",
      "Renewals & modifications: Ongoing support as your operations scale.",
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
    FSSAI registration is foundational for any food business in India—ensuring safety, legality, and
    market access. Get the right category, keep hygiene systems tight, and stay renewal-ready to grow
    confidently.
  </Typography>
  <Typography paragraph>
    <strong>Rekotax</strong> can manage the entire process—precise, quick, and fully compliant—so you
    can focus on building a trusted food brand.
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
    q: "What is FSSAI Registration/License and why is it required?",
    a: "It’s a mandatory authorization from the Food Safety and Standards Authority of India for anyone manufacturing, processing, storing, distributing, importing, or selling food. It enables legal operations, ensures food-safety compliance, and displays a 14-digit FSSAI number on premises/labels to build consumer trust."
  },
  {
    q: "Who must obtain FSSAI registration or license?",
    a: "All Food Business Operators (FBOs)—manufacturers, repackers, traders/wholesalers/retailers, online sellers/aggregators, cloud & home kitchens, restaurants, caterers, transporters, warehouses/cold storages, and importers—must obtain FSSAI authorization before operating."
  },
  {
    q: "What are the types of FSSAI authorization?",
    a: "1) FSSAI Registration (Basic) for petty/micro FBOs. 2) State License for medium businesses operating within a state. 3) Central License for large/multi-state operations, importers, 100% EOUs, airports/seaports units, and other specified categories."
  },
  {
    q: "What is FoSCoS and how do I apply?",
    a: "FoSCoS (Food Safety Compliance System) is FSSAI’s online portal. Create an account, choose activity (manufacturer/trader/food service, etc.), fill Form A (Registration) or Form B (License), upload documents, pay fees, and track status online."
  },
  {
    q: "Which documents are required for FSSAI?",
    a: "Constitution proof; PAN; ID/address of promoters; premises proof (rent agreement + NOC/ownership/utility bill); unit layout (manufacturers); product list/NIC or food category; machinery & capacity details (manufacturers); FSMS/hygiene plan; water test (if used); IEC for importers; board authorization for companies. Category-specific add-ons may apply."
  },
  {
    q: "How long does approval take?",
    a: "Timelines vary by state and category. Basic Registration is usually quick; Licenses involve scrutiny and may include inspection. Accurate documentation and compliant layouts speed up approval."
  },
  {
    q: "What is the validity and renewal window?",
    a: "FSSAI authorization is typically valid 1–5 years (as chosen). Renew on FoSCoS before expiry—ideally at least 30 days in advance. Operating with an expired certificate can attract penalties and closure directions."
  },
  {
    q: "Do I need separate licenses for multiple locations/activities?",
    a: "Yes. Each food-handling premises needs its own Registration/License. Select all applicable activities (e.g., manufacturing + distribution + retail) or obtain the appropriate combination as per FoSCoS categories."
  },
  {
    q: "Is FSSAI needed for online food delivery or cloud kitchens?",
    a: "Yes. Cloud/home kitchens and sellers on aggregators must have valid FSSAI authorization. Marketplaces generally require your FSSAI number for onboarding and continued listing."
  },
  {
    q: "What labeling and display rules apply?",
    a: "Pre-packaged foods must follow FSS (Packaging & Labelling) Regulations—show FSSAI number, FBO details, ingredients, allergens, net quantity, veg/non-veg logo, batch/lot, MRP, dates, and nutritional info where applicable. Food service outlets must display the FSSAI number on premises and bills/online listings."
  },
  {
    q: "Are inspections part of the process?",
    a: "They may be. Authorities can inspect premises for GHP/GMP, FSMS, pest control, storage, temperature logs, and personal hygiene. Fix non-conformities promptly to avoid penalties or suspension."
  },
  {
    q: "Common reasons for queries or rejection?",
    a: "Document mismatch, incomplete layout/capacity details, wrong activity selection, missing water/quality reports, poor hygiene/premises non-compliance, and missing authorizations. Ensure complete and consistent documentation and correct category selection."
  },
  {
    q: "Penalties for operating without FSSAI authorization?",
    a: "Businesses can face fines, product seizure, suspension of operations, and prosecution under the Food Safety and Standards Act. Always obtain/renew authorization on time and maintain compliance."
  },
  {
    q: "How do importers comply with FSSAI norms?",
    a: "Importers need a Central License and must comply with FSS (Import) regulations—product approvals (where applicable), compliant labeling, shelf-life conditions, and clearances via FICS/authorities. Keep IEC, test reports, and documents ready for port checks."
  },
  {
    q: "Do transporters, warehouses, and cold storages need FSSAI?",
    a: "Yes. Logistics FBOs handling food require Registration/License based on scale. Maintain temperature logs, sanitation SOPs, and traceability to meet inspections and client requirements."
  },
  {
    q: "Can I add products or change activities later?",
    a: "Yes—apply for modification on FoSCoS when adding categories, changing capacity, or expanding activities. Significant changes may need approval and possibly a fresh inspection."
  },
  {
    q: "Is a lab/water test report mandatory for manufacturers?",
    a: "Often yes. Water potability/process-water tests are common; raw material/finished goods testing may be required (NABL labs) depending on product category—e.g., milk, meat, water, nutraceuticals, beverages."
  },
  {
    q: "Do home businesses need FSSAI?",
    a: "Yes. Home/residence-based sellers (offline or online) are FBOs and must obtain the applicable Registration/License, maintain hygiene, use proper packaging/labels, and issue bills with the FSSAI number."
  },
  {
    q: "How should I display the FSSAI number/logo?",
    a: "Display the 14-digit number at premises and on invoices/cash memos/online listings. Pre-packs must carry the FSSAI number and required labeling particulars. Use the FSSAI logo + number as prescribed."
  },
  {
    q: "How does Rekotax help with FSSAI?",
    a: "End-to-end assistance: category selection (Registration/State/Central), documentation, FoSCoS filing, responses to queries, label & FSMS guidance, modifications/renewals, and inspection support to get compliant faster."
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
