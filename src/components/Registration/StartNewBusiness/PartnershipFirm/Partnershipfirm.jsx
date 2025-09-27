import React from "react";
import { useRef, useState } from "react";
import Footer from "../../../Dashboard/Footer";
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
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ContactSection from "../../../Dashboard/ContactSection";
const theme = createTheme({
  typography: {
    fontFamily:
      'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h6: { fontWeight: 700 },
  },
  palette: {
    primary: { main: "#0f3d7c" },
    background: { default: "transparent" },
  },
  shape: { borderRadius: 12 },
});

const cardData = [
  {
    title: "Mandatory Documents for Seamless Registration",
    items: [
      "Partnership Deed detailing roles, capital, and profit-sharing",
      "Self-attested PAN card of each partner",
      "Residential address proof (Aadhaar, Voter ID, Passport)",
      "Business address proof of the registered office",
      "Recent passport-size photographs of all partners",
    ],
  },
  {
    title: "Supporting Documents Based on Business Setup",
    items: [
      "Rent agreement for business premises",
      "No Objection Certificate (NOC) from landlord",
      "Latest utility bill (electricity, water, etc.)",
      "Recent bank statements of all partners",
    ],
  },
  {
    title: "Key Clauses Your Partnership Deed Must Cover",
    items: [
      "Names and addresses of all partners",
      "Nature and scope of the business",
      "Capital contribution by each partner",
      "Profit and loss sharing ratio",
      "Defined roles, duties, and responsibilities of partners",
    ],
  },
];

