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
    title: "Founder & Office Documents",
    items: [
      "PAN & Aadhaar Cards of all founding members",
      "Residential proof (utility bill, rent agreement, etc.)",
      "Passport-sized photographs",
      "Proof of NGO's registered office address",
      "Rent agreement, utility bill & NOC from landlord",
    ],
  },
  {
    title: "Incorporation Documents",
    items: [
      "Trust Deed / MOA & Rules / MOA & AOA",
      "Declaration under Companies Act (for Section 8)",
      "Resolution for formation of the NGO",
      "Minutes of the preliminary meeting",
      "Governing body list and election record",
    ],
  },
  {
    title: "Financial & Activity Proof",
    items: [
      "Bank account details (if available)",
      "Initial fund proof or donor declarations",
      "Affidavit declaring sources of funds",
      "Detailed project proposal and objectives",
      "Operational budget & first-year implementation plan",
    ],
  },
  {
    title: "Additional Requirements",
    items: [
      "Character certificates (if required by state)",
      "NOC from concerned departments (if applicable)",
      "Any declarations, affidavits, or forms required by local authorities",
    ],
  },
];




export default function SectionAndCompany({ webAppUrl, onSubmitted }) {

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
              Section 8 Company
              (NGO) Registration          </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              Register your  Section 8 Company (NGO) Company with Rekotax   <br />experience
              fast setup,

              full legal compliance, expert documentation,<br /> and dedicated support
              to launch
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
              <li>Company Registered in Just 7–10 Days</li>
              <li>End-to-End Documentation: Name Approval, MOA & AOA</li>
              <li>Complete Incorporation Kit: COI, DIN, DSC, PAN & TAN</li>
              <li>Trusted by Entrepreneurs, Backed by Industry Experts</li>
              <li>Handled by MCA-Registered Professionals</li>
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
            To register your Section 8 (Company) NGO seamlessly, you’ll need to submit basic identity, address, and office-related documents.


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
              Simplified Process to Register Your <br />Section 8 Company (NGO) in India

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
              Setting up your NGO is simpler than you think — especially with Rekotax guiding every step.
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
                    title: "Choose Name & Apply in RUN",
                    desc: "Select a unique name suitable for a non-profit entity and file a name reservation request through the RUN (Reserve Unique Name) service on the MCA portal.",
                  },
                  {
                    num: 2,
                    title: "Obtain DSC & DIN",
                    desc: "Apply for Digital Signature Certificates (DSC) for all directors and obtain Director Identification Numbers (DIN) for filing incorporation documents.",
                  },
                  {
                    num: 3,
                    title: "Draft MOA, AOA & Declarations",
                    desc: "Prepare the Memorandum and Articles of Association, declarations in Form INC-14 and INC-15 by professionals and promoters, and other required affidavits.",
                  },
                  {
                    num: 4,
                    title: "File SPICe+ Form with MCA",
                    desc: "File the integrated SPICe+ form along with e-MOA, e-AOA, and necessary attachments including declarations, KYC, and address proof to initiate incorporation.",
                  },
                  {
                    num: 5,
                    title: "Get License & Incorporation Certificate",
                    desc: "Once reviewed, the Registrar issues the Section 8 License and Certificate of Incorporation (COI) with CIN — officially recognizing the NGO as a company.",
                  },
                  {
                    num: 6,
                    title: "Apply for PAN, TAN & Bank Account",
                    desc: "After incorporation, apply for the company’s PAN and TAN, open a current bank account, and initiate compliance for 12A, 80G, and CSR registration if required.",
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
                          maxWidth: 300,
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
                              width: 44,
                              height: 44,
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
                            sx={{ fontWeight: 500, color: "#0f2555", mb: 1 }}
                          >
                            {step.title}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "0.8em",
                              lineHeight: 1.5,
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
                    text: "Fill Out Our Nidhi Company Form & Make Payment",
                  },
                  {
                    num: 2,
                    text: "Get a Call from Our Expert & Submit Required Documents",
                  },
                  {
                    num: 3,
                    text: "Apply for DSC and DIN for All Proposed Directors",
                  },
                  {
                    num: 4,
                    text: "We Draft MOA, AOA, and Other Declarations for Submission",
                  },
                  {
                    num: 5,
                    text: "SPICe+ and Related Forms Are Filed with MCA",
                  },
                  {
                    num: 6,
                    text: "Company Registered! Now File NDH-4 Within 120 Days",
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
            Section 8 Company (NGO) Registration: A Complete Guide
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f4f6f8",
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 4 },
              }}
            >
              <Container maxWidth="md">
                {/* Section 1 */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "#0f2555", mb: 2, fontWeight: 500 }}
                  >
                    What is Section 8 Company Registration?
                  </Typography>
                  <Typography
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    A Section 8 Company is a type of non-profit organization (NGO)
                    registered under the Companies Act, 2013. It is formed with the
                    objective of promoting charitable activities such as education, art,
                    science, social welfare, religion, environmental protection, or other
                    similar causes. Unlike traditional companies, Section 8 Companies cannot
                    distribute profits among members and must reinvest earnings into the
                    cause.
                  </Typography>
                </Box>

                {/* Section 2 */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#0f2555",
                      mb: 2,
                      fontWeight: 500,
                      borderBottom: "2px solid #0f2555",
                      pb: 1,
                    }}
                  >
                    Why Choose a Section 8 Company?
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                    <ul>
                      <li>
                        Ideal for NGOs, trusts, foundations, and charitable organizations
                      </li>
                      <li>
                        Provides a credible and formal legal structure for social activities
                      </li>
                      <li>Eligible for various tax exemptions under Income Tax Act</li>
                      <li>
                        Can receive domestic and foreign donations (FCRA registration
                        needed)
                      </li>
                      <li>
                        Enhances public trust and brand value for donors and stakeholders
                      </li>
                    </ul>
                  </Typography>
                </Box>

                {/* Section 3 */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="h5"
                   sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Key Features of a Section 8 Company
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>
                        <strong>Non-Profit Nature:</strong> Profits must be used for
                        charitable objectives only.
                      </li>
                      <li>
                        <strong>No Dividend Distribution:</strong> Members cannot share
                        company income.
                      </li>
                      <li>
                        <strong>Separate Legal Entity:</strong> Recognized as an independent
                        legal body.
                      </li>
                      <li>
                        <strong>Limited Liability:</strong> Members' personal assets are
                        protected.
                      </li>
                      <li>
                        <strong>Charitable Objectives:</strong> Must fall within the scope
                        allowed by law.
                      </li>
                      <li>
                        <strong>Mandatory Central Government License:</strong> Required
                        before incorporation.
                      </li>
                      <li>
                        <strong>High Compliance Standards:</strong> Transparent
                        record-keeping and filing needed.
                      </li>
                      <li>
                        <strong>Eligible for Tax Benefits:</strong> Can apply for 80G and
                        12A exemptions.
                      </li>
                    </ul>
                  </Typography>
                </Box>

                {/* Section 4 */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#0f2555",
                      mb: 2,
                      fontWeight: 500,
                      borderBottom: "2px solid #0f2555",
                      pb: 1,
                    }}
                  >
                    Advantages of Section 8 Company Registration
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Legal Recognition and Structured Framework
                  </Typography>
                  <Typography
                    component="div"
                   sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>Incorporation under MCA provides legitimacy to your NGO.</li>
                      <li>Offers a robust and transparent legal framework.</li>
                    </ul>
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Credibility with Donors and Institutions
                  </Typography>
                  <Typography
                    component="div"
                   sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>Preferred by donors, government bodies, and CSR funders.</li>
                      <li>Eligible to apply for grants, schemes, and foreign contributions.</li>
                    </ul>
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Tax Exemptions and Benefits
                  </Typography>
                  <Typography
                    component="div"
                     sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>Eligible for 12A and 80G certifications for income tax relief.</li>
                      <li>
                        Exemptions under Income Tax Act for both organization and donors.
                      </li>
                    </ul>
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Limited Liability Protection
                  </Typography>
                  <Typography
                    component="div"
                   sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>
                        Members are not personally liable for the debts of the company.
                      </li>
                      <li>Promotes risk-free social entrepreneurship.</li>
                    </ul>
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Separate Legal Entity
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>Can own property, open bank accounts, and enter contracts.</li>
                      <li>Continues to exist beyond the lifetime of its members.</li>
                    </ul>
                  </Typography>
                </Box>

                {/* Post-Registration Compliance */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#0f2555",
                      mb: 2,
                      fontWeight: 500,
                      borderBottom: "2px solid #0f2555",
                      pb: 1,
                    }}
                  >
                    Post-Registration Compliance for Section 8 Companies
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    <ul>
                      <li>
                        <strong>Annual Filings:</strong> File returns and financial
                        statements with ROC.
                      </li>
                      <li>
                        <strong>Maintain Books of Accounts:</strong> Follow prescribed
                        accounting practices.
                      </li>
                      <li>
                        <strong>Conduct Annual General Meeting (AGM):</strong> Mandatory
                        once a year.
                      </li>
                      <li>
                        <strong>Tax Filing:</strong> File income tax returns and applicable
                        TDS.
                      </li>
                      <li>
                        <strong>Statutory Audit:</strong> Annual audit of books by a
                        qualified CA.
                      </li>
                      <li>
                        <strong>Comply with License Terms:</strong> Ensure charitable
                        objectives are maintained.
                      </li>
                    </ul>
                  </Typography>
                </Box>

                {/* COI Section */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#0f2555",
                      mb: 2,
                      fontWeight: 500,
                      borderBottom: "2px solid #0f2555",
                      pb: 1,
                    }}
                  >
                    Certificate of Incorporation — Legal Identity for Your NGO
                  </Typography>
                  <Typography
                   sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  >
                    Once registered, the Section 8 Company receives a Certificate of
                    Incorporation (COI) from the Ministry of Corporate Affairs (MCA), which
                    acts as official proof of existence.
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.8, mb: 2 }}
                  >
                    <ul>
                      <li>Company Identification Number (CIN)</li>
                      <li>Date of Incorporation</li>
                      <li>Official registration details</li>
                    </ul>
                  </Typography>
                  <Typography
                    sx={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.8, mb: 1 }}
                  >
                    The COI is required to:
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.8 }}
                  >
                    <ul>
                      <li>Open a dedicated NGO bank account</li>
                      <li>Apply for PAN, TAN, and tax exemptions (12A/80G)</li>
                      <li>Register under FCRA for foreign donations</li>
                      <li>Receive CSR funds from companies</li>
                    </ul>
                  </Typography>
                </Box>
              </Container>
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
                  q: "What is a Section 8 Company?",
                  a: "A Section 8 Company is a non-profit registered under the Companies Act, 2013 to promote charitable causes (education, art, science, sports, social welfare). Any surplus must be reapplied to these objectives."
                },
                {
                  q: "How many people are required to register a Section 8 Company?",
                  a: "At least two directors and two shareholders. The same individuals can be both shareholders and directors."
                },
                {
                  q: "Is there any minimum capital requirement for a Section 8 Company?",
                  a: "No. It can be registered with any capital suitable for the organization’s objectives."
                },
                {
                  q: "What documents are required for Section 8 Company registration?",
                  a: "PAN and Aadhaar of directors, address proof, photographs, MOA, AOA, Digital Signatures, a detailed project plan, and registered office proof with NOC."
                },
                {
                  q: "Can a Section 8 Company accept foreign donations?",
                  a: "Yes, after obtaining registration under the Foreign Contribution Regulation Act (FCRA)."
                },
                {
                  q: "Can family members be directors in a Section 8 Company?",
                  a: "Yes, provided the company operates for charitable purposes and not for personal gain."
                },
                {
                  q: "Is a registered office address mandatory for Section 8 Company registration?",
                  a: "Yes. A valid Indian address is required for official correspondence and legal notices."
                },
                {
                  q: "How long does it take to register a Section 8 Company in India?",
                  a: "Typically 15–25 working days, depending on document verification and MCA approvals."
                },
                {
                  q: "Do Section 8 Companies need to file annual returns?",
                  a: "Yes. They must file annual returns, income tax returns, and maintain proper books as per MCA rules."
                },
                {
                  q: "Can a Section 8 Company be converted into a private limited company?",
                  a: "No. Conversion into a for-profit private limited company is not permitted."
                },
                {
                  q: "Are tax exemptions available to Section 8 Companies?",
                  a: "Yes. They can apply for exemptions under Sections 12AB, 80G, and other provisions of the Income Tax Act."
                },
                {
                  q: "Can I operate a Section 8 Company from a residential address?",
                  a: "Yes, if a No Objection Certificate (NOC) from the property owner is provided."
                },
                {
                  q: "What are the benefits of registering a Section 8 Company?",
                  a: "Separate legal identity, limited liability, higher credibility with donors, eligibility for government schemes, and potential tax benefits for donors and the company."
                },
                {
                  q: "Can I register a Section 8 Company on my own?",
                  a: "While possible, professional assistance is recommended due to legal and procedural complexities."
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
