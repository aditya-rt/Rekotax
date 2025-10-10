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
    title: "Documents of Partners",
    items: [
      "PAN Card of all Indian partners",
      "Aadhaar/Passport/Voter ID/Driving License",
      "Latest address proof (utility bill or bank statement)",
      "Recent passport-size photograph",
      "Proof of Indian residency (for one designated partner)",
      "Digital Signature Certificate (DSC)",
      "Passport and visa (for foreign nationals)",
    ],
  },
  {
    title: "Registered Office Documents",
    items: [
      "Utility bill not older than 2 months (electricity, water, etc.)",
      "Rent agreement or lease deed (if applicable)",
      "No Objection Certificate (NOC) from the landlord",
      "Ownership proof (property tax receipt or sale deed)",
    ],
  },
  {
    title: "Business-Related Documents",
    items: [
      "LLP Agreement draft with profit-sharing and roles",
      "Description of proposed business activity",
      "Capital contribution statement by each partner",
      "Business plan or project report (if applicable)",
    ],
  },
  {
    title: "Additional Requirements",
    items: [
      "Professional certification (for CA, CS, legal LLPs)",
      "Sector-specific licenses or regulatory approvals",
      "FDI approval (for LLPs with foreign investment)",
      "NOC from relevant authorities (if required)",
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
              LLP Registration            </Typography>

            <Typography sx={{ mb: 2, fontSize: "1rem" }}>
              Register your LLP with Rekotax — experience
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
            To register your LLP seamlessly, you’ll need to submit
            basic identity, address, and office-related documents.
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
              Simplified Process to Register Your <br /> LLP in
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
              Setting up your LLP is simpler than you think —
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
                    title: "Obtain DSC for Partners",
                    desc: "All designated partners must acquire a Digital Signature Certificate (DSC) to sign and submit incorporation documents online.",
                  },
                  {
                    num: 2,
                    title: "Apply for DPIN",
                    desc: "Designated Partner Identification Number (DPIN) is allotted through the LLP registration process—no separate filing required.",
                  },
                  {
                    num: 3,
                    title: "Reserve LLP Name",
                    desc: "Submit preferred names via the RUN-LLP service. We’ll check availability and ensure compliance with MCA naming guidelines.",
                  },
                  {
                    num: 4,
                    title: "File LLP Incorporation",
                    desc: "Draft and submit incorporation forms (FiLLiP) along with partner details, DSCs, address proof, and supporting documents to the MCA portal.",
                  },
                  {
                    num: 5,
                    title: "Get Certificate of Incorporation",
                    desc: "Upon successful review, the Registrar of Companies issues the Certificate of Incorporation (COI) along with the LLPIN.",
                  },
                  {
                    num: 6,
                    title: "Execute LLP Agreement",
                    desc: "Draft the LLP Agreement detailing capital contribution, duties, and profit-sharing. File Form 3 with the Registrar within 30 days of incorporation.",
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
            LLP Registration: A Complete Guide
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
                  What is LLP (Limited Liability Partnership) Registration?
                </Typography>
                <Typography  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  Limited Liability Partnership (LLP) is a hybrid business structure that offers the benefits of a traditional partnership with the limited liability feature of a private company. Regulated under the LLP Act, 2008, an LLP is a separate legal entity that allows partners to manage the business flexibly while protecting their personal assets from business debts.                </Typography>
              </Box>

              {/* Section 2 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Why Choose LLP?
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>Ideal for service-based or small businesses with low initial investment</li>
                    <li>

                      Provides operational flexibility and limited liability protection
                    </li>
                    <li>

                      No minimum capital requirement to start
                    </li>
                    <li>

                      Separate legal identity for long-term credibility and contracts
                    </li>
                    <li>

                      Tax benefits and exemption from audit (if turnover under ₹40 lakh)
                    </li>
                  </ul>
                </Typography>
              </Box>

              {/* Section 3 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Types of LLP Registrations
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li><strong>Professional LLP</strong> - formed by professionals like CAs, CS, Architects, etc., for delivering services under a regulated body.</li>
                    <li><strong>Business LLP</strong> - for commercial ventures in manufacturing, trading, or consulting.</li>
                    <li><strong>Foreign LLP</strong> - LLPs that involve Foreign Direct Investment (FDI) under automatic or approval route.</li>


                  </ul>
                </Typography>
              </Box>

              {/* Section 4 */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 500, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Key Characteristics of an LLP
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li><strong>Minimum Two Partners</strong> - No upper limit on number of partners</li>
                    <li><strong>Limited Liability</strong> - Each partner’s liability is limited to their contribution</li>
                    <li><strong>Separate Legal Entity</strong> - LLP can own assets and enter into contracts</li>
                    <li><strong>Low Compliance Cost</strong> - Compared to private limited companies</li>
                    <li><strong>No Mandatory Audit</strong> - Required only if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh</li>
                    <li><strong>Perpetual Succession</strong> - LLP continues irrespective of changes in partners</li>
                    <li><strong>Flexible Management</strong> - Managed based on LLP Agreement and mutual decisions</li>
                  </ul>


                </Typography>
              </Box>

              {/* Section 5 */}
              {/* Benefits of LLP Registration */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Benefits of LLP Registration
                </Typography>

                <Typography variant="h6"sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Separate Legal Identity
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>Can own property, open bank accounts, and file legal cases</li>
                    <li>Builds credibility among clients and stakeholders</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Limited Liability Protection
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>Partners are not personally responsible for business losses</li>
                    <li>Protects individual assets against firm liabilities</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  No Minimum Capital Requirement
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>LLP can be formed with any amount of capital</li>
                    <li>Capital contribution can be in cash, assets, or even services</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Taxation Benefits
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>No Dividend Distribution Tax (DDT)</li>
                    <li>Lower effective tax rates compared to companies</li>
                  </ul>
                </Typography>

                <Typography variant="h6" sx={{ color: "#333", fontWeight: 300, mb: 1.25 }}>
                  Ease of Formation and Flexibility
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li>Simple and online incorporation process</li>
                    <li>Flexible internal structure as per LLP Agreement</li>
                  </ul>
                </Typography>
              </Box>




              {/* Section 6 */}
              {/* Post-Registration Compliance for LLPs */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Post-Registration Compliance for LLPs
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  <ul>
                    <li><strong>Form LLP Agreement:</strong> Must be filed in Form 3 within 30 days of incorporation</li>
                    <li><strong>Maintain Books of Accounts:</strong> Even if audit not mandatory</li>
                    <li><strong>File Annual Returns:</strong> Form 11 (Annual Return) and Form 8 (Statement of Accounts &amp; Solvency)</li>
                    <li><strong>Income Tax Return:</strong> Mandatory filing irrespective of turnover</li>
                    <li><strong>GST Filing:</strong> If registered under GST, regular returns must be filed</li>
                  </ul>
                </Typography>
              </Box>

              {/* Certificate of Incorporation: Legal Proof of LLP */}
              <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <Typography variant="h4" sx={{ color: "#0f2555", mb: 2, fontWeight: 400, borderBottom: "2px solid #0f2555", pb: 1 }}>
                  Certificate of Incorporation: Legal Proof of LLP
                </Typography>
                <Typography component="div"  sx={{
                    color: "#333", // or theme.palette.text.primary
                    fontWeight: 400, // normal weight, not 200
                    fontSize: "1.05rem", // adjust size for comfortable reading
                    lineHeight: 1.8,
                    mb: 2,
                  }}>
                  The Certificate of Incorporation (COI) issued by the Registrar of Companies includes:
                  <ul>
                    <li>LLP Identification Number (LLPIN)</li>
                    <li>Date of Incorporation</li>
                    <li>Registered name and jurisdiction</li>
                  </ul>
                  COI is essential to:
                  <ul>
                    <li>Open a current bank account</li>
                    <li>Enter into commercial agreements</li>
                    <li>Apply for PAN, TAN, and licenses</li>
                    <li>Prove the legal existence of the LLP</li>
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
                  "& tbody td:nth-of-type(4)": {
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
                    <Box component="th">Proprietorship </Box>
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
                  q: "What is an LLP (Limited Liability Partnership)?",
                  a: "An LLP is a hybrid business structure that combines the flexibility of a partnership with the limited liability of a company. It offers legal protection to its partners and is governed under the LLP Act, 2008.",
                },
                {
                  q: "How many partners are required to start an LLP?",
                  a: "A minimum of two partners is required to form an LLP. There is no upper limit to the number of partners in an LLP.",
                },
                {
                  q: "Is a Digital Signature Certificate (DSC) mandatory for LLP registration?",
                  a: "Yes, a valid DSC is mandatory for all designated partners to sign electronic documents during the LLP incorporation process.",
                },
                {
                  q: "What documents are required to register an LLP in India?",
                  a: "Documents include PAN, Aadhaar or passport, address proof of partners, rental agreement or utility bill for the office, NOC from landlord, and the LLP agreement.",
                },
                {
                  q: "Is LLP registration recognized across India?",
                  a: "Yes, once registered, an LLP has nationwide validity and can operate its business across India.",
                },
                {
                  q: "Can foreign nationals or NRIs become partners in an LLP?",
                  a: "Yes, foreign nationals and NRIs can become partners in an LLP subject to compliance with the FDI guidelines and approval from the Reserve Bank of India if required.",
                },
                {
                  q: "Is it mandatory to have a registered office address for the LLP?",
                  a: "Yes, a registered office address within India is mandatory for receiving official communications from MCA and other authorities.",
                },
                {
                  q: "How long does it take to register an LLP?",
                  a: "Typically, it takes around 7 to 10 working days for the complete LLP registration process, depending on document verification and government approvals.",
                },
                {
                  q: "Is an LLP required to file annual returns?",
                  a: "Yes, LLPs must file Form 11 (Annual Return) and Form 8 (Statement of Account & Solvency) annually with the MCA, even if there’s no business activity.",
                },
                {
                  q: "What is an LLP Agreement and is it compulsory?",
                  a: "The LLP Agreement outlines the roles, responsibilities, profit-sharing ratios, and terms of management. It must be filed within 30 days of incorporation and is legally binding.",
                },
                {
                  q: "Can an LLP be converted into a Private Limited Company?",
                  a: "Yes, with proper compliance and regulatory approvals, an LLP can be converted into a Private Limited Company under Companies Act provisions.",
                },
                {
                  q: "Is there a minimum capital requirement for forming an LLP?",
                  a: "No, there is no minimum capital requirement to incorporate an LLP in India. It can be started with any amount agreed upon by the partners.",
                },
                {
                  q: "Can an LLP be started from a residential address?",
                  a: "Yes, an LLP can use a residential property as its registered office address as long as the necessary NOC from the property owner is obtained.",
                },
                {
                  q: "What are the benefits of registering an LLP over a traditional partnership?",
                  a: "LLPs offer limited liability protection, no requirement for audit below certain thresholds, perpetual succession, and easier compliance compared to traditional partnership firms.",
                },
                {
                  q: "Can I register an LLP myself or do I need professional help?",
                  a: "While technically possible, it is advisable to take professional assistance due to legal intricacies, documentation, and mandatory filings with the Ministry of Corporate Affairs (MCA).",
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
