import React from "react";
import { useRef } from "react";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import WhyRekotax from "./WhyRekotax";
import ClientTestimonials from "./ClientTestimonials";

import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Grid,
    Typography,
    Box,
    TextField,
    Button,
    Divider,
    Link,
    Paper,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Snackbar,
    Alert,
} from "@mui/material";
import { Stack, MenuItem } from "@mui/material";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const theme = createTheme({
    typography: {
        fontFamily:
            'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        h6: { fontWeight: 700 },
    },
    palette: {
        primary: { main: "#0f2555" },
        background: { default: "transparent" },
    },
    shape: { borderRadius: 12 },
});





export default function RefundPolicy({ webAppUrl, onSubmitted }) {

    const BRAND_PRIMARY = "#0f3d7c";   // solid brand color
    const BRAND_SECONDARY = "#023691";
    const BRAND_GRADIENT = "linear-gradient(11deg, #0f2555 0%, #023691 100%)";
    const aboutRef = useRef(null);

    // const aboutRef = useRef(null);
    // helper to check required fields (Message is optional)


    const footerRef = useRef(null);

    // Controls single-open accordion behavior
    const [expanded, setExpanded] = React.useState(0); // 0 opens the first; use null for all closed
    const handleAccordionToggle = (idx) => {
        setExpanded((prev) => (prev === idx ? null : idx));
    };


    return (
        <Box
            sx={{
                // brand gradient background
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                minHeight: "100vh",
                bgcolor: "transparent",
                backgroundImage: `
      /* subtle brand-tinted glows (optional, kept) */
      radial-gradient(1000px 600px at 76% 60%, rgba(2,54,145,0.20), rgba(2,54,145,0) 60%),
      radial-gradient(800px 420px at 20% 10%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%),
      /* main brand gradient */
      linear-gradient(118deg, #0f2555 0%, #023691 100%)
    `,
                backgroundBlendMode: "screen, normal, normal",
                backgroundRepeat: "no-repeat",

                // page gutters & top offset for fixed AppBar
                maxWidth: "100%",
                mx: "auto",
                px: { xs: 1, sm: 2, md: 3 },

                pt: { xs: "88px", md: "94px" },
                mt: { xs: -12, md: -15 },
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {/* Hero compo */}
                <Grid
                    container
                    alignItems="center"
                    justifyContent={{ xs: "center", md: "space-between" }}
                    columnSpacing={{ xs: 2, sm: 4, md: 10 }}
                    rowSpacing={{ xs: 4, sm: 5, md: 0 }}
                    sx={{
                        // center the whole hero section and add responsive gutters
                        maxWidth: { xs: "100%", md: 1200, lg: 1280 },
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 6 },
                        flexWrap: { xs: "wrap", md: "nowrap" },
                        mt: { xs: 2, md: 3 },
                    }}
                >



                </Grid>


                <Box
                    sx={{
                        fontFamily: "Arial, sans-serif",
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 3, sm: 4 },
                        width: "100vw",
                        maxWidth: "none",
                        ml: "calc(50% - 50vw)",
                        mr: "calc(50% - 50vw)",

                        lineHeight: 1.6,
                        color: "#1a1a1a",
                        bgcolor: "#fff",
                    }}
                >
                    <Typography variant="h4" sx={{ color: "#0f3d7c", fontWeight: 700, mb: 1 }}>
                     Privacy Policy
                    </Typography>

                    <Typography sx={{ mb: 2 }}>
                        <strong>Effective Date:</strong> 31st Aug, 2024
                        <br />
                        <strong>Last Updated:</strong> 02nd Sep, 2025
                    </Typography>

                    <Typography sx={{ mb: 2 }}>
                        This website and mobile application are operated by{" "}
                        <strong>VAMSAG CONSULTING PRIVATE LIMITED</strong> under the brand name{" "}
                        <strong>REKOTAX</strong> (hereinafter referred to as the{" "}
                        <strong>"Company", "we", "us"</strong> or <strong>"our"</strong>). These
                        Terms and Conditions ("Terms") govern your use of and access to the platform
                        including, without limitation, all content, functionality, tools, and
                        services offered therein within the territory of India.
                    </Typography>

                    <Typography sx={{ mb: 2 }}>
                        <strong>
                            PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE PLATFORM.
                            BY USING THE PLATFORM OR ANY PART THEREOF, YOU AGREE TO BE BOUND BY THESE
                            TERMS AND CONDITIONS. IF YOU DO NOT AGREE TO ALL THE TERMS AND CONDITIONS
                            HEREIN, YOU MAY NOT ACCESS THE PLATFORM.
                        </strong>
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 1. Eligibility and User Registration */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        1. Eligibility and User Registration
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        1.1 You affirm that you are of legal age (18 years or older) and fully
                        competent to enter into a legally binding agreement under the laws of India.
                        Where use of the Platform is by a minor, the same must be supervised by a
                        parent or legal guardian, who shall be bound by these Terms on the minor's
                        behalf.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        1.2 To access specific services, users may be required to create an
                        account. When registering, you agree to provide accurate, complete, and
                        up-to-date information and to update such information as necessary.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        1.3 You shall be responsible for maintaining the confidentiality of your
                        account credentials and for all activities conducted through your account.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 2. Scope of Services */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        2. Scope of Services
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        2.1 The Platform provides access to professional consultancy services
                        including, but not limited to, <strong>company incorporation, tax
                            registration and filing, GST services, compliance management, management
                            consultancy, and virtual CFO solutions</strong>.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        2.2 Users may purchase services through the Platform, subscribe to paid
                        plans, access free trials, and engage in promotions or contests as may be
                        offered.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        2.3 Certain services may involve user interaction, content creation, or
                        uploading of documentation, which shall be used strictly for service
                        execution, in accordance with our Privacy Policy.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 3. User Conduct */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        3. User Conduct
                    </Typography>
                    <Typography sx={{ mb: 1 }}>3.1 By using the Platform, you agree not to:</Typography>
                    <Box component="ul" sx={{ mt: 0.5, pl: 3, mb: 2 }}>
                        <li>Violate any applicable Indian law, rule, or regulation.</li>
                        <li>Impersonate any person or entity or misrepresent your affiliation.</li>
                        <li>Interfere with or disrupt the functionality of the Platform.</li>
                        <li>
                            Upload or transmit any content that infringes on third-party rights or is
                            otherwise unlawful, obscene, defamatory, or harmful.
                        </li>
                    </Box>
                    <Typography sx={{ mb: 2 }}>
                        3.2 The Company reserves the right to suspend or terminate access to any
                        user who engages in prohibited conduct.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 4. User-Generated Content and Intellectual Property */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        4. User-Generated Content and Intellectual Property
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        4.1 Users may upload or submit content including, but not limited to, text,
                        images, documents, and other materials ("User Content") as part of the
                        service processes.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>4.2 By submitting User Content, you:</Typography>
                    <Box component="ul" sx={{ mt: 0.5, pl: 3, mb: 2 }}>
                        <li>Represent that you have all necessary rights to submit such content.</li>
                        <li>
                            Grant the Company a non-exclusive, worldwide, royalty-free license to
                            use, store, process, and display the content for the purpose of
                            delivering the relevant services.
                        </li>
                    </Box>
                    <Typography sx={{ mb: 1 }}>
                        4.3 All trademarks, logos, proprietary graphics, service names, website and
                        application layout, and content displayed or provided by the Platform
                        ("Company Content") are and shall remain the exclusive intellectual property
                        of the Company.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        4.4 Users may not copy, reproduce, republish, transmit, modify, mirror,
                        frame, scrape, or distribute any portion of Company Content without our
                        express prior written consent. Any unauthorized use shall constitute a
                        violation of applicable intellectual property laws of India.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        4.5 Any feedback, suggestions, or recommendations provided by users may be
                        implemented by the Company without obligation of compensation or
                        attribution.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 5. Fees, Payments, and Subscriptions */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        5. Fees, Payments, and Subscriptions
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        5.1 Access to certain services is subject to applicable service fees, which
                        shall be clearly disclosed at the time of purchase.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        5.2 Payments for services or subscriptions shall be made through designated
                        payment gateways in Indian Rupees (INR), unless otherwise specified.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        5.3 Subscription plans may be automatically renewed unless cancelled by the
                        user prior to the renewal date. Cancellation can be made through the user
                        account or by notifying customer service.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        5.4 Free trials, where offered, shall automatically convert into paid
                        subscriptions unless cancelled prior to expiration.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 6. Promotions and Contests */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        6. Promotions and Contests
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        6.1 The Company may, from time to time, offer promotions, contests, or
                        sweepstakes, which shall be governed by separate terms and eligibility
                        criteria disclosed at the time of the offer.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 7. Termination and Suspension */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        7. Termination and Suspension
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        7.1 The Company reserves the right to terminate or suspend access to any
                        user account, with or without notice, if the user is found to be in
                        violation of these Terms or engaging in conduct that is harmful to the
                        Company or other users.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        7.2 Upon termination, all rights granted to the user under these Terms
                        shall cease immediately.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 8. Disclaimer of Warranties */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        8. Disclaimer of Warranties
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        8.1 The Platform and all services provided thereunder are offered on an "AS
                        IS" and "AS AVAILABLE" basis. The Company disclaims all warranties, express
                        or implied, including, without limitation, warranties of merchantability,
                        fitness for a particular purpose, accuracy, reliability, or
                        non-infringement.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        8.2 The Company makes no representations regarding the uninterrupted,
                        secure, or error-free operation of the Platform.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 9. Limitation of Liability */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        9. Limitation of Liability
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        9.1 To the fullest extent permitted by Indian law, the Company, its
                        officers, directors, employees, affiliates, agents, or licensors shall not
                        be liable for any indirect, incidental, special, or consequential damages,
                        or for any loss of profits, revenue, data, or use arising out of or in any
                        way connected to your use of the Platform.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        9.2 The Company’s total aggregate liability, whether in contract, tort
                        (including negligence), or otherwise, shall not exceed the total amount
                        paid by the user for the services giving rise to such claim.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 10. Governing Law and Jurisdiction */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        10. Governing Law and Jurisdiction
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        10.1 These Terms shall be governed by and construed in accordance with the
                        laws of <strong>India</strong>.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        10.2 Subject to applicable dispute resolution laws, the courts located in{" "}
                        <strong>Delhi, India</strong> shall have exclusive jurisdiction in relation
                        to any dispute arising under or in connection with these Terms.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 11. Grievance Redressal */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        11. Grievance Redressal
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        The Company has appointed a Grievance Redressal Officer to address
                        complaints, concerns, or grievances regarding the use of the Platform or
                        the interpretation of these Terms. The Grievance Officer shall acknowledge
                        complaints within <strong>24 hours</strong> of receipt and shall make best
                        efforts to resolve them within <strong>2 to 15 business days</strong>,
                        depending on the complexity of the issue.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        <strong>Name:</strong> Grievance Redressal Officer
                        <br />
                        <strong>Email:</strong>{" "}
                        <Link href="mailto:grievance@rekotax.com" underline="hover" color="#0f3d7c">
                            grievance@rekotax.com
                        </Link>
                        <br />
                        <strong>Registered Address:</strong> VAMSAG CONSULTING PRIVATE LIMITED,
                        <br />
                        KH NO 166, G/F, ST NO 8, KAPIL VIHAR ROD MUKANDPUR,
                        <br />
                        Badli (North West Delhi), North West Delhi, Delhi, Delhi, India, 110042
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 12. Modifications to Terms */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        12. Modifications to Terms
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        12.1 The Company reserves the right to modify, amend, or update these Terms
                        at any time. Any material changes will be notified via email or a prominent
                        notice on the Platform.
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        12.2 Continued use of the Platform after such modifications constitutes your
                        acceptance of the revised Terms.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* 13. Contact Information */}
                    <Typography variant="h6" sx={{ color: "#0f3d7c", mb: 1 }}>
                        13. Contact Information
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        For any questions regarding these Terms, or to exercise any legal rights,
                        you may contact us at:
                        <br />
                        <strong>Email:</strong>{" "}
                        <Link href="mailto:business@rekotax.com" underline="hover" color="#0f3d7c">
                            business@rekotax.com
                        </Link>
                        <br />
                        <strong>Registered Address:</strong> VAMSAG CONSULTING PRIVATE LIMITED,
                        <br />
                        KH NO 166, G/F, ST NO 8, KAPIL VIHAR ROD MUKANDPUR,
                        <br />
                        Badli (North West Delhi), North West Delhi, Delhi, Delhi, India, 110042
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography sx={{ fontWeight: 700 }}>
                        BY ACCESSING OR USING REKOTAX, YOU ACKNOWLEDGE THAT YOU HAVE READ,
                        UNDERSTOOD, AND AGREED TO BE LEGALLY BOUND BY THESE TERMS AND CONDITIONS.
                    </Typography>
                </Box>


            </ThemeProvider>
            <Box sx={{ mt: 0, mx: 0 }} ref={aboutRef}>
                <ClientTestimonials fullBleed />
            </Box>
            <Box sx={{ mt: -6, mx: -6 }} ref={footerRef}>
                <ContactSection />
            </Box>

            <Box sx={{ mt: 0, mx: 0 }} ref={footerRef}>
                <Footer />
            </Box>
        </Box>
    );
}

/*
USAGE:
- Save as src/components/PrivateLimitedCompanyDocs.jsx
- Add Open Sans font link to public/index.html.
- Import and render: <PrivateLimitedCompanyDocs />
*/
