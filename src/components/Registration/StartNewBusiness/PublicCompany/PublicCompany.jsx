import React from "react";
import { useRef } from "react";
import Footer from "../../../Dashboard/Footer";
import WhyRekotax from "../../../Dashboard/WhyRekotax";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";
import { Stack, MenuItem } from "@mui/material";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ContactSection from "../../../Dashboard/ContactSection";
const theme = createTheme({
  typography: {
    fontFamily:
      'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h6: { fontWeight: 700 },
  },
  palette: {
    primary: { main: "#0f2555" },
    background: { default: "transparent" },
  },
  shape: { borderRadius: 12 },
});

const cardData = [
  {
    title: "Company-Related Documents",
    items: [
      "3-4 proposed company name options",
      "Description of business activities and objectives",
      "Details of authorized and paid-up capital",
      "Shareholding pattern",
      "Draft Memorandum of Association (MOA)",
      "Draft Articles of Association (AOA)",
      "Board resolution for appointment of first directors",
    ],
  },
  {
    title: "For Directors & Shareholders",
    items: [
      "PAN Card & Aadhaar Card (for Indian nationals)",
      "Passport (for foreign nationals/NRIs)",
      "Passport-sized photograph",
      "Residential proof (utility bill not older than 2 months)",
      "Personal bank statement (not older than 2 months)",
      "Voter ID or Driving License",
      "Mobile number linked with Aadhaar",
      "Email ID",
      "Specimen signature",
      "For foreign nationals: notarized and apostilled documents",
    ],
  },
  {
    title: "For Registered Office",
    items: [
      "Recent utility bill or property tax receipt (not older than 2 months)",
      "No Objection Certificate (NOC) from the owner (if rented)",
      "Copy of rent/lease agreement (if applicable)",
      "Proof of ownership or occupancy",
    ],
  },
];


