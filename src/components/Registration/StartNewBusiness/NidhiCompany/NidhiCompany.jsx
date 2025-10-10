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
      "Self-attested PAN Card copy for all directors and members",
      "Identity proof: Aadhaar / Voter ID / Driving License / Passport",
      "Address proof: latest bank statement or utility bill (within 2 months)",
      "Recent passport-size photograph of each person",
      "Digital Signature Certificate (DSC) for each proposed director",
    ],
  },
  {
    title: "Registered Office Proof",
    items: [
      "Recent utility bill (electricity, gas, or phone) as address proof",
      "No Objection Certificate (NOC) from the property owner",
      "Rent agreement or lease deed if the office is rented",
    ],
  },
  {
    title: "Legal Declarations",
    items: [
      "Declaration from directors regarding non-disqualification",
      "Form DIR-2: consent to act as a director",
      "Professional certification from CA/CS/CMA for document verification",
    ],
  },
  {
    title: "Important Notes",
    items: [
      "All documents must be self-attested and clearly legible",
      "Foreign nationals must submit notarized and apostilled documents",
      "Ensure consistency of name, address, and details across documents",
    ],
  },
];



export default function NidhiCompany({ webAppUrl, onSubmitted }) {

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
            Nidhi Company 
Registration        </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              
             Register your Nidhi Company with Rekotax — experience fast 
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
          To register your Nidhi Company seamlessly, you’ll need to submit basic identity, address, and office-related documents.


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
             Simplified Process to Register Your <br/> Nidhi Company in India
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
            Setting up your Nidhi Company is simpler than you think — especially with Rekotax guiding every step. 
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
    title: "Name Reservation (RUN)",
    desc:
      "Choose a unique name for your Nidhi Company and submit it through the RUN (Reserve Unique Name) form on the MCA portal, ending with “Nidhi Limited”.",
  },
  {
    num: 2,
    title: "Obtain DSC & DIN",
    desc:
      "Apply for Digital Signature Certificate and Director Identification Number for all proposed directors to enable digital filing.",
  },
  {
    num: 3,
    title: "Draft Incorporation Documents",
    desc:
      "Prepare MOA, AOA, DIR-2, INC-9 and other declarations stating the company will function as a Nidhi and comply with Nidhi Rules, 2014.",
  },
  {
    num: 4,
    title: "File SPICe+ Form",
    desc:
      "Submit the SPICe+ form online along with e-MOA, e-AOA, AGILE-PRO and other required documents to apply for incorporation, PAN, TAN, and EPFO/ESIC registration.",
  },
  {
    num: 5,
    title: "Certificate of Incorporation",
    desc:
      "Once approved, the Registrar of Companies (RoC) issues the Certificate of Incorporation (COI) with the Company Identification Number (CIN).",
  },
  {
    num: 6,
    title: "Post-Incorporation Filing",
    desc:
      "Open a bank account, ensure ₹10 lakh capital, 200 members, and ₹20 lakh Net Owned Funds within 120 days, then file Form NDH-4 for Nidhi Company status.",
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
           Nidhi Company Registration: 
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
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 4,
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 500 }}>
        What is Nidhi Company ?
      </Typography>
      <Typography  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        A Nidhi Company is a type of Non-Banking Financial Company (NBFC) governed by Section 406 of the
        Companies Act, 2013 and the Nidhi Rules, 2014. Its primary objective is to promote savings and thrift
        among its members and to lend money only to its members for mutual benefit. It is ideal for those looking
        to start a small finance business focused on community-based savings and lending.
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
        Why Choose a Nidhi Company?
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Ideal for promoting savings and lending within a close-knit community</li>
          <li>Low regulatory compliance compared to other NBFCs</li>
          <li>Ownership and control remain with the members</li>
          <li>Cost-effective model for small-scale finance operations</li>
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
          color: "#0f2555",
          mb: 2,
          fontWeight: 500,
          borderBottom: "2px solid #0f2555",
          pb: 1,
        }}
      >
        Key Features of a Nidhi Company
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>
            <strong>Member-Only Transactions:</strong> Can take deposits and lend only to its members
          </li>
          <li>
            <strong>Minimum 200 Members:</strong> Required within 120 days of incorporation
          </li>
          <li>
            <strong>Net Owned Funds:</strong> Minimum of ₹20 lakh required within 120 days
          </li>
          <li>
            <strong>NDH-4 Filing:</strong> Must be filed within 120 days to seek Nidhi status
          </li>
          <li>
            <strong>Prohibited Activities:</strong> Cannot deal in chit funds, hire purchase, insurance, or
            securities
          </li>
          <li>
            <strong>Branches:</strong> Can open branches after 3 years of profitable operations
          </li>
          <li>
            <strong>Loan Limits:</strong> Loans are subject to caps based on deposits held
          </li>
        </ul>
      </Typography>
    </Box>

    {/* Section 4 - Benefits */}
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 4,
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
        Benefits of Nidhi Company Registration
      </Typography>

      <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        Encourages Financial Discipline
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Promotes savings among members</li>
          <li>Facilitates internal lending and borrowing</li>
        </ul>
      </Typography>

      <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        Low Regulatory Compliance
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>No need for RBI approval</li>
          <li>Regulated by MCA under Nidhi Rules</li>
        </ul>
      </Typography>

      <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        Easy and Affordable
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Lower setup and compliance costs than NBFCs</li>
          <li>Easy to manage with basic statutory compliance</li>
        </ul>
      </Typography>

      <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        Member-Based Structure
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Owned and controlled by members</li>
          <li>Deposits and benefits remain within the group</li>
        </ul>
      </Typography>

      <Typography variant="h6"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        Safe and Regulated Savings
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Transparent framework under Companies Act and Nidhi Rules</li>
          <li>Operations limited to secured member interaction</li>
        </ul>
      </Typography>
    </Box>

    {/* Section 5 - Compliance */}
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 4,
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
        Mandatory Post-Incorporation Compliance
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>
            <strong>Form NDH-4:</strong> Must be filed within 120 days of incorporation for Nidhi recognition
          </li>
          <li>
            <strong>Minimum Members:</strong> Ensure at least 200 members within 120 days
          </li>
          <li>
            <strong>Net Owned Fund:</strong> Must raise at least ₹20 lakh capital within 120 days
          </li>
          <li>
            <strong>Annual Filing:</strong> File financials and annual returns with MCA
          </li>
          <li>
            <strong>Statutory Registers:</strong> Maintain proper books, registers, and records
          </li>
          <li>
            <strong>Board Meetings:</strong> Conduct regular board and general meetings
          </li>
        </ul>
      </Typography>
    </Box>

    {/* Section 6 - COI */}
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 4,
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
        Certificate of Incorporation: Your Legal Identity
      </Typography>
      <Typography  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        The Certificate of Incorporation (COI) from MCA includes:
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Company Identification Number (CIN)</li>
          <li>Date of Incorporation</li>
          <li>Company name and registration details</li>
        </ul>
      </Typography>
      <Typography  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        You’ll need the COI to:
      </Typography>
      <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
        <ul>
          <li>Open a current bank account</li>
          <li>Apply for PAN, TAN, and licenses</li>
          <li>File Form NDH-4 and post-incorporation filings</li>
          <li>Operate legally as a financial entity</li>
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

              { [
    {
      q: "What is a Nidhi Company?",
      a: "A Nidhi Company is a type of Non-Banking Financial Company (NBFC) formed under Section 406 of the Companies Act, 2013, to promote savings and mutual benefit among its members. It primarily deals with accepting deposits and lending money to its members.",
    },
    {
      q: "What are the basic requirements to incorporate a Nidhi Company?",
      a: "To incorporate a Nidhi Company, a minimum of 7 members and 3 directors are required. The company must be limited by shares with a paid-up capital of at least ₹10 lakh.",
    },
    {
      q: "Can a Nidhi Company accept deposits from the general public?",
      a: "No, a Nidhi Company can only accept deposits and provide loans to its registered members. It cannot deal with non-members or the general public.",
    },
    {
      q: "What is Form NDH-4 and when is it filed?",
      a: "NDH-4 is filed within 120 days of incorporation to declare the company as a Nidhi. The company must have at least 200 members and Net Owned Funds of ₹20 lakh before filing NDH-4.",
    },
    {
      q: "What are Net Owned Funds in a Nidhi Company?",
      a: "Net Owned Funds refer to the aggregate paid-up equity capital and free reserves, reduced by accumulated losses and intangible assets. A minimum of ₹20 lakh is required within 120 days of incorporation.",
    },
    {
      q: "Is it mandatory for a Nidhi Company to obtain RBI approval?",
      a: "No, RBI approval is not required for Nidhi Companies as they are exempted from core provisions applicable to NBFCs. However, they are governed by the Nidhi Rules, 2014.",
    },
    {
      q: "What kind of loans can a Nidhi Company provide?",
      a: "Nidhi Companies can grant secured loans to members against gold, silver, immovable property, fixed deposits, or other approved securities.",
    },
    {
      q: "What is the maximum deposit a member can make in a Nidhi Company?",
      a: "A member can deposit up to 20 times the Net Owned Funds of the company, subject to the limits prescribed under Nidhi Rules and the company’s internal policy.",
    },
    {
      q: "Are Nidhi Companies allowed to advertise their services?",
      a: "No, Nidhi Companies are prohibited from advertising their deposit schemes or solicitations to the public. They can only promote within their member base.",
    },
    {
      q: "How is a Nidhi Company different from an NBFC?",
      a: "While both are financial institutions, Nidhi Companies cater only to members and do not require RBI registration, unlike NBFCs which operate on a larger scale and require RBI compliance.",
    },
    {
      q: "Can a Nidhi Company open branches?",
      a: "Yes, but only after filing NDH-4 and being recognized as a Nidhi Company. It can open up to 3 branches in the same district and must fulfill certain profitability criteria for more.",
    },
    {
      q: "Is a registered office mandatory for a Nidhi Company?",
      a: "Yes, a registered office in India is mandatory to receive official communication and serve as the base for operational activities.",
    },
    {
      q: "What are the annual compliance requirements for a Nidhi Company?",
      a: "A Nidhi Company must file annual returns, income tax returns, NDH-1 (annual return), and NDH-3 (half-yearly return) and comply with ROC and MCA regulations.",
    },
    {
      q: "Can a Nidhi Company provide unsecured loans?",
      a: "No, loans given by a Nidhi Company must be secured by collateral such as gold, property, or fixed deposit. Unsecured loans are not permitted.",
    },
    {
      q: "Are there any restrictions on who can be a member of a Nidhi Company?",
      a: "Any Indian citizen can become a member of a Nidhi Company, provided they agree to follow the rules and regulations laid down by the company.",
    },
    {
      q: "Can a Nidhi Company invest in shares or securities?",
      a: "No, Nidhi Companies are not allowed to trade or invest in shares, securities, or other financial instruments.",
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
