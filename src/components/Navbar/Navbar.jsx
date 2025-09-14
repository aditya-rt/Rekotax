import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Link as MuiLink,
    Menu,
    MenuItem
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    // 1) STATE (replace your single anchorEl with these)
    const [svcEl, setSvcEl] = useState(null);
    const [indEl, setIndEl] = useState(null);
    const [insEl, setInsEl] = useState(null);
    const [abtEl, setAbtEl] = useState(null);


    // open and close dropdown
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"   // <-- make the navbar fixed at top
            color="primary"
            elevation={0}
            sx={{ bgcolor: "#0f2555", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar sx={{ gap: 2, px: { xs: 2, md: 6 } }}>
                {/* Logo + Text */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1.5 }}>
                    <Box
                        component="img"
                        src="/rekotaxlogoNew.svg"
                        alt="Rekotax"
                        sx={{ width: 180, height: 60, borderRadius: 1 }}
                    />
                    <Box>
                        {/* <Typography variant="h6" sx={{ lineHeight: 1 }}>
                            REKOTAX
                        </Typography> */}

                    </Box>
                </Box>

                {/* Menu */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>

                    {/* --- New Services dropdown --- */}
                    <Box>
                        <Button
                            color="inherit"
                            endIcon={<ArrowDropDownIcon />}
                            onClick={(e) => setSvcEl(e.currentTarget)}
                            sx={{ fontWeight: 600, textTransform: "none" }}
                        >
                            Services
                        </Button>
                        <Menu
                            anchorEl={svcEl}
                            open={Boolean(svcEl)}
                            onClose={() => setSvcEl(null)}
                            keepMounted
                            PaperProps={{ sx: { mt: 1 } }}
                        >
                            <MenuItem onClick={handleCloseMenu} component="a" href="#Registration">
                                Registration
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#Compilance">
                                Compliance
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#virtual-office">
                                Taxation
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#virtual-office">
                                OutSourcing
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#business-advisory">
                                Business Advisory
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#cfo-services">
                                Virtual Office
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#cfo-services">
                                Other Services
                            </MenuItem>
                            {/* add more sub-services here */}
                        </Menu>
                    </Box>
                    {/* Industries */}
                    <Box>
                        <Button
                            color="inherit"
                            endIcon={<ArrowDropDownIcon />}
                            onClick={(e) => setSvcEl(e.currentTarget)}
                            sx={{ fontWeight: 600, textTransform: "none" }}
                        >
                            Industries
                        </Button>
                        <Menu
                            anchorEl={svcEl}
                            open={Boolean(svcEl)}
                            onClose={() => setSvcEl(null)}
                            keepMounted
                            PaperProps={{ sx: { mt: 1 } }}
                        >
                            <MenuItem onClick={handleCloseMenu} component="a" href="#gst">
                                Registration
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#gst">
                                Compliance
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#virtual-office">
                                Taxation
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#virtual-office">
                                OutSourcing
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#business-advisory">
                                Business Advisory
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#cfo-services">
                                Virtual Office
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#cfo-services">
                                Other Services
                            </MenuItem>
                            {/* add more sub-services here */}
                        </Menu>
                    </Box>

                    <Box>
                        <Button
                            color="inherit"
                            onClick={handleOpenMenu}
                            sx={{ fontWeight: 600, textTransform: "none" }}
                        >
                            Insights
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                            keepMounted
                            PaperProps={{ sx: { mt: 1 } }}
                        >
                            <MenuItem onClick={handleCloseMenu} component="a" href="#gst">
                                Registration
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#gst">
                                Compliance
                            </MenuItem>

                            {/* add more sub-services here */}
                        </Menu>
                    </Box>

                    <Box>
                        <Button
                            color="inherit"
                            onClick={handleOpenMenu}
                            sx={{ fontWeight: 600, textTransform: "none" }}
                        >
                            About Us
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                            keepMounted
                            PaperProps={{ sx: { mt: 1 } }}
                        >
                            <MenuItem onClick={handleCloseMenu} component="a" href="#gst">
                                Registration
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu} component="a" href="#gst">
                                Compliance
                            </MenuItem>

                            {/* add more sub-services here */}
                        </Menu>
                    </Box>
                    {/* Keep Registrations as it is */}

                </Box>

                {/* CTA */}
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#808080',       // <-- light/medium gray start color
                        fontWeight: 800,
                        px: 3,
                        borderRadius: 6,
                        "&:hover": {
                            bgcolor: "#ffffff",     // white on hover if you want
                            color: "primary.main"
                        }
                    }}
                >
                    GET CONSULTATION
                </Button>

            </Toolbar>
        </AppBar>
    );
}
