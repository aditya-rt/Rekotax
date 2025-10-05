import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { BrandingWatermark } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material";
import { InputAdornment } from "@mui/material";



export default function ContactSection() {
  // ADD: include subject in form + an errors map
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    countryCode: "+91",   // <-- add this
  });

  const [errors, setErrors] = React.useState({});

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#0f2555",
        color: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 }, // outer page gutters
      }}
    >
      {/* Centered inner container so spacing matches the rest of the site */}
      <Box sx={{ maxWidth: { md: 1200, lg: 1280 }, mx: "auto" }}>
        <Grid
          container
          // remove wrap="nowrap" to avoid overflow on small screens
          columnSpacing={{ xs: 0, md: 8 }}  // horizontal gap between columns
          rowSpacing={{ xs: 5, md: 0 }}     // vertical gap when stacked
          alignItems="flex-start"
          sx={{ flexWrap: "nowrap" }}
        >
          {/* LEFT: text */}
          <Grid item xs={5} md={5} zeroMinWidth sx={{ minWidth: 0, pr: { md: 1 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.3,
                fontSize: { xs: 34, md: 56 },
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Schedule a Consultation
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.8,
                opacity: 0.95,
                mb: 5,
              }}
            >
              Schedule your free consultation and discover how we can help your <br />
              business grow with tailored compliance, taxation, and financial <br />
              solutions designed to support your long-term success.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              Contacts
            </Typography>

            <Stack spacing={1.2} sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: { xs: 18, md: 20 } }}>+91-9220580062</Typography>
              <Typography sx={{ fontSize: { xs: 18, md: 20 } }}>business@rekotax.com</Typography>
            </Stack>

            <Typography sx={{ fontWeight: 800, letterSpacing: 0.6, mb: 1.5 }}>
              FOLLOW US ON
            </Typography>

            <Stack direction="row" spacing={2}>
              <IconButton sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
                <FacebookRoundedIcon fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
                <TwitterIcon fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
                <LinkedInIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>

          {/* RIGHT: form (pushed to the right edge on md+) */}
          <Grid
            item
            xs={7} md={7}                          // <— stays side-by-side on all breakpoints
            zeroMinWidth
            sx={{
              minWidth: 0,
              pl: { md: 1 },
              display: "flex",
              justifyContent: { xs: "flex-end", md: "flex-end" },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 520 }}>
              {/* Card like the reference image */}
              <Box
                sx={{
                  background:
                    "linear-gradient(180deg, #3a64ab 0%, #284a88 100%)",     // blue panel
                  color: "#e9f0ff",
                  borderRadius: { xs: 4, md: 3 },                            // large rounded corners
                  p: { xs: 2, sm: 3 },
                  boxShadow: "0 16px 44px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: { xs: 20, sm: 22, md: 24 },
                    mb: { xs: 2.5, sm: 3 },
                  }}
                >
                  Connect with Us
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* Name (keep as-is) */}
                  <GlassField
                    required
                    placeholder="Name*"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />

                  {/* Country code + Phone number (PUT THIS HERE) */}
                  <Box sx={{ display: "flex", gap: 1.25 }}>
                    <TextField
                      select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: { sx: { minWidth: 200 } },   // wider dropdown list
                        },
                      }}
                      sx={{
                        width: 200,                                  // wider closed select so “+91 IN” fits
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "rgba(255,255,255,0.14)",
                          color: "#e9f0ff",
                          "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
                          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.30)" },
                          "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.45)" },
                        },
                        "& .MuiSelect-select": {
                          py: 1.25, px: 1.5,
                          whiteSpace: "nowrap",
                          textOverflow: "clip",                      // avoid “…” truncation
                        },
                      }}
                    >
                      <MenuItem value="+91">+91 (IN)</MenuItem>
                      <MenuItem value="+971">+971 (AE)</MenuItem>
                      <MenuItem value="+61">+61 (AU)</MenuItem>
                      <MenuItem value="+49">+49 (DE)</MenuItem>
                      <MenuItem value="+1">+1 (US)</MenuItem>
                      <MenuItem value="+86">+86 (CN)</MenuItem>
                    </TextField>


                    <GlassField
                      required
                      placeholder="Mobile No.*"
                      name="phone"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "");
                        setForm((f) => ({ ...f, phone: digits }));
                      }}
                    />
                  </Box>

                  {/* Email (keep as-is) */}
                  <GlassField
                    required
                    placeholder="Your email*"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <GlassField
                    required
                    placeholder="Subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                  />
                  <GlassField
                    placeholder="Message"
                    name="message"
                    multiline
                    minRows={2}
                    value={form.message}
                    onChange={handleChange}
                  />

                  {/* center the submit button */}
                  <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
                    <DarkPillButton type="submit" sx={{ width: { xs: "100%", sm: "auto" } }}>
                      SUBMIT
                    </DarkPillButton>
                  </Box>

                </Box>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

/* --- helper for big rounded text fields --- */
// --- Helpers: drop these in the same file (outside your component) ---

function GlassField(props) {
  const { sx, multiline, ...rest } = props;
  return (
    <TextField
      fullWidth
      variant="outlined"
      multiline={multiline}
      InputLabelProps={{ shrink: false }}
      {...rest}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.14)",
          ...(multiline ? {} : { height: 42 }),      // <- match country code height
          "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.30)" },
          "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.45)" },
        },
        "& .MuiOutlinedInput-input": {
          color: "#e9f0ff",
          padding: multiline ? "10px 12px" : "12px 16px",
          fontSize: { xs: 14, md: 15.5 },
        },
        "& textarea": {
          color: "#e9f0ff",
          fontSize: { xs: 14, md: 15.5 },
          padding: "10px 12px",
        },
        ...sx,
      }}
    />
  );
}


function DarkPillButton({ children, ...rest }) {
  return (
    <Button
      variant="contained"
      disableElevation
      {...rest}
      sx={{
        mt: 2.5,
        bgcolor: "#0b0b0b",
        color: "#fff",
        borderRadius: 999,
        px: 4,
        py: 1.2,
        fontWeight: 800,
        letterSpacing: 0.3,
        textTransform: "uppercase",
        width: { xs: "100%", sm: "auto" },
        boxShadow: "0 10px 26px rgba(0,0,0,0.45)",
        "&:hover": { bgcolor: "#141414" },
      }}
    >
      {children}
    </Button>
  );
}

function RoundedTextField(props) {
  const { sx, ...rest } = props;
  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      {...rest}
      InputLabelProps={{ shrink: false }}
      placeholder={props.label}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 6,
          bgcolor: "#fff",
          color: "#111",
          px: 2,
          "& fieldset": { border: "none" },
          "& input, & textarea": {
            fontSize: 18,
            padding: "18px 20px",
          },
        },
        ...sx,
      }}
    />
  );
}
