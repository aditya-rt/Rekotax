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

export default function ImportExportCode({ webAppUrl }) {
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
              Expert IEC Registration Services in India
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
            Fast, Accurate, and Hassle-free Import-Export <br />Code (IEC) Registration
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
            An Import-Export Code (IEC) is the essential first step for any business aiming to enter the global marketplace, serving as the primary license for importing and exporting goods. At Rekotax, we manage the entire IEC registration from start to finish, ensuring you can focus on expanding your business internationally while we handle the foundational legal requirements.                    </Typography>

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
          Know All About IEC Registration
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
              What is an Import-Export Code (IEC)?
            </Typography>
            {/* Para 1 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2, color: "#333" }}>
              An Import-Export Code (IEC) is a unique 10-digit identification number issued by <br />
              the Director General of Foreign Trade (DGFT). It is a mandatory prerequisite for any <br />
              business or individual looking to start an import or export business in India.
            </Typography>

            {/* Para 2 */}
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
              LUT registration is <strong>mandatory</strong> for any exporter who wishes to export goods or <br />
              services without paying integrated tax and claiming refunds later. With LUT,<br /> businesses can
              save time, improve liquidity, and expand globally without tax <br />blockages.
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
                Key Features of IEC Registration
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
                  Acts as the primary <strong>license for import and export </strong> activities
                </li>
                <li>
                  Carries <strong>lifetime validity </strong> and requires no renewal
                </li>
                <li>
                  A PAN-based registration, meaning one PAN card can have only one IEC
                </li>
                <li>
                  No need to file any returns or follow complex post-registration compliance
                </li>
                <li>
                  Essential for <strong> customs clearance</strong> and foreign bank transfers
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
            Who Needs an IEC?                </Typography>

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
                title: "Importers",
                desc: <>Any business or individual bringing goods <strong>into India</strong> from a foreign country.</>,
              },
              {
                title: "Exporters",
                desc: <>Businesses or individuals sending goods or services <strong>from India</strong> to other countries.</>,
              },
              {
                title: "Service Providers",
                desc: <>Service providers who wish to avail benefits under the <strong>Foreign Trade Policy</strong>.</>,
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
            Benefits of IEC Registration            </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
            Securing an IEC is the first step to unlocking global business opportunities. It is not just a legal requirement but a gateway to international trade, enabling businesses to expand their reach, access new markets, and benefit from government schemes.
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
                title: "Gateway to Global Markets",
                desc: <>Legally access international markets for <strong>buying and selling</strong> goods and services.</>,
              },
              {
                title: "Lifetime Validity",
                desc: <>No need for renewals, making it a <strong>one-time, hassle-free</strong> registration.</>,
              },
              {
                title: "Unlocks Trade Benefits",
                desc: <>Become eligible for various government <strong>export promotion schemes</strong> and subsidies.</>,
              },
              {
                title: "Simplifies Customs Clearance",
                desc: <>Mandatory for clearing shipments with <strong>customs authorities</strong> smoothly.</>,
              },
              {
                title: "Easy Bank Transactions",
                desc: <>Required by banks for sending or receiving <strong>foreign currency</strong> for trade.</>,
              },
              {
                title: "No Compliance Burden",
                desc: <>No need to file any returns or follow complex <strong>post-registration compliance</strong> for IEC.</>,
              }]
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
            Simplified Process for IEC Registration
          </Typography>

          {(() => {
            const steps = [
             {
              number: "1",
              title: "Prepare Your Documents",
              desc: "Gather the necessary documents, including the PAN card, Aadhaar card, proof of business address (like a rent agreement or electricity bill), and a cancelled cheque for bank account verification.",
            },
            {
              number: "2",
              title: "Register on DGFT Portal",
              desc: "Visit the official Director General of Foreign Trade (DGFT) portal. Register as a new user by providing and verifying your mobile number and email address via OTP.",
            },
            {
              number: "3",
              title: "Fill the Application Form",
              desc: "Log in to the portal and fill out the online application form (ANF-2A). You will need to enter details about your business, directors/partners, and bank account information accurately.",
            },
              {
              number: "4",
              title: "Upload Documents",
              desc: "Scan and upload the required documents as per the specified format and size. This includes your address proof and the cancelled cheque.",
            },
            {
              number: "5",
              title: "Pay the Government Fee",
              desc: "Proceed to pay the prescribed government application fee through the online payment gateway. The fee is non-refundable.",
            },
            {
              number: "6",
              title: "Receive Your IEC Certificate",
              desc: "After successful submission and verification, the DGFT will issue your 10-digit IEC. You can download the e-IEC certificate directly from the portal.",
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
              sx={{
                textAlign: "center",
                color: "#0f2555",
                fontWeight: 700,
                mb: 4,
              }}
            >
              IEC Registration in India – A Complete Guide for Importers & Exporters
            </Typography>
    
            {/* Introduction */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 4, mb: 2 }}>
              Introduction to IEC Registration
            </Typography>
            <Typography paragraph>
              For any business aspiring to engage in international trade, the <strong>Import-Export Code (IEC)</strong> is the first and most crucial requirement. Issued by the Director General of Foreign Trade (DGFT), the IEC is a mandatory license that enables businesses to import goods into India and export them to global markets.
            </Typography>
            <Typography paragraph>
              Obtaining an IEC is the foundational step to unlocking your business's global potential. At <strong>Rekotax</strong>, we specialize in providing a seamless and efficient IEC registration service, ensuring you can focus on your international expansion while we handle the essential legal formalities.
            </Typography>
    
            {/* What is IEC */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              What is an Import-Export Code (IEC)?
            </Typography>
            <Typography paragraph>
              An Import-Export Code is a unique <strong>10-digit identification number</strong> linked to a business's or individual's PAN card. It is a mandatory requirement for clearing customs, processing international payments, and availing benefits under India's Foreign Trade Policy. Without a valid IEC, no entity can legally conduct import or export activities.
            </Typography>
    
            {/* Who Needs an IEC */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Who Needs an IEC Registration?
            </Typography>
            <Typography paragraph>
              IEC registration is mandatory for any person or entity involved in the cross-border trade of goods and services. This includes:
            </Typography>
            <List sx={{ pl: 3 }}>
              {[
                "Importers: Any business that needs to clear customs for bringing goods into India.",
                "Exporters: Any business that sends goods to another country and needs to send shipments.",
                "Service Providers: Service or technology providers who want to avail benefits under the Foreign Trade Policy for their exports.",
                "E-commerce Operators: Online sellers and platforms dealing with customers in foreign countries.",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Typography paragraph>
              Essentially, if your business transactions involve foreign remittance or customs, an IEC is indispensable.
            </Typography>
    
            {/* Key Features */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Key Features of IEC Registration
            </Typography>
            <Typography paragraph>
              The IEC registration comes with several distinct features that make it business-friendly:
            </Typography>
            <List sx={{ pl: 3 }}>
              {[
                "Lifetime Validity: Once an IEC is issued, it is valid for the lifetime of the entity and requires no renewal.",
                "No Return Filing: Unlike other tax registrations, IEC holders are not required to file any periodic returns.",
                "PAN-Based: The IEC is linked to the PAN of the business. One PAN can have only one IEC.",
                "Quick Processing: The application process is entirely online and is generally processed within a few working days.",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
    
            {/* Benefits */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Benefits of IEC Registration
            </Typography>
            <Typography paragraph>
              Registering for an IEC opens up a world of opportunities and offers tangible benefits:
            </Typography>
            <List sx={{ pl: 3 }}>
              {[
                "Global Market Access: It is the primary license that legally allows you to expand your business to international markets.",
                "Unlocks Export Benefits: An IEC is necessary to avail benefits from the DGFT, Customs, and Export Promotion Councils under various schemes.",
                "Simplifies Customs Clearance: It is a mandatory document for clearing shipments with customs authorities, ensuring smooth logistics.",
                "Facilitates International Banking: Banks require an IEC for processing transactions involving foreign currency for import or export purposes.",
                "Enhances Business Credibility: Having an IEC adds to the credibility of your business when dealing with international clients and partners.",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
    
            {/* Documents Required */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Documents Required for IEC Registration
            </Typography>
            <Typography paragraph>
              The application process for an IEC is digital and requires the following key documents:
            </Typography>
            <List sx={{ pl: 3 }}>
              {[
                "PAN Card: A digital copy of the PAN card of the individual or the business entity.",
                "Identity Proof: Aadhaar card, Voter ID, or Passport of the applicant.",
                "Address Proof: A utility bill (electricity or telephone), rent agreement, or sale deed of the business premises.",
                "Bank Account Proof: A cancelled cheque or a bank certificate of the business's current account.",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
    
            {/* Step-by-Step Process */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Step-by-Step Process for IEC Registration
            </Typography>
            <Typography paragraph>The IEC application process is handled online through the DGFT portal:</Typography>
            <List sx={{ listStyleType: "decimal", pl: 4 }}>
              {[
                "Portal Registration: Register on the official DGFT website by verifying your mobile number and email.",
                "Application Filing: Log in and fill out the online application form (ANF-2A) with accurate business, director/partner, and bank details.",
                "Document Upload: Upload scanned copies of all the required documents in the prescribed format.",
                "Fee Payment: Pay the requisite government application fee using the online payment options.",
                "IEC Issuance: Once the application is submitted and verified by the department, the e-IEC certificate is generated and can be downloaded from the portal.",
              ].map((item) => (
                <ListItem key={item} sx={{ display: "list-item", py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
    
            {/* Updating IEC */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Updating Your IEC
            </Typography>
            <Typography paragraph>
              While IEC has lifetime validity, it is mandatory for every IEC holder to update their details on the DGFT portal annually between April and June. Failure to do so can result in the deactivation of the IEC. This ensures that the information in the DGFT database remains current.
            </Typography>
    
            {/* How Rekotax Helps */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              How Rekotax Can Help You
            </Typography>
            <Typography paragraph>At Rekotax, we simplify the entire IEC registration process. Our services include:</Typography>
            <List sx={{ pl: 3 }}>
              {[
                "Complete Documentation Support: We assist in preparing and verifying all required documents for a flawless application.",
                "Error-Free Application Filing: Our experts handle the online submission to ensure accuracy and avoid rejections.",
                "Fast and Efficient Processing: We manage the entire process to get your IEC issued in the shortest possible time.",
                "Post-Registration Support: We provide guidance on annual updates and other compliance matters related to foreign trade.",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
    
            {/* Conclusion */}
            <Typography variant="h4" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
              Conclusion
            </Typography>
            <Typography paragraph>
              An Import-Export Code is more than just a number; it's your passport to the world of international business. It is the first and most critical step in taking your products and services to a global audience, ensuring compliance and unlocking numerous government benefits.
            </Typography>
            <Typography paragraph>
              Let <strong>Rekotax</strong> be your partner in this journey. Contact us today for a swift and professional IEC registration experience, and take your business across borders.
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
                   q: "What is an Import-Export Code (IEC)?",
                   a: "An Import-Export Code (IEC) is a unique 10-digit number issued by the DGFT (Director General of Foreign Trade) that is mandatory for any business or individual to start an import-export business in India."
                 },
                 {
                   q: "Who needs to obtain an IEC?",
                   a: "Any person or entity looking to import goods into India or export goods from India must have an IEC. It is required for customs clearance, international trade payments, and availing benefits under the Foreign Trade Policy."
                 },
                 {
                   q: "What are the main benefits of having an IEC?",
                   a: "The key benefits include legal access to global markets, eligibility for government export schemes, lifetime validity with no renewal hassles, and simplified customs and banking procedures."
                 },
                 {
                   q: "Is there any renewal required for an IEC?",
                   a: "No, an IEC has lifetime validity and does not require any renewal. However, it is mandatory to update your IEC details on the DGFT portal annually between April and June to keep it active."
                 },
                 {
                   q: "What documents are needed for IEC registration?",
                   a: "You will need a digital copy of the PAN card, identity proof (Aadhaar/Voter ID), proof of business address, and a cancelled cheque or bank certificate of the business's current account."
                 },
                 {
                   q: "How long does it take to get an IEC?",
                   a: "Once the online application is submitted with all the correct documents, the IEC is typically issued by the DGFT within 3-5 working days."
                 },
                 {
                   q: "Can an individual apply for an IEC?",
                   a: "Yes, both individuals (as proprietors) and business entities like partnership firms, LLPs, and companies can apply for and obtain an IEC."
                 },
                 {
                   q: "Is GST registration mandatory to get an IEC?",
                   a: "While GST registration is not a mandatory prerequisite to apply for an IEC, it is required for claiming GST refunds on exports. Most businesses involved in regular trade will need both."
                 },
                 {
                   q: "What happens if I don't update my IEC annually?",
                   a: "Failure to update your IEC details on the DGFT portal between April and June each year will result in the deactivation of your IEC, which will halt all your import and export activities until it is reactivated."
                 },
                 {
                   q: "How can Rekotax help with IEC registration?",
                   a: "Rekotax offers a complete end-to-end service for IEC registration. We assist with document preparation, ensure an error-free online application, and provide support for annual updates, making the entire process fast and seamless for you."
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
