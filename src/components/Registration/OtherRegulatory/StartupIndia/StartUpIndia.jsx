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
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";


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

export default function StartupIndia({ webAppUrl }) {
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
              Expert Start-up India Registration
Services in India
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
            Start-up India Registration 
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
Register your Start-up India Registration
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
         Know All About Startup India (DPIIT) Recognition

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
What is Startup India Registration?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
             Startup India Registration means obtaining DPIIT recognition on the Startup <br/>
              India portal for eligible entities. Recognition validates that your <br/>
               business is innovation driven and eligible for Startup India benefits <br/>
               like tax incentives, IPR support, and public procurement relaxations.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
              Recognition is granted online after a self-certified application with supporting <br/>
              documents. It is available to eligible Private Limited Companies, LLPs, and <br/>
               Registered Partnerships that meet the age, turnover, and innovation criteria <br/>
               prescribed by DPIIT.
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
               Key Features of Startup India Recognition

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
Central recognition administered by <strong>DPIIT</strong> under the Startup India initiative
                </li>
                <li>
Available to <strong>Company, LLP, or Partnership Firm</strong> that meets eligibility norms
            </li>
                <li>
Facilitates <strong>tax incentives, IPR support, procurement relaxations, and access to government programs</strong> 
                </li>
                <li>
Simple <strong> online application</strong> on the Startup India portal with quick approvals in many cases
                </li>
                <li>
Recognition remains valid up to the maximum tenure allowed for a startup under DPIIT rules
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
           Who is Eligible for Startup India Recognition
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
                title: "Eligible Entities",
                desc: <>Incorporated as a Private Limited Company, LLP, or Registered Partnership Firm.</>,
              },
              {
                title: "Age and Turnover",
                desc: <>Entity not older than 10 years from <br/> the date of incorporation, with annual turnover not exceeding ₹100 crore in any financial year since incorporation.</>,
              },
              {
                title: "Innovation Criteria",
                desc: <>Working on innovation, improvement, <br/> or scalable business model with high potential for employment or wealth creation. Not formed by splitting or reconstruction of an existing business</>,
              },
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
          Benefits of DPIIT Recognition
          </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
