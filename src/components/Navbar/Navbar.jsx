import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  Collapse ,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";

export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const CONTENT_MAX_W = 1300;
  const H_PADDING = { xs: 1.5, sm: 2, md: 3 };
  const { pathname } = useLocation();

  const APPBAR_H_DESKTOP = 64;
  const APPBAR_H_MOBILE = 56;

  const [anchors, setAnchors] = useState({
    services: false,
    industries: false,
    insights: false,
    about: false,
  });
  const [mobileExp, setMobileExp] = useState({
  start: false,
  other: false,
  compliance: false,
  taxation: false,
  outsourcing: false,
});

const toggleMobileExp = (k) =>
  setMobileExp((p) => ({ ...p, [k]: !p[k] }));


  const [activeService, setActiveService] = useState("Registration");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  const openMenu = (k) => setAnchors((a) => ({ ...a, [k]: true }));
  const closeMenu = (k) => setAnchors((a) => ({ ...a, [k]: false }));
  const toggleMenu = (k) => setAnchors((a) => ({ ...a, [k]: !a[k] }));
  const isOpen = (k) => Boolean(anchors[k]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }); // use "smooth" if you prefer
  }, [pathname]);

  const startBusinessItems = [
    "Private Limited Company",
    "One Person Company (OPC)",
    "Limited Liability Partnership (LLP)",
    "Partnership Firm",
    "Sole Proprietorship",
    "Section 8 Company",
    "Public Limited Company",
    "Nidhi Company",
    "Producer Company",
  ];

  const otherRegItems = [
    "Goods & Service Tax (GST)",
    "LUT Registration",
    "Import Export Code",
    "Professional Tax",
    "Shops & Establishment",
    "Startup India",
    "MSME / Udyam",
    "12A & 80G Registration",
    "FSSAI",
    "Trademark",
    // "Other Registrations",
  ];

  const midIdx = Math.ceil(otherRegItems.length / 2);
  const otherRegColA = otherRegItems.slice(0, midIdx);
  const otherRegColB = otherRegItems.slice(midIdx);

  /* FOR COMPLIANCE */
  const complianceItems = [
    "MCA Compliance for PVT LTD",
    "MCA Compliance for LLP",
    "MCA Compliance for Section 8 Company",
    "MCA Compliance for Nidhi Company",
    "FEMA/RBI Compliance",
    "Labour Law Compliances (PF, ESI, PT)",
    "Secretarial Compliances",
    "Startup India/DPIIT Compliance",
    "Shops & Establishment Act Compliance",
    "FSSAI Compliances (Food Businesses)",
  ];

  const midComplianceIdx = Math.ceil(complianceItems.length / 2);
  const complianceColA = complianceItems.slice(0, midComplianceIdx);
  const complianceColB = complianceItems.slice(midComplianceIdx);
  /* -------------------------------------------- */

  /* FOR TAXATION */
  const taxationItems = [
    "Corporate Taxation",
    "Goods & Services Tax",
    "TDS Filings",
    "Advance Tax",
    "Taxation for Individuals/Proprietors",
    "Taxation for Partnership firms",
    "Taxation for AOP/BOI",
    "Tax Audit",
    "GST Audit",
    "Manage Tax Disputes",
  ];

  const midTaxIdx = Math.ceil(taxationItems.length / 2);
  const taxationColA = taxationItems.slice(0, midTaxIdx);
  const taxationColB = taxationItems.slice(midTaxIdx);
  /* ------------------------------------- */

  /* FOR OUTSOURCING */
  // ⬇️ Add near your other arrays
  const outsourcingItems = [
    "Bookkeeping & Accounting",
    "Payroll & HR Management",
    "Cost & Management Accounting",
    "Business Valuation Services",
    "Pitch Deck Preparation",
    "Technical Integrations",
  ];

  const midOutIdx = Math.ceil(outsourcingItems.length / 2);
  const outsourcingColA = outsourcingItems.slice(0, midOutIdx);
  const outsourcingColB = outsourcingItems.slice(midOutIdx);

  /* --------------------------------------------------- */

  /* FOR BUSINESS ADVISORY */
 const businessAdvisoryItems = [
  "Virtual CFO Services",
  "Business Process Development",
  "Internal Audit",
  "Corporate Law Advisory",
  "Risk Management",
  "Corporate Financial Advisory",
  "Cross-Border Transaction Advisory",
  "International Taxation",
  "Business Structuring and Re-structuring",
];


  const midBusinessAdvisoryIdx = Math.ceil(businessAdvisoryItems.length / 2);
  const businessAdvisoryColA = businessAdvisoryItems.slice(0, midBusinessAdvisoryIdx);
  const businessAdvisoryColB = businessAdvisoryItems.slice(midBusinessAdvisoryIdx);

  /* ----------------------------------------------- */

  /* Other Services */
 const otherServicesItems = [
  "Name change of organisation",
  "Change in object clause",
  "Addition of director/partner",
  "Removal/resignation of director/partner",
  "Change of auditor",
  "Issue of shares",
  "Transfer of shares",
  "Increasing authorised capital/paid-up capital",
  "Conversion of current form to another form of business",
  "Winding-up of company",
];


  const midOtherIdx = Math.ceil(otherServicesItems.length / 2);
  const otherServicesColA = otherServicesItems.slice(0, midOtherIdx);
  const otherServicesColB = otherServicesItems.slice(midOtherIdx);

  /* ------------------------------ */

  const handleRoute = (text) => {
    closeMenu("services");
    setMobileOpen(false);
    if (text === "One Person Company (OPC)") return navigate("/opc-registration");
    if (text === "Private Limited Company") return navigate("/plc-registration");
    if (text === "Limited Liability Partnership (LLP)") return navigate("/llp-registration");
    if (text === "Section 8 Company") return navigate("/section-and-company");
    if (text === "Partnership Firm") return navigate("/partnership-firm");
    if (text === "Sole Proprietorship") return navigate("/sole-proprietorship");
    if (text === "Public Limited Company") return navigate("/public-company");
    if (text === "Nidhi Company") return navigate("/nidhi-company");
    if (text === "Producer Company") return navigate("/producer-company");
    if (text === "Goods & Service Tax (GST)") return navigate("/gst-registration");
    if (text === "LUT Registration") return navigate("/lut-registration");
    if (text === "Import Export Code") return navigate("/import-export-code");
    if (text === "Shops & Establishment") return navigate("/shops-and-establishment");
    if (text === "MSME / Udyam") return navigate("/msme");
    if (text === "Startup India") return navigate("/startup-india");
    if (text === "FSSAI") return navigate("/fssai");
    if (text === "Trademark") return navigate("/trademark");
    if (text === "Other Registrations") return navigate("/other-registration");
    if (text === "Professional Tax") return navigate("/professional-tax");
    if (text === "12A & 80G Registration") return navigate("/eighty-g-registration");
    // FOR COMPLIANCE
    if (text === "MCA Compliance for PVT LTD") return navigate("/privtate-limited-compliance");
    if (text === "MCA Compliance for LLP") return navigate("/llp-compliance");
    if (text === "MCA Compliance for Section 8 Company") return navigate("/section8-compilance");
    if (text === "MCA Compliance for Nidhi Company") return navigate("/nidhi-compliance");
    if (text === "FEMA/RBI Compliance") return navigate("/fema-rbi-compliance");
    if (text === "Labour Law Compliances (PF, ESI, PT)") return navigate("/labour-law-compliances");
    if (text === "Secretarial Compliances") return navigate("/secretarial-compliances");
    if (text === "Auditory Compliances") return navigate("/auditory-compliances");
    if (text === "Startup India/DPIIT Compliance") return navigate("/startup-india-dpiit-compliance");
    if (text === "Shops & Establishment Act Compliance") return navigate("/shops-and-establishment-compliance");
    if (text === "FSSAI Compliances (Food Businesses)") return navigate("/fssai-compliances");
    // ⬇ FOR TAXATION
    if (text === "Corporate Taxation") return navigate("/corporate-taxation");
    if (text === "Goods & Services Tax") return navigate("/goods-and-services-tax");
    if (text === "TDS Filings") return navigate("/tds-filings");
    if (text === "Advance Tax") return navigate("/advance-tax");
    if (text === "Taxation for Individuals/Proprietors") return navigate("/individuals-proprietors-taxation");
    if (text === "Taxation for Partnership firms") return navigate("/partnership-taxation");
    if (text === "Taxation for AOP/BOI") return navigate("/aop-boi-taxation");
    if (text === "Tax Audit") return navigate("/tax-audit");
    if (text === "GST Audit") return navigate("/gst-audit");
    if (text === "Manage Tax Disputes") return navigate("/manage-tax-disputes");
    // FOR OUTSOURCING
    // ⬇️ Append inside handleRoute
    if (text === "Virtual CFO Services") return navigate("/virtual-cfo-services");
    if (text === "Bookkeeping & Accounting") return navigate("/bookkeeping-accounting");
    if (text === "Payroll & HR Management") return navigate("/payroll-hr-management");
    if (text === "Cost & Management Accounting") return navigate("/cost-management-accounting");
    if (text === "Business Valuation Services") return navigate("/business-valuation-services");
    if (text === "Pitch Deck Preparation") return navigate("/pitch-deck-preparation");
    if (text === "Internal Process Development") return navigate("/internal-process-development");
    if (text === "Technical Integrations") return navigate("/technical-integrations");


  };

  const navAndClose = (path) => {
  setMobileOpen(false);
  navigate(path);
};


  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(15, 37, 85, 0.52)",
          backgroundImage:
            "linear-gradient(180deg, rgba(15,37,85,0.28), rgba(15,37,85,0.12))",
          backdropFilter: "blur(16px) saturate(170%)",
          WebkitBackdropFilter: "blur(16px) saturate(170%)",
          color: "#fff",
          zIndex: (t) => t.zIndex.modal + 1,
          width: "100%",
          left: 0,
          right: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            maxWidth: CONTENT_MAX_W,
            mx: "auto",
            px: { xs: 1.5, sm: 2.5, md: 6 }, // tighter on xs
            minHeight: { xs: APPBAR_H_MOBILE, md: APPBAR_H_DESKTOP },
            gap: { xs: 1, md: 2 }, // tighter gaps on xs
          }}
        >
          {/* Mobile hamburger */}
          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="start"
              aria-label={mobileOpen ? "close navigation" : "open navigation"}
              aria-expanded={mobileOpen ? "true" : "false"}
              onClick={() => setMobileOpen((prev) => !prev)}   // ← toggle on every click
              sx={{
                bgcolor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                p: 0.75,
                ...(mobileOpen && { bgcolor: "rgba(255,255,255,0.16)" }), // small visual hint when open
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>


          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, minWidth: 0 }}>
            <Box
              component="img"
              src="/rekotaxlogoNew.svg"
              alt="Rekotax"
              onClick={() => navigate("/")}
              sx={{
                width: { xs: 110, sm: 150, md: 180 }, // smaller on xs
                maxWidth: "45vw", // never exceed 45 percent of row
                height: "auto",
                cursor: "pointer",
                display: "block",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
              }}
            />
          </Box>

          {/* Desktop nav items */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center", mr: 2 }}>
            {/* Services */}
            <Box>
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 999,
                  px: 1.25,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  },
                }}
                aria-haspopup="menu"
                aria-controls={isOpen("services") ? "services-mega" : undefined}
                aria-expanded={isOpen("services") ? "true" : undefined}
                onClick={() => toggleMenu("services")}
              >
                Services
              </Button>

              {isDesktop && (
                <Menu
                  id="services-mega"
                  marginThreshold={0}
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: APPBAR_H_DESKTOP, left: 0 }}
                  open={isOpen("services")}
                  onClose={() => closeMenu("services")}
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  slotProps={{
                    paper: {
                      sx: {
                        p: 0,
                        m: 0,
                        position: "fixed",
                        top: APPBAR_H_DESKTOP,
                         left: "50%",
      transform: "translateX(-50%)",
      width: "100vw",
      maxWidth: 1265,          // or use CONTENT_MAX_W
      overflowX: "hidden",  
                        borderRadius: 0,
                        bgcolor: "rgba(15, 37, 85, 0.55)",
                        backgroundImage:
                          "linear-gradient(180deg, rgba(15,37,85,0.18), rgba(15,37,85,0.06))",
                        backdropFilter: "saturate(180%) blur(20px)",
                        WebkitBackdropFilter: "saturate(180%) blur(20px)",
                        borderTop: "1px solid rgba(255,255,255,0.10)",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                        color: "#fff",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                        maxHeight: `calc(100vh - ${APPBAR_H_DESKTOP}px)`,
                        overflowY: "auto",
                        zIndex: (t) => t.zIndex.appBar + 2,
                      },
                      onMouseLeave: () => closeMenu("services"),
                    },
                    list: { sx: { p: 0, m: 0 } },
                  }}
                  MenuListProps={{ sx: { p: 0, m: 0 } }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: { md: 1200, lg: 1280 },
                      mx: "auto",
                      px: { md: 4, lg: 6 },
                      py: 3,
                      display: "flex",
                      minHeight: 300,
                    }}
                  >
                    {/* Left rail */}
                    <Box
                      sx={{
                        width: 240,
                        display: "flex",
                        flexDirection: "column",
                        flexShrink: 0,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.14)",
                        bgcolor: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {[
                        "Registration",
                        "Compliance",
                        "Taxation",
                        "Outsourcing",
                        "Business Advisory",
                        "Virtual Office",
                        "Other Services",
                      ].map((item) => (
                        <MenuItem
                          key={item}
                          onClick={() => setActiveService(item)}
                          sx={{
                            py: 1.2,
                            color: activeService === item ? "#e5f2ff" : "rgba(255,255,255,0.92)",
                            bgcolor:
                              activeService === item
                                ? "rgba(255,255,255,0.14)"
                                : "transparent",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                            transition: "background-color 120ms ease",
                          }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Box>

                    {/* Right panel */}
                    <Box sx={{ flex: 1, color: "#e6efff", minWidth: 0, px: { md: 3, lg: 4 } }}>
                      {activeService === "Registration" && (
                        <Grid container spacing={6}>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                              pr: { md: 3 },
                              position: "relative",
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 12,
                                bottom: 12,
                                right: { md: -8 },
                                width: "1px",
                                backgroundColor: "rgba(255,255,255,0.22)",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },

                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Start your New Business
                            </Typography>

                            {startBusinessItems.map((text) => (
                              <Typography
                                key={text}
                                sx={{
                                  mb: 0.8,
                                  fontSize: { xs: 12, sm: 12, md: 14 },

                                  color: "rgba(255,255,255,0.95)",
                                  cursor: "pointer",
                                  "&:hover": { textDecoration: "underline" },
                                }}
                                onClick={() => handleRoute(text)}
                              >
                                {text}
                              </Typography>
                            ))}
                          </Grid>

                          <Grid item xs={12} md={6} sx={{ pl: { md: 3 } }}>
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },

                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Other Regulatory Registrations
                            </Typography>

                            <Grid container spacing={2} columnSpacing={6}>
                              <Grid item xs={12} sm={6}>
                                {otherRegColA.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },

                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {otherRegColB.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },

                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                      {activeService === "Compliance" && (
                        <Grid container spacing={6}>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            sx={{
                              position: "relative",
                            }}
                          >
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },
                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Compliance Services
                            </Typography>

                            <Grid container spacing={2} columnSpacing={6}>
                              <Grid item xs={12} sm={6}>
                                {complianceColA.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {complianceColB.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                      {/* ⬇️ Replace your current Taxation panel */}
                      {activeService === "Taxation" && (
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },
                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Taxation Services
                            </Typography>

                            <Grid container spacing={2} columnSpacing={6}>
                              <Grid item xs={12} sm={6}>
                                {taxationColA.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {taxationColB.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                      {/* ⬇️ Replace your current OutSourcing panel */}
                      {activeService === "Outsourcing" && (
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },
                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Outsourcing Services
                            </Typography>

                            <Grid container spacing={2} columnSpacing={6}>
                              <Grid item xs={12} sm={6}>
                                {outsourcingColA.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {outsourcingColB.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                       {activeService === "Business Advisory" && (
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },
                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Business Advisory
                            </Typography>

                            <Grid container spacing={2} columnSpacing={6}>
                              <Grid item xs={12} sm={6}>
                                {businessAdvisoryColA.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {businessAdvisoryColB.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.1,
                                      fontSize: { xs: 12, sm: 12, md: 14 },
                                      color: "rgba(255,255,255,0.95)",
                                      cursor: "pointer",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                    onClick={() => handleRoute(text)}
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      {activeService === "Virtual Office" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Virtual Office item 1</Typography>
                          <Typography>Virtual Office item 2</Typography>
                        </>
                      )}
                        {activeService === "Other Services" && (
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={12}>
                            <Typography
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#f0f6ff",
                                fontSize: { xs: 12, md: 14 },
                                position: "relative",
                                pb: 1,
                                display: "inline-block",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  width: "100%",
                                  height: "2px",
                                  bgcolor: "rgba(255,255,255,0.35)",
                                  borderRadius: 1,
                                },
                              }}
                            >
                              Other Services
                            </Typography>

                            <Grid container spacing={2} columnSpacing={6}>
                              <Grid item xs={12} sm={6}>
                                {otherServicesColA.map((text) => (
                                <Typography
  key={text}
  sx={{
    mb: 1.1,
    fontSize: { xs: 12, sm: 12, md: 14 },
    color: "rgba(255,255,255,0.95)",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },

    // keep long labels to two lines
    lineHeight: 1.35,
    whiteSpace: "normal",
    wordBreak: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
  onClick={() => handleRoute(text)}
>
  {text}
</Typography>

                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {otherServicesColB.map((text) => (
                               <Typography
  key={text}
  sx={{
    mb: 1.1,
    fontSize: { xs: 12, sm: 12, md: 14 },
    color: "rgba(255,255,255,0.95)",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },

    // --- force at most 2 lines + consistent height ---
    lineHeight: 1.35,
    //minHeight: "calc(1.35em * 2)",          // reserve 2 lines of space
    whiteSpace: "normal",
    overflowWrap: "anywhere",               // break even mid-word if needed
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: { xs: "100%", sm: 220 },      // set a width cap so wrapping happens
  }}
  onClick={() => handleRoute(text)}
>
  {text}
</Typography>

                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  </Box>
                </Menu>
              )}
            </Box>

            {["Industries", "Insights", "About Us"].map((label) => (
              <Button
                key={label}
                color="inherit"
                onClick={() => {
                  if (label === "Insights") navigate("/insights-blog");
                  else if (label === "Industries") navigate("/industries");
                  else if (label === "About Us") navigate("/about");
                }}
                sx={{
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 999,
                  px: 1.25,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* CTA */}
          <Button
            variant="contained"
            size="small"
            disableElevation
            sx={{
              display: { xs: "none", sm: "inline-flex" }, // hide on xs
              fontWeight: 550,
              px: { sm: 1.8, md: 2.2 },
              py: { sm: 0.65, md: 0.75 },
              borderRadius: 999,
              fontSize: { sm: 12.5, md: 13 },
              lineHeight: 1.6,
              minWidth: 0,
              color: "#fff",
              bgcolor: "rgba(15,37,85,0.52)",
              border: "1px solid rgba(255,255,255,0.26)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                bgcolor: "rgba(15,37,85,0.65)",
                borderColor: "rgba(255,255,255,0.36)",
              },
            }}
            onClick={openContact}
          >
            GET CONSULTATION
          </Button>
          <IconButton
            aria-label="Get consultation"
            onClick={openContact}
            sx={{
              display: { xs: "inline-flex", sm: "none" }, // show only on xs
              bgcolor: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
              ml: 0.5,
              color: "#fff",

            }}
          >
            <PhoneInTalkRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
           width: { xs: "60vw", sm: 260 },
            bgcolor: "rgba(15, 37, 85, 0.58)",
            backgroundImage:
              "linear-gradient(180deg, rgba(15,37,85,0.18), rgba(15,37,85,0.06))",
            color: "#e5f2ff",
            backdropFilter: "saturate(180%) blur(16px)",
            WebkitBackdropFilter: "saturate(180%) blur(16px)",
            borderRight: "1px solid rgba(255,255,255,0.16)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            component="img"
            src="/rekotaxlogoNew.svg"
            alt="Rekotax"
            onClick={() => {
              setMobileOpen(false);
              navigate("/");
            }}
            sx={{ width: 160, height: "auto", cursor: "pointer", mb: 1, display: "block" }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

  <List
  dense
  sx={{
    py: 0,
    // all items
    "& .MuiListItemButton-root": { minHeight: 36, px: 1.25 },
    // headers (first-level) - a bit more left/right
    "& > .MuiListItemButton-root": { px: 1.5 },
    // items inside collapses
    "& .MuiCollapse-root .MuiListItemButton-root": { pl: 3, pr: 1.25, minHeight: 34 },
  }}
>

  {/* For Mobile Screen nav */}


  {/* Start your New Business (expandable) */}
  <ListItemButton onClick={() => toggleMobileExp("start")}>
    <ListItemText
      primary="Start your New Business"
      primaryTypographyProps={{ sx: { color: "#e5f2ff" } }}
      sx={{ my: 0, flex: "unset", mr: 0.7 }}  
    />
    {mobileExp.start ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>

  <Collapse in={mobileExp.start} timeout="auto" unmountOnExit>
    {startBusinessItems.map((text) => (
      <ListItemButton
        key={text}
        sx={{ pl: 4 }}
        onClick={() => handleRoute(text)}
      >
        <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
      </ListItemButton>
    ))}
  </Collapse>

  {/* Other Regulatory Registrations (expandable) */}
  <ListItemButton onClick={() => toggleMobileExp("other")}>
    <ListItemText
      primary="Other Regulatory"
      primaryTypographyProps={{ sx: { color: "#e5f2ff"} }}
            sx={{ my: 0, flex: "unset", mr: 0.7 }}  

    />
    {mobileExp.other ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={mobileExp.other} timeout="auto" unmountOnExit>
    {otherRegItems.map((text) => (
      <ListItemButton
        key={text}
        sx={{ pl: 4 }}
        onClick={() => handleRoute(text)}
      >
        <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
      </ListItemButton>
    ))}
  </Collapse>

  {/* Compliance (optional - expandable) */}
  <ListItemButton onClick={() => toggleMobileExp("compliance")}>
    <ListItemText
      primary="Compliance"
      primaryTypographyProps={{ sx: { color: "#e5f2ff" } }}
            sx={{ my: 0, flex: "unset", mr: 0.7 }}  

    />
    {mobileExp.compliance ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={mobileExp.compliance} timeout="auto" unmountOnExit>
    {[...complianceColA, ...complianceColB].map((text) => (
      <ListItemButton
        key={text}
        sx={{ pl: 4 }}
        onClick={() => handleRoute(text)}
      >
        <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
      </ListItemButton>
    ))}
  </Collapse>

  {/* Taxation (optional - expandable) */}
  <ListItemButton onClick={() => toggleMobileExp("taxation")}>
    <ListItemText
      primary="Taxation"
      primaryTypographyProps={{ sx: { color: "#e5f2ff"} }}
            sx={{ my: 0, flex: "unset", mr: 0.7 }}  

    />
    {mobileExp.taxation ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={mobileExp.taxation} timeout="auto" unmountOnExit>
    {[...taxationColA, ...taxationColB].map((text) => (
      <ListItemButton
        key={text}
        sx={{ pl: 4 }}
        onClick={() => handleRoute(text)}
      >
        <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
      </ListItemButton>
    ))}
  </Collapse>

  {/* Outsourcing (optional - expandable) */}
  <ListItemButton onClick={() => toggleMobileExp("outsourcing")}>
    <ListItemText
      primary="Outsourcing"
      primaryTypographyProps={{ sx: { color: "#e5f2ff", fontWeight: 500 } }}
            sx={{ my: 0, flex: "unset", mr: 0.7}}  

    />
    {mobileExp.outsourcing ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={mobileExp.outsourcing} timeout="auto" unmountOnExit>
    {[...outsourcingColA, ...outsourcingColB].map((text) => (
      <ListItemButton
        key={text}
        sx={{ pl: 4 }}
        onClick={() => handleRoute(text)}
      >
        <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
      </ListItemButton>
    ))}
  </Collapse>
    <ListItemButton onClick={() => navAndClose("/industries")}>
    <ListItemText primary="Industries" primaryTypographyProps={{ sx: { color: "#fff" } }} />
  </ListItemButton>
  <ListItemButton onClick={() => navAndClose("/insights-blog")}>
    <ListItemText primary="Insights" primaryTypographyProps={{ sx: { color: "#fff" } }} />
  </ListItemButton>
  <ListItemButton onClick={() => navAndClose("/about")}>
    <ListItemText primary="About Us" primaryTypographyProps={{ sx: { color: "#fff" } }} />
  </ListItemButton>

</List>

      </Drawer>

      {/* Spacer so content is not hidden behind the fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: APPBAR_H_MOBILE, md: APPBAR_H_DESKTOP } }} />
      <Contact open={contactOpen} onClose={closeContact} />

    </>
  );
}
