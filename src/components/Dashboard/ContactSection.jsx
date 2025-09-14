import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter"; // can rename as X
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ContactSection() {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // connect to your backend or form service here
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#000",
        color: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 8 },
      }}
    >
   <Grid container spacing={6} alignItems="center" wrap="nowrap">
  {/* LEFT: text (same sizing pattern as your hero) */}
  <Grid item xs={6} md={4} zeroMinWidth sx={{ minWidth: 0 }}>
    <Typography
      variant="h2"
      sx={{
        fontWeight: 900,
        letterSpacing: 0.3,
        fontSize: { xs: 38, md: 72 },
        lineHeight: 1.05,
        mb: 3,
      }}
    >
      Connect with a CA
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: 16, md: 20 },
        lineHeight: 1.8,
        opacity: 0.95,
        mb: 5,
      }}
    >
      Schedule your free consultation and discover how we can help your
      business grow with tailored compliance, taxation, and financial
      solutions designed to support your long-term success.
    </Typography>

    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
      Contacts
    </Typography>

    <Stack spacing={1.2} sx={{ mb: 4 }}>
      <Typography sx={{ fontSize: { xs: 18, md: 22 } }}>
        +91-9220580062
      </Typography>
      <Typography sx={{ fontSize: { xs: 18, md: 22 } }}>
        business@rekotax.com
      </Typography>
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

  {/* RIGHT: form (same sizing pattern as your hero’s right side) */}
  <Grid
    item
    xs={12}
    md={6}
    zeroMinWidth
    sx={{ minWidth: 0, display: "flex", justifyContent: "center" }}
  >
    <Box sx={{ width: "100%", maxWidth: 560 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>
        Fill this form to connect with our CA team
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <RoundedTextField
          required
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <RoundedTextField
          required
          label="Phone Number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
        />
        <RoundedTextField
          required
          label="Your email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <RoundedTextField
          label="Message"
          name="message"
          multiline
          minRows={5}
          value={form.message}
          onChange={handleChange}
        />

        <Button
          type="submit"
          size="large"
          sx={{
            mt: 4,
            px: 6,
            py: 1.8,
            borderRadius: 999,
            fontWeight: 900,
            fontSize: 18,
            textTransform: "none",
            color: "#fff",
            bgcolor: "#1b238d",
            boxShadow: "0 12px 28px rgba(27,35,141,0.35)",
            "&:hover": { bgcolor: "#121a86" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Grid>
</Grid>

    </Box>
  );
}

// helper for big rounded text fields
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
