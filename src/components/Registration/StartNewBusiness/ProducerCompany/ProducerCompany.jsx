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
    title: "Director & Member Documents",
    items: [
      "Self-attested PAN Card copies of all directors and members (minimum 10 members required)",
      "Identity proof: Aadhaar, Voter ID, Passport, or Driving License",
      "Address proof: Recent utility bill or bank statement (not older than 2 months)",
      "Passport-size photos of all directors and members",
      "Digital Signature Certificates (DSC) for all proposed directors",
    ],
  },
  {
    title: "Registered Office Proof",
    items: [
      "Recent utility bill (electricity, water, telephone) as proof of business address",
      "No Objection Certificate (NOC) from the owner of the premises",
      "Lease agreement or rent deed if the property is rented",
    ],
  },
  {
    title: "Legal Declarations",
    items: [
      "DIR-2: Consent to act as director from each proposed director",
      "Declaration of directorship and non-disqualification under Companies Act, 2013",
      "Affidavit stating the proposed activities fall under the definition of Producer Company",
      "Professional certification (CA/CS/CMA) for compliance of incorporation documents",
    ],
  },
  {
    title: "Important Notes",
    items: [
      "At least 10 individuals or 2 institutions are required as members",
      "All submitted documents must be clear, valid, and self-attested",
      "Foreign members/directors must submit apostilled and notarized documents",
      "Consistency in name, father’s name, and address across all documents is mandatory",
    ],
  },
];


