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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import GSTRegistration from "../Registration/GSTRegistration/GstRegistration";

export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // anchors for menus
  const [anchors, setAnchors] = useState({
    services: null,
    industries: null,
    insights: null,
    about: null,
  });
  const [activeService, setActiveService] = useState("Overview"); // left side selection
  const navigate = useNavigate();

  const openMenu = (key, e) =>
    setAnchors((a) => ({ ...a, [key]: e.currentTarget }));
  const closeMenu = (key) => setAnchors((a) => ({ ...a, [key]: null }));
  const isOpen = (key) => Boolean(anchors[key]);

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={0}
      sx={{
        bgcolor: "#0f2555",
        zIndex: (t) => t.zIndex.drawer + 1,
        width: "100vw",
        left: 0,
      }}
    >
      <Toolbar sx={{ gap: 2, px: { xs: 2, md: 6 } }}>
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

        {/* Menus */}
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
                  minWidth: 1250,
                  minHeight: 300,
                  left: 0,
                  position: "fixed",
                },
              }}
              MenuListProps={{
                sx: { display: "flex", width: "100%", p: 0 },
              }}
            >
              {/* left column */}
              <Box
                sx={{
                  width: 220,
                  bgcolor: "#2a2a2a",
                  display: "flex",
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

              {/* right column */}
              {/* right column */}
              {/* right column */}
              <Box sx={{ flexGrow: 1, p: 3, color: "#a4e100" }}>
                {activeService === "Registration" && (
                  <Grid container spacing={15}>
                    {/* LEFT COLUMN — Startup */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          mb: 2,
                          fontWeight: 900,
                          color: "#a4e100",
                          fontSize: "1.5rem",
                          position: "relative",
                          pb: 1, // space above the underline
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

                      {[
                        "Private Limited Company",
                        "One Person Company (OPC)",
                        "Limited Liability Partnership (LLP)",
                        "Partnership Firm",
                        "Sole Proprietorship",
                        "Section 8 Company",
                        "Public Limited Company",
                        "Nidhi Company",
                        "Producer Company",
                        "Trust / Society",
                      ].map((text) => (
                        <Typography
                          key={text}
                          sx={{
                            mb: 1.5,
                            color: "#a4e100",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          // hook up routes later if needed
                          // onClick={() => { closeMenu("services"); navigate("/some-route"); }}
                        >
                          {text}
                        </Typography>
                      ))}
                    </Grid>

                    {/* RIGHT COLUMN — Your items */}
                    <Grid item xs={12} md={6} sx={{ pl: { xs: 2, md: 4 } }}>
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

                      {[
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
                        "New empty page",
                      ].map((text) => (
                        <Typography
                          key={text}
                          sx={{
                            mb: 1.5,
                            color: "#a4e100",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() => {
                            if (text === "Goods & Service Tax (GST)") {
                              closeMenu("services");
                              navigate("/gst-registration");
                            }
                          }}
                        >
                          {text}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                )}

                {/* keep other sections unchanged */}
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

          {/* Example other menus */}
          <Button
            color="inherit"
            sx={{ fontWeight: 600, textTransform: "none" }}
          >
            Industries
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: 600, textTransform: "none" }}
          >
            Insights
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: 600, textTransform: "none" }}
          >
            About Us
          </Button>
        </Box>

        {/* CTA */}
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
  );
}
