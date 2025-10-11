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
      sx={{ color: "#0f2555", fontWeight: 500, mb: 1.5, fontSize: "1.5rem" }}
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

export default function ProfessionalTax({ webAppUrl }) {
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
              Expert GST Registration Services in India
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
Professional Tax Registration 
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
Register your Proprietorsip with Rekotax — experience fast setup, full legal compliance, expert documentation, and dedicated support to launch your business effortlessly.
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
            fontWeight: 600,
            mb: 4,
            mt: 2,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Know All About Professional Tax Registration

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
                fontWeight: 500,
                mb: 1.5,
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
            >
              What is Professional Tax?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
             Professional Tax is a state-imposed tax levied on income earned by <br/>
              individuals through employment, trade, or profession. It applies  <br/>
              to both salaried and self-employed persons, and the responsibility <br/>
              of deduction and remittance lies with the employer.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
            Every business entity, employer, or professional operating in India must <br/>
             register under the respective State Professional Tax Department within <br/>
             the prescribed timeline. The rates and rules vary from state to state, <br/>
             with a maximum limit of ₹2,500 per annum as per the Constitution. <br/>
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 4 }}>
              {/* Heading */}
              <Typography
                variant="h3"
              sx={{
                color: "#0f2555",
                fontWeight: 500,
                mb: 1.5,
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
              >
                Key Features of Professional Tax Registration

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
Mandatory for all <strong> employers, professionals, and traders </strong>operating in applicable states
                </li>
                <li>
State-specific registration – governed by individual <strong>State Tax Departments</strong>
                </li>
                <li>
Employers must obtain a <strong> Professional Tax Employer Registration Certificate (PTEC)</strong>
                </li>
                <li>
Self-employed professionals must obtain a <strong>Professional Tax Enrollment Certificate (PTRC)</strong> 
                </li>
                <li>
Tax slabs are based on <strong>monthly income levels</strong> as prescribed by the respective state
                </li>
              </Box>
            </Box>


          
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
            Who Needs Professional Tax Registration?
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
                title: "Employers",
                desc: <>Companies, firms, or organizations employing staff and responsible for <strong>deducting and remitting</strong>  professional tax.</>,
              },
              {
                title: "Professionals",
                desc: <>Individuals practicing professions like <strong>CA, doctor, lawyer, consultant, architect, or freelancer.</strong> </>,
              },
              {
                title: "Traders & Businesses",
                desc: <>Entities engaged in trade or business required to obtain registration as per <strong>state laws.</strong> </>,
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
                  <Typography variant="h6" sx={{ fontWeight: 500, color: "#0f2555", mb: 1 }}>
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
            Benefits of Professional Tax Registration
           </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
Professional Tax registration not only ensures compliance with state laws but also helps businesses maintain credibility, avoid penalties, and contribute to state welfare programs.          </Typography>

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
    title: "Legal Compliance",
    desc: <>Mandatory under state laws to operate a <strong>business or profession</strong> legally.</>,
  },
  {
    title: "Avoid Penalties",
    desc: <>Timely registration and payment help avoid <strong>interest and penalties</strong> under respective acts.</>,
  },
  {
    title: "Employee Trust",
    desc: <>Shows that the employer adheres to <strong>statutory compliance</strong>, building employee confidence.</>,
  },
  {
    title: "State Welfare Contribution",
    desc: <>Funds collected are used for <strong>developmental and welfare activities</strong> by state governments.</>,
  },
  {
    title: "Applicable to Multiple Entities",
    desc: <>Valid for <strong>companies, LLPs, proprietorships, and professionals</strong> across different states.</>,
  },
  {
    title: "Simple Online Process",
    desc: <>Easy online registration through the respective <strong>State Commercial Tax Department</strong> portal.</>,
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
           Simplified Process for Professional Tax Registration

          </Typography>

          {(() => {
        const steps = [
  {
    number: "1",
    title: "Prepare Your Documents",
    desc: "Keep PAN, Aadhaar, incorporation or firm deed, principal place of business address proof, signatory ID, bank details, and employee list with salary slabs. Sole proprietors and professionals should keep personal PAN and photo.",
  },
  {
    number: "2",
    title: "Create State PT Portal Account",
    desc: "Register on your State Commercial Taxes or Professional Tax portal. Verify mobile and email via OTP and complete profile details like nature of business, commencement date, and jurisdiction if asked.",
  },
  {
    number: "3",
    title: "Select PTEC or PTRC",
    desc: "Choose the correct application based on your case. PTEC is for enrollment of business or self-employed professionals. PTRC is for employers who deduct PT from employees. Many entities need both.",
  },
  {
    number: "4",
    title: "Fill Application & Upload",
    desc: "Enter legal name, trade name, constitution, addresses, signatory details, employee strength, and salary ranges. Upload required documents in the prescribed format and size. Review all entries for accuracy.",
  },
  {
    number: "5",
    title: "e-Sign and Pay Dues",
    desc: "e-Sign using DSC or Aadhaar eKYC as allowed. Pay registration fee if applicable. Some states require first month or first year challan during registration. Save the acknowledgment for records.",
  },
  {
    number: "6",
    title: "Get PT Numbers & Comply",
    desc: "Download your PTEC and or PTRC certificates. Configure payroll slabs, start monthly deductions from next pay cycle, and file PT returns and challans as per your state schedule to avoid penalties.",
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
    backgroundColor: "#f4f6f8",
    py: { xs: 6, md: 8 },
    px: { xs: 2, md: 4 },
  }}
>
  <Container maxWidth="md">
    {/* H1 */}
    <Box
      sx={{
        backgroundColor: "#fff",
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#0f2555", mb: 1.5, fontWeight: 700, lineHeight: 1.3 }}
      >
        Professional Tax Registration in India - Complete PTEC and PTRC Guide
      </Typography>
    </Box>

    {/* Introduction */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Introduction to Professional Tax Registration
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        <strong>Professional Tax</strong> is a state-level tax on income earned by individuals through employment, trade, or profession.
        It applies to salaried employees as well as self-employed professionals and businesses, subject to the rules of the state where
        they operate. Compliance requires timely <strong>PTEC</strong> and or <strong>PTRC</strong> registration, monthly deductions
        where applicable, and periodic return filing.
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        With <strong>Rekotax</strong>, you get a smooth, end-to-end Professional Tax registration experience. We handle documentation,
        state portal filings, and post-registration compliance so you can focus on business operations with confidence.
      </Typography>
    </Box>

    {/* What is Professional Tax */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        What is Professional Tax
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        Professional Tax is levied by state governments on income from employment or self-employment. While rates and timelines vary by
        state, the annual PT payable by an individual is capped at <strong>₹2,500</strong>. Businesses and professionals typically
        require enrollment, and employers who pay salaries must also register to deduct and remit PT for employees as per state slabs.
      </Typography>
    </Box>

    {/* Who Needs Registration */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Who Needs Professional Tax Registration
      </Typography>
      <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        <p>Professional Tax registration is required based on the nature of activity and state rules:</p>
        <ul>
          <li><strong>Employers:</strong> Companies, LLPs, firms, and other entities paying salaries must register for <strong>PTRC</strong> to deduct PT from employees and deposit it with the state.</li>
          <li><strong>Self-employed professionals:</strong> Consultants, doctors, lawyers, CAs, architects, freelancers, and other professionals must obtain <strong>PTEC</strong> and pay their own liability.</li>
          <li><strong>Businesses and traders:</strong> Proprietorships, partnerships, and corporate entities typically require <strong>PTEC</strong> based on state thresholds.</li>
          <li><strong>Multi-state operations:</strong> Entities operating in multiple states need to comply in each applicable state.</li>
        </ul>
        <p>In many cases, a business may need both PTEC and PTRC to stay fully compliant.</p>
      </Typography>
    </Box>

    {/* Key Features */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Key Features of Professional Tax Registration
      </Typography>
      <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        <ul>
          <li><strong>State-specific:</strong> Rules, slabs, and due dates differ by state, and registration is done on the respective state tax portal.</li>
          <li><strong>PTEC and PTRC coverage:</strong> Enrollment for the business or professional and registration for employer deductions.</li>
          <li><strong>Payroll integration:</strong> Monthly salary deductions based on slab rates set by the state.</li>
          <li><strong>Digital process:</strong> Most states support online application, e-sign, and e-payment.</li>
        </ul>
      </Typography>
    </Box>

    {/* Benefits */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Benefits of Professional Tax Registration
      </Typography>
      <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        <ul>
          <li><strong>Legal compliance:</strong> Operate within state laws and avoid interest and penalties.</li>
          <li><strong>Smoother payroll:</strong> Standardized deduction process aligns HR and finance practices.</li>
          <li><strong>Employee confidence:</strong> Transparent statutory deductions build trust with staff.</li>
          <li><strong>Easy audits:</strong> Proper registration and challans simplify assessments and inspections.</li>
        </ul>
      </Typography>
    </Box>

    {/* PTEC vs PTRC Table + Note */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        PTEC vs PTRC - What You Need
      </Typography>
      <Typography component="div" sx={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0f2555", color: "#fff" }}>
              <th style={{ padding: 12, textAlign: "left" }}>Certificate</th>
              <th style={{ padding: 12, textAlign: "left" }}>Who needs it</th>
              <th style={{ padding: 12, textAlign: "left" }}>Purpose</th>
              <th style={{ padding: 12, textAlign: "left" }}>Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: 12 }}><strong>PTEC</strong> (Professional Tax Enrollment)</td>
              <td style={{ padding: 12 }}>Self-employed professionals and businesses</td>
              <td style={{ padding: 12 }}>Pay own Professional Tax as per state rules</td>
              <td style={{ padding: 12 }}>Usually annual payment by the enrolled person or entity</td>
            </tr>
            <tr>
              <td style={{ padding: 12 }}><strong>PTRC</strong> (Professional Tax Registration)</td>
              <td style={{ padding: 12 }}>Employers paying salaries</td>
              <td style={{ padding: 12 }}>Deduct PT from employees and remit to the state</td>
              <td style={{ padding: 12 }}>Monthly or state-prescribed schedule with returns</td>
            </tr>
          </tbody>
        </table>
      </Typography>

      <Box
        sx={{
          mt: 2.5,
          background: "#f4f6f8",
          borderLeft: "4px solid #0f2555",
          p: 2,
          borderRadius: 1,
          color: "#333",
          fontSize: "0.98rem",
          lineHeight: 1.7,
        }}
      >
        <strong>Note:</strong> Thresholds, slabs, and filing cycles vary by state. If you have employees across multiple
        locations, register and comply in each relevant state.
      </Box>
    </Box>

    {/* Documents Required */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Documents Required for Professional Tax Registration
      </Typography>
      <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        <p>Keep clear, legible copies ready in the formats accepted by your state portal:</p>
        <ul>
          <li><strong>Entity documents:</strong> PAN, incorporation certificate or firm deed, MOA or partnership deed where applicable.</li>
          <li><strong>Address proof:</strong> Electricity bill, property tax receipt, rent agreement with owner NOC if rented.</li>
          <li><strong>Signatory KYC:</strong> PAN and Aadhaar of proprietor, partner, director, or authorized signatory.</li>
          <li><strong>Bank details:</strong> Cancelled cheque or bank letter for the current account.</li>
          <li><strong>Employee details for PTRC:</strong> Employee list, designation, salary ranges as per slab, date of joining.</li>
          <li><strong>Other state-specific items:</strong> Shop and establishment certificate, GST details, or any portal-specific declarations.</li>
        </ul>
      </Typography>
    </Box>

    {/* Step-by-Step Process */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Step-by-Step Process for Professional Tax Registration
      </Typography>
      <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        <p>The application is filed on the respective state tax portal. A typical flow is outlined below:</p>
        <ol>
          <li><strong>Portal account creation:</strong> Sign up on the state Commercial Taxes or Professional Tax portal and verify mobile or email.</li>
          <li><strong>Select application type:</strong> Choose <strong>PTEC</strong> for enrollment, <strong>PTRC</strong> for employer registration, or both if required.</li>
          <li><strong>Form filing:</strong> Enter legal name, trade name, constitution, principal place of business, signatory details, and employee information where applicable.</li>
          <li><strong>Document upload:</strong> Upload KYC, address proof, and any state-specific attachments in the prescribed size and format.</li>
          <li><strong>e-Sign and payment:</strong> e-Sign using DSC or Aadhaar as allowed. Pay the registration fee or initial PT payment if asked by the state.</li>
          <li><strong>Certificate issuance:</strong> Download the <strong>PTEC</strong> and or <strong>PTRC</strong> certificate once approved and keep acknowledgments for records.</li>
        </ol>
      </Typography>
    </Box>

    {/* Post-Registration Compliance */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Post-Registration Compliance and Due Dates
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        After registration, configure payroll to deduct PT as per the correct slab from the next salary cycle and deposit within due dates.
        File returns at the frequency set by your state. Keep challans and return acknowledgments safely for audit trails.
      </Typography>
    </Box>

    {/* How Rekotax Can Help */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        How Rekotax Can Help You
      </Typography>
      <Typography component="div" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        <ul>
          <li><strong>State assessment:</strong> We identify whether you need PTEC, PTRC, or both and map state-specific rules.</li>
          <li><strong>Documentation and filing:</strong> Complete preparation, validation, and online submission on the correct portal.</li>
          <li><strong>Payroll-ready setup:</strong> Slab configuration note, deduction policy, and compliance calendar for your HR team.</li>
          <li><strong>Ongoing support:</strong> Monthly return filing options, challan assistance, and notice or query handling.</li>
        </ul>
      </Typography>
    </Box>

    {/* Conclusion */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 2, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f2555", mb: 2, fontWeight: 600 }}>
        Conclusion
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        Professional Tax registration keeps your business compliant and your payroll clean. Whether you are a growing startup, an
        established company, or a self-employed professional, timely PTEC and PTRC registration protects you from penalties and builds
        trust with employees and regulators.
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        Let <strong>Rekotax</strong> set up your Professional Tax compliance with a quick, accurate, and fully guided process. Connect
        with us to get started today.
      </Typography>
    </Box>
  </Container>
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
         { [
  {
    q: "What is Professional Tax in India?",
    a: "Professional Tax is a state-level tax on income from employment, trade, or profession. It is levied by state governments and is payable by salaried employees and self-employed professionals. The annual liability for an individual is capped at ₹2,500."
  },
  {
    q: "What is the difference between PTEC and PTRC?",
    a: "PTEC is the Professional Tax Enrollment Certificate for businesses and self-employed persons to pay their own PT. PTRC is the Professional Tax Registration Certificate for employers to deduct PT from employees and remit it to the state. Many entities need both depending on activity and state rules."
  },
  {
    q: "Who must obtain Professional Tax registration?",
    a: "Employers paying salaries must obtain PTRC. Self-employed professionals such as consultants, doctors, lawyers, CAs, architects, and freelancers must obtain PTEC. Proprietorships, partnerships, LLPs, and companies usually need PTEC. Register in each state where you operate or employ staff."
  },
  {
    q: "Is Professional Tax applicable in all states?",
    a: "Professional Tax is implemented by several states and union territories. Rates, slabs, forms, and due dates vary by state. If you operate in multiple states, register and comply in each applicable jurisdiction."
  },
  {
    q: "What documents are required for PTEC or PTRC?",
    a: "Common documents include PAN of the entity or individual, incorporation or firm deed, address proof of principal place of business, signatory KYC (PAN and Aadhaar), bank proof, and for PTRC the employee list with salary slabs. Some states may also ask for GST or Shop and Establishment details and NOC if premises are rented."
  },
  {
    q: "What is the process to register for Professional Tax?",
    a: "Sign up on the respective state tax portal, choose PTEC, PTRC, or both, fill the online form with entity and signatory details, upload documents, e-sign via DSC or Aadhaar as allowed, and submit. On approval, download the certificates and begin payments and return filing as per the state schedule."
  },
  {
    q: "What are the due dates and payment frequency?",
    a: "Frequency depends on the state. PTRC often requires monthly deduction and deposit based on salary slabs, with monthly or periodic returns. PTEC is typically paid annually by the enrolled person or entity. Follow your state's latest calendar to avoid interest and penalties."
  },
  {
    q: "What are the penalties for non-compliance?",
    a: "Late registration, non-deduction, late payment, or delayed return filing can attract interest, penalties, and notices under the relevant state act. Maintain regular challans, returns, and reconciliations to keep a clean compliance trail."
  },
  {
    q: "How should multi-state employers comply?",
    a: "Register separately in each state where employees are located, apply the correct local salary slabs, deduct month-wise in payroll, and deposit within due dates. Maintain state-wise registers, challans, and return acknowledgments for audit readiness."
  },
  {
    q: "How can Rekotax help with Professional Tax registration and filing?",
    a: "Rekotax provides end-to-end Professional Tax support. We assess whether you need PTEC, PTRC, or both, prepare and verify documents, complete online registration, set up payroll slabs, and handle ongoing payments and returns. We also assist with notices and queries."
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
