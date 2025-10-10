import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
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
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const CONTENT_MAX_W = 1300;
  const H_PADDING   = { xs: 1.5, sm: 2, md: 3 };
  const { pathname } = useLocation();

  const APPBAR_H_DESKTOP = 64;
  const APPBAR_H_MOBILE = 56;

  const [anchors, setAnchors] = useState({
    services: false,
    industries: false,
    insights: false,
    about: false,
  });
  
  const [activeService, setActiveService] = useState("Registration");
  const [mobileOpen, setMobileOpen] = useState(false);

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
    "Other Registrations",
  ];
  const midIdx = Math.ceil(otherRegItems.length / 2);
  const otherRegColA = otherRegItems.slice(0, midIdx);
  const otherRegColB = otherRegItems.slice(midIdx);

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
            maxWidth:CONTENT_MAX_W,
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
                        left: 0,
                        right: 0,
                        width: "100%",
                        maxWidth: "100%",
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
                        "OutSourcing",
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

            {["Industries", "Insights", "About Us"].map((label) => (
              <Button
                key={label}
                color="inherit"
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
            onClick={() => navigate("/contact")}
          >
            GET CONSULTATION
          </Button>
          <IconButton
            aria-label="Get consultation"
            onClick={() => navigate("/contact")}
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
            width: { xs: "88vw", sm: 320 },
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

        <List dense>
          {/* <ListItemButton onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Home" primaryTypographyProps={{ sx: { color: "#fff" } }} />
          </ListItemButton> */}

          <Typography sx={{ px: 2, pt: 2, pb: 1, fontWeight: 800, color: "#e5f2ff" }}>
            Start your New Business
          </Typography>
          {startBusinessItems.map((text) => (
            <ListItemButton key={text} onClick={() => handleRoute(text)}>
              <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
            </ListItemButton>
          ))}

          <Typography sx={{ px: 2, pt: 2, pb: 1, fontWeight: 800, color: "#e5f2ff" }}>
            Other Regulatory Registrations
          </Typography>
          {otherRegItems.map((text) => (
            <ListItemButton key={text} onClick={() => handleRoute(text)}>
              <ListItemText primary={text} primaryTypographyProps={{ sx: { color: "#fff" } }} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.15)" }} />
          {["Industries", "Insights", "About Us"].map((label) => (
            <ListItemButton key={label} onClick={() => setMobileOpen(false)}>
              <ListItemText primary={label} primaryTypographyProps={{ sx: { color: "#fff" } }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Spacer so content is not hidden behind the fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: APPBAR_H_MOBILE, md: APPBAR_H_DESKTOP } }} />
    </>
  );
}