export default function Llp({ webAppUrl, onSubmitted }) {

  const BRAND_PRIMARY = "#0f3d7c";   // solid brand color
  const BRAND_SECONDARY = "#023691";
  const BRAND_GRADIENT = "linear-gradient(11deg, #0f2555 0%, #023691 100%)";
  // const aboutRef = useRef(null);
  // helper to check required fields (Message is optional)


  const footerRef = useRef(null);
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
  // Controls single-open accordion behavior
  const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
  const handleAccordionToggle = (idx) => {
    setExpanded((prev) => (prev === idx ? null : idx));
  };

  const [form, setForm] = React.useState(initialForm);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [snack, setSnack] = React.useState({
    open: false,
    severity: "success",
    msg: "",
  });
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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

  const [showReqWarn, setShowReqWarn] = React.useState(false);
  const isFormValid = requiredOk(form);
  const nameRe = /^[A-Za-z][A-Za-z\s'.-]{1,}$/;

  const validateField = (name, value) => {
    const v = (value ?? "").trim();
    switch (name) {
      case "name":
        if (!v) return "Name is required";
        if (!nameRe.test(v)) return "Enter a valid name";
        return "";
      case "phone": {
        const digits = v.replace(/\D/g, "");
        if (!digits) return "Phone is required";
        if (digits.length < 10 || digits.length > 15) return "Enter a valid phone";
        return "";
      }
      case "email":
        if (!v) return "Email is required";
        if (!emailRe.test(v)) return "Enter a valid email";
        return "";
      case "subject":
        if (!v) return "Subject is required";
        return "";
      case "message":
        if (!v) return "Message is required";
        if (v.length < 5) return "Message is too short";
        return "";
      default:
        return "";
    }
  };
  // put this inside your component (top-level)
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

  const validateForm = (data) => {
    const fields = ["name", "phone", "email", "subject", "message"];
    const out = {};
    fields.forEach((f) => {
      const msg = validateField(f, data[f]);
      if (msg) out[f] = msg;
    });
    return out;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (showReqWarn && requiredOk(next)) setShowReqWarn(false);
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


  return (
    <Box
      sx={{
        // brand gradient background
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        bgcolor: "transparent",
        backgroundImage: `
      /* subtle brand-tinted glows (optional, kept) */
      radial-gradient(1000px 600px at 76% 60%, rgba(2,54,145,0.20), rgba(2,54,145,0) 60%),
      radial-gradient(800px 420px at 20% 10%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%),
      /* main brand gradient */
      linear-gradient(118deg, #0f2555 0%, #023691 100%)
    `,
        backgroundBlendMode: "screen, normal, normal",
        backgroundRepeat: "no-repeat",

        // page gutters & top offset for fixed AppBar
        maxWidth: "100%",
        mx: "auto",
        px: { xs: 1, sm: 2, md: 3 },

        pt: { xs: "88px", md: "94px" },
        mt: { xs: -12, md: -15 },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Hero compo */}
        <Grid
          container
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
          columnSpacing={{ xs: 2, sm: 4, md: 10 }}
          rowSpacing={{ xs: 4, sm: 5, md: 0 }}
          sx={{
            // center the whole hero section and add responsive gutters
            maxWidth: { xs: "100%", md: 1200, lg: 1280 },
            mx: "auto",
            px: { xs: 2, sm: 3, md: 6 },
            flexWrap: { xs: "wrap", md: "nowrap" },
            mt: { xs: 2, md: 6 },
          }}
        >
          {/* LEFT: text (narrower, like your reference) */}
          <Grid item xs={12} md={3} zeroMinWidth sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, lineHeight: 1 }}
            >
              Public Company Registration         </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              Register your Public Company with Rekotax — experience
              fast setup,
              <br />
              full legal compliance, expert documentation, and dedicated support
              to launch <br />
              your business effortlessly.
            </Typography>
            <ul
              style={{
                paddingLeft: "1rem",
                marginBottom: "1rem",
                fontSize: "1rem",      // ✅ same as the Typography above
                lineHeight: 1.6,       // (optional) match the paragraph’s line-height
              }}
            >
              <li> <strong>Get Your LLP Registered in Just 7–10 Days</strong></li>
              <li><strong>End-to-End Documentation:</strong> Name Approval, MOA & AOA</li>
              <li><strong>Complete Incorporation Kit:</strong> COI, DIN, DSC, PAN & TAN</li>
              <li><strong>Trusted</strong> by Entrepreneurs, Backed by Industry Experts</li>
              <li>Handled by <strong>MCA-Registered Professionals</strong></li>
            </ul>


            <Box
              sx={{
                position: "relative",
                borderRadius: 9999,
                maxWidth: 420,
                px: 3,
                py: 2.5,
                pl: 9, // room for the icon
                color: "#fff",
                background:
                  "linear-gradient(160deg, #1a3b7a 0%, #0f2555 55%, #0a1b3c 100%)",
                boxShadow:
                  "0 18px 30px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* soft corner glow */}
              <Box
                sx={{
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(160px 80px at 85% 20%, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />

              {/* icon badge */}
              <Box
                sx={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.25), 0 10px 18px rgba(0,0,0,0.28)",
                }}
              >
                {/* simple line icon (inline SVG) */}
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{ width: 30, height: 30, stroke: "#fff", opacity: 0.9 }}
                  fill="none"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 15v4a2 2 0 0 0 2 2h2" />
                  <path d="M17 9V5a2 2 0 0 0-2-2h-2" />
                  <path d="M3 12h8" />
                  <path d="M13 12h8" />
                  <path d="M5 12l2-2m0 4-2-2" />
                  <path d="M19 12l-2-2m0 4 2-2" />
                </Box>
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Fastest Company Registration in India
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.25 }}>
                MCA filing in 7 days or full refund guaranteed.
              </Typography>
            </Box>

          </Grid>

          {/* RIGHT: form (wider, like your reference) */}
          <Grid item xs={12} md={9} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                ml: { md: 2 }, // small gutter on desktop
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 3,                 // ↓ was 4
                display: "flex",
                flexDirection: "column",
                gap: 2,               // ↓ was 3
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                maxWidth: 720,        // keep a nice readable width
                // Optional hard cap (uncomment if you want a strict max height):
                // maxHeight: 520,
                // overflowY: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#d1d5db", textAlign: "center" }}
              >
                Get Expert Consultation
              </Typography>

              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Name*"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name || ""}
                sx={fieldSx}
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                {/* Country code */}
                <TextField
                  select
                  size="small"
                  variant="filled"
                  name="countryCode"
                  label="Code"
                  value={form.countryCode}
                  onChange={handleChange}
                  sx={{
                    ...fieldSx,
                    width: { xs: "100%", sm: 120 },
                    flex: { xs: "1 1 auto", sm: "0 0 auto" },
                  }}
                  InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
                  SelectProps={{
                    MenuProps: { PaperProps: { sx: { minWidth: 220 } } },
                  }}
                >
                  <MenuItem value="+91">+91 (IN)</MenuItem>
                  <MenuItem value="+971">+971 (AE)</MenuItem>
                  <MenuItem value="+61">+61 (AU)</MenuItem>
                  <MenuItem value="+49">+49 (DE)</MenuItem>
                  <MenuItem value="+1">+1 (US)</MenuItem>
                  <MenuItem value="+86">+86 (CN)</MenuItem>
                </TextField>

                {/* Phone number */}
                <TextField
                  size="small"
                  variant="filled"
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
                  sx={{ ...fieldSx, mb: 0, flex: 1, minWidth: 0 }}
                  InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
                />
              </Stack>

              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Your email*"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email || ""}
                sx={fieldSx}
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />

              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Subject*"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                error={Boolean(errors.subject)}
                helperText={errors.subject || ""}
                sx={fieldSx}
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />

              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Message"
                multiline
                minRows={2}
                name="message"
                value={form.message}
                onChange={handleChange}
                error={Boolean(errors.message)}
                helperText={errors.message || ""}
                sx={fieldSx}
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />



              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 1.5, backgroundColor: "#000", borderRadius: 10, px: 5, py: 0.8, alignSelf: "center", ":hover": { backgroundColor: "#222" } }}
              >
                SUBMIT
              </Button>


              <Snackbar
                open={snack.open}
                autoHideDuration={1200}
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
            </Box>
          </Grid>

        </Grid>

        {/* Cards grid */}
        <Box
          sx={{
            // py: { xs: -11, md: -21 },
            //px: { xs: 2, md: 5 },
            mx: { xs: -1, sm: -2, md: -3 },
            mt: 5,
            mb: 4,
            px: 0,
            py: 1,
            backgroundColor: "#f5f7fb",
          }}
        >
          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 500,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Documents Required
          </Typography>
          <Typography
            variant="h6" // smaller subtitle like the screenshot
            sx={{
              color: "#0f2555",
              fontWeight: 300,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            To register your Public Company seamlessly, you’ll need to submit basic identity, address, and office-related documents.
          </Typography>

          <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              wrap="nowrap"
              sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
            >
              {cardData.map((card) => (
                <Grid
                  item
                  key={card.title}
                  xs={12}
                  md={4}
                  sx={{
                    flex: { xs: "0.5 0.5 100%", md: "0.5 0.5 33.33%" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: 3,
                      p: 4,
                      width: "100%",
                      maxWidth: 360,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#0f2555",
                        mb: 2,
                        textAlign: "left",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <ul
                      style={{
                        textAlign: "left",
                        paddingLeft: "1.2rem",
                        color: "#333",
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {card.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "8px" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>


          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 8, md: 10 }, // top spacing to clear navbar or previous section
              mb: { xs: 6, md: 8 }, // space below before next content
              px: { xs: 2, md: 0 }, // side padding on small screens
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                color: "#4A5A7D", // main heading color
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Simplified Process to Register <br /> Public Company in India

            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#0f2555", // subtitle color
                fontWeight: 300,
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Setting up your Public Company is simpler than you think — especially with Rekotax guiding every step.
              Here’s a streamlined breakdown of the entire process:
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 0, md: 0 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    num: 1,
                    title: "Reserve Company Name",
                    desc: "Choose 3–6 unique name options that reflect your business. We’ll help check availability and ensure it ends with “(OPC) Private Limited”.",
                  },
                  {
                    num: 2,
                    title: "Get DSC & DIN",
                    desc: "Apply for Digital Signature Certificate and Director Identification Number to sign and file incorporation forms online.",
                  },
                  {
                    num: 3,
                    title: "Submit Incorporation Docs",
                    desc: "Prepare and submit MOA, AOA, INC-3 (Nominee consent), INC-9 (Director declaration) using the SPICe+ form on the MCA portal.",
                  },
                  {
                    num: 4,
                    title: "Pay Government Fees",
                    desc: "Pay applicable government and stamp duties based on the state and authorized capital — we’ll calculate and manage this for you.",
                  },
                  {
                    num: 5,
                    title: "Get Certificate of Incorporation",
                    desc: "Registrar verifies your application and issues the Certificate of Incorporation (COI) with your unique CIN — you’re now legally registered!",
                  },
                  {
                    num: 6,
                    title: "Post-Incorporation Compliance",
                    desc: "Open a current account, apply for PAN, TAN & GST, and set up accounting and compliance systems. We’ll guide you through everything.",
                  },
                ]

                  .map((step) => (
                    <Grid
                      key={step.num}
                      item
                      xs={12}
                      sm={6}
                      md={4} // 3 per row on md+
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          width: "100%",
                          maxWidth: 360,
                          boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: "50%",
                              backgroundColor: "#0f2555",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.2em",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mx: "auto",
                              mb: 2,
                              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            }}
                          >
                            {step.num}
                          </Box>

                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#0f2555", mb: 1.5 }}
                          >
                            {step.title}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "0.95em",
                              lineHeight: 1.6,
                              textAlign: "left",
                              color: "#333",
                            }}
                          >
                            {step.desc}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 500,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Our Approach
          </Typography>
          <Box
            sx={{
              backgroundColor: "transparent",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    num: 1,
                    text: "Fill our Registration Form & Make the Payment",
                  },
                  {
                    num: 2,
                    text: "Expert Will Call You & Receive All Necessary Documents",
                  },
                  {
                    num: 3,
                    text: "Will Create DSC & the DIN Number of Director",
                  },
                  {
                    num: 4,
                    text: "MOA and AOA Drafting & Submit",
                  },
                  {
                    num: 5,
                    text: "Your Documents will be Filed & Submitted to the ROC",
                  },
                  {
                    num: 6,
                    text: "Congratulations! You've registered your company. Certificates will be sent by post. 👍",
                  },
                ].map((step) => (
                  <Grid
                    key={step.num}
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 cards per row on md+ screens
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#0f2555",
                        color: "#fff",
                        borderRadius: 2,
                        width: 280,
                        height: 200,
                        p: 3,
                        position: "relative",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
                        {step.text}
                      </Typography>

                      {/* Arrow except for the last card */}
                      {step.num !== 6 && (
                        <Typography
                          sx={{
                            mt: 2,
                            fontSize: 20,
                            fontWeight: "bold",
                            display: "inline-block",
                          }}
                        >
                          →
                        </Typography>
                      )}

                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 20,
                          fontSize: 100,
                          fontWeight: "bold",
                          color: "#b5b7bb",
                          opacity: 0.2,
                          pointerEvents: "none",
                        }}
                      >
                        {step.num}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>


          <WhyRekotax />

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 500,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Public Company Registration:
            A Complete Guide
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="md">
              {/* Section 1 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 500 }}>
                  Understanding Public Limited Company
                </Typography>
                <Typography sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  A Public Limited Company (PLC) is a corporate structure that allows businesses to raise capital from the public by issuing shares.
                  Governed under the Companies Act, 2013, it offers limited liability to shareholders, strong governance, and potential for large scale operations.
                  It is ideal for enterprises targeting market expansion, funding through IPOs, and wider public participation.
                </Typography>
              </Box>

              {/* Section 2 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Why Opt for a Public Limited Company?
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Enables fundraising by issuing shares to the general public.</li>
                    <li>Offers limited liability protection to all shareholders.</li>
                    <li>Enhances brand reputation and market credibility.</li>
                    <li>Suitable for companies targeting growth through stock markets.</li>
                    <li>Transparent regulatory framework that builds investor trust.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 3 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Key Features of a Public Limited Company
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li><strong>Minimum 3 Directors:</strong> At least one director must be an Indian resident.</li>
                    <li><strong>Minimum 7 Shareholders:</strong> Mandatory to incorporate a PLC.</li>
                    <li><strong>No Upper Shareholder Limit:</strong> A public company can have unlimited shareholders.</li>
                    <li><strong>Separate Legal Identity:</strong> Exists independently of promoters and shareholders.</li>
                    <li><strong>Share Transferability:</strong> Shares are freely transferable and tradable after listing.</li>
                    <li><strong>Stock Exchange Listing:</strong> Option to list on recognized exchanges and raise funds via IPO.</li>
                    <li><strong>Transparency &amp; Disclosure:</strong> Must publish financials and comply with SEBI norms.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 4 - Benefits */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Benefits of Registering a Public Company
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Access to Capital
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Raise funds from individuals, institutions, and the public through share issuance.</li>
                    <li>Eligible to issue securities via Initial Public Offering (IPO).</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Enhanced Brand Visibility
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Listed companies gain credibility with investors, banks, and stakeholders.</li>
                    <li>Corporate governance strengthens brand image and investor confidence.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Limited Liability Shield
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Personal assets of shareholders are protected from company liabilities.</li>
                    <li>Risk is confined to the value of shareholding.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Perpetual Succession
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Company continues despite changes in ownership or management.</li>
                    <li>Supports long term stability and continuity.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Transferability of Shares
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Shares can be freely traded or transferred after listing.</li>
                    <li>Provides liquidity to shareholders and attracts investment.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 5 - Mandatory Requirements */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Mandatory Requirements for Public Company Incorporation
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Minimum 3 Directors and 7 Shareholders.</li>
                    <li>DIN and DSC for all directors.</li>
                    <li>Registered office in India with valid address proof and NOC if premises are rented.</li>
                    <li>Memorandum of Association (MoA) and Articles of Association (AoA).</li>
                    <li>DIR-2 consents from directors and INC-9 declarations.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 6 - Documents Required */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Documents Required for Registration
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>PAN and identity proof (Aadhaar, Passport, Voter ID) of all directors and shareholders.</li>
                    <li>Recent passport size photographs of directors.</li>
                    <li>Registered office proof - electricity bill or rent agreement not older than 2 months.</li>
                    <li>NOC from the property owner if the premises are rented.</li>
                    <li>Digital Signature Certificates for directors.</li>
                    <li>DIN application where not already allotted.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 7 - Post Incorporation Compliance */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Post-Incorporation Compliance Checklist
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Appointment of Auditor within 30 days.</li>
                    <li>Commencement of Business declaration in Form INC-20A.</li>
                    <li>First board meeting within 30 days of incorporation.</li>
                    <li>Allotment of shares and issuance of share certificates.</li>
                    <li>Maintenance of statutory registers and records.</li>
                    <li>Filing of annual returns, financial statements, and ROC compliances.</li>
                    <li>Timely GST registration and tax filings, as applicable.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 8 - COI */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Certificate of Incorporation (COI) - Official Proof of Registration
                </Typography>
                <Typography sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  The Ministry of Corporate Affairs issues the Certificate of Incorporation on successful registration.
                  It confirms legal existence and typically includes:
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Company Identification Number (CIN)</li>
                    <li>Date of incorporation and legal recognition</li>
                    <li>Authorized and paid up capital details</li>
                    <li>Jurisdiction of the Registrar of Companies (ROC)</li>
                  </ul>
                </Typography>
                <Typography sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  The COI enables the company to commence operations, open a current account, apply for licenses,
                  and participate in tenders or contracts as a recognized corporate body.
                </Typography>
              </Box>
            </Container>
          </Box>

          <Box sx={{ width: "100%", overflowX: "auto", my: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#6b7280", // soft grey tone
                fontWeight: 500,
                mb: 4,
                fontSize: { xs: "2rem", md: "2.8rem" },
                lineHeight: 1.3,
                bgcolor: "#fff",
                textAlign: "center", // ✅ center the text
              }}
            >
              Comparisons
            </Typography>
            <Box sx={{ px: { xs: 2, md: 6 }, my: 4 }}>
              <Box
                component="table"
                sx={{
                  px: { xs: 2, md: 3 },
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: { xs: "8px", sm: "10px" },
                  tableLayout: "fixed",
                  bgcolor: "#fff",
                  minWidth: { xs: 800, md: "100%" },
                  "& th, & td": {
                    border: "1px solid #ddd",
                    p: "8px 10px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  },
                  "& thead th": {
                    backgroundColor: "#0f2555",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                  "& tbody tr:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                  "& tbody tr:nth-of-type(odd)": { backgroundColor: "#ffffff" },
                  "& tbody td:first-of-type": {
                    textAlign: "left",
                    fontWeight: 600,
                    backgroundColor: "#f3f3f3",
                  },
                  // Highlight the "Public Company" column (5th data column in this order)
                  "& tbody td:nth-of-type(5)": {
                    backgroundColor: "rgba(15,61,124,0.10)",
                    color: "#000",
                  },
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th"> </Box>
                    <Box component="th">Private Limited Company</Box>
                    <Box component="th">One Person Company</Box>
                    <Box component="th">Limited Liability Partnership</Box>
                    <Box component="th">Public Company</Box>
                    <Box component="th">Proprietorship Firm</Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  <Box component="tr">
                    <Box component="td">Act</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Limited Liability Partnership Act, 2008</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">No specified Act</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Registration Requirement</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Number of members</Box>
                    <Box component="td">2 – 200</Box>
                    <Box component="td">Only 1</Box>
                    <Box component="td">2 – Unlimited</Box>
                    <Box component="td">7 – Unlimited</Box>
                    <Box component="td">Only 1</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Number of Directors</Box>
                    <Box component="td">Minimum 2</Box>
                    <Box component="td">Minimum 1</Box>
                    <Box component="td">Designated Partners: Minimum 2</Box>
                    <Box component="td">Minimum 3</Box>
                    <Box component="td">Only 1</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Separate Legal Entity</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Liability Protection</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Audit</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Dependent</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Not mandatory</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Ownership Transferability</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Uninterrupted Existence</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Foreign Participation</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Tax Rates</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">High</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Low</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Compliance</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Less</Box>
                  </Box>
                </Box>
              </Box>
            </Box>


          </Box>
          {/* 
          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 500,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Get Expert Consultation
          </Typography> */}
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
                  q: "1. What is a Public Limited Company?",
                  a: "A Public Limited Company (PLC) is a company incorporated under the Companies Act, 2013, which offers its shares to the general public and is listed on a recognized stock exchange.",
                },
                {
                  q: "2. What is the minimum number of shareholders required to form a PLC?",
                  a: "A minimum of 7 shareholders is required to incorporate a Public Limited Company in India.",
                },
                {
                  q: "3. What is the minimum number of directors required in a Public Company?",
                  a: "A Public Company must have at least 3 directors as per the Companies Act, 2013.",
                },
                {
                  q: "4. Is there a minimum capital requirement for forming a Public Company?",
                  a: "There is no specific minimum capital requirement for incorporating a Public Company, but a realistic capital should be decided based on business needs.",
                },
                {
                  q: "5. Can a Public Company raise funds from the general public?",
                  a: "Yes, a Public Company can raise capital by issuing shares or debentures to the public through a prospectus.",
                },
                {
                  q: "6. Is it mandatory for a Public Company to get listed?",
                  a: "No, not all Public Companies are listed. A company may remain unlisted and still be termed a Public Company if it meets the required conditions.",
                },
                {
                  q: "7. Are statutory audits mandatory for Public Companies?",
                  a: "Yes, every Public Company is required to undergo an annual statutory audit by a qualified Chartered Accountant.",
                },
                {
                  q: "8. What are the compliance requirements for a Public Company?",
                  a: "Public Companies must comply with several provisions including board meetings, shareholder meetings, disclosures, and filings with the Registrar of Companies and SEBI, if listed.",
                },
                {
                  q: "9. What is the difference between a Public and a Private Company?",
                  a: "The key differences include the number of shareholders, ability to raise funds from the public, listing on stock exchanges, and regulatory compliances.",
                },
                {
                  q: "10. Can foreign nationals be shareholders or directors in a Public Company?",
                  a: "Yes, foreign nationals can be shareholders or directors, subject to FDI guidelines and other regulatory approvals.",
                },
                {
                  q: "11. What is the role of a Company Secretary in a Public Limited Company?",
                  a: "In a Public Company, appointing a qualified Company Secretary is mandatory to ensure compliance with secretarial standards and ROC filings.",
                },
                {
                  q: "12. What is the significance of issuing a prospectus?",
                  a: "A prospectus is a formal legal document that invites the public to subscribe to shares and contains vital information about the company’s financials and operations.",
                },
                {
                  q: "13. Are there any restrictions on managerial remuneration in a Public Company?",
                  a: "Yes, Section 197 of the Companies Act, 2013 prescribes limits on managerial remuneration that a Public Company can pay to its directors and KMPs.",
                },
                {
                  q: "14. What is the timeline for holding the first Board Meeting?",
                  a: "A Public Company must hold its first Board Meeting within 30 days from the date of incorporation.",
                },
                {
                  q: "15. How often must Annual General Meetings (AGMs) be conducted?",
                  a: "AGMs must be held every calendar year with not more than 15 months between two AGMs.",
                },
                {
                  q: "16. Can Public Companies accept deposits?",
                  a: "Yes, but only in compliance with the Companies (Acceptance of Deposits) Rules, 2014 and after obtaining shareholder approval and credit ratings.",
                },
                {
                  q: "17. What is the role of SEBI in relation to Public Companies?",
                  a: "SEBI regulates listed Public Companies, ensuring investor protection, disclosure norms, and corporate governance standards are followed.",
                },
                {
                  q: "18. What is the requirement of independent directors?",
                  a: "Every listed Public Company must have at least one-third of the total number of directors as independent directors as per SEBI Listing Obligations.",
                },
                {
                  q: "19. Are internal audits mandatory for Public Companies?",
                  a: "Yes, Public Companies meeting certain thresholds related to turnover and paid-up capital must conduct internal audits as per Section 138 of the Companies Act.",
                },
                {
                  q: "20. What are the penalties for non-compliance by a Public Company?",
                  a: "Penalties can include monetary fines, disqualification of directors, and even imprisonment depending on the nature and severity of non-compliance.",
                },
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


        </Box>
      </ThemeProvider>
      <Box sx={{ mt: -6, mx: -6 }} ref={footerRef}>
        <ContactSection />
      </Box>

      <Box sx={{ mt: 0, mx: 0 }} ref={footerRef}>
        <Footer />
      </Box>
    </Box>
  );
}

/*
USAGE:
- Save as src/components/PrivateLimitedCompanyDocs.jsx
- Add Open Sans font link to public/index.html.
- Import and render: <PrivateLimitedCompanyDocs />
*/