export default function ProducerCompany({ webAppUrl, onSubmitted }) {

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
              Producer Company
              Registration </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              Register your Producer Company with Rekotax — experience fast
              <br />
              setup, full legal compliance, expert documentation, and dedicated  <br />
              support to launch your business effortlessly.

            </Typography>
            <ul
              style={{
                paddingLeft: "1rem",
                marginBottom: "1rem",
                fontSize: "1rem",      // ✅ same as the Typography above
                lineHeight: 1.6,       // (optional) match the paragraph’s line-height
              }}
            >
              <li> Company Registered in Just <strong>7–10 Days </strong> </li>
              <li> <strong>End-to-End Documentation:</strong>  Name Approval, MOA & AOA</li>
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
            To register your Producer Company seamlessly, you’ll need to submit basic identity, address, and office-related documents.
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
              Simplified Process to Register Your <br />Producer Company in India
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
              Setting up your Producer Company is simpler than you think — especially with Rekotax guiding every step.
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
                    title: "Name Approval via RUN",
                    desc:
                      'Select and submit unique name options with "Producer Company Limited" suffix using the RUN service on the MCA portal.',
                  },
                  {
                    num: 2,
                    title: "Obtain DSC & DIN",
                    desc:
                      "Apply for Digital Signature Certificate and DIN for all proposed directors to enable online signing and submission of forms.",
                  },
                  {
                    num: 3,
                    title: "Draft Legal Documents",
                    desc:
                      "Prepare MOA and AOA specifying objectives like production, harvesting, marketing, and member benefits as per Producer Company norms.",
                  },
                  {
                    num: 4,
                    title: "File SPICe+ Form",
                    desc:
                      "Submit SPICe+ (Part A and B), AGILE-PRO, INC-9, DIR-2, and other necessary attachments for incorporation through the MCA portal.",
                  },
                  {
                    num: 5,
                    title: "Receive Incorporation Certificate",
                    desc:
                      "Upon successful verification, the Registrar of Companies issues the Certificate of Incorporation (COI) along with PAN and TAN.",
                  },
                  {
                    num: 6,
                    title: "Start Operations & Compliances",
                    desc:
                      "Open a current bank account, maintain statutory registers, file annual returns, and fulfill Producer Company compliance requirements.",
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
                    text: "Fill out the Producer Company application form & complete payment",
                  },
                  {
                    num: 2,
                    text: "Our expert will contact you and collect all required documents",
                  },
                  {
                    num: 3,
                    text: "We will apply for Digital Signature Certificate (DSC) & DIN for all directors",
                  },
                  {
                    num: 4,
                    text: "Draft MOA & AOA including Producer Company objectives and benefits",
                  },
                  {
                    num: 5,
                    text: "File SPICe+ form with ROC along with all supporting documents",
                  },
                  {
                    num: 6,
                    text: "Your Producer Company is now registered! COI, PAN & TAN will be delivered to you",
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
            Producer Company Registration: A Complete Guide
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
                  What is a Producer Company?
                </Typography>
                <Typography sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  A Producer Company is a company registered under the Companies Act, 2013 with the objective of benefiting
                  primary producers, such as farmers, artisans, and others engaged in production. It combines the benefits of a
                  cooperative society with the structure and regulatory framework of a private limited company, providing better
                  access to capital, technology, and markets for its members.
                </Typography>
              </Box>

              {/* Section 2 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Why Register a Producer Company?
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Legal recognition for farmers and producers to operate collectively</li>
                    <li>Limited liability protection for members and directors</li>
                    <li>Separate legal entity for easier contracts and operations</li>
                    <li>Improves bargaining power and access to government schemes</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 3 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Types of Producer Activities Allowed
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>
                      <strong>Production &amp; Processing:</strong> Activities related to agriculture, horticulture, forestry, or
                      animal husbandry
                    </li>
                    <li>
                      <strong>Procurement &amp; Marketing:</strong> Buying and selling produce or services of members
                    </li>
                    <li>
                      <strong>Storage &amp; Distribution:</strong> Warehousing, transport, and logistics for farm output
                    </li>
                    <li>
                      <strong>Education &amp; Training:</strong> Offering knowledge services to producers and their families
                    </li>
                    <li>
                      <strong>Consulting Services:</strong> Technical, financial, and business assistance to members
                    </li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 4 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Key Characteristics of a Producer Company
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li><strong>Minimum 10 Members:</strong> Individuals or 2 institutions acting as members</li>
                    <li><strong>Limited Liability:</strong> Members' liability is limited to their shareholding</li>
                    <li><strong>Separate Legal Entity:</strong> Can hold assets, enter contracts, and sue or be sued</li>
                    <li><strong>No External Shareholding:</strong> Only producers can become members</li>
                    <li><strong>Annual Patronage Bonus:</strong> Profits distributed based on member participation</li>
                    <li><strong>Perpetual Succession:</strong> Continued existence despite changes in membership</li>
                    <li><strong>Professional Management:</strong> Managed by a Board of Directors with 5–15 members</li>
                    <li><strong>Mandatory Internal Audit:</strong> Regular auditing of company accounts</li>
                    <li><strong>Eligible for Credit &amp; Grants:</strong> Avail funding from NABARD, SFAC, etc.</li>
                    <li><strong>Inclusive Growth Model:</strong> Empowers marginal and small producers</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 5 - Benefits */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Benefits of Producer Company Registration
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Collective Power for Small Producers
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Members gain better pricing, logistics, and market access</li>
                    <li>Collective input sourcing and bulk selling improve profits</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Government Scheme Eligibility
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Access to grants, subsidies, and low-interest credit</li>
                    <li>Priority under programs by NABARD, SFAC, and other bodies</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Tax &amp; Financial Advantages
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Tax exemptions under Section 80P for certain activities</li>
                    <li>Eligibility for subsidies, capital assistance, and training funds</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Improved Governance
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Transparent management with regular member meetings</li>
                    <li>Professional Board ensures structured decision-making</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Enhanced Credibility
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Legal status improves trust with banks, buyers, and partners</li>
                    <li>Eligible to apply for tenders, licenses, and contracts</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Perpetual Succession &amp; Ownership
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Membership changes don’t affect company continuity</li>
                    <li>Assets and reputation grow under a sustainable model</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 6 - Post Registration */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Post-Registration Compliance
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li><strong>Annual Filing:</strong> File AOC-4 and MGT-7 with the Registrar of Companies</li>
                    <li><strong>General Meetings:</strong> Hold an Annual General Meeting (AGM) every year</li>
                    <li><strong>Director Meetings:</strong> Conduct at least 4 board meetings annually</li>
                    <li><strong>Accounting &amp; Auditing:</strong> Maintain proper books and conduct annual audits</li>
                    <li><strong>Income Tax &amp; GST:</strong> File IT returns and applicable GST returns timely</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 7 - COI */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Certificate of Incorporation: Your Legal Identity
                </Typography>
                <Typography sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  The Certificate of Incorporation (COI) issued by the Registrar of Companies (ROC) confirms that your Producer
                  Company is legally registered.
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Includes the Company Identification Number (CIN)</li>
                    <li>Mentions official date of incorporation and registered name</li>
                    <li>Serves as proof for legal, financial, and operational needs</li>
                  </ul>
                </Typography>
                <Typography sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  Uses of COI:
                </Typography>
                <Typography component="div" sx={{
                  color: "#333", // or theme.palette.text.primary
                  fontWeight: 400, // normal weight, not 200
                  fontSize: "1.05rem", // adjust size for comfortable reading
                  lineHeight: 1.8,
                  mb: 2,
                }}>
                  <ul>
                    <li>Open a current bank account</li>
                    <li>Apply for PAN, TAN, and statutory licenses</li>
                    <li>Enter into supply agreements and contracts</li>
                    <li>Establish brand credibility with stakeholders</li>
                  </ul>
                </Typography>
              </Box>
            </Container>
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
                  q: "What is a Producer Company?",
                  a: "A Producer Company is a special type of company formed under the Companies Act, 2013, for farmers, producers, or agriculturists to collectively engage in production, harvesting, processing, marketing, and selling of their products or produce.",
                },
                {
                  q: "Who can form a Producer Company in India?",
                  a: "A Producer Company can be formed by any of the following: ten or more individual producers, two or more producer institutions, or a combination of both.",
                },
                {
                  q: "What is the minimum capital required for a Producer Company?",
                  a: "The minimum authorized capital required to register a Producer Company is ₹5 lakh.",
                },
                {
                  q: "Can a Producer Company be converted into a Private Limited Company?",
                  a: "No, a Producer Company cannot be converted into any other type of company like a Private Limited or Public Limited Company.",
                },
                {
                  q: "What are the objectives of a Producer Company?",
                  a: "Objectives include production, harvesting, grading, pooling, marketing, exporting of primary produce, and providing technical services, education, or welfare measures to members.",
                },
                {
                  q: "Is GST registration mandatory for a Producer Company?",
                  a: "GST registration is mandatory if the annual turnover exceeds the prescribed threshold limit or if the company is engaged in inter-state supply of goods or services.",
                },
                {
                  q: "Can a Producer Company accept deposits from the public?",
                  a: "No, a Producer Company cannot accept deposits from the public. It can only raise funds through its members or by issuing shares and debentures as per law.",
                },
                {
                  q: "What documents are required to incorporate a Producer Company?",
                  a: "Required documents include PAN, Aadhaar, address proof of all directors, passport-sized photos, utility bill of the registered office, and a NOC from the property owner.",
                },
                {
                  q: "How many directors are required in a Producer Company?",
                  a: "A Producer Company must have at least 5 and not more than 15 directors on its board.",
                },
                {
                  q: "Is audit mandatory for a Producer Company?",
                  a: "Yes, a Producer Company must get its books audited annually by a Chartered Accountant as per the Companies Act.",
                },
                {
                  q: "Can a Producer Company issue bonus shares?",
                  a: "Yes, a Producer Company can issue bonus shares to its members in proportion to the shares held by them out of accumulated profits.",
                },
                {
                  q: "Can a Producer Company distribute patronage bonus?",
                  a: "Yes, a Producer Company can distribute patronage bonus to members in proportion to their participation in the business of the company.",
                },
                {
                  q: "Is there any limit on the number of members in a Producer Company?",
                  a: "No, there is no maximum limit on the number of members in a Producer Company.",
                },
                {
                  q: "Can foreigners or foreign companies become members of a Producer Company?",
                  a: "No, only Indian producers or producer institutions can become members. Foreign nationals or entities are not allowed to be members.",
                },
                {
                  q: "What are the annual compliance requirements for a Producer Company?",
                  a: "A Producer Company must file annual returns, financial statements, income tax returns, conduct board meetings, and comply with secretarial standards.",
                },
                {
                  q: "What is the validity of a Producer Company registration?",
                  a: "Once registered, a Producer Company has perpetual succession and remains valid until it is legally wound up or struck off.",
                },
                {
                  q: "Can a Producer Company be registered online?",
                  a: "Yes, the registration process for a Producer Company can be completed entirely online through the Ministry of Corporate Affairs (MCA) portal.",
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
