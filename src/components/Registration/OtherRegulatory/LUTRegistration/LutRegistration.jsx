import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,

} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/Add"; // plus icon
import RemoveIcon from "@mui/icons-material/Remove"; // minus icon
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../../Dashboard/Footer";
import ContactSection from "../../../Dashboard/ContactSection";


/**
 * LUT Registration - Material UI Version
 * -------------------------------------------------------------
 * How to use:
 * 1) Ensure Open Sans is loaded in your index.html head (optional but recommended):
 *    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
 * 2) Drop this file into your project (CRA, Vite, Next.js, etc.).
 * 3) import LUTRegistrationMUI from "./LUTRegistrationMUI"; and render <LUTRegistrationMUI />
 * 4) Colors follow Rekotax palette with primary headline color #0f2555.
 */

const BrandColor = "#0f2555";
const Pill = ({ children }) => (
    <Box
        sx={{
            display: "inline-block",
            bgcolor: "rgba(255,255,255,0.1)",
            px: 2.5,
            py: 0.8,
            borderRadius: 5,
            fontSize: "0.95rem",
            mb: 3,
        }}
    >
        {children}
    </Box>
);

const FeatureItem = ({ children }) => (
    <ListItem sx={{ py: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 34 }}>
            <CheckCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary={children} />
    </ListItem>
);

const InfoCard = ({ title, description }) => (
    <Card
        elevation={3}
        sx={{
            height: "100%",
            background: "#f3f6fb",
            borderRadius: 2,
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            ":hover": {
                transform: "translateY(-6px)",
                boxShadow: 6
            }
        }}
    >
        <CardContent>
            <Typography variant="h6" component="h4" sx={{ color: BrandColor, fontWeight: 700, mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: "#444" }}>{description}</Typography>
        </CardContent>
    </Card>
);

