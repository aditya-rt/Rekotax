import React from "react";
import {
  Gavel,
  Group,
  WorkspacePremium,
  Security,
  AccountBalance,
  AccessTime,
  Handshake,
  HeadsetMic,
  CurrencyRupee,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Stack,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef, useState, useEffect } from "react";
import Footer from "../../../Dashboard/Footer.jsx";
import ContactSection from "../../../Dashboard/ContactSection.jsx";
import WhyRekotax from "../../../Dashboard/WhyRekotax.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


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

export default function GSTRegistration({ webAppUrl, onSubmitted }) {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const footerRef = useRef(null);
  const contactRef = useRef(null);
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const aboutRef = useRef(null);
  const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
  const handleAccordionToggle = (idx) => {
    setExpanded((prev) => (prev === idx ? null : idx));
  };

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

  const [snack, setSnack] = React.useState({
    open: false,
    severity: "success",
    msg: "",
  });
  const [showReqWarn, setShowReqWarn] = React.useState(false);

  const [form, setForm] = React.useState(initialForm);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (showReqWarn && requiredOk(next)) setShowReqWarn(false);
  };
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
  return (
    <Box sx={{ fontFamily: "'Open Sans', sans-serif", overflowX: "clip" }}>
      {/* Hero */}

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
    pt: { xs: "88px", md: "94px" },
    pb: { xs: 4, md: 6 },

    // if your next section already has big top padding, gently pull it up on desktop
    mb: { xs: 0, md: -2 },
    mt: { xs: -3, md: -8 },
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
                py: 0.8,
                borderRadius: 999,
                fontSize: "0.95rem",
              }}
            >
              Expert GST Registration Services in India
            </Box>
          </Box>

          {/* one-line heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
              textAlign: "center",
              mb: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Fast, Accurate, and Hassle-free GST Registration
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
            GST Registration gives your business a legal tax identity, enabling smooth
            compliance, input tax credit, and nationwide credibility. At Rekotax, we
            make the entire process effortless so you can focus on growth while we
            handle the compliances.
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
              borderRadius: 999,
              px: { xs: 1.5, md: 2.5 },         // less horizontal padding
              py: { xs: 0.6, md: 1 },
              boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 1.5, md: 3 },
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            {[
              "Typical approvals: 7–10 days*",
              "CA/CS assisted end-to-end",
              "Paperless & transparent tracking",
            ].map((text, i) => (
              <Typography
                key={text}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  fontWeight: 700,
                  px: { xs: 1, md: 2 },
                  position: "relative",
                  // separators on md+
                  ...(i < 2 && {
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: 22,
                      width: 1,
                      // bgcolor: "rgba(15,37,85,0.18)",
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
          Know All About GST Registration
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
              What is GST Registration?
            </Typography>
            <Typography sx={{ fontSize: "1rem", mb: 2 }}>
              <strong>GST (Goods and Services Tax)</strong> registration is a
              mandatory process for businesses <br /> exceeding the prescribed{" "}
              <strong>turnover threshold</strong>. It provides a unique{" "}
              <strong>15-digit <br /> identification number (GSTIN)</strong> that enables
              legal tax collection and <strong>input tax credit</strong> claims.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h3"
              sx={{
                color: "#0f2555",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.6rem", md: "1.7rem" },
              }}
            >
              GSTIN Structure Explained
            </Typography>

            <Box
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
            </Box>

            <Grid container spacing={1.5} wrap="wrap">
              <GstinBox code="22" label="State Code" />
              <GstinBox code="ABCDE1234F" label="PAN Number" />
              <GstinBox code="1" label="Entity Code" />
              <GstinBox code="Z" label="Default Letter" />
              <GstinBox code="5" label="Check Digit" />
            </Grid>
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
            variant="h3"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 3, textAlign: "left" }}
          >
            Threshold Limits for Registration
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
              { title: "Goods", desc: "Rs. 40 lakh annual turnover. (Rs. 20 lakh for special category states)." },
              { title: "Services", desc: "Rs. 20 lakh annual turnover. (Rs. 10 lakh for special category states)." },
              { title: "Interstate Supply", desc: "Registration is mandatory for any interstate supply of goods, regardless of turnover." },
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
            variant="h3"
            sx={{ color: "#0f2555", fontWeight: 700, mb: 3, mt: 4, textAlign: "left" }}
          >
            Why Consider GST Registration Even If It’s Not Applicable?
          </Typography>

          <Typography sx={{ mb: 5, color: "#444" }}>
            The <strong>GST law</strong> exempts businesses from registration until they cross the
            prescribed <strong>turnover threshold</strong>. However, many <strong>entrepreneurs</strong> and{" "}
            <strong>growing businesses</strong> choose to voluntarily register under GST despite not being
            legally required. The reason is simple — <strong>GST registration</strong> offers much more than
            compliance. It provides <strong>strategic</strong>, <strong>financial</strong>, and{" "}
            <strong>operational advantages</strong> that accelerate business growth.
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
              { title: "Business Credibility", desc: "Enhances trust with customers, vendors, and corporates by showing your business is tax-compliant and professional." },
              { title: "Input Tax Credit", desc: "Claim input tax credit (ITC) on purchases to reduce your tax burden and increase profitability." },
              { title: "B2B Opportunities", desc: "Issue GST invoices and work with GST-registered clients, helping you secure bigger contracts." },
              { title: "Inter-State Expansion", desc: "Expand across states without turnover restrictions, making scaling hassle-free." },
              { title: "E-Commerce Ready", desc: "Sell on Amazon, Flipkart, and other platforms where GST registration is mandatory." },
              { title: "Government Contracts", desc: "Become eligible to bid for tenders and PSU contracts that require GST registration." },
            ].map((card) => (
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
            Simplified Process for GST Registration
          </Typography>

          {(() => {
            const steps = [
              {
                number: "1",
                title: "Collect Required Documents",
                desc:
                  "Gather PAN, Aadhaar, business address proof, bank details, and photographs of the proprietor/partners/directors before starting the application.",
              },
              {
                number: "2",
                title: "Create GST Portal Account",
                desc:
                  "Visit the GST portal and create a temporary reference number (TRN) by verifying your mobile and email through OTP authentication.",
              },
              {
                number: "3",
                title: "Fill GST Application (Form GST REG-01)",
                desc:
                  "Complete the online application form with business details, promoter information, place of business, and upload scanned documents.",
              },
              {
                number: "4",
                title: "Verification & ARN Generation",
                desc:
                  "Submit the application using DSC or EVC. The system generates an Application Reference Number (ARN) for future tracking.",
              },
              {
                number: "5",
                title: "Application Review by Officer",
                desc:
                  "A GST officer reviews the application and documents. If any clarification is required, you may receive a notice for additional information.",
              },
              {
                number: "6",
                title: "Receive GSTIN & Certificate",
                desc:
                  "Upon approval, you will be issued a 15-digit GSTIN along with the GST Registration Certificate. You can now legally collect and pay GST.",
              },
            ];

            const rows = [steps.slice(0, 3), steps.slice(3, 6)];

            return rows.map((row, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: 2, // 16px between cards
                  overflowX: { xs: "auto", md: "visible" },
                  px: { xs: 1, md: 0 },
                  mb: idx === 0 ? 3 : 0,
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  "&::-webkit-scrollbar": { display: "none" },
                  "-msOverflowStyle": "none",
                  scrollbarWidth: "none",
                  justifyContent: { xs: "flex-start", md: "center" },
                }}
              >
                {row.map((step) => (
                  <Box
                    key={step.number}
                    sx={{
                      // Mobile/tablet: fixed card width for swipe
                      // Desktop: exact 1/3 of the row minus the two gaps (2 * 16px = 32px)
                      flex: {
                        xs: "0 0 88%",
                        sm: "0 0 360px",
                        md: "0 0 calc((100% - 32px) / 3)",
                      },
                      scrollSnapAlign: { xs: "start", md: "none" },
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
                        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 28px rgba(0,0,0,0.12)" },
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
            py: { xs: 6, md: 10 },
            fontFamily: "'Open Sans', sans-serif",
            color: "#333",
            lineHeight: 1.7,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              color: "#0f2555",
              mb: 4,
            }}
          >
            GST Registration in India – A Complete Guide for Businesses
          </Typography>

          {/* Introduction */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Introduction
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Goods and Services Tax (GST) is one of the most significant tax reforms in India. Introduced in July
            2017, GST replaced multiple indirect taxes like VAT, Service Tax, and Excise Duty with a single unified
            system. It simplified taxation and created a transparent business environment.
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Every business that crosses the prescribed turnover threshold or engages in specific taxable activities
            must obtain GST Registration. At <strong>Rekotax</strong>, we provide end-to-end support for GST
            registration and compliance, ensuring your business remains tax-ready, compliant, and hassle-free.
          </Typography>

          {/* What is GST Registration */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            What is GST Registration?
          </Typography>
          <Typography sx={{ mb: 4 }}>
            GST Registration is the process of enrolling a business under the GST law to obtain a unique{" "}
            <strong>15-digit GST Identification Number (GSTIN)</strong>. This number enables businesses to collect
            GST from customers, file tax returns, and claim input tax credit on purchases. Without GST registration,
            businesses cannot legally collect tax or avail credit on the GST paid to suppliers.
          </Typography>

          {/* Who Needs GST Registration */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Who Needs GST Registration?
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST registration is mandatory for certain categories of businesses and professionals. Below are the key
            groups that require GST registration:
          </Typography>
          <ul>
            <li>
              <strong>Businesses with turnover above the prescribed threshold:</strong> Any business that crosses the
              annual turnover limit set by GST law must obtain registration to comply with tax regulations.
            </li>
            <li>
              <strong>Inter-state suppliers of goods and services:</strong> Businesses involved in selling goods or
              services across state boundaries are required to register under GST regardless of turnover.
            </li>
            <li>
              <strong>E-commerce operators and aggregators:</strong> Online platforms facilitating the sale of goods
              or services are compulsorily required to obtain GST registration.
            </li>
            <li>
              <strong>Casual taxable persons:</strong> Businesses that occasionally supply goods or services in
              another state where they do not have a fixed place of business must register under GST.
            </li>
            <li>
              <strong>Non-resident taxable persons:</strong> Foreign businesses providing goods or services in India
              without a permanent establishment must register under GST.
            </li>
            <li>
              <strong>Businesses required to deduct or collect TDS/TCS:</strong> Specific entities like government
              departments or e-commerce operators that deduct/collect tax at source must be registered under GST.
            </li>
          </ul>

          {/* Threshold Limits */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            GST Threshold Limits (2025)
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST law prescribes turnover limits for mandatory registration. These limits ensure that small businesses
            are relieved from heavy compliance. The threshold limits are:
          </Typography>
          <ul>
            <li>
              <strong>₹40 lakhs for goods suppliers:</strong> Businesses engaged in supplying goods with turnover above
              ₹40 lakhs must register (₹20 lakhs in special category states).
            </li>
            <li>
              <strong>₹20 lakhs for service providers:</strong> Businesses offering services must register if turnover
              exceeds ₹20 lakhs (₹10 lakhs in special category states).
            </li>
          </ul>
          <Typography sx={{ mb: 4 }}>
            Voluntary registration is also available for businesses below the threshold. Opting for it offers benefits
            like input tax credit, better compliance records, and enhanced market reputation.
          </Typography>

          {/* Different Categories */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Different Categories under GST
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST law provides different types of registration categories to suit different types of businesses. They
            include:
          </Typography>
          <ul>
            <li>
              <strong>Regular Taxpayer:</strong> The most common category, where businesses file monthly or quarterly
              GST returns and comply with standard GST rules.
            </li>
            <li>
              <strong>Composition Scheme:</strong> Designed for small businesses with turnover up to ₹1.5 crore, this
              scheme allows them to pay GST at a fixed rate with simplified compliance.
            </li>
            <li>
              <strong>Casual Taxable Person:</strong> Suitable for businesses making occasional transactions in states
              where they don’t have a fixed place of business.
            </li>
            <li>
              <strong>Non-Resident Taxable Person:</strong> Applicable to foreign businesses supplying goods or
              services in India but without a permanent business location.
            </li>
            <li>
              <strong>E-commerce Operators:</strong> Online platforms that facilitate trade are responsible for
              collecting Tax Collected at Source (TCS).
            </li>
            <li>
              <strong>TDS/TCS Deductors:</strong> Government departments and e-commerce companies responsible for
              deducting or collecting GST at source fall under this category.
            </li>
          </ul>

          {/* GST Slab Rates */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            GST Slab Rates in India
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST in India is structured into multiple slab rates to categorize goods and services based on necessity and
            luxury. Below is a quick overview of the current GST rates:
          </Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", my: 3 }}>
            <thead>
              <tr>
                <Box component="th" sx={{ border: "1px solid #ddd", p: 2, bgcolor: "#0f2555", color: "#fff" }}>
                  GST Slab Rate
                </Box>
                <Box component="th" sx={{ border: "1px solid #ddd", p: 2, bgcolor: "#0f2555", color: "#fff" }}>
                  Applicable Goods/Services
                </Box>
              </tr>
            </thead>
            <tbody>
              {[
                ["0%", "Essential items like fresh fruits, vegetables, milk, eggs, and basic healthcare services remain tax-free."],
                ["5%", "Items of mass consumption like packaged food, edible oils, tea, coffee, coal, and economy-class air travel fall under this slab."],
                ["12%", "Processed foods, computers, medicines, and mobile phones are taxed at this moderate rate."],
                ["18%", "Consumer durables, financial services, telecom, industrial goods, and restaurants are generally taxed at 18%."],
                ["28%", "Luxury items such as high-end cars, tobacco, and aerated drinks fall under this highest slab."],
              ].map(([rate, desc]) => (
                <tr key={rate}>
                  <Box component="td" sx={{ border: "1px solid #ddd", p: 2 }}>
                    {rate}
                  </Box>
                  <Box component="td" sx={{ border: "1px solid #ddd", p: 2 }}>
                    {desc}
                  </Box>
                </tr>
              ))}
            </tbody>
          </Box>

          {/* Benefits */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Benefits of GST Registration
          </Typography>
          <ul>
            <li>
              <strong>Legal recognition:</strong> Your business is officially recognized as a supplier of goods and
              services under GST law.
            </li>
            <li>
              <strong>Input Tax Credit (ITC):</strong> Businesses can claim credit for the GST paid on purchases,
              reducing overall tax liability.
            </li>
            <li>
              <strong>Seamless inter-state trade:</strong> GST allows businesses to sell goods and services across
              states without additional restrictions.
            </li>
            <li>
              <strong>Enhanced credibility:</strong> Registered businesses gain more trust from customers, suppliers,
              and banks.
            </li>
            <li>
              <strong>Eligibility for government tenders:</strong> GST registration is mandatory for applying to most
              government contracts and tenders.
            </li>
            <li>
              <strong>Avoidance of penalties:</strong> Registering ensures compliance and saves businesses from heavy
              penalties and legal consequences.
            </li>
          </ul>

          {/* Why Register Even If Not Mandatory */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Why Register Even If Not Mandatory?
          </Typography>
          <ul>
            <li>
              <strong>Claim Input Tax Credit:</strong> Even small businesses can reduce costs by claiming ITC on their
              purchases.
            </li>
            <li>
              <strong>Increased customer trust:</strong> A GSTIN on invoices shows credibility and transparency to
              clients.
            </li>
            <li>
              <strong>Better business opportunities:</strong> Large companies prefer dealing with GST-compliant
              businesses, opening up new opportunities.
            </li>
            <li>
              <strong>Future readiness:</strong> Voluntary registration prepares your business for future growth
              without facing compliance delays later.
            </li>
          </ul>

          {/* Documents Required */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Documents Required for GST Registration
          </Typography>
          <ul>
            <li>
              <strong>PAN card:</strong> PAN of the business or applicant is mandatory for GST registration.
            </li>
            <li>
              <strong>Aadhaar card:</strong> Identification proof of the proprietor, partners, or directors.
            </li>
            <li>
              <strong>Business address proof:</strong> Electricity bill, rent agreement, or property documents to
              confirm business location.
            </li>
            <li>
              <strong>Bank account proof:</strong> Cancelled cheque or passbook copy to link bank details with GSTIN.
            </li>
            <li>
              <strong>Photographs:</strong> Passport-size photographs of proprietors, partners, or directors.
            </li>
            <li>
              <strong>Constitution documents:</strong> Incorporation certificate, partnership deed, or other applicable
              proof.
            </li>
            <li>
              <strong>Digital Signature Certificate:</strong> For companies and LLPs, DSC is required for secure
              filing.
            </li>
          </ul>

          {/* Step-by-Step Process */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Step-by-Step Process of GST Registration
          </Typography>
          <ol>
            <li>
              <strong>Document Collection & Verification:</strong> Gather and verify all necessary documents for
              accuracy.
            </li>
            <li>
              <strong>Application Filing:</strong> Submit the GST registration application online using Form GST REG-01
              on the GST portal.
            </li>
            <li>
              <strong>ARN Generation:</strong> After submission, an Application Reference Number (ARN) is generated to
              track the status.
            </li>
            <li>
              <strong>Verification by Officer:</strong> A GST officer reviews the application and may seek
              clarifications if needed.
            </li>
            <li>
              <strong>GSTIN Allotment:</strong> Once approved, the business receives a GSTIN and the GST Registration
              Certificate.
            </li>
          </ol>

          {/* Penalties */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Penalties for Not Registering Under GST
          </Typography>
          <ul>
            <li>
              <strong>10% penalty:</strong> If a business fails to register when required, a penalty of 10% of the tax
              amount due is imposed, with a minimum of ₹10,000.
            </li>
            <li>
              <strong>100% penalty:</strong> In cases of intentional tax evasion, the penalty can go up to 100% of the
              tax due.
            </li>
          </ul>

          {/* How Rekotax Can Help */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            How Rekotax Can Help You
          </Typography>
          <ul>
            <li>
              <strong>End-to-end assistance:</strong> From document preparation to application approval, we handle the
              entire process.
            </li>
            <li>
              <strong>Error-free filing:</strong> We ensure all documents are accurate and filed correctly to avoid
              rejections.
            </li>
            <li>
              <strong>Expert guidance:</strong> Our professionals provide clarity on GST rules, compliance, and future
              filings.
            </li>
            <li>
              <strong>Ongoing compliance support:</strong> Beyond registration, we also help with GST return filing and
              notices.
            </li>
            <li>
              <strong>Dedicated one-on-one support:</strong> A dedicated expert is assigned to assist you throughout
              the process.
            </li>
          </ul>

          {/* Conclusion */}
          <Typography variant="h2" sx={{ color: "#0f2555", fontWeight: 700, fontSize: '25px', mb: 2, mt: 4 }}>
            Conclusion
          </Typography>
          <Typography sx={{ mb: 2 }}>
            GST registration is more than a legal formality — it strengthens credibility, ensures compliance, and
            facilitates business growth. Whether mandatory or voluntary, registering under GST gives your business a
            competitive edge.
          </Typography>
          <Typography>
            At <strong>Rekotax</strong>, we make GST registration simple, transparent, and reliable. Contact us today
            to get your business GST-registered without any hassle.
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
                q: "What is GST Registration and why is it required in India?",
                a: "GST Registration is the process by which a business gets enrolled under Goods and Services Tax (GST) and receives a unique 15-digit GSTIN. It is required for legally collecting GST from customers, claiming input tax credit, and ensuring smooth business operations in compliance with Indian tax laws.",
              },
              {
                q: "Who is mandatorily required to register under GST?",
                a: "Businesses with turnover exceeding ₹40 lakhs (₹20 lakhs for services and ₹10 lakhs in special category states), inter-state suppliers, e-commerce operators, casual/non-resident taxable persons, and entities liable for TDS/TCS must register mandatorily under GST.",
              },
              {
                q: "What is the turnover limit for GST Registration in 2025?",
                a: "For 2025, GST Registration is mandatory for goods suppliers with turnover above ₹40 lakhs (₹20 lakhs in special states) and service providers above ₹20 lakhs (₹10 lakhs in special states).",
              },
              {
                q: "Can a business apply for GST voluntarily even below threshold?",
                a: "Yes. Businesses can apply for GST Registration voluntarily even if their turnover is below the threshold. Voluntary registration helps claim input tax credit, build credibility, and expand business opportunities with GST-compliant clients.",
              },
              {
                q: "How long does it take to get a GSTIN after applying?",
                a: "Typically, it takes 3–7 working days to receive a GSTIN after applying, provided all documents are valid and there are no queries raised by GST authorities.",
              },
              {
                q: "What are the documents required for GST Registration?",
                a: "The documents include PAN card, Aadhaar card, business address proof, bank proof (cancelled cheque or passbook), passport-size photos, incorporation certificate/partnership deed, and DSC for companies/LLPs.",
              },
              {
                q: "Is GST Registration different for goods and service providers?",
                a: "Yes. While the registration process is the same, the turnover threshold for mandatory GST registration differs: ₹40 lakhs for goods suppliers and ₹20 lakhs for service providers.",
              },
              {
                q: "What are the different types of GST Registration categories?",
                a: "Categories include: Regular Taxpayer, Composition Scheme, Casual Taxable Person, Non-Resident Taxable Person, E-commerce Operator, and TDS/TCS Deductors.",
              },
              {
                q: "What is the penalty for not registering under GST?",
                a: "Non-registration attracts a penalty of 10% of the tax due (minimum ₹10,000). In cases of deliberate tax evasion, penalties can reach 100% of the tax amount due.",
              },
              {
                q: "Can I run my business without GST Registration?",
                a: "No, if you are required by law to register, running a business without GSTIN is illegal and may result in heavy penalties and legal consequences.",
              },
              {
                q: "Is GST Registration free of cost?",
                a: "Yes. The Government does not charge any fee for GST Registration. However, professional consultation ensures error-free application and compliance.",
              },
              {
                q: "Can I apply for GST Registration online myself?",
                a: "Yes. GST Registration can be done on the official GST portal. However, due to frequent technical errors and document requirements, businesses prefer professional assistance for smooth processing.",
              },
              {
                q: "What are GSTIN and ARN in GST Registration?",
                a: "GSTIN is the unique 15-digit Goods and Services Tax Identification Number provided after successful registration. ARN is the Application Reference Number generated upon submission of the GST application for tracking purposes.",
              },
              {
                q: "Can a single person have multiple GSTINs?",
                a: "Yes. A person can have multiple GSTINs for different states or business verticals, as GST is state-specific and based on place of supply.",
              },
              {
                q: "How to update or amend details after GST Registration?",
                a: "Businesses can update or amend details like address, email, and phone number through the GST portal by submitting Form GST REG-14 online.",
              },
              {
                q: "What are the GST slab rates in India?",
                a: "GST has five main slabs: 0% (essential items), 5% (mass consumption goods), 12% (processed food & medicines), 18% (services & durables), and 28% (luxury items and sin goods).",
              },
              {
                q: "What is the validity of GST Registration Certificate?",
                a: "GST Registration is valid until cancelled by the taxpayer or department. However, for casual and non-resident taxable persons, registration is valid for 90 days (extendable).",
              },
              {
                q: "Can GST Registration be cancelled?",
                a: "Yes. A taxpayer can apply for cancellation of GST Registration if business closes or turnover falls below the threshold. The GST officer may also cancel it for non-compliance.",
              },
              {
                q: "Is GST Registration mandatory for freelancers and consultants?",
                a: "Yes, if freelancers or consultants have turnover above ₹20 lakhs (₹10 lakhs in special states) or provide services to clients outside their state, GST Registration is mandatory.",
              },
              {
                q: "How can Rekotax help me in GST Registration?",
                a: "Rekotax offers end-to-end GST services including documentation, error-free filing, expert guidance, and post-registration compliance support — ensuring hassle-free GST Registration.",
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
