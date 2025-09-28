import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
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
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  // desktop mega menu
  const [anchors, setAnchors] = useState({
    services: null,
    industries: null,
    insights: null,
    about: null,
  });
  const [activeService, setActiveService] = useState("Registration");

  // mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = (key, e) =>
    setAnchors((a) => ({ ...a, [key]: e.currentTarget }));
  const closeMenu = (key) => setAnchors((a) => ({ ...a, [key]: null }));
  const isOpen = (key) => Boolean(anchors[key]);

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
    "Other Registrations",
  ];

  const handleRoute = (text) => {
    // close menus/drawer first
    closeMenu("services");
    setMobileOpen(false);

    // routes you already wired
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
    // fallback: do nothing or navigate to a generic page
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        sx={{
          bgcolor: "#0B2A5A",
          zIndex: (t) => t.zIndex.drawer + 1,
          width: "100%", // avoid 100vw overflow on mobile
          left: 0,
        }}
      >
        <Toolbar sx={{ gap: 2, px: { xs: 2, md: 6 } }}>
          {/* Mobile: hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              component="img"
              src="/rekotaxlogoNew.svg"
              alt="Rekotax"
              sx={{ width: 180, height: 60, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Desktop Menus */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {/* Services mega menu */}
            <Box
              onMouseEnter={(e) => isDesktop && openMenu("services", e)}
              onMouseLeave={() => isDesktop && closeMenu("services")}
            >
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={{ fontWeight: 600, textTransform: "none" }}
                onClick={(e) => !isDesktop && openMenu("services", e)}
              >
                Services
              </Button>

              <Menu
                anchorEl={anchors.services}
                open={isOpen("services")}
                onClose={() => closeMenu("services")}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                  sx: {
                    mt: 2,
                    p: 0,
                    bgcolor: "#1c1c1c",
                    display: "flex",
                    minWidth: isDesktop ? 1250 : "100%",
                    minHeight: 300,
                    left: 0,
                    position: isDesktop ? "fixed" : "static",
                    width: isDesktop ? "auto" : "100%",
                  },
                }}
                MenuListProps={{
                  sx: { display: "flex", width: "100%", p: 0, flexWrap: "nowrap" },
                }}
              >
                {/* Left column (categories) */}
                <Box
                  sx={{
                    width: 220,
                    bgcolor: "#2a2a2a",
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                  }}
                >
                  {[
                    "Registration",
                    "Compilation",
                    "Taxation",
                    "OutSourcing",
                    "Business Advisory",
                    "Vitual Office",
                    "Other Services",
                  ].map((item) => (
                    <MenuItem
                      key={item}
                      onMouseEnter={() => setActiveService(item)}
                      sx={{
                        color: activeService === item ? "#a4e100" : "#fff",
                        bgcolor: activeService === item ? "#000" : "transparent",
                        "&:hover": { bgcolor: "#000" },
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Box>

                {/* Right column (content) */}
                <Box sx={{ flexGrow: 1, p: 3, color: "#a4e100" }}>
                  {activeService === "Registration" && (
                    <Grid container spacing={8}>
                      {/* LEFT HALF — Start your New Business */}
                      <Grid item xs={12} md={6}>
                        <Typography
                          sx={{
                            mb: 2,
                            fontWeight: 900,
                            color: "#a4e100",
                            fontSize: "1.5rem",
                            position: "relative",
                            pb: 1,
                            display: "inline-block",
                            "&:after": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              bottom: 0,
                              width: { xs: "90%", md: "100%" },
                              height: "3px",
                              bgcolor: "#a4e100",
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
                              mb: 1.5,
                              color: "#a4e100",
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                            }}
                            onClick={() => handleRoute(text)}
                          >
                            {text}
                          </Typography>
                        ))}
                      </Grid>

                      {/* RIGHT HALF — Other Regulatory Registrations */}
                      <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 4 } }}>
                        <Typography
                          sx={{
                            mb: 2,
                            fontWeight: 900,
                            color: "#a4e100",
                            fontSize: "1.5rem",
                            position: "relative",
                            pb: 1,
                            display: "inline-block",
                            "&:after": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              bottom: 0,
                              width: { xs: "90%", md: "100%" },
                              height: "3px",
                              bgcolor: "#a4e100",
                              borderRadius: 1,
                            },
                          }}
                        >
                          Other Regulatory Registrations
                        </Typography>

                        {otherRegItems.map((text) => (
                          <Typography
                            key={text}
                            sx={{
                              mb: 1.5,
                              color: "#a4e100",
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
                  )}

                  {activeService === "Compilation" && (
                    <>
                      <Typography>Compilation item 1</Typography>
                      <Typography>Compilation item 2</Typography>
                    </>
                  )}
                  {activeService === "Taxation" && (
                    <>
                      <Typography>Taxation item 1</Typography>
                      <Typography>Taxation item 2</Typography>
                    </>
                  )}
                  {activeService === "OutSourcing" && (
                    <>
                      <Typography>Outsourcing item 1</Typography>
                      <Typography>Outsourcing item 2</Typography>
                    </>
                  )}
                  {activeService === "Business Advisory" && (
                    <>
                      <Typography>Advisory item 1</Typography>
                      <Typography>Advisory item 2</Typography>
                    </>
                  )}
                  {activeService === "Vitual Office" && (
                    <>
                      <Typography>Virtual Office item 1</Typography>
                      <Typography>Virtual Office item 2</Typography>
                    </>
                  )}
                  {activeService === "Other Services" && (
                    <>
                      <Typography>Other service 1</Typography>
                      <Typography>Other service 2</Typography>
                    </>
                  )}
                </Box>
              </Menu>
            </Box>

            {/* Other desktop buttons */}
            <Button color="inherit" sx={{ fontWeight: 600, textTransform: "none" }}>
              Industries
            </Button>
            <Button color="inherit" sx={{ fontWeight: 600, textTransform: "none" }}>
              Insights
            </Button>
            <Button color="inherit" sx={{ fontWeight: 600, textTransform: "none" }}>
              About Us
            </Button>
          </Box>

          {/* CTA (always visible) */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#808080",
              fontWeight: 800,
              px: 3,
              borderRadius: 6,
              "&:hover": { bgcolor: "#ffffff", color: "primary.main" },
            }}
          >
            GET CONSULTATION
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 300, bgcolor: "#0f2555", color: "#a4e100" } }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            component="img"
            src="/rekotaxlogoNew.svg"
            alt="Rekotax"
            sx={{ width: 160, height: 50, cursor: "pointer", mb: 1 }}
            onClick={() => {
              setMobileOpen(false);
              navigate("/");
            }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

        <List dense>
          <ListItemButton onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Home" primaryTypographyProps={{ sx: { color: "#fff" } }} />
          </ListItemButton>

          {/* Collapsed "Services" as simple lists for mobile */}
          <Typography sx={{ px: 2, pt: 2, pb: 1, fontWeight: 800, color: "#a4e100" }}>
            Start your New Business
          </Typography>
          {startBusinessItems.map((text) => (
            <ListItemButton key={text} onClick={() => handleRoute(text)}>
              <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
            </ListItemButton>
          ))}

          <Typography sx={{ px: 2, pt: 2, pb: 1, fontWeight: 800, color: "#a4e100" }}>
            Other Regulatory Registrations
          </Typography>
          {otherRegItems.map((text) => (
            <ListItemButton key={text} onClick={() => handleRoute(text)}>
              <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.15)" }} />
          <ListItemButton onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Industries" primaryTypographyProps={{ sx: { color: "#fff" } }} />
          </ListItemButton>
          <ListItemButton onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Insights" primaryTypographyProps={{ sx: { color: "#fff" } }} />
          </ListItemButton>
          <ListItemButton onClick={() => setMobileOpen(false)}>
            <ListItemText primary="About Us" primaryTypographyProps={{ sx: { color: "#fff" } }} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