Recognition gives access to flagship incentives and ecosystem support designed for innovative businesses.

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
    title: "Income Tax Holiday",
    desc: (
      <>
        Option to apply for <strong>Section 80-IAC</strong> deduction for{" "}
        <strong>3 consecutive years</strong> within the specified period, subject to
        CBDT approval and conditions.
      </>
    ),
  },
  {
    title: "Angel Tax Relief",
    desc: (
      <>
        Relaxations for eligible DPIIT-recognized startups on specified{" "}
        <strong>share issuances</strong>, as per prevailing CBDT notifications and conditions.
      </>
    ),
  },
  {
    title: "Public Procurement",
    desc: (
      <>
        <strong>Exemptions in prior experience or turnover</strong> and easier access on
        Government e-Marketplace where applicable.
      </>
    ),
  },
  {
    title: "IPR Fast-Track",
    desc: (
      <>
        Faster examination and <strong>fee rebates on patents and trademarks</strong> through
        SIPP and allied schemes.
      </>
    ),
  },
  {
    title: "Self Certification",
    desc: (
      <>
        Self-certify under select <strong>labour and environment laws</strong> for a limited
        period, as notified from time to time.
      </>
    ),
  },
  {
    title: "Funding Support",
    desc: (
      <>
        Access to programs like the <strong>Fund of Funds for Startups</strong> (via SIDBI)
        and other government-linked initiatives.
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
Simplified Process for Startup India (DPIIT) Recognition
          </Typography>

          {(() => {
          const steps = [
  {
    number: "1",
    title: "Incorporate the Entity",
    desc:
      "Ensure your business is a Company, LLP, or Partnership Firm with PAN, registered office proof, and basic KYC in place.",
  },
  {
    number: "2",
    title: "Create Startup India Account",
    desc:
      "Sign up on the Startup India portal, verify email and mobile, and complete the entity profile including industry, stage, and team details.",
  },
  {
    number: "3",
    title: "Prepare Application Inputs",
    desc:
      "Keep your incorporation certificate, PAN, directors or partners details, a concise write-up/deck explaining the innovation, website/product links, and IP or award details (if any).",
  },
  {
    number: "4",
    title: "Apply for DPIIT Recognition",
    desc:
      "Fill the online form, upload documents, and provide self-certifications. Submit the application and track status from your dashboard.",
  },
  {
    number: "5",
    title: "Obtain Recognition Certificate",
    desc:
      "On approval, download the DPIIT Recognition Certificate and unique startup number. Use it to access benefits and programs.",
  },
  {
    number: "6",
    title: "Apply for Tax Benefits",
    desc:
      "If eligible, apply for 80-IAC deduction and other available relaxations through the relevant sections of the portal, subject to timelines and conditions.",
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
    Startup India (DPIIT) Recognition – A Complete Guide
  </Typography>

  {/* Introduction */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mb: 2 }}>
    Introduction
  </Typography>
  <Typography paragraph>
    <strong>Startup India</strong> is a flagship initiative of the Government of
    India that supports innovation-driven businesses with regulatory
    relaxations, market access, and incentives. Obtaining{" "}
    <strong>DPIIT recognition</strong> validates your startup status and unlocks
    benefits like tax incentives, IPR rebates, and public procurement
    relaxations.
  </Typography>
  <Typography paragraph>
    At <strong>Rekotax</strong>, we manage the entire recognition
    journey—eligibility check, documentation, online filing, and
    post-recognition enablement—so you can focus on building and scaling.
  </Typography>

  {/* What is Recognition */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    What is Startup India (DPIIT) Recognition?
  </Typography>
  <Typography paragraph>
    DPIIT recognition is an online certification on the Startup India portal for
    eligible entities. Recognized startups receive a{" "}
    <strong>certificate of recognition</strong> and a unique startup ID,
    enabling access to Startup India programs and certain tax and procurement
    relaxations subject to conditions.
  </Typography>

  {/* Eligibility */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Who is Eligible for Recognition?
  </Typography>
  <Typography>Recognition is typically available to entities that meet all of the following:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Entity type: Private Limited Company, LLP, or Registered Partnership Firm.",
      "Age: Not older than 10 years from the date of incorporation.",
      "Turnover: Annual turnover has not exceeded ₹100 crore in any financial year since incorporation.",
      "Innovation: Working on innovation, improvement of products/processes/services, or a scalable business model with high potential for employment or wealth creation.",
      "No split/reconstruction: Not formed by splitting up or reconstructing an existing business.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Eligibility Limits Snapshot */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Eligibility Limits Snapshot
  </Typography>
  <Typography>These headline limits define the scope of who can be recognized as a startup under DPIIT norms:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Age limit: ≤ 10 years from incorporation.",
      "Turnover limit: ≤ ₹100 crore in any preceding financial year.",
      "Innovation criterion: Clear demonstration of innovation or substantial improvement.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>
  <Typography paragraph>
    If you’re close to the limits, we can help evaluate suitability and refine your application narrative.
  </Typography>

  {/* Types of Applications */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Types of Applications
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Newly incorporated startups: Early-stage entities applying soon after incorporation.",
      "Existing eligible entities: Firms that meet age/turnover/innovation criteria and seek recognition to access benefits.",
      "With/without IP or traction: Recognition does not require patents or revenue; however, strong evidence strengthens your case.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Key Benefits Table */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Key Benefits at a Glance
  </Typography>
  <Typography>
    Recognized startups can access several benefits (subject to applicable rules and approvals):
  </Typography>

  <Table sx={{ mt: 2 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          Benefit / Provision
        </TableCell>
        <TableCell sx={{ bgcolor: "#0f2555", color: "#fff", fontWeight: 700 }}>
          What It Means
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        ["Tax Holiday (Section 80-IAC)", "Option to apply for a 3-year profit deduction within the specified window, subject to CBDT approval and conditions."],
        ["Angel Tax Relief", "Relaxations for eligible DPIIT-recognized startups on specified share issuances, per prevailing CBDT notifications."],
        ["IPR Support", "Faster examination and fee rebates on patents/trademarks via SIPP and allied programs."],
        ["Public Procurement", "Relaxations in prior experience/turnover criteria in eligible government tenders and GeM facilitation."],
        ["Self-Certification", "Self-certify under select labour and environment laws for a limited period, as notified."],
        ["Programs & Funding Linkages", "Access to Startup India programs and Fund of Funds linkages through institutions like SIDBI."],
      ].map(([a, b]) => (
        <TableRow key={a}>
          <TableCell>{a}</TableCell>
          <TableCell>{b}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  {/* Benefits of Getting Recognized */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Benefits of Getting Recognized
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Signal of legitimacy: Recognition boosts credibility with customers, investors, and partners.",
      "Easier market access: Procurement relaxations and GeM onboarding support.",
      "Cost savings: Potential tax incentives and IPR fee rebates reduce early-stage burn.",
      "Ecosystem unlock: Visibility to programs, challenges, incubators, and mentoring.",
    ].map((item) => (
      <ListItem key={item} sx={{ py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* Why Apply Early */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    Why Apply Even If You’re Early?
  </Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Investor confidence: Aids diligence and can reduce friction in fundraising.",
      "Faster go-to-market: Procurement relaxations open doors to pilots and POCs.",
      "Future readiness: Be prepared to claim incentives within time-bound windows.",
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
  <Typography>Keep the following handy (PDFs/links/screens as applicable):</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Incorporation certificate and PAN of the entity.",
      "Directors/partners’ details (IDs, emails, phone numbers).",
      "Brief write-up/deck describing innovation, problem-solution, USP, business model, and market.",
      "Website/app/product links, demo videos, customer references or traction metrics (if any).",
      "IP filings/awards or accelerator letters (optional but supportive).",
      "Registered office address proof.",
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
  <Typography>Recognition is fully online on the Startup India portal:</Typography>
  <List sx={{ listStyleType: "decimal", pl: 4 }}>
    {[
      "Create account & profile: Sign up, verify contacts, and complete the entity profile.",
      "Application form: Enter company/LLP/firm details, team, sector, and innovation write-up.",
      "Upload/supporting info: Add pitch deck, product/website links, IP/awards if available.",
      "Self-declarations: Confirm eligibility and accept the declarations.",
      "Submit & track: Submit the application and monitor status on your dashboard.",
      "Download certificate: Upon approval, obtain the recognition certificate and startup ID.",
    ].map((item) => (
      <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
        <ListItemText primary={item} />
      </ListItem>
    ))}
  </List>

  {/* What if not recognized */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    What If You Don’t Get Recognized?
  </Typography>
  <Typography paragraph>
    There is no statutory “penalty” for not applying, but you may miss out on incentives and relaxations. If an
    application is rejected due to insufficient innovation details or documentation gaps, you can refine the narrative
    and re-apply. Misrepresentation can lead to revocation and potential consequences under applicable laws.
  </Typography>

  {/* How Rekotax Can Help */}
  <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 500, mt: 6, mb: 2 }}>
    How Rekotax Can Help You
  </Typography>
  <Typography>We streamline recognition with precision:</Typography>
  <List sx={{ pl: 3 }}>
    {[
      "Eligibility & narrative: Assess fit, refine the innovation storyline, and map to DPIIT criteria.",
      "Document prep & filing: Curate a crisp deck, compile proofs, and file accurately.",
      "Post-recognition actions: Guidance on 80-IAC application, angel-tax relaxations, and IPR rebates.",
      "Tender & GeM readiness: Checklists for procurement opportunities and onboarding.",
      "Dedicated expert: Single point of contact till certificate and beyond.",
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
    DPIIT recognition validates your startup’s innovation and opens access to incentives, faster IPR, and public
    procurement opportunities. Apply early, keep your documentation sharp, and leverage the ecosystem to scale
    confidently.
  </Typography>
  <Typography paragraph>
    With <strong>Rekotax</strong>, you get an end-to-end, founder-first process—clear, quick, and compliant.
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
    q: "What is Startup India (DPIIT) recognition?",
    a: "An official recognition by the Department for Promotion of Industry & Internal Trade (DPIIT) on the Startup India portal for eligible innovation-driven Indian entities. It enables access to benefits such as tax incentives, IPR rebates, and public-procurement relaxations."
  },
  {
    q: "Which entity types are eligible?",
    a: "Indian Private Limited Companies, Limited Liability Partnerships (LLPs), and Registered Partnership Firms. Sole proprietorships and unregistered partnerships are not eligible."
  },
  {
    q: "What are the age and turnover limits?",
    a: "Not older than 10 years from incorporation/registration and turnover not exceeding ₹100 crore in any financial year since incorporation (plus the innovation criterion)."
  },
  {
    q: "What qualifies as ‘innovation’ for recognition?",
    a: "Innovation, development or improvement of products/services/processes, or a scalable business model with high employment/wealth creation potential. Entities formed by splitting/reconstructing an existing business are ineligible."
  },
  {
    q: "Is there a government fee to apply?",
    a: "No. DPIIT recognition is free to apply on the Startup India portal. (Professional assistance charges, if you use a service provider, are separate.)"
  },
  {
    q: "What documents are required?",
    a: "Incorporation/Registration Certificate, PAN, directors/partners details, an innovation write-up or pitch deck, website/app/product links, and any IP filings/awards/traction or funding letters (if available). Keep registered office proof handy."
  },
  {
    q: "How long does recognition take?",
    a: "Complete applications are often processed in a few working days, subject to documentation quality, responses to clarifications, and portal workload."
  },
  {
    q: "What benefits do recognized startups get?",
    a: "Potential tax holiday under Sec. 80-IAC (with separate approval), angel-tax relief (per notifications), fast-track IPR with fee rebates, procurement relaxations/GeM facilitation, and access to Startup India programs, seed funds, and networks."
  },
  {
    q: "Is the 3-year tax holiday automatic after recognition?",
    a: "No. Section 80-IAC requires a separate application and approval. On approval, a 100% profit deduction for any 3 consecutive years within the permitted window may be claimed, subject to conditions."
  },
  {
    q: "How does angel-tax relief work?",
    a: "Recognized startups may get relief on share-premium taxation for specified investments, subject to notified conditions, eligible investor categories, valuation norms, and prescribed filings."
  },
  {
    q: "What public-procurement benefits apply?",
    a: "Relaxations in prior experience/turnover criteria in eligible government tenders and easier GeM onboarding, while still meeting essential technical/quality requirements of each tender."
  },
  {
    q: "What IPR benefits are available?",
    a: "Fast-track patent examination, significant fee rebates (e.g., patents/trademarks as per prevailing schedules), and access to facilitator programs like SIPP to reduce time and cost."
  },
  {
    q: "How long is DPIIT recognition valid?",
    a: "As long as the entity meets the Startup definition—within 10 years of incorporation and below ₹100 crore turnover—and complies with ongoing conditions. Crossing limits generally ends startup status (the company continues to operate)."
  },
  {
    q: "Can foreign subsidiaries apply?",
    a: "The recognized entity must be incorporated/registered in India (Company/LLP/Registered Partnership). Foreign investment/shareholding is allowed per law; eligibility is assessed on the Indian entity and compliance with DPIIT and FEMA/FDI rules."
  },
  {
    q: "Can I edit my application or details after submission?",
    a: "You can respond to portal clarifications and keep your Startup profile updated (team, traction, IP, address, website). Reflect material changes promptly to avoid issues during benefit applications."
  },
  {
    q: "Is GST or any other registration mandatory first?",
    a: "Not specifically for recognition, but you must be a legally incorporated Indian entity. Obtain other registrations relevant to your business model (e.g., GST, Shops & Establishment, FSSAI) for operations and diligence."
  },
  {
    q: "Can pre-revenue or prototype-stage startups apply?",
    a: "Yes. Provide a clear problem–solution narrative, innovation write-up, and evidence such as prototype/pilots/IP filings/demos/user feedback. Strong documentation aids faster approval."
  },
  {
    q: "Does recognition guarantee funding?",
    a: "No. It improves access to ecosystem programs (Seed Fund, Fund of Funds via SIDBI, incubators/accelerators), each with separate eligibility and selection criteria."
  },
  {
    q: "Can recognition/status be lost later?",
    a: "Yes—on crossing 10 years or ₹100 crore turnover, or for material misstatements. Maintain true and complete disclosures and retain proof of innovation/operations for verification."
  },
  {
    q: "How does Rekotax help with DPIIT recognition?",
    a: "End-to-end support: eligibility check, innovation write-up/deck, profile setup, filing, responses to clarifications, and post-recognition guidance on 80-IAC, angel-tax relief, IPR rebates, and GeM onboarding."
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
