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
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";




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
          columnSpacing={{ xs: 0, sm: 4, md: 8 }}
          rowSpacing={{ xs: 6, sm: 6, md: 0 }}
          alignItems="flex-start"
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}   // wrap on mobile, nowrap on desktop
        >
          {/* LEFT: text */}
          <Grid
            item
            xs={12}
            md={5}
            zeroMinWidth
            sx={{
              minWidth: 0,
              pr: { md: 1 },
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.3,
                fontSize: { xs: 30, sm: 38, md: 45 },
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Schedule a Consultation
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 15, sm: 16, md: 18 },
                lineHeight: 1.8,
                opacity: 0.95,
                mb: 5,
                maxWidth: { xs: 600, md: "none" },
              }}
            >
              Schedule your free consultation and discover how we can help your <br />
              business grow with tailored compliance, taxation, and financial <br />
              solutions designed to support your long-term success.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Contacts
            </Typography>

            {/* Contact - glass cards (one row) */}
        <Stack
  direction="row"
  spacing={2}                                   // gap = 16px each (default theme)
  sx={{ mb: 4, width: "100%", flexWrap: "nowrap", overflowX: "hidden" }}
>
  <ContactGlassCard
    kind="phone"
    icon={<PhoneInTalkRoundedIcon />}
    values={["+91-7303074762", "+91-7303075763", "+91-9220580064"]}
    sx={{ flex: { xs: "0 0 calc((100% - 32px) / 3)", sm: "1 1 0" }, minWidth: 0 }}
  />
  <ContactGlassCard
    kind="email"
    icon={<EmailRoundedIcon />}
    values={["business@rekotax.com", "grievance@rekotax.com", "enquiry@rekotax.com"]}
    sx={{ flex: { xs: "0 0 calc((100% - 32px) / 3)", sm: "1 1 0" }, minWidth: 0 }}
  />
  <ContactGlassCard
    kind="address"
    icon={<PlaceRoundedIcon />}
    value="108, Udyog Vihar Phase 1, Sector 20, Gurugram, Haryana 122016"
    sx={{ flex: { xs: "0 0 calc((100% - 32px) / 3)", sm: "1 1 0" }, minWidth: 0 }}
  />
</Stack>




            <Typography sx={{ fontWeight: 800, letterSpacing: 0.6, mb: 1.5 }}>
              FOLLOW US ON
            </Typography>

            <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
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

          {/* RIGHT: form */}
          <Grid
            item
            xs={12}
            md={7}
            zeroMinWidth
            sx={{
              minWidth: 0,
              pl: { md: 1 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 560 } }}>
              <Box
                sx={{
                  background: "linear-gradient(180deg, #3a64ab 0%, #284a88 100%)",
                  color: "#e9f0ff",
                  borderRadius: { xs: 4, md: 3 },
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
                  <GlassField
                    required
                    placeholder="Name*"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />

                {/* Country code + Phone: stack on mobile, row on sm+ */}
<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mb: 2 }}>
  <TextField
    select
    name="countryCode"
    value={form.countryCode}
    onChange={handleChange}
    SelectProps={{
      // dropdown menu can still be wide; only the closed control is narrow
      MenuProps: { PaperProps: { sx: { minWidth: 220 } } },
    }}
    sx={{
      // ⬇️ narrower on sm+; full width when stacked on xs
      width: { xs: "100%", sm: 120 },
      flex: { xs: "1 1 auto", sm: "0 0 auto" },
      minWidth: 0,

      /* keep your original look */
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.14)",
        color: "#e9f0ff",
        "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.30)" },
        "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.45)" },
      },
      "& .MuiSelect-select": { py: 1.25, px: 1.5, whiteSpace: "nowrap" },
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
    inputMode="tel"
    value={form.phone}
    onChange={(e) => {
      const digits = e.target.value.replace(/\D/g, "");
      setForm((f) => ({ ...f, phone: digits }));
    }}
    sx={{
      mb: 0,
      flex: { xs: "1 1 auto", sm: 1 }, // ⬅️ take the remaining width
      minWidth: 0,
      // (no visual changes to your GlassField)
    }}
  />
</Stack>

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
                    minRows={3}
                    value={form.message}
                    onChange={handleChange}
                  />

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
function ContactGlassCard({ icon, label, value, values, kind = "text", href,sx = {} }) {
  // normalize to an array based on kind
  let list = [];
  if (Array.isArray(values)) {
    list = values;
  } else if (typeof value === "string") {
    if (kind === "phone") list = value.split(",");                     // keep numbers intact
    else if (kind === "email") list = value.split(/[,\s]+/);           // allow comma or space separated emails
    else list = [value];                                               // address or generic
  }

  list = list.map(s => s.trim()).filter(Boolean);

  // link builder
  const linkFor = (v) => {
    if (kind === "phone") {
      const tel = v.replace(/[^\d+]/g, "");            // keep + and digits
      return `tel:${tel}`;
    }
    if (kind === "email") return `mailto:${v}`;
    if (kind === "address") {
      return href || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`;
    }
    return href;
  };

  return (
    <Box
      component="div"
      sx={{
        flex: "1 1 0",
        minHeight: 120,
                minWidth: { xs: 0, sm: 200 },
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        ...sx, 
      }}
    >
      {/* Icon on top */}
      <Box
        sx={{
          width: 40,
          height: 40,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.28)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          "& svg": { fontSize: 28, color: "#fff" },
          mb: 0.5,
        }}
        aria-hidden
      >
        {icon}
      </Box>

      {/* Optional small label */}
      {label && (
        <Typography
          sx={{ fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", opacity: 0.8, mb: 0.25, textAlign: "center" }}
        >
          {label}
        </Typography>
      )}

      {/* Items stacked one above another */}
      <Stack
        spacing={0.5}
        sx={{
          width: "100%",
          alignItems: "flex-start",   // 👈 left-edge alignment for all rows
        }}
      >
        {list.map((v, i) => {
          const hrefItem = linkFor(v);
          const isLink = !!hrefItem;
          return (
            <Typography
              key={i}
              component={isLink ? "a" : "span"}
              href={isLink ? hrefItem : undefined}
              target={isLink && hrefItem.startsWith("http") ? "_blank" : undefined}
              rel={isLink && hrefItem.startsWith("http") ? "noopener noreferrer" : undefined}
              sx={{
                display: "block",
                width: "100%",               // ensures same starting column
                textAlign: "left",           // 👈 left align text
                fontWeight: 500,
                color: "#fff",
                fontSize: { xs: 12.5, sm: 14 },
                lineHeight: 1.35,
                whiteSpace: (kind === "phone" || kind === "email") ? "nowrap" : "normal",
                textDecoration: "none",
                "&:hover": { textDecoration: isLink ? "underline" : "none" },
              }}
              title={v}
            >
              {v}
            </Typography>
          );
        })}
      </Stack>

    </Box>
  );
}

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