export default function Partnershipfirm() {
  const BrandColor = "#0f3d7c";
  const footerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

const faqs = [
  {
    q: "Is it mandatory to register a Partnership Firm in India?",
    a: "No, registration is not mandatory under the Indian Partnership Act, 1932. However, registration provides key legal benefits such as the ability to sue or enforce contracts.",
  },
  {
    q: "How many partners are required to start a Partnership Firm?",
    a: "A minimum of 2 and a maximum of 50 partners can form a Partnership Firm under Indian law.",
  },
  {
    q: "What documents are required for Partnership Firm Registration?",
    a: "Key documents include PAN, Aadhaar, address proof of partners, photos, rental agreement or ownership proof of business address, and the signed Partnership Deed.",
  },
  {
    q: "Can a Partnership Firm be converted into an LLP or Private Limited Company?",
    a: "Yes, a registered Partnership Firm can be legally converted into an LLP or Private Limited Company by following proper procedures and compliance.",
  },
  {
    q: "What are the tax implications for Partnership Firms?",
    a: "Partnership Firms are taxed at a flat rate of 30% plus applicable surcharge and cess. Partners’ shares in profit are exempt from tax in their individual hands.",
  },
  {
    q: "Can a partnership firm own property in its name?",
    a: "A registered partnership firm can own property in the name of the firm. However, for unregistered firms, ownership is typically reflected in the name of the partners unless clearly documented otherwise.",
  },
  {
    q: "Can a minor become a partner in a Partnership Firm?",
    a: "A minor cannot become a full-fledged partner but may be admitted to the benefits of an existing partnership firm with the consent of all partners.",
  },
  {
    q: "What happens to the firm on the retirement or death of a partner?",
    a: "Unless otherwise agreed in the partnership deed, the firm is dissolved on the death or retirement of a partner. However, it may continue if remaining partners choose to carry on under the same name.",
  },
  {
    q: "Can foreign nationals or NRIs become partners in a Partnership Firm?",
    a: "No, foreign nationals and NRIs are not allowed to become partners in a traditional Partnership Firm. They may, however, invest in LLPs with prior government approval under FDI norms.",
  },
  {
    q: "Is there an annual compliance requirement for Partnership Firms?",
    a: "While there's no ROC filing like companies, registered firms must file ITR annually and may need to comply with TDS, GST, and state-level regulations depending on their turnover and operations.",
  },
  {
    q: "What is the difference between a Registered and Unregistered Partnership Firm?",
    a: "A registered firm enjoys legal recognition and the ability to enforce contracts in court. Unregistered firms face limitations, including the inability to sue third parties or partners for disputes arising under the partnership.",
  },
];


  return (
    <Box
      sx={{
        backgroundColor: BrandColor,
        color: "#fff",
        py: { xs: 6, md: 10 },
        //  px: { xs: 2, md: 1 },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Hero compo */}
        <Grid
          container
          spacing={6}
          alignItems="flex-start"
          justifyContent="space-between"
          wrap="nowrap" // keep both columns on one row (md+)
        >
          {/* LEFT: text (narrower, like your reference) */}
          <Grid item xs={12} md={3} zeroMinWidth sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 8, lineHeight: 1.2 }}
            >
              Partnership Firm Registration 
            </Typography>

            <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
            Register your Partnership Firm with Rekotax — experience fast setup, <bt/>
            full legal <br/>compliance,
             expert documentation, and dedicated support <br/> to launch your business effortlessly.
            </Typography>

            <ul style={{ paddingLeft: "1rem", marginBottom: "1.5rem" }}>
              <li>
                Company Registered in Just <strong>7–10 Days</strong>
              </li>
              <li>
                <strong>End-to-End Documentation:</strong> Name Approval, MOA &
                AOA
              </li>
              <li>
                <strong>Complete Incorporation Kit:</strong> COI, DIN, DSC, PAN
                & TAN
              </li>
              <li>
                <strong>Trusted</strong> by Entrepreneurs, Backed by Industry
                Experts
              </li>
              <li>
                Handled by <strong>MCA-Registered Professionals</strong>
              </li>
            </ul>

            <Box
              sx={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                p: 2,
                maxWidth: 320,
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
                <strong>Fastest Company Registration in India</strong>
                <br />
                MCA filing in 7 days or full refund guaranteed.
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT: form (wider, like your reference) */}
          <Grid item xs={12} md={9} zeroMinWidth sx={{ minWidth: 0 }}>
            <Box
              sx={{
                ml: { md: 2 }, // small gutter on desktop
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                maxWidth: 720, // keep a nice readable width
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#d1d5db", textAlign: "center" }}
              >
                Get Expert Consultation
              </Typography>

              <TextField
                variant="filled"
                fullWidth
                label="Name*"
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />
              <TextField
                variant="filled"
                fullWidth
                label="Mobile No.*"
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />
              <TextField
                variant="filled"
                fullWidth
                label="Your email*"
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />
              <TextField
                variant="filled"
                fullWidth
                label="Message"
                multiline
                minRows={3}
                InputProps={{ style: { background: "rgba(255,255,255,0.1)" } }}
              />

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#000",
                  borderRadius: 10,
                  px: 6,
                  alignSelf: "center",
                  ":hover": { backgroundColor: "#222" },
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Cards grid */}
        <Box
          sx={{
            // py: { xs: 5, md: 10 },
            // px: { xs: -10, md: 8 },
            backgroundColor: "#f5f7fb",
          }}
        >
          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Documents Required
          </Typography>
          <Typography
            variant="h6" // smaller subtitle like the screenshot
            sx={{
              color: "#0f3d7c",
              fontWeight: 400,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
           To register your partnership seamlessly, 
           you’ll need to submit basic identity, address, and office-related documents.
          </Typography>
          <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              wrap="nowrap"
              sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
            >
              {cardData.map((card) => (
                <Grid
                  item
                  key={card.title}
                  xs={12}
                  md={4}
                  sx={{
                    flex: { xs: "1 1 100%", md: "1 1 33.33%" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: 3,
                      p: 4,
                      width: "100%",
                      maxWidth: 360,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: BrandColor,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <ul
                      style={{
                        textAlign: "left",
                        paddingLeft: "1.2rem",
                        color: "#333",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {card.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "8px" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 8, md: 10 }, // top spacing to clear navbar or previous section
              mb: { xs: 6, md: 8 }, // space below before next content
              px: { xs: 2, md: 0 }, // side padding on small screens
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#4A5A7D", // main heading color
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Simplified Process to Register Your <br /> Partnership Firm in India
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#0f3d7c", // subtitle color
                fontWeight: 400,
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
             Setting up your Partnership Firm is simpler than you think — especially with Rekotax guiding every step. 
Here’s a streamlined breakdown of the entire process:
            </Typography>
          </Box>
       <Box
  sx={{
    backgroundColor: "#f4f6f8",
    py: { xs: 6, md: 8 },
    px: { xs: 2, md: 4 },
  }}
>
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      sx={{
        color: "#0f3d7c",
        fontWeight: 700,
        textAlign: "center",
        mb: 6,
      }}
    >
      Partnership Firm Registration Process
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {[
        {
          number: "1",
          title: "Draft the Partnership Deed",
          description:
            "Prepare a clear and detailed agreement specifying the roles, responsibilities, capital contributions, and profit-sharing ratio among partners.",
        },
        {
          number: "2",
          title: "Obtain Stamp Paper & Notarise",
          description:
            "Execute the deed on appropriate stamp paper as per state laws and get it notarised by a public notary for legal validation.",
        },
        {
          number: "3",
          title: "Apply for PAN of the Firm",
          description:
            "Submit an application to obtain a Permanent Account Number (PAN) in the name of the partnership firm from the Income Tax Department.",
        },
        {
          number: "4",
          title: "Register with Registrar of Firms",
          description:
            "File the Partnership Deed along with Form 1 and required documents to get your firm officially registered (optional but recommended).",
        },
        {
          number: "5",
          title: "Open a Bank Account",
          description:
            "Open a current account in the name of the partnership firm using the PAN card, deed, and registration certificate (if obtained).",
        },
        {
          number: "6",
          title: "Apply for Other Licenses",
          description:
            "Depending on your business activity and location, apply for GST registration, MSME certificate, shop & establishment license, etc.",
        },
      ].map((step, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "16px",
            width: { xs: "100%", sm: "45%", md: "30%" },
            p: 4,
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
              backgroundColor: "#0f3d7c",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2em",
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

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#0f3d7c", mb: 1 }}
          >
            {step.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.95em",
              color: "#333",
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            {step.description}
          </Typography>
        </Box>
      ))}
    </Box>
  </Container>
</Box>


          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Our Approach
          </Typography>
          <Box
            sx={{
              backgroundColor: "transparent",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    num: 1,
                    text: "Fill our Registration Form & Make the Payment",
                  },
                  {
                    num: 2,
                    text: "Expert Will Call You & Receive All Necessary Documents",
                  },
                  {
                    num: 3,
                    text: "Will Create DSC & the DIN Number of Director",
                  },
                  {
                    num: 4,
                    text: "MOA and AOA Drafting & Submit",
                  },
                  {
                    num: 5,
                    text: "Your Documents will be Filed & Submitted to the ROC",
                  },
                  {
                    num: 6,
                    text: "Congratulations! You've registered your company. Certificates will be sent by post. 👍",
                  },
                ].map((step) => (
                  <Grid
                    key={step.num}
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 cards per row on md+ screens
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#0f2555",
                        color: "#fff",
                        borderRadius: 4,
                        width: 280,
                        height: 200,
                        p: 3,
                        position: "relative",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
                        {step.text}
                      </Typography>

                      {/* Arrow except for the last card */}
                      {step.num !== 6 && (
                        <Typography
                          sx={{
                            mt: 2,
                            fontSize: 20,
                            fontWeight: "bold",
                            display: "inline-block",
                          }}
                        >
                          →
                        </Typography>
                      )}

                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 20,
                          fontSize: 100,
                          fontWeight: "bold",
                          color: "#b5b7bb",
                          opacity: 0.2,
                          pointerEvents: "none",
                        }}
                      >
                        {step.num}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Why Rekotax ?
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {[
                  {
                    icon: "fa-certificate",
                    text: "Govt. of India Authorized & Trusted",
                  },
                  {
                    icon: "fa-users",
                    text: "Trusted by 1,000+ Founders Nationwide",
                  },
                  {
                    icon: "fa-award",
                    text: "ISO-Certified for Quality Excellence",
                  },
                  {
                    icon: "fa-shield-alt",
                    text: "Bank-Level Data Security You Can Rely On",
                  },
                  {
                    icon: "fa-user-tie",
                    text: "Guided by Experienced Legal & Tax Experts",
                  },
                  { icon: "fa-clock", text: "Always On-Time. Every Time." },
                  {
                    icon: "fa-hands-helping",
                    text: "One-on-One Support from a Dedicated Expert",
                  },
                  {
                    icon: "fa-headset",
                    text: "Fast, Friendly & Always Available Support",
                  },
                  {
                    icon: "fa-rupee-sign",
                    text: "Premium Service at Startup-Friendly Prices",
                  },
                ].map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4} // 3 per row on md+
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 340,
                        backgroundColor: "#0f2555",
                        color: "white",
                        borderRadius: 2,
                        p: 2.5,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#b5b7bb",
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        <i
                          className={`fas ${item.icon}`}
                          style={{ color: "#0f2555", fontSize: 20 }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: 15,
                          fontWeight: 600,
                          lineHeight: 1.4,
                          flex: 1,
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Partnership Registration: A Complete Guide
          </Typography>
  <Box
  sx={{
    backgroundColor: "#f4f6f8",
    py: { xs: 6, md: 8 },
    px: { xs: 2, md: 4 },
  }}
>
  <Container maxWidth="md">
    {/* Section 1 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h4" sx={{ color: "#0f3d7c", mb: 2, fontWeight: 700 }}>
        What is Partnership Firm Registration?
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8 }}>
        A partnership firm is a popular form of business in India where two or more individuals join hands
        to carry out a business with a view to earn profit. Governed by the Indian Partnership Act, 1932,
        this structure allows partners to combine their resources, expertise, and efforts under a mutually
        agreed partnership deed.
      </Typography>
    </Box>

    {/* Section 2 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Why Choose a Partnership Firm?
      </Typography>
      <Box
        component="ul"
        sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}
      >
        <Box component="li">Simple and cost-effective to set up</Box>
        <Box component="li">Shared responsibilities and pooled resources</Box>
        <Box component="li">Minimal regulatory compliance compared to companies</Box>
        <Box component="li">Faster decision-making with mutual understanding</Box>
        <Box component="li">Ideal for small and medium-sized businesses</Box>
      </Box>
    </Box>

    {/* Section 3 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Types of Partnership Firms
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li">
          <strong>Registered Partnership Firm:</strong> Registered with the Registrar of Firms for legal recognition and protection.
        </Box>
        <Box component="li">
          <strong>Unregistered Partnership Firm:</strong> Not registered but still a valid business form; however, it lacks certain legal rights.
        </Box>
      </Box>
    </Box>

    {/* Section 4 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Key Features of a Partnership Firm
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li"><strong>Minimum 2 Partners:</strong> Can have up to 50 partners.</Box>
        <Box component="li"><strong>Mutual Agency:</strong> Each partner acts as both agent and principal.</Box>
        <Box component="li"><strong>Profit Sharing:</strong> Profits and losses are shared as per the agreement.</Box>
        <Box component="li"><strong>No Minimum Capital:</strong> No specific requirement for minimum capital contribution.</Box>
        <Box component="li"><strong>Unlimited Liability:</strong> Partners are jointly and severally liable for business obligations.</Box>
        <Box component="li"><strong>Flexibility:</strong> Decision-making is quick and flexible with mutual consent.</Box>
      </Box>
    </Box>

    {/* Section 5 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Advantages of Partnership Firm Registration
      </Typography>

      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.8, mb: 1 }}>
        Ease of Formation
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 2 }}>
        <Box component="li">Can be started with just a partnership deed.</Box>
        <Box component="li">Optional registration process with Registrar of Firms.</Box>
      </Box>

      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.8, mb: 1 }}>
        Better Resource Pooling
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 2 }}>
        <Box component="li">Combines diverse skills, experience, and capital of all partners.</Box>
        <Box component="li">Helps in effective decision-making and operational strength.</Box>
      </Box>

      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.8, mb: 1 }}>
        Operational Flexibility
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 2 }}>
        <Box component="li">Partners enjoy complete freedom to define terms in the deed.</Box>
        <Box component="li">Suitable for dynamic business environments.</Box>
      </Box>

      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.8, mb: 1 }}>
        Lower Compliance Burden
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 2 }}>
        <Box component="li">No requirement to audit books if turnover is below threshold.</Box>
        <Box component="li">Lesser legal formalities compared to companies and LLPs.</Box>
      </Box>

      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.8, mb: 1 }}>
        Quick Decision Making
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li">Direct involvement of partners in daily operations enables faster execution.</Box>
        <Box component="li">No need to wait for board resolutions or shareholder meetings.</Box>
      </Box>
    </Box>

    {/* Section 6 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Essential Documents for Registration
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li"><strong>Partnership Deed:</strong> A written agreement defining roles, duties, and profit-sharing.</Box>
        <Box component="li"><strong>PAN Cards of Partners:</strong> Self-attested PAN copies of all partners.</Box>
        <Box component="li"><strong>Address Proof of Partners:</strong> Aadhaar Card, Voter ID, Passport, etc.</Box>
        <Box component="li"><strong>Registered Office Proof:</strong> Latest utility bill, rent agreement, or ownership proof.</Box>
        <Box component="li"><strong>Passport Size Photographs:</strong> Recent photographs of all partners.</Box>
      </Box>
    </Box>

    {/* Section 7 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Additional Documents (If Applicable)
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li"><strong>Rent Agreement:</strong> If the office space is rented.</Box>
        <Box component="li"><strong>NOC from Landlord:</strong> For using the rented premises as office.</Box>
        <Box component="li"><strong>Bank Statements:</strong> Financial proof of all partners.</Box>
        <Box component="li"><strong>GST Registration (if required):</strong> For businesses crossing threshold limit or opting voluntarily.</Box>
      </Box>
    </Box>

    {/* Section 8 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        What Should the Partnership Deed Include?
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li">Full names and addresses of all partners</Box>
        <Box component="li">Business name and nature of operations</Box>
        <Box component="li">Capital contribution from each partner</Box>
        <Box component="li">Profit/loss sharing ratio among partners</Box>
        <Box component="li">Duties, rights, and obligations of partners</Box>
        <Box component="li">Duration and dissolution clauses</Box>
        <Box component="li">Dispute resolution mechanism</Box>
      </Box>
    </Box>

    {/* Section 9 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Post-Registration Compliance
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li"><strong>Income Tax Filing:</strong> File income tax returns annually in the firm's name.</Box>
        <Box component="li"><strong>TDS Compliance:</strong> If applicable, deduct and file TDS returns.</Box>
        <Box component="li"><strong>GST Returns:</strong> Monthly/quarterly returns if registered under GST.</Box>
        <Box component="li"><strong>Books of Accounts:</strong> Maintain proper records of transactions and finances.</Box>
        <Box component="li"><strong>Bank Account:</strong> Operate a dedicated business current account.</Box>
      </Box>
    </Box>

    {/* Section 10 */}
    <Box sx={{ backgroundColor: "#fff", p: 4, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <Typography variant="h5" sx={{ color: "#0f3d7c", fontWeight: 700, borderBottom: "2px solid #0f3d7c", pb: 1, mb: 2 }}>
        Registration Certificate: Your Business Identity
      </Typography>
      <Typography sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, mb: 2 }}>
        If you register your partnership firm with the Registrar of Firms, you’ll receive a Certificate of Registration which acts as legal proof of your firm’s existence. This document is useful when:
      </Typography>
      <Box component="ul" sx={{ color: "#333", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, pl: 3, mb: 0 }}>
        <Box component="li">Opening a business bank account</Box>
        <Box component="li">Applying for business loans</Box>
        <Box component="li">Participating in government tenders</Box>
        <Box component="li">Gaining legal protection under the Indian Partnership Act</Box>
      </Box>
    </Box>
  </Container>
</Box>


          <Box sx={{ width: "100%", overflowX: "auto", my: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#6b7280", // soft grey tone
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2rem", md: "2.8rem" },
                lineHeight: 1.3,
                bgcolor: "#fff",
                textAlign: "center", // ✅ center the text
              }}
            >
              Comparisons
            </Typography>
            <Box sx={{ px: { xs: 2, md: 6 }, my: 4 }}>
              <Box
                component="table"
                sx={{
                  px: { xs: 2, md: 4 },
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: { xs: "13px", sm: "15px" },
                  tableLayout: "fixed",
                  bgcolor: "#fff",
                  minWidth: { xs: 800, md: "100%" },
                  "& th, & td": {
                    border: "1px solid #ddd",
                    p: "12px 15px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    color: "#333", // dark body text
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  },
                  "& thead th": {
                    backgroundColor: "#0f3d7c",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                  "& tbody tr:nth-of-type(even)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "& tbody tr:nth-of-type(odd)": {
                    backgroundColor: "#ffffff",
                  },
                  "& tbody td:first-of-type": {
                    textAlign: "left",
                    fontWeight: 600,
                    backgroundColor: "#f3f3f3",
                  },
                  "& tbody td:nth-of-type(3)": {
                    backgroundColor: "rgba(15,61,124,0.10)", // highlight Private Limited column
                    color: "#000",
                  },
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th"> </Box>
                    <Box component="th">One Person Company</Box>
                    <Box component="th">Private Limited Company</Box>
                    <Box component="th">Proprietorship Firm</Box>
                    <Box component="th">Limited Liability Partnership</Box>
                    <Box component="th">Partnership Firm</Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  <Box component="tr">
                    <Box component="td">Act</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">Companies Act, 2013</Box>
                    <Box component="td">No Specified Act</Box>
                    <Box component="td">
                      Limited Liability Partnership Act, 2008
                    </Box>
                    <Box component="td">Indian Partnership Act, 1932</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Registration Requirement</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Optional</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Number of members</Box>
                    <Box component="td">Only 1</Box>
                    <Box component="td">2 – 200</Box>
                    <Box component="td"> Only 1</Box>
                    <Box component="td">2 – Unlimited</Box>
                    <Box component="td">2 – 50</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Separate Legal Entity</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Liability Protection</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                    <Box component="td">Limited</Box>
                    <Box component="td">Unlimited</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Audit</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Mandatory</Box>
                    <Box component="td">Not mandatory</Box>
                    <Box component="td">Dependent</Box>
                    <Box component="td">Not mandatory</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Ownership Transferability</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Uninterrupted Existence</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                    <Box component="td">Yes</Box>
                    <Box component="td">No</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Foreign Participation</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                    <Box component="td">Allowed</Box>
                    <Box component="td">Not Allowed</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Tax Rates</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Low</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Low</Box>
                  </Box>

                  <Box component="tr">
                    <Box component="td">Statutory Compliance</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">High</Box>
                    <Box component="td">Less</Box>
                    <Box component="td">Moderate</Box>
                    <Box component="td">Less</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="h3" // bigger headline like the screenshot
            sx={{
              fontWeight: 700,
              color: "#4A5A7D", // headline color
              mt: { xs: 6, md: 10 },
              mb: 2,
              textAlign: "center",
            }}
          >
            Get Expert Consultation
          </Typography>

          {/*F&A Section*/}
      <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: { xs: 6, md: 8 },
        fontFamily: "'Open Sans', sans-serif",
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#0f2555",
          mb: 5,
          textAlign: "center",
        }}
      >
        Frequently Asked Questions (FAQs)
      </Typography>

      {faqs.map((faq, index) => (
        <Box
          key={index}
          onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            overflow: "hidden",
            cursor: "pointer",
            backgroundColor:
              activeIndex === index ? "#e9efff" : "#f6f8fc",
            transition: "background-color 0.3s ease",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2.5,
              position: "relative",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#0f2555",
              "&::after": {
                content: `"${activeIndex === index ? "−" : "+"}"`,
                position: "absolute",
                right: 24,
                fontSize: "1.5rem",
                fontWeight: 700,
                transition: "transform 0.3s ease",
              },
            }}
          >
            {faq.q}
          </Box>

          {activeIndex === index && (
            <Box
              sx={{
                px: 3,
                pb: 3,
                fontSize: "1rem",
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              {faq.a}
            </Box>
          )}
        </Box>
      ))}
    </Box>

          <ContactSection />
          <Footer />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

/*
USAGE:
- Save as src/components/PrivateLimitedCompanyDocs.jsx
- Add Open Sans font link to public/index.html.
- Import and render: <PrivateLimitedCompanyDocs />
*/
