// ContactModal.jsx
import * as React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  Slide,
  Box,
  Stack,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Contact({ open, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const SUCCESS_TOAST_MS = 1400
  // form state
  const [form, setForm] = React.useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState({});
  const [snack, setSnack] = React.useState({
    open: false,
    msg: "",
    severity: "success",
  });

  // ==== GLASS INPUT STYLES (filled, no underline, big radius) ====
  const fieldSx = {
    "& .MuiFormLabel-root": {
      color: "#c2d0f2",
      fontWeight: 600,
    },
    "& .MuiFilledInput-root": {
      background: "rgba(255,255,255,0.10)",
      borderRadius: 3, // ~24px
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
      overflow: "hidden",
      "&:hover": { background: "rgba(255,255,255,0.14)" },
      "&.Mui-focused": {
        background: "rgba(255,255,255,0.16)",
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.28)",
      },
      "&:before, &:after": { display: "none" }, // remove underline
    },
    "& .MuiInputBase-input": {
      color: "#eaf0ff",
      fontWeight: 600,
      "::placeholder": { color: "rgba(234,240,255,0.75)", opacity: 1 },
    },
    "& .MuiSelect-icon": { color: "#eaf0ff" },
    "& .MuiFormHelperText-root": { color: "#ffd2d2" },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Mobile number is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

//   const handleSubmit = (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     // TODO: integrate with backend
//     console.log("Submitting contact form:", form);

//     setSnack({
//       open: true,
//       msg: "Submitted successfully",
//       severity: "success",
//     });
//     setForm({
//       name: "",
//       countryCode: "+91",
//       phone: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//     onClose?.();
//   };


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
    const initialForm = {
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    subject: "",
    message: "",
  };
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyl91p6yvHwzHv_h36eZ_yN-NU1IWrL8oHAlwUgzsIc68XbTTWj_QxLClIOlp8Cza7l_g/exec";
  const [showReqWarn, setShowReqWarn] = React.useState(false);
  const isFormValid = requiredOk(form);
  const nameRe = /^[A-Za-z][A-Za-z\s'.-]{1,}$/;
const [submitting, setSubmitting] = React.useState(false);
  

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


  const validateForm = (data) => {
    const fields = ["name", "phone", "email", "subject", "message"];
    const out = {};
    fields.forEach((f) => {
      const msg = validateField(f, data[f]);
      if (msg) out[f] = msg;
    });
    return out;
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
        setTimeout(() => onClose?.(), SUCCESS_TOAST_MS);
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
    <Dialog
     hideBackdrop
      open={open}
      onClose={onClose} // backdrop click + Esc
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      scroll="body"
     BackdropProps={{
    invisible: true,
    sx: {
      backgroundColor: 'transparent !important',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      boxShadow: 'none',
    },
  }}
     PaperProps={{
    elevation: 0,
    sx: { background: 'transparent', boxShadow: 'none', border: 'none', outline: 'none', m: 0 }
  }}
    >
      <DialogContent
       sx={{
     p: { xs: 1.5, sm: 2.5 },
     position: "relative",
     background: "transparent",
     height: { xs: "100%", sm: "auto" },   // fill screen on mobile
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
   }}
      >
        {/* Close (X) */}
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 24,
            top: 24,
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.12)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Glass card (matches screenshot style) */}
        <Box
          component="form"
          onSubmit={handleSubmit}
           sx={{
     mx: "auto",
     width: "100%",
     maxWidth: { xs: "80vw", sm: 620 },    // shrink to phone width
     borderRadius: { xs: 4, sm: 5 },       // slightly smaller radius on mobile
     p: { xs: 2, sm: 3 },                  // tighter padding on mobile
     background:
     "linear-gradient(180deg, rgba(19,43,97,0.55), rgba(19,43,97,0.45))",
   border: "1px solid rgba(255,255,255,0.10)",
  //  boxShadow:
  //    "inset 0 1px 0 rgba(255,255,255,0.10), 0 16px 40px rgba(0,0,0,0.45)",
   backdropFilter: "blur(10px) saturate(160%)",
   WebkitBackdropFilter: "blur(10px) saturate(160%)",
   }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              textAlign: "center",
              mb: 2.5,
              color: "#e6f0ff",
            }}
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
            InputProps={{ disableUnderline: true }}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} mt={1.25}>
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
                width: { xs: "100%", sm: 160 },
                flex: { xs: "1 1 auto", sm: "0 0 auto" },
              }}
              InputProps={{ disableUnderline: true }}
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
              sx={{ ...fieldSx, flex: 1, minWidth: 0 }}
              InputProps={{ disableUnderline: true }}
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
            sx={{ ...fieldSx, mt: 1.25 }}
            InputProps={{ disableUnderline: true }}
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
            sx={{ ...fieldSx, mt: 1.25 }}
            InputProps={{ disableUnderline: true }}
          />

          <TextField
            size="small"
            variant="filled"
            fullWidth
            label="Message"
            multiline
            minRows={3}
            name="message"
            value={form.message}
            onChange={handleChange}
            error={Boolean(errors.message)}
            helperText={errors.message || ""}
            sx={{ ...fieldSx, mt: 1.25 }}
            InputProps={{ disableUnderline: true }}
          />

       <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }} onSubmit={handleSubmit}>
  <Button
    type="submit"
    variant="contained"
    sx={{
      backgroundColor: "#000",
      color: "#fff",
      borderRadius: 999,
      px: 5,
      py: 1,
      boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
      "&:hover": { backgroundColor: "#111" },
    }}
  >
    SUBMIT
  </Button>
</Box>


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
      </DialogContent>
    </Dialog>
  );
}
