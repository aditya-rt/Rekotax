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

  // Consistent toolbar heights
  const APPBAR_H_DESKTOP = 64;
  const APPBAR_H_MOBILE = 56;

  // Desktop mega menu state
  const [anchors, setAnchors] = useState({
    services: false,
    industries: false,
    insights: false,
    about: false,
  });
  const [activeService, setActiveService] = useState("Registration");

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = (key) => setAnchors((a) => ({ ...a, [key]: true }));
  const closeMenu = (key) => setAnchors((a) => ({ ...a, [key]: false }));
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
  const midIdx = Math.ceil(otherRegItems.length / 2);
  const otherRegColA = otherRegItems.slice(0, midIdx);
  const otherRegColB = otherRegItems.slice(midIdx);

  const handleRoute = (text) => {
    // close menus/drawer first
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
    // add more routes as you build them
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
          width: "100%",
          left: 0,
          right: 0,
        }}
      >
        {/* Center the row content to the same max as your pages */}
       <Toolbar
  disableGutters
  sx={{
    width: "100%",
    maxWidth: { md: 1120, lg: 1200 },   // a bit narrower -> more side space
    mx: "auto",
    px: { xs: 3, md: 6 },               // larger left/right padding
    minHeight: { xs: APPBAR_H_MOBILE, md: APPBAR_H_DESKTOP },
    gap: 2,
  }}
>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo (aligned with page content, scales down on mobile) */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, minWidth: 0 }}>
            <Box
              component="img"
              src="/rekotaxlogoNew.svg"
              alt="Rekotax"
              onClick={() => navigate("/")}
              sx={{
                width: { xs: 140, sm: 160, md: 180 },
                height: "auto",
                cursor: "pointer",
                display: "block",
              }}
            />
          </Box>

          {/* Desktop nav items (hidden on mobile) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center", mr: 2 }}>
            {/* Services (mega) */}
            <Box
              onMouseEnter={() => isDesktop && openMenu("services")}
              onMouseLeave={() => isDesktop && closeMenu("services")}
            >
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={{ fontWeight: 600, textTransform: "none" }}
                aria-haspopup="true"
                aria-expanded={isOpen("services") ? "true" : undefined}
                aria-controls="services-mega"
              >
                Services
              </Button>

              {/* Desktop mega — not rendered on mobile */}
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
                        left: 0,
                        right: 0,
                        width: "100%",
                        maxWidth: "100%",
                        borderRadius: 0,
                        bgcolor: "#1c1c1c",
                        color: "#fff",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                        // ensure visible on short screens:
                        maxHeight: `calc(100vh - ${APPBAR_H_DESKTOP}px)`,
                        overflowY: "auto",
                        zIndex: (t) => t.zIndex.appBar + 2,
                      },
                      onMouseLeave: () => isDesktop && closeMenu("services"),
                    },
                    list: { sx: { p: 0, m: 0 } },
                  }}
                  MenuListProps={{ sx: { p: 0, m: 0 } }}
                >
                  {/* Inner centered content matches page maxWidth */}
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
                    {/* Left rail (categories) */}
                    <Box
                      sx={{
                        width: 240,
                        bgcolor: "#2a2a2a",
                        display: "flex",
                        flexDirection: "column",
                        flexShrink: 0,
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      {[
                        "Registration",
                        "Compliance",
                        "Taxation",
                        "OutSourcing",
                        "Business Advisory",
                        "Virtual Office",
                        "Other Services",
                      ].map((item) => (
                        <MenuItem
                          key={item}
                          onMouseEnter={() => setActiveService(item)}
                          sx={{
                            py: 1.25,
                            color: activeService === item ? "#a4e100" : "#fff",
                            bgcolor: activeService === item ? "#000" : "transparent",
                            "&:hover": { bgcolor: "#000" },
                          }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Box>

                    {/* Right panel (content) */}
                    <Box sx={{ flex: 1, color: "#a4e100", minWidth: 0, px: { md: 3, lg: 4 } }}>
                      {activeService === "Registration" && (
                        <Grid container spacing={6}>
                          {/* LEFT HALF */}
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
                                width: "2px",
                                backgroundImage:
                                  "radial-gradient(#ffffff 2px, rgba(255,255,255,0) 2.6px)",
                                backgroundSize: "2px 12px",
                                backgroundRepeat: "repeat-y",
                                backgroundPosition: "center",
                                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.35))",
                                WebkitMaskImage:
                                  "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
                                maskImage:
                                  "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
                              },
                            }}
                          >
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
                                  width: "100%",
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
                                  mb: 1.25,
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

                          {/* RIGHT HALF */}
                          <Grid item xs={12} md={6} sx={{ pl: { md: 3 } }}>
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
                                  width: "100%",
                                  height: "3px",
                                  bgcolor: "#a4e100",
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
                                      mb: 1.25,
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
                              <Grid item xs={12} sm={6}>
                                {otherRegColB.map((text) => (
                                  <Typography
                                    key={text}
                                    sx={{
                                      mb: 1.25,
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
                          </Grid>
                        </Grid>
                      )}

                      {activeService === "Compliance" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Compliance item 1</Typography>
                          <Typography>Compliance item 2</Typography>
                        </>
                      )}

                      {activeService === "Taxation" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Taxation item 1</Typography>
                          <Typography>Taxation item 2</Typography>
                        </>
                      )}

                      {activeService === "OutSourcing" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Outsourcing item 1</Typography>
                          <Typography>Outsourcing item 2</Typography>
                        </>
                      )}

                      {activeService === "Business Advisory" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Advisory item 1</Typography>
                          <Typography>Advisory item 2</Typography>
                        </>
                      )}

                      {activeService === "Virtual Office" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Virtual Office item 1</Typography>
                          <Typography>Virtual Office item 2</Typography>
                        </>
                      )}

                      {activeService === "Other Services" && (
                        <>
                          <Typography sx={{ mb: 1 }}>Other service 1</Typography>
                          <Typography>Other service 2</Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Menu>
              )}
            </Box>

            {/* Other top-level desktop buttons */}
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
            size="small"
            disableElevation
            sx={{
              bgcolor: "#808080",
              fontWeight: 800,
              // keep padding tight so color only wraps the text
              px: { xs: 1.25, sm: 1.5, md: 2.25 },
              py: { xs: 0.5, sm: 0.6, md: 0.7 },
              borderRadius: 999,
              fontSize: { xs: 11, sm: 12, md: 13 },
              lineHeight: 1.6,
              whiteSpace: "nowrap",
              width: "auto",       // don't stretch
              minWidth: 0,         // override MUI's 64px default
              flexShrink: 0,       // prevent flex shrinking artifacts
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
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: { xs: "88vw", sm: 320 },
            bgcolor: "#0f2555",
            color: "#a4e100",
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

        <List dense>
          <ListItemButton onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Home" primaryTypographyProps={{ sx: { color: "#fff" } }} />
          </ListItemButton>

          {/* Collapsed Services (mobile) */}
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

      {/* Spacer so content isn't hidden behind the fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: APPBAR_H_MOBILE, md: APPBAR_H_DESKTOP } }} />
    </>
  );
}