export default function LutRegistration() {
    const theme = useTheme();
    const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const footerRef = useRef(null);



    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY) {
                setShow(false);   // scrolling down → hide
            } else {
                setShow(true);    // scrolling up → show
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    return (
        <Box sx={{ background: "#fff", color: "#333", lineHeight: 1.6 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(90deg,#0f2555 0%,#0f3d7c 100%)",
                    color: "#fff",
                    py: { xs: 8, md: 12 },
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <Pill>Online LUT Registration Services in India</Pill>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "2rem", md: "2.8rem" },
                            mb: 2,
                        }}
                    >
                        Fast, Accurate, and Hassle-free LUT Registration
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            maxWidth: 700,
                            mx: "auto",
                            mb: 4,
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        LUT Registration gives your business a legal tax identity, enabling
                        smooth compliance, input tax credit, and nationwide credibility. At
                        Rekotax, we make the entire process effortless so you can focus on
                        growth while we handle the compliances.
                    </Typography>

                    {/* CTA Buttons */}
                    <Box sx={{ mb: 5 }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#fff",
                                color: "#0f2555",
                                fontWeight: 600,
                                px: 4,
                                py: 1.2,
                                borderRadius: 10,
                                mr: 2,
                                "&:hover": { bgcolor: "#f0f0f0" },
                            }}
                        >
                            Start Registration
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "#fff",
                                borderColor: "rgba(255,255,255,0.7)",
                                px: 4,
                                py: 1.2,
                                borderRadius: 10,
                                "&:hover": { borderColor: "#fff" },
                            }}
                            href="tel:+919220580062"
                        >
                            +91-9220580062
                        </Button>
                    </Box>

                    {/* Highlights */}
                    <Grid container spacing={2} justifyContent="center">
                        {["Typical approvals: 1-3 days*", "CA/CS assisted end-to-end", "Paperless & transparent tracking"].map(
                            (item) => (
                                <Grid item xs={12} sm="auto" key={item}>
                                    <Box
                                        sx={{
                                            bgcolor: "rgba(255,255,255,0.1)",
                                            px: 3,
                                            py: 1,
                                            borderRadius: 20,
                                            fontSize: "0.95rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item}
                                    </Box>
                                </Grid>
                            )
                        )}
                    </Grid>

                    <Typography sx={{ mt: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                        *Subject to government verification and completeness of documents.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6, mt: 4 } }}>

                {/* Page Title */}
                <Typography
                    variant={isDownMd ? "h4" : "h3"}
                    align="center"
                    sx={{ color: BrandColor, fontWeight: 700, mb: 3, mt: 4 }}
                >
                    Know All About LUT Registration
                </Typography>

                {/* Intro Row */}
                <Grid container spacing={5} alignItems="flex-start">
                    <Grid item xs={12} md={7}>
                        <Typography variant="h5" sx={{ color: BrandColor, fontWeight: 700, mb: 1 }}>
                            What is LUT Registration?
                        </Typography>
                        <Typography variant="body1" paragraph>
                            A <strong>Letter of Undertaking (LUT)</strong> is a document that allows exporters to supply goods or services <strong>without paying IGST upfront</strong>. It is filed with the GST department to ensure smooth export operations and better <strong>working capital management</strong>.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            LUT registration is <strong>mandatory</strong> for any exporter who wishes to export goods or services without paying integrated tax and claiming refunds later. With LUT, businesses can save time, improve liquidity, and expand globally without tax blockages.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        {/* Optional visual or highlight box */}
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                bgcolor: "#f7f9fd",
                                border: "1px solid #e6ecf5"
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: BrandColor, mb: 1 }}>
                                Quick facts
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.75 }}>
                                • Applies to exports and certain zero-rated supplies
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.75 }}>
                                • Online filing in minutes on the GST portal
                            </Typography>
                            <Typography variant="body2">
                                • Valid for one financial year (renew annually)
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Key Features */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ color: BrandColor, fontWeight: 700, mb: 2 }}>
                        Key Features of LUT Registration
                    </Typography>
                    <List sx={{ pl: 1 }}>
                        <FeatureItem>
                            Valid for <strong>one financial year</strong> and must be renewed annually
                        </FeatureItem>
                        <FeatureItem>
                            Can be filed <strong>online via GST portal</strong> with minimal documents
                        </FeatureItem>
                        <FeatureItem>
                            Applicable for <strong>zero-rated supplies</strong> including exports and SEZ sales
                        </FeatureItem>
                        <FeatureItem>
                            Eliminates the need for <strong>tax refund claims</strong> after export
                        </FeatureItem>
                        <FeatureItem>
                            Best suited for businesses with a <strong>clean compliance history</strong>
                        </FeatureItem>
                    </List>
                </Box>

                {/* Eligibility */}
                <Box sx={{ mt: 6 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: BrandColor, fontWeight: 700, mb: 2 }}
                    >
                        Who Can Apply for LUT?
                    </Typography>

                    <Grid
                        container
                        wrap="nowrap"
                        spacing={2}
                        sx={{
                            overflowX: { xs: "auto", md: "visible" },
                            px: { xs: 1, md: 0 },
                            scrollSnapType: { xs: "x mandatory", md: "none" },
                            "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar on WebKit
                            "-msOverflowStyle": "none",
                            scrollbarWidth: "none",
                        }}
                        justifyContent={{ xs: "flex-start", md: "center" }}
                    >
                        {[
                            {
                                title: "Exporters of Goods",
                                desc: <>Businesses engaged in <strong>exporting goods</strong> directly or through third parties.</>,
                            },
                            {
                                title: "Exporters of Services",
                                desc: <>Service providers who supply <strong>services outside India</strong> under GST law.</>,
                            },
                            {
                                title: "SEZ Supplies",
                                desc: <>Suppliers making <strong>zero-rated supplies</strong> to Special Economic Zones (SEZs).</>,
                            },
                        ].map((card) => (
                            <Grid
                                item
                                key={card.title}
                                sx={{
                                    minWidth: { xs: 260, sm: 300, md: 1 / 3 },   // each takes 1/3 of row on md+
                                    flex: { xs: "0 0 auto", md: "1 1 0%" },
                                    scrollSnapAlign: { xs: "start", md: "none" },
                                    pr: { xs: 1, md: 0 },
                                }}
                            >
                                <InfoCard title={card.title} description={card.desc} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ color: BrandColor, fontWeight: 700, mb: 2 }}>
                        Why Should You File LUT?
                    </Typography>

                    <Typography variant="body1" sx={{ color: "#444", mb: 3 }}>
                        Filing an <strong>LUT</strong> is not just a compliance formality, it gives exporters a <strong>strategic edge</strong> by freeing up funds and ensuring global trade runs smoothly. Instead of paying IGST and waiting for refunds, LUT helps you operate with ease and efficiency.
                    </Typography>

                    {[
                        [
                            {
                                title: "No Upfront Tax",
                                desc: <>Export without <strong>paying IGST upfront</strong> and save working capital.</>,
                            },
                            {
                                title: "Improved Liquidity",
                                desc: <>Avoid funds getting <strong>blocked in refunds</strong> and keep cash flow smooth.</>,
                            },
                            {
                                title: "Faster Operations",
                                desc: <>Seamless export process with <strong>reduced compliance delays</strong>.</>,
                            },
                        ],
                        [
                            {
                                title: "Global Competitiveness",
                                desc: <>Boost your <strong>international trade</strong> with tax-free export compliance.</>,
                            },
                            {
                                title: "Annual Validity",
                                desc: <>A single LUT is valid for the entire <strong>financial year</strong>, making compliance easier.</>,
                            },
                            {
                                title: "Hassle-Free Refunds",
                                desc: <>Avoid lengthy refund claims and enjoy <strong>direct export benefits</strong>.</>,
                            },
                        ],
                    ].map((row, idx) => (
                        <Grid
                            key={idx}
                            container
                            wrap="nowrap"
                            spacing={2}
                            sx={{
                                overflowX: { xs: "auto", md: "visible" },
                                px: { xs: 1, md: 0 },
                                mb: idx === 0 ? 2.5 : 0,
                                scrollSnapType: { xs: "x mandatory", md: "none" },
                                "&::-webkit-scrollbar": { display: "none" },
                                "-msOverflowStyle": "none",
                                scrollbarWidth: "none",
                            }}
                            justifyContent={{ xs: "flex-start", md: "center" }}
                            alignItems="stretch"
                        >
                            {row.map((card) => (
                                <Grid
                                    item
                                    key={card.title}
                                    sx={{
                                        minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: each exactly one-third
                                        flex: { xs: "0 0 auto", md: "1 1 0%" },
                                        scrollSnapAlign: { xs: "start", md: "none" },
                                        pr: { xs: 1, md: 0 },
                                        display: "flex",
                                    }}
                                >
                                    <Box sx={{ width: "100%", display: "flex" }}>
                                        <InfoCard title={card.title} description={card.desc} />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Box>


                <Box
                    sx={{
                        py: 6,
                        px: { xs: 2, md: 6 },
                        background: "#fff",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#0f2555", mb: 6 }}
                    >
                        Our LUT Registration Packages
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    background: "#f9fbff",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    minHeight: 460,
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        background: "#3f5177",
                                        color: "#fff",
                                        fontSize: "1.4rem",
                                        fontWeight: 700,
                                        py: 2,
                                        borderRadius: "12px 12px 0 0",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Essentials
                                </Box>
                                <Box sx={{ textAlign: "left", px: 3, py: 3, flexGrow: 1 }}>
                                    <ul style={{ paddingLeft: 20, margin: 0, color: "#444" }}>
                                        <li style={{ marginBottom: 10 }}>LUT Registration</li>
                                    </ul>
                                </Box>
                                <Box
                                    sx={{
                                        borderTop: "1px solid #ddd",
                                        py: 3,
                                        mt: "auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f2555", mb: 1 }}>
                                        ₹ 999/-
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                                        (Inclusive of taxes)
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "#0f2555",
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            textTransform: "none",
                                            px: 4,
                                            py: 1.2,
                                            "&:hover": { background: "#0eb733" },
                                        }}
                                    >
                                        Select Plan
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    background: "#f9fbff",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    minHeight: 460,
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        background: "#0f2555",
                                        color: "#fff",
                                        fontSize: "1.4rem",
                                        fontWeight: 700,
                                        py: 2,
                                        borderRadius: "12px 12px 0 0",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Advanced
                                </Box>
                                <Box sx={{ textAlign: "left", px: 3, py: 3, flexGrow: 1 }}>
                                    <ul style={{ paddingLeft: 20, margin: 0, color: "#444" }}>
                                        <li style={{ marginBottom: 10 }}>LUT Registration</li>
                                        <li style={{ marginBottom: 10 }}>GST Filing for First 3 Months</li>
                                    </ul>
                                </Box>
                                <Box
                                    sx={{
                                        borderTop: "1px solid #ddd",
                                        py: 3,
                                        mt: "auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f2555", mb: 1 }}>
                                        ₹ 1,999/-
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                                        (Inclusive of taxes)
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "#0f2555",
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            textTransform: "none",
                                            px: 4,
                                            py: 1.2,
                                            "&:hover": { background: "#0eb733" },
                                        }}
                                    >
                                        Select Plan
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    background: "#f9fbff",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    minHeight: 460,
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        background: "linear-gradient(118deg, #0f2555, #023691)",
                                        color: "#fff",
                                        fontSize: "1.4rem",
                                        fontWeight: 700,
                                        py: 2,
                                        borderRadius: "12px 12px 0 0",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    All-Inclusive
                                </Box>
                                <Box sx={{ textAlign: "left", px: 3, py: 3, flexGrow: 1 }}>
                                    <ul style={{ paddingLeft: 20, margin: 0, color: "#444" }}>
                                        <li style={{ marginBottom: 10 }}>LUT Registration</li>
                                        <li style={{ marginBottom: 10 }}>
                                            GST Return Filing for First 12 Months (Up to ₹50L Turnover)
                                        </li>
                                        <li style={{ marginBottom: 10 }}>
                                            Reconciliation of Books and GSTRs
                                        </li>
                                    </ul>
                                </Box>
                                <Box
                                    sx={{
                                        borderTop: "1px solid #ddd",
                                        py: 3,
                                        mt: "auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f2555", mb: 1 }}>
                                        ₹ 8,499/-
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                                        (Inclusive of taxes)
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "#0f2555",
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            textTransform: "none",
                                            px: 4,
                                            py: 1.2,
                                            "&:hover": { background: "#0eb733" },
                                        }}
                                    >
                                        Select Plan
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Typography variant="body1" sx={{ mt: 6, color: "#333" }}>
                        Looking for a Virtual Office Address for GST Registration?{" "}
                        <a
                            href="https://www.rekotax.com/online-store"
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0f2555", fontWeight: 600, textDecoration: "none" }}
                        >
                            Click here
                        </a>{" "}
                        to explore our Virtual Office solutions.
                    </Typography>
                </Box>


                <Box
                    sx={{
                        maxWidth: 1200,
                        mx: "auto",
                        px: { xs: 2, md: 4 },
                        py: 6,
                        textAlign: "center",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f2555", mb: 4 }}>
                        Simplified Process to Register Your OPC in India
                    </Typography>

                    {[
                        [
                            {
                                number: "1",
                                title: "Reserve Company Name",
                                desc:
                                    "Choose 3–6 unique name options that reflect your business. We’ll help you check availability and ensure it ends with “(OPC) Private Limited”.",
                            },
                            {
                                number: "2",
                                title: "Get DSC & DIN",
                                desc:
                                    "Apply for Digital Signature Certificate and Director Identification Number to sign and file incorporation forms online.",
                            },
                            {
                                number: "3",
                                title: "Submit Incorporation Docs",
                                desc:
                                    "Prepare and submit MOA, AOA, INC-3 (Nominee consent), INC-9 (Director declaration) using the SPICe+ form on the MCA portal.",
                            },
                        ],
                        [
                            {
                                number: "4",
                                title: "Pay Government Fees",
                                desc:
                                    "Pay applicable government and stamp duties based on the state and authorized capital — we’ll calculate and manage this for you.",
                            },
                            {
                                number: "5",
                                title: "Get Certificate of Incorporation",
                                desc:
                                    "Registrar verifies your application and issues the Certificate of Incorporation (COI) with your unique CIN — you’re now legally registered!",
                            },
                            {
                                number: "6",
                                title: "Post-Incorporation Compliance",
                                desc:
                                    "Open a current account, apply for PAN, TAN & GST, and set up accounting and compliance systems. We’ll guide you through everything.",
                            },
                        ],
                    ].map((row, idx) => (
                        <Grid
                            key={idx}
                            container
                            wrap="nowrap"
                            spacing={2}
                            sx={{
                                overflowX: { xs: "auto", md: "visible" },
                                px: { xs: 1, md: 0 },
                                mb: idx === 0 ? 2.5 : 0,
                                scrollSnapType: { xs: "x mandatory", md: "none" },
                                "&::-webkit-scrollbar": { display: "none" },
                                "-msOverflowStyle": "none",
                                scrollbarWidth: "none",
                            }}
                            justifyContent={{ xs: "flex-start", md: "center" }}
                            alignItems="stretch"
                        >
                            {row.map((step) => (
                                <Grid
                                    item
                                    key={step.number}
                                    sx={{
                                        minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: exactly 3 per row
                                        flex: { xs: "0 0 auto", md: "1 1 0%" },
                                        scrollSnapAlign: { xs: "start", md: "none" },
                                        pr: { xs: 1, md: 0 },
                                        display: "flex",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "#f3f6fb",
                                            color: "#333",
                                            borderRadius: 4,
                                            p: 3,
                                            textAlign: "center",
                                            boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "50%",
                                                backgroundColor: "#0f2555",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                fontSize: "1.2rem",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mx: "auto",
                                                mb: 2,
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                            }}
                                        >
                                            {step.number}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f2555", mb: 1 }}>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#333", textAlign: "left" }}>
                                            {step.desc}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Box>

                <Box
                    sx={{
                        background: "#ffffff",
                        py: 6,
                        px: { xs: 2, md: 6 },
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#0f2555", mb: 6 }}
                    >
                        Why REKOTAX
                    </Typography>

                    {[
                        [
                            { icon: "fas fa-certificate", text: "Govt. of India Authorized & Trusted" },
                            { icon: "fas fa-users", text: "Trusted by 1,000+ Founders Nationwide" },
                            { icon: "fas fa-award", text: "ISO-Certified for Quality Excellence" },
                        ],
                        [
                            { icon: "fas fa-shield-alt", text: "Bank-Level Data Security You Can Rely On" },
                            { icon: "fas fa-user-tie", text: "Guided by Experienced Legal & Tax Experts" },
                            { icon: "fas fa-clock", text: "Always On-Time. Every Time." },
                        ],
                        [
                            { icon: "fas fa-hands-helping", text: "One-on-One Support from a Dedicated Expert" },
                            { icon: "fas fa-headset", text: "Fast, Friendly & Always Available Support" },
                            { icon: "fas fa-rupee-sign", text: "Premium Service at Startup-Friendly Prices" },
                        ],
                    ].map((row, idx) => (
                        <Grid
                            key={idx}
                            container
                            wrap="nowrap"
                            spacing={2}
                            sx={{
                                overflowX: { xs: "auto", md: "visible" },
                                px: { xs: 1, md: 0 },
                                mb: idx === 2 ? 0 : 2.5,
                                scrollSnapType: { xs: "x mandatory", md: "none" },
                                "&::-webkit-scrollbar": { display: "none" },
                                "-msOverflowStyle": "none",
                                scrollbarWidth: "none",
                            }}
                            justifyContent={{ xs: "flex-start", md: "center" }}
                            alignItems="stretch"
                        >
                            {row.map((item) => (
                                <Grid
                                    item
                                    key={item.text}
                                    sx={{
                                        minWidth: { xs: 260, sm: 300, md: 1 / 3 }, // md+: exactly three per row
                                        flex: { xs: "0 0 auto", md: "1 1 0%" },
                                        scrollSnapAlign: { xs: "start", md: "none" },
                                        pr: { xs: 1, md: 0 },
                                        display: "flex",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            backgroundColor: "#0f2555",
                                            color: "#fff",
                                            borderRadius: 2,
                                            p: 2.5,
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                            transition: "transform 0.3s ease",
                                            "&:hover": { transform: "translateY(-5px)" },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: "#b5b7bb",
                                                width: 48,
                                                height: 48,
                                                borderRadius: 2,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mr: 2,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <i className={item.icon} style={{ color: "#0f2555", fontSize: 20 }}></i>
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 15,
                                                lineHeight: 1.4,
                                                textAlign: "left",
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Box>


                <Box
                    sx={{
                        backgroundColor: "#fff",
                        color: "#333",
                        fontFamily: "'Open Sans', sans-serif",
                        lineHeight: 1.7,
                        px: { xs: 2, md: 6 },
                        py: { xs: 4, md: 8 },
                        maxWidth: 1100,
                        mx: "auto",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center", fontWeight: 700, color: "#0f2555", mb: 4 }}
                    >
                        LUT Registration Under GST – A Complete Guide for Exporters
                    </Typography>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 4, mb: 2 }}>
                        Introduction to LUT Registration
                    </Typography>
                    <Typography paragraph>
                        For businesses engaged in international trade, managing cash flow is critical.
                        The Goods and Services Tax (GST) regime provides a powerful tool for exporters called the
                        <strong> Letter of Undertaking (LUT)</strong>. This facility allows businesses to export goods
                        or services without paying the Integrated GST (IGST) upfront, thereby preventing working capital
                        from being blocked in tax refunds.
                    </Typography>
                    <Typography paragraph>
                        Filing an LUT is a crucial compliance step for exporters seeking to optimize their financial operations
                        and gain a competitive edge in the global market. At <strong>Rekotax</strong>, we specialize in simplifying
                        the LUT registration process, ensuring your export operations are smooth, compliant, and efficient.
                    </Typography>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        What is a Letter of Undertaking (LUT)?
                    </Typography>
                    <Typography paragraph>
                        A Letter of Undertaking (LUT) is a document submitted under <strong>Form GST RFD-11</strong> by an exporter on the GST portal.
                        By filing an LUT, the exporter undertakes to adhere to all GST regulations, primarily to either export the goods/services within
                        a specified timeframe or pay the applicable IGST with interest if they fail to do so.
                        It essentially serves as a bank guarantee waiver, allowing for zero-rated exports without immediate tax payment.
                    </Typography>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Who Should File for LUT Registration?
                    </Typography>
                    <Typography paragraph>
                        LUT registration is intended for any GST-registered taxpayer who exports goods or services. This includes:
                    </Typography>
                    <ul>
                        <li><strong>Exporters of Goods:</strong> Businesses shipping products to countries outside India.</li>
                        <li><strong>Exporters of Services:</strong> Professionals and companies providing services to clients located abroad.</li>
                        <li><strong>Suppliers to Special Economic Zones (SEZs):</strong> Any supply of goods or services to an SEZ unit or developer is treated as a zero-rated supply, making the supplier eligible to file an LUT.</li>
                    </ul>
                    <Typography paragraph>
                        Essentially, any business making zero-rated supplies can opt for the LUT facility to avoid the pay-and-refund cycle of IGST.
                    </Typography>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Eligibility Criteria for Filing an LUT
                    </Typography>
                    <Typography paragraph>
                        To be eligible for the LUT facility, a taxpayer must meet certain conditions. The primary requirement is a clean compliance record.
                        Specifically, the applicant:
                    </Typography>
                    <ul>
                        <li>Must be registered under GST.</li>
                        <li>Should not have been prosecuted for any offence under the CGST Act or any other existing law where the tax evaded exceeds <strong>₹250 lakhs</strong>.</li>
                    </ul>
                    <Typography paragraph>
                        If a taxpayer does not meet these criteria, they must furnish an export bond and a bank guarantee to export without paying IGST.
                    </Typography>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Benefits of LUT Registration
                    </Typography>
                    <Typography paragraph>Filing an LUT offers significant advantages that streamline export operations:</Typography>
                    <ul>
                        <li><strong>Improved Working Capital:</strong> Funds are not blocked in IGST payments, freeing up capital for core business activities.</li>
                        <li><strong>Simplified Compliance:</strong> Eliminates the entire process of claiming tax refunds, which can be time-consuming and complex.</li>
                        <li><strong>Annual Validity:</strong> A single LUT is valid for the entire financial year, reducing repeated filings.</li>
                        <li><strong>Enhanced Global Competitiveness:</strong> Reduces operational costs and improves liquidity for competitive pricing.</li>
                        <li><strong>Hassle-Free Exports:</strong> Entire process is online, making it quick, transparent, and easy to manage.</li>
                    </ul>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Documents Required for LUT Registration
                    </Typography>
                    <Typography paragraph>The process for filing an LUT is digital and requires minimal documentation. You will primarily need:</Typography>
                    <ul>
                        <li><strong>GST Portal Login Credentials:</strong> To access the dashboard and file the application.</li>
                        <li><strong>Details of Two Witnesses:</strong> Name, occupation, and address of two independent witnesses.</li>
                        <li><strong>Digital Signature Certificate (DSC) or EVC:</strong> Authorized signatory must sign via DSC or Electronic Verification Code (OTP).</li>
                    </ul>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Step-by-Step Process for LUT Registration
                    </Typography>
                    <Typography paragraph>Filing an LUT on the GST portal is a straightforward process:</Typography>
                    <ol>
                        <li><strong>Login to GST Portal:</strong> Access the GST portal using official login credentials.</li>
                        <li><strong>Navigate to LUT Application:</strong> Go to 'Services' → 'User Services' → 'Furnish Letter of Undertaking (LUT)'.</li>
                        <li><strong>Select Financial Year:</strong> Choose the financial year for which you are filing the LUT.</li>
                        <li><strong>Fill Form GST RFD-11:</strong> Tick the three checkboxes to self-declare and provide two witness details.</li>
                        <li><strong>Sign and Submit:</strong> Sign the application using a DSC or EVC to complete submission.</li>
                        <li><strong>Download Acknowledgment:</strong> An Application Reference Number (ARN) is generated instantly for records.</li>
                    </ol>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Consequences of Non-Compliance
                    </Typography>
                    <Typography paragraph>
                        If an exporter files an LUT but fails to meet conditions (e.g., does not export within three months or receive payment within one year),
                        the LUT facility can be revoked. In such cases, the exporter must:
                    </Typography>
                    <ul>
                        <li>Pay the applicable IGST on the transaction along with interest at <strong>18% per annum</strong>.</li>
                        <li>Furnish an export bond for all future exports.</li>
                    </ul>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        How Rekotax Can Help You
                    </Typography>
                    <Typography paragraph>At Rekotax, we make LUT filing effortless. Our expert services ensure:</Typography>
                    <ul>
                        <li><strong>End-to-end Assistance:</strong> We guide you through every step, from checking eligibility to downloading the acknowledgment.</li>
                        <li><strong>Error-Free Filing:</strong> Ensures all details are correct for smooth and instant submission.</li>
                        <li><strong>Timely Renewals:</strong> We remind you to renew your LUT before each financial year starts.</li>
                        <li><strong>Expert GST Advisory:</strong> We also support all your GST compliance needs.</li>
                    </ul>

                    <Typography variant="h5" sx={{ color: "#0f2555", fontWeight: 700, mt: 6, mb: 2 }}>
                        Conclusion
                    </Typography>
                    <Typography paragraph>
                        The Letter of Undertaking is an indispensable tool for Indian exporters, ensuring better liquidity and simpler tax compliance.
                        By leveraging the LUT facility, your business can focus on growth instead of procedural delays.
                    </Typography>
                    <Typography paragraph>
                        At <strong>Rekotax</strong>, we are committed to making your GST journey seamless. Contact us today to file your LUT quickly and correctly,
                        and unlock the full potential of your export business.
                    </Typography>
                </Box>


                <Box
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        py: { xs: 6, md: 8 },
                        px: 2,
                        backgroundColor: "#fff",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "center", mb: 5, fontWeight: 700, color: "#0f2555" }}
                    >
                        LUT Registration FAQs
                    </Typography>

                    {[
                        {
                            q: "What is a Letter of Undertaking (LUT) in GST?",
                            a: "A Letter of Undertaking (LUT) is a document filed by exporters under GST (Form GST RFD-11) that allows them to export goods or services without paying IGST. It serves as an undertaking that they will fulfill all export-related obligations under GST law.",
                        },
                        {
                            q: "Who is eligible to file an LUT for exports?",
                            a: "Any GST-registered taxpayer who exports goods or services can file an LUT, provided they have not been prosecuted for tax evasion exceeding ₹250 lakhs. This includes exporters of goods, services, and suppliers to SEZ units or developers.",
                        },
                        {
                            q: "What are the main benefits of filing an LUT?",
                            a: "The primary benefit is improved working capital, as exporters don't have to pay IGST upfront and then claim a refund. It simplifies compliance, saves time, and makes Indian exports more competitive globally.",
                        },
                        {
                            q: "Is it mandatory to file an LUT for all exports?",
                            a: "No, it is not mandatory. An exporter has two options for zero-rated exports: 1) File an LUT and export without paying IGST, or 2) Pay IGST on exports and claim a refund later. The LUT route is generally preferred for better cash flow.",
                        },
                        {
                            q: "What is the validity of an LUT?",
                            a: "An LUT is valid for one financial year. A fresh LUT must be filed for each new financial year to continue exporting without IGST payment.",
                        },
                        {
                            q: "What documents are required for LUT registration?",
                            a: "The LUT filing process is online and requires minimal documentation. You will need your GST portal login, details of two independent witnesses (name, address, occupation), and a Digital Signature Certificate (DSC) or EVC for submission.",
                        },
                        {
                            q: "What is the difference between an LUT and a Bond?",
                            a: "An LUT is a simple undertaking filed by eligible exporters. A Bond (with a bank guarantee) is required for exporters who are not eligible for an LUT (e.g., those prosecuted for significant tax evasion). The LUT route is simpler and does not require a bank guarantee.",
                        },
                        {
                            q: "What happens if I fail to export goods after filing an LUT?",
                            a: "If you file an LUT but fail to export the goods within three months (or receive payment for services within one year), you must pay the applicable IGST along with interest at 18% per annum. Failure to do so can lead to the revocation of the LUT facility.",
                        },
                        {
                            q: "Can I file a single LUT for multiple export shipments?",
                            a: "Yes. A single LUT is valid for the entire financial year and covers all export shipments made during that period. You do not need to file a separate LUT for each export invoice.",
                        },
                        {
                            q: "How can Rekotax help with LUT filing?",
                            a: "Rekotax provides expert assistance for a hassle-free LUT filing experience. We ensure your application is submitted correctly and on time, handle documentation, and provide timely reminders for annual renewals, allowing you to focus on your export business.",
                        },
                    ].map((faq, idx) => (
                        <Accordion
                            key={idx}
                            sx={{
                                mb: 1.5,
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                overflow: "hidden",
                                "&:before": { display: "none" },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <AddIcon
                                            sx={{
                                                fontSize: 20,
                                                color: "#0f2555",
                                                transition: "transform 0.3s ease",
                                                ".Mui-expanded &": { display: "none" },
                                            }}
                                        />
                                        <RemoveIcon
                                            sx={{
                                                fontSize: 20,
                                                color: "#0f2555",
                                                display: "none",
                                                ".Mui-expanded &": { display: "block" },
                                            }}
                                        />
                                    </Box>
                                }
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "1.05rem",
                                    color: "#0f2555",
                                    px: 2.5,
                                    py: 2,
                                    "&:hover": { backgroundColor: "#f7f9fc" },
                                }}
                            >
                                {`${idx + 1}. ${faq.q}`}
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    px: 2.5,
                                    py: 2,
                                    backgroundColor: "#fafbfc",
                                    fontSize: "0.95rem",
                                    color: "#444",
                                    lineHeight: 1.6,
                                }}
                            >
                                {faq.a}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>


            </Container>

            <Box
                sx={{
                    mt: 0,
                    mb: 0,
                    pb: 0,
                    mx: { xs: 2, md: -4 },
                }}
                ref={footerRef}
            >
                <ContactSection />
            </Box>


            <Box
                sx={{
                    mt: 0,
                    mb: 0,
                    pb: 0,
                    mx: { xs: 2, md: -4 },
                }}
                ref={footerRef}
            >
                <Footer />
            </Box>


        </Box>


    );
}
