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
    title: "Mandatory Documents for Seamless Registration",
    items: [
      "Partnership Deed detailing roles, capital, and profit-sharing",
      "Self-attested PAN card of each partner",
      "Residential address proof (Aadhaar, Voter ID, Passport)",
      "Business address proof of the registered office",
      "Recent passport-size photographs of all partners",
    ],
  },
  {
    title: "Supporting Documents Based on Business Setup",
    items: [
      "Rent agreement for business premises",
      "No Objection Certificate (NOC) from landlord",
      "Latest utility bill (electricity, water, etc.)",
      "Recent bank statements of all partners",
    ],
  },
  {
    title: "Key Clauses Your Partnership Deed Must Cover",
    items: [
      "Names and addresses of all partners",
      "Nature and scope of the business",
      "Capital contribution by each partner",
      "Profit and loss sharing ratio",
      "Defined roles, duties, and responsibilities of partners",
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
              Partnership Firm Registration           </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              Register your Private Limited Company with Rekotax — experience
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
              <li> Get Registered in Just <strong>7–10 Days</strong></li>
              <li>  Custom Partnership <strong>Deed Drafting</strong> as per your terms</li>
              <li><strong>Complete Incorporation Kit:</strong> COI, DIN, DSC, PAN & TAN</li>
              <li> <strong>Trusted</strong> by Entrepreneurs, Backed by Industry Experts</li>
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
            To register your Private Limited seamlessly, you’ll need to submit
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
              Simplified Process to Register Your <br /> Private Limited in
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
              Setting up your Private Limited is simpler than you think —
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
                    title: "Draft the Partnership Deed",
                    desc: "Prepare a clear and detailed agreement specifying the roles, responsibilities, capital contributions, and profit-sharing ratio among partners.",
                  },
                  {
                    num: 2,
                    title: "Obtain Stamp Paper & Notarise",
                    desc: "Execute the deed on appropriate stamp paper as per state laws and get it notarised by a public notary for legal validation.",
                  },
                  {
                    num: 3,
                    title: "Apply for PAN of the Firm",
                    desc: "Submit an application to obtain a Permanent Account Number (PAN) in the name of the partnership firm from the Income Tax Department.",
                  },
                  {
                    num: 4,
                    title: "Register with Registrar of Firms",
                    desc: "File the Partnership Deed along with Form 1 and required documents to get your firm officially registered (optional but recommended).",
                  },
                  {
                    num: 5,
                    title: "Open a Bank Account",
                    desc: "Open a current account in the name of the partnership firm using the PAN card, deed, and registration certificate (if obtained).",
                  },
                  {
                    num: 6,
                    title: "Apply for Other Licenses",
                    desc: "Depending on your business activity and location, apply for GST registration, MSME certificate, and shop & establishment license, etc.",
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
                    text: "We Will Draft & Notarise the Partnership Deed",
                  },
                  {
                    num: 4,
                    text: "PAN Application & (Optional) Firm Registration with RoF",
                  },
                  {
                    num: 5,
                    text: "Open Current Bank Account in Firm’s Name",
                  },
                  {
                    num: 6,
                    text: "That’s it! You’re Now a Registered Partnership Firm. 🎉",
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
            Partnership Firm Registration: A Complete Guide
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
                  What is Partnership Firm Registration?
                </Typography>
                <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.8 }}>
                  A partnership firm is a popular form of business in India where two or more individuals join hands to carry out a business with a view to earn profit. Governed by the Indian Partnership Act, 1932, this structure allows partners to combine their resources, expertise, and efforts under a mutually agreed partnership deed.
                </Typography>
              </Box>

              {/* Section 2 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Why Choose Partnership Firm?
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>Simple and cost-effective to set up
                    </li>
                    <li>

                      Shared responsibilities and pooled resources                    </li>
                    <li>

                      Minimal regulatory compliance compared to companies
                    </li>
                    <li>

                      Faster decision-making with mutual understanding
                    </li>
                    <li>

                      Ideal for small and medium-sized businesses
                    </li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 3 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Types of Partnership Firms
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.8 }}>
                  <ul>
                    <li><strong>Registered Partnership Firm</strong> - Registered with the Registrar of Firms for legal recognition and protection.</li>
                    <li><strong>BUnregistered Partnership Firm</strong> - Not registered but still a valid business form; however, it lacks certain legal rights.</li>


                  </ul>
                </Typography>
              </Box>

              {/* Section 4 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Key Features of a Partnership Firm
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.8 }}>
                  <ul>
                    <li><strong>Minimum 2 Partners</strong> - Can have up to 50 partners.</li>
                    <li><strong>Mutual Agency</strong> - Each partner acts as both agent and principal.</li>
                    <li><strong>Profit Sharing</strong> - Profits and losses are shared as per the agreement.</li>
                    <li><strong>No Minimum Capital</strong> - No specific requirement for minimum capital contribution.</li>
                    <li><strong>Unlimited Liability</strong> - Partners are jointly and severally liable for business obligations.</li>
                    <li><strong>Flexibility</strong> - Decision-making is quick and flexible with mutual consent.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 5 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Advantages of Partnership Firm Registration
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Ease of Formation
                </Typography>
                <Typography component="div" sx={{ color: "#333", mb: 2, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>Can be started with just a partnership deed.</li>
                    <li>Optional registration process with Registrar of Firms.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Better Resource Pooling
                </Typography>
                <Typography component="div" sx={{ color: "#333", mb: 2, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>Combines diverse skills, experience, and capital of all partners.</li>
                    <li>Helps in effective decision-making and operational strength.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Operational Flexibility
                </Typography>
                <Typography component="div" sx={{ color: "#333", mb: 2, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>Partners enjoy complete freedom to define terms in the deed.</li>
                    <li>Suitable for dynamic business environments.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Lower Compliance Burden
                </Typography>
                <Typography component="div" sx={{ color: "#333", mb: 2, fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>No requirement to audit books if turnover is below threshold.</li>
                    <li>Lesser legal formalities compared to companies and LLPs.</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Quick Decision Making
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>Direct involvement of partners in daily operations enables faster execution.</li>
                    <li>No need to wait for board resolutions or shareholder meetings.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Essential Documents for Registration */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Essential Documents for Registration
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li><strong>Partnership Deed:</strong> A written agreement defining roles, duties, and profit-sharing.</li>
                    <li><strong>PAN Cards of Partners:</strong> Self-attested PAN copies of all partners.</li>
                    <li><strong>Address Proof of Partners:</strong> Aadhaar Card, Voter ID, Passport, etc.</li>
                    <li><strong>Registered Office Proof:</strong> Latest utility bill, rent agreement, or ownership proof.</li>
                    <li><strong>Passport Size Photographs:</strong> Recent photographs of all partners.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Additional Documents (If Applicable) */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Additional Documents (If Applicable)
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li><strong>Rent Agreement:</strong> If the office space is rented.</li>
                    <li><strong>NOC from Landlord:</strong> For using the rented premises as office.</li>
                    <li><strong>Bank Statements:</strong> Financial proof of all partners.</li>
                    <li><strong>GST Registration (if required):</strong> For businesses crossing threshold limit or opting voluntarily.</li>
                  </ul>
                </Typography>
              </Box>

              {/* What Should the Partnership Deed Include? */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  What Should the Partnership Deed Include?
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li>Full names and addresses of all partners</li>
                    <li>Business name and nature of operations</li>
                    <li>Capital contribution from each partner</li>
                    <li>Profit/loss sharing ratio among partners</li>
                    <li>Duties, rights, and obligations of partners</li>
                    <li>Duration and dissolution clauses</li>
                    <li>Dispute resolution mechanism</li>
                  </ul>
                </Typography>
              </Box>




              {/* Post-Registration Compliance */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Post-Registration Compliance
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <ul>
                    <li><strong>Income Tax Filing:</strong> File income tax returns annually in the firm's name.</li>
                    <li><strong>TDS Compliance:</strong> If applicable, deduct and file TDS returns.</li>
                    <li><strong>GST Returns:</strong> Monthly/quarterly returns if registered under GST.</li>
                    <li><strong>Books of Accounts:</strong> Maintain proper records of transactions and finances.</li>
                    <li><strong>Bank Account:</strong> Operate a dedicated business current account.</li>
                  </ul>
                </Typography>
              </Box>

              {/* Registration Certificate: Your Business Identity */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Registration Certificate: Your Business Identity
                </Typography>
                <Typography component="div" sx={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  If you register your partnership firm with the Registrar of Firms, you’ll receive a Certificate of Registration which acts as legal proof
                  of your firm’s existence. This document is useful when:
                  <ul>
                    <li>Opening a business bank account</li>
                    <li>Applying for business loans</li>
                    <li>Participating in government tenders</li>
                    <li>Gaining legal protection under the Indian Partnership Act</li>
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
                  "& tbody td:nth-of-type(2)": {
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
                    <Box component="th">Proprietorship Firm</Box>
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
                  q: "Is it mandatory to register a Partnership Firm in India?",
                  a: "No, registration is not mandatory under the Indian Partnership Act, 1932. However, registration provides key legal benefits such as the ability to sue or enforce contracts.",
                },
                {
                  q: "How many partners are required to start a Partnership Firm?",
                  a: "A minimum of 2 and a maximum of 50 partners can form a Partnership Firm under Indian law.",
                },
                {
                  q: "What documents are required for Partnership Firm Registration?",
                  a: "Key documents include PAN, Aadhaar, address proof of partners, photos, rental agreement or ownership proof of business address, and the signed Partnership Deed.",
                },
                {
                  q: "Can a Partnership Firm be converted into an LLP or Private Limited Company?",
                  a: "Yes, a registered Partnership Firm can be legally converted into an LLP or Private Limited Company by following proper procedures and compliance.",
                },
                {
                  q: "What are the tax implications for Partnership Firms?",
                  a: "Partnership Firms are taxed at a flat rate of 30% plus applicable surcharge and cess. Partners’ shares in profit are exempt from tax in their individual hands.",
                },
                {
                  q: "Can a partnership firm own property in its name?",
                  a: "A registered partnership firm can own property in the name of the firm. However, for unregistered firms, ownership is typically reflected in the name of the partners unless clearly documented otherwise.",
                },
                {
                  q: "Can a minor become a partner in a Partnership Firm?",
                  a: "A minor cannot become a full-fledged partner but may be admitted to the benefits of an existing partnership firm with the consent of all partners.",
                },
                {
                  q: "What happens to the firm on the retirement or death of a partner?",
                  a: "Unless otherwise agreed in the partnership deed, the firm is dissolved on the death or retirement of a partner. However, it may continue if remaining partners choose to carry on under the same name.",
                },
                {
                  q: "Can foreign nationals or NRIs become partners in a Partnership Firm?",
                  a: "No, foreign nationals and NRIs are not allowed to become partners in a traditional Partnership Firm. They may, however, invest in LLPs with prior government approval under FDI norms.",
                },
                {
                  q: "Is there an annual compliance requirement for Partnership Firms?",
                  a: "While there's no ROC filing like companies, registered firms must file ITR annually and may need to comply with TDS, GST, and state-level regulations depending on their turnover and operations.",
                },
                {
                  q: "What is the difference between a Registered and Unregistered Partnership Firm?",
                  a: "A registered firm enjoys legal recognition and the ability to enforce contracts in court. Unregistered firms face limitations, including the inability to sue third parties or partners for disputes arising under the partnership.",
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
