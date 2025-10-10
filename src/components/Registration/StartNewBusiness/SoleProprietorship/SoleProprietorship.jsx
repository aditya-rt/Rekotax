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
    title: "Identity & Address Proof",
    items: [
      "PAN Card: Mandatory for tax registration and identification",
      "Aadhaar Card: Serves as both ID and address proof",
      "Passport: Useful especially for NRIs or IEC registration",
      "Voter ID Card: Acceptable alternative proof",
      "Ensure all documents carry up-to-date details",
    ],
  },
  {
    title: "Proof of Business Address",
    items: [
      "Owned Premises: Submit deed, tax receipt, or utility bill",
      "Rented Premises: Rent agreement + owner's NOC + utility bill",
      "Residential Use: Utility bills showing correct address",
      "Municipal Permissions: If required by local authorities",
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
              Sole Proprietorship Registration          </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              Register your Sole Proprietorship  Company with Rekotax — experience
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
              <li>Hassle-free assistance from start to finish</li>
              <li>GST & PAN Registration Made Easy</li>
              <li>Expert Guidance at Every Step</li>
              <li>Fast & Smooth Registration Process</li>
              <li>Preferred by Entrepreneurs Across India</li>
              <li>Support for Business Licenses & other registrations like ISO, FSSAI, Trademark etc.</li>
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
            To register your Business seamlessly, you’ll need to submit
            basic identity, address, and office-related documents.
          </Typography>

          <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              justifyContent="center"
              sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
            >
              {cardData.map((card) => (
                <Grid
                  item
                  key={card.title}
                  xs={12}
                  md={3} // 4 cards per row on desktop
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "#ffffff",
                      borderRadius: 4,                            // softer rounded corners
                      p: 3,
                      minHeight: 320,                             // keeps heights consistent like screenshot
                      boxShadow:
                        "0 10px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)", // soft outer + slight inner highlight
                      border: "1px solid rgba(0,0,0,0.06)",
                      transition: "transform .25s ease, box-shadow .25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow:
                          "0 16px 36px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        color: "#0f2555",
                        mb: 1.5,
                        textAlign: "left",
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Box
                      component="ul"
                      sx={{
                        m: 0,
                        pl: 2.2,
                        color: "#3b4453",
                        lineHeight: 1.7,
                        fontSize: { xs: 10, sm: 11, md: 11.5 },
                        "& li": { mb: 1 },
                      }}
                    >
                      {card.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </Box>
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
              Simplified Process to Register Your <br /> Business in
              India
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
              Setting up your Sole Proprietorship  is simpler than you think —
              especially with Rekotax guiding every step. Here’s a streamlined
              breakdown of the entire process:
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
                    title: "Business Name & Structure Setup",
                    desc: "Choose a unique business name that reflects your activity. Clearly define the type of business and services/products you offer.",
                  },
                  {
                    num: 2,
                    title: "Document Preparation",
                    desc: "Collect PAN, Aadhaar, photos, and address proof. Secure valid proof of business premises like a rent agreement or utility bill.",
                  },
                  {
                    num: 3,
                    title: "Essential Registrations",
                    desc: "Apply for a PAN card (if not already available). Register for GST if applicable and obtain a Shop & Establishment License from the local authority.",
                  },
                  {
                    num: 4,
                    title: "Banking Setup",
                    desc: "Open a current account in your business name using the registered documents to enable proper financial operations.",
                  },
                  {
                    num: 5,
                    title: "Additional Licenses",
                    desc: "Register for Professional Tax if applicable in your state. Apply for required sector-specific licenses like FSSAI, Trade License, etc.",
                  },
                  {
                    num: 6,
                    title: "Optional & Ongoing Compliance",
                    desc: "Consider MSME (Udyam) registration for benefits. Set up bookkeeping, accounting, and tax compliance systems from the start.",
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
                    text: "We will prepare all the necessary documetns & DSC",
                  },
                  {
                    num: 4,
                    text: "Drafting of all the necessary documents & forms",
                  },
                  {
                    num: 5,
                    text: "Your Documents will be Filed & Submitted with the respective authorities",
                  },
                  {
                    num: 6,
                    text: "Congratulations! You've registered your Sole Proprietorship. Certificates will be sent by post. 👍",
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
            Sole Proprietorship Registration:
            A Complete Guide          </Typography>
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
                  What is a Sole Proprietorship?
                </Typography>
                <Typography  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  A sole proprietorship is a business owned and operated by one individual. It is the simplest business structure available in India, offering full control to the owner with minimal compliance requirements. This model is ideal for freelancers, local traders, professionals, and home-based entrepreneurs looking to start small and scale with time.                </Typography>
              </Box>

              {/* Section 2 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Who Should Choose This Structure?
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>Freelancers and independent service providers</li>
                    <li>Retailers, resellers, and small shop owners</li>
                    <li>Professionals such as CAs, doctors, and consultants</li>
                    <li>Digital creators, online sellers, and tutors</li>
                    <li>Artisans and small manufacturers</li>
                  </ul>

                </Typography>
              </Box>

              {/* Section 3 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Why Register a Sole Proprietorship?
                </Typography>
                <Typography component="div" sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>Establishes legal recognition and credibility</li>
                    <li>Allows opening of a business bank account</li>
                    <li>Required for GST and other tax registrations</li>
                    <li>Makes you eligible for government schemes and loans</li>
                    <li>Helps build professional trust and contractual validity</li>
                  </ul>

                </Typography>
              </Box>

              {/* Section 4 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Step-by-Step Registration Process

                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li><strong>Choose a Business Name</strong> - ensure it's unique and reflects your activity.</li>
                    <li><strong>Get Basic Documents</strong> - PAN, Aadhaar, and proof of business address.</li>
                    <li><strong>Apply for Registrations</strong> - GST, Shop & Establishment, and other applicable licenses.</li>
                    <li><strong>Open a Current Account</strong> - use your documents to start banking operations.</li>
                    <li><strong>Register under MSME (Optional)</strong> - for additional benefits like subsidies and tenders.</li>
                  </ul>

                </Typography>
              </Box>
              
               <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Key Characteristics


                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                 <ul>
  <li><strong>Single Owner</strong> - one person is fully responsible and controls the business.</li>
  <li><strong>No Legal Separation</strong> - the business and owner are treated as one legal entity.</li>
  <li><strong>Unlimited Liability</strong> - personal assets can be used to cover business liabilities.</li>
  <li><strong>Simplified Taxation</strong> - income is taxed as part of the owner’s personal income.</li>
  <li><strong>Minimal Compliance</strong> - no ROC filing, no complex procedures.</li>
</ul>


                </Typography>
              </Box>
              {/* Section 5 */}
           



            {/* Benefits of Going Legal */}
<Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
  <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
    Benefits of Going Legal
  </Typography>

  <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    Professional Image
  </Typography>
  <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    <ul>
      <li>Gain trust with suppliers and customers</li>
      <li>Boost brand perception</li>
    </ul>
  </Typography>

  <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    Banking &amp; Finance Access
  </Typography>
  <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    <ul>
      <li>Get business loans and credit cards</li>
      <li>Apply for digital payment gateways</li>
    </ul>
  </Typography>

  <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    Compliance Ready
  </Typography>
  <Typography component="div" s sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    <ul>
      <li>File GST and ITR returns with proper documentation</li>
      <li>Participate in tenders and secure licenses</li>
    </ul>
  </Typography>

  <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    Future Growth
  </Typography>
  <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    <ul>
      <li>Easy to upgrade to a company or LLP later</li>
      <li>Build a track record for investors and banks</li>
    </ul>
  </Typography>
</Box>

{/* Documents Required */}
<Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
  <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
    Documents Required
  </Typography>
  <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
    <ul>
      <li>PAN and Aadhaar Card</li>
      <li>Proof of Business Address (Rent Agreement or Utility Bill)</li>
      <li>Passport-sized Photographs</li>
      <li>GST Registration Certificate (if applicable)</li>
      <li>Shop and Establishment License</li>
      <li>Bank KYC Documents</li>
    </ul>
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
                  "& tbody tr:nth-of-type(even)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "& tbody tr:nth-of-type(odd)": {
                    backgroundColor: "#ffffff",
                  },
                  "& tbody td:first-of-type": {
                    textAlign: "left",
                    fontWeight: 600,
                    backgroundColor: "#f3f3f3",
                  },
                  // Highlight the "Private Limited Company" column (now the 2nd column in tbody rows)
                  "& tbody td:nth-of-type(6)": {
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
                    <Box component="th">Partnership Firm</Box>
                    <Box component="th">Proprietorship</Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  <Box component="tr">
                    <Box component="td">Act</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Limited Liability Partnership Act, 2008</Box>
                    <Box component="td">Indian Partnership Act, 1932</Box>
                    <Box component="td">No specified Act</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Registration Requirement</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Optional</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Number of members</Box>
                    <Box component="td">2 – 200</Box>
                    <Box component="td">Only 1</Box>
                    <Box component="td">2 – Unlimited</Box>
                    <Box component="td">2 – 50</Box>
                    <Box component="td">Only 1</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Separate Legal Entity</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Liability Protection</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                    <Box component="td">Unlimited</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Audit</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Dependent</Box>
                    <Box component="td">Not mandatory</Box>
                    <Box component="td">Not mandatory</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Ownership Transferability</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Uninterrupted Existence</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Foreign Participation</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
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
                    <Box component="td">Less</Box>
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
                  q: "What is sole proprietorship registration?",
                  a: "It is the process of legally recognizing a single individual as the owner of a business. It gives the proprietor the ability to operate under a trade name and obtain necessary licenses.",
                },
                {
                  q: "Who can register a sole proprietorship in India?",
                  a: "Any Indian citizen with valid identity and address proof can register a sole proprietorship, provided they meet basic compliance norms and licensing requirements.",
                },
                {
                  q: "Is there any minimum requirement to start a sole proprietorship?",
                  a: "No minimum capital or documentation is required by law, but you may need GST, MSME, or local licenses depending on your business activity.",
                },
                {
                  q: "What is a sole proprietorship certificate?",
                  a: "It is a license or registration certificate (like GST, Shop & Establishment, or Udyam) that serves as proof of your sole proprietorship's existence.",
                },
                {
                  q: "What is the cost of registration of a sole proprietorship in India?",
                  a: "It varies from ₹1,000 to ₹5,000 depending on the type of license and the state or municipality you’re operating in.",
                },
                {
                  q: "What are the different types of sole proprietorship businesses?",
                  a: "Common types include traders, freelancers, consultants, small retailers, and service providers. All are legally treated as the individual owner.",
                },
                {
                  q: "What is the validity period of a sole proprietorship registration?",
                  a: "Validity depends on the license obtained. For example, a Shop Act license may need renewal annually or every 3–5 years.",
                },
                {
                  q: "Is GST registration mandatory for a sole proprietorship?",
                  a: "It’s mandatory if your turnover exceeds ₹20/40 lakh, or if you sell interstate, online, or deal in taxable goods or services.",
                },
                {
                  q: "What is the difference between a sole proprietorship and other business structures?",
                  a: "Sole proprietorships have single ownership and unlimited liability, unlike LLPs and companies which offer separate legal identity and limited liability.",
                },
                {
                  q: "How do I choose the correct business activity classification?",
                  a: "Choose based on your product or service offering using NIC codes or categories provided under MSME or GST registration.",
                },
                {
                  q: "Can a sole proprietorship operate under multiple business names?",
                  a: "Yes, but each name may require separate registration, bank accounts, and compliance depending on how you structure the operations.",
                },
                {
                  q: "Can I register a business name already in use by someone else?",
                  a: "No, names that are identical or deceptively similar to an existing business, especially trademarks, should be avoided to prevent legal issues.",
                },
                {
                  q: "Can I register a sole proprietorship without a physical office?",
                  a: "Yes, you can use a residential or virtual office address as long as you can provide address proof and an NOC if required.",
                },
                {
                  q: "How long does a sole proprietorship registration take in India?",
                  a: "It generally takes 2–7 working days depending on the type of registration and documentation provided.",
                },
                {
                  q: "Can I use my name as the business name without registration?",
                  a: "Yes, but it’s recommended to register it under Udyam or GST to gain legal recognition and build trust.",
                },
                {
                  q: "What is the difference between proprietorship and proprietorship firm registration?",
                  a: "Proprietorship refers to the business model, while firm registration involves obtaining licenses like GST or Shop Act to give it formal identity.",
                },
                {
                  q: "Is a PAN card different for a sole proprietorship business?",
                  a: "No. The proprietor’s personal PAN is used for all business and tax-related purposes.",
                },
                {
                  q: "Can a sole proprietorship avail of business loans?",
                  a: "Yes, proprietors can apply for loans using their business proof such as GST registration, bank statements, and income tax filings.",
                },
                {
                  q: "What happens to a sole proprietorship after the owner's death?",
                  a: "The business ceases to exist, unless the legal heir continues operations in their own name or structure.",
                },
                {
                  q: "What are the annual compliance requirements for a sole proprietorship?",
                  a: "File annual ITR, maintain books of accounts, and renew any specific licenses as required by law.",
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
