import React from "react";
import { Box, Grid, Typography, TextField, Button, Collapse } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useState, useRef } from 'react';
import Footer from "../../../Dashboard/Footer";
import ContactSection from "../../../Dashboard/ContactSection";

const BrandColor = "#0f2555";


export default function OPCRegistrationHero() {

  const BrandColor = "#0f2555";
  const faqs = [
    {
      q: "Can I register a Private Limited Company as a solo founder in India?",
      a: "A Private Limited Company requires at least 2 directors. Solo founders can opt for a One Person Company (OPC) structure.",
    },
    {
      q: "Is there any minimum capital needed to start a Private Limited Company?",
      a: "No minimum capital is mandated. You can incorporate with as little as ₹1 as your authorized capital.",
    },
    {
      q: "How long does the Private Limited Company registration process take?",
      a: "Registration typically takes 7–10 business days, depending on documentation and MCA processing.",
    },
    {
      q: "What documents do I need for Private Limited Company registration?",
      a: "You need PAN, Aadhaar, address proof, utility bill, passport photo, and NOC for registered office.",
    },
    {
      q: "How is a Private Limited Company different from an LLP?",
      a: "A Pvt Ltd offers more funding options and stricter compliance, while LLP is more flexible and cost-effective.",
    },
    {
      q: "Can I choose a company name similar to an existing one?",
      a: "No, the name must be unique and distinguishable. MCA will reject names that are deceptively similar.",
    },
    {
      q: "Is GST registration required after forming a Private Limited Company?",
      a: "GST is mandatory if your turnover exceeds ₹20/40 lakh or if you deal in interstate sales or e-commerce.",
    },
    {
      q: "What if my company doesn’t start business after registration?",
      a: "You’ll still need to comply with annual filings or apply for strike-off to avoid penalties from MCA.",
    },
    {
      q: "Can I convert my Private Limited Company into a Public Company later?",
      a: "Yes, you can convert to a Public Company by following the MCA compliance process and increasing shareholders.",
    },
    {
      q: "What are the yearly compliance requirements for a Private Limited Company?",
      a: "Annual filings with ROC, income tax returns, board meetings, and financial statements are required every year.",
    },
    {
      q: "Is a company seal necessary after registration?",
      a: "No, it’s optional. But some banks or clients may still request a seal for verification.",
    },
    {
      q: "Are there tax benefits of Private Limited over other business types?",
      a: "Yes. Private Limited Companies enjoy lower tax rates and deductions unavailable to proprietorships or partnerships.",
    },
    {
      q: "Can a Private Limited Company register a trademark?",
      a: "Yes, companies can apply for trademark protection for their brand, logo, or business name.",
    },
    {
      q: "Is Udyam (Udyog Aadhaar) registration required for Pvt Ltd Companies?",
      a: "It’s optional but beneficial for MSME-related benefits like subsidies and bank loans.",
    },
    {
      q: "Can I register a Private Limited Company myself online?",
      a: "Yes, but it’s advisable to take professional help to avoid errors and ensure legal compliance.",
    },
    {
      q: "How can I check my Private Limited Company registration status?",
      a: "You can track your company status on the MCA portal using your CIN (Company Identification Number).",
    },
    {
      q: "Who is eligible to start a Private Limited Company in India?",
      a: "Any Indian citizen or NRI/foreign national with valid ID and address proof can register a Private Limited Company.",
    },
    {
      q: "How many directors are needed to start a Private Limited Company?",
      a: "A minimum of 2 directors and 2 shareholders are required to incorporate a Private Limited Company.",
    },
    {
      q: "Can I convert a Private Limited Company into another business type?",
      a: "Yes, you can convert it into an LLP, Public Company, or other entity with legal compliance steps.",
    },
    {
      q: "What is the total cost for Private Limited Company registration?",
      a: "Registration can cost ₹6,000–₹15,000 depending on professional fees, state, and services included.",
    },
    {
      q: "What are MoA & AoA in company registration?",
      a: "Memorandum of Association (MoA) and Articles of Association (AoA) define your company’s scope and rules.",
    },
    {
      q: "What is the SPICe+ form used for company registration?",
      a: "SPICe+ is a government form for online company registration, combining PAN, TAN, GST, and more in one go.",
    },
    {
      q: "Are there any legal restrictions on Private Limited Companies?",
      a: "Yes, such companies can’t publicly trade shares or raise deposits from the public. Rules apply under Companies Act.",
    },
    {
      q: "Can NRIs or Foreign Nationals register a Private Limited Company in India?",
      a: "Yes, with at least one Indian director. Foreign ownership is allowed under FDI norms for most sectors.",
    },
  ];
    const footerRef = useRef(null);

  

  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const cardData = [
    {
      icon: <PersonIcon sx={{ fontSize: 50, color: BrandColor }} />,
      title: "For sole Member/Director",
      items: [
        "PAN Card & Aadhaar Card",
        "Government-issued ID (Passport, Voter ID, or Driving License)",
        "Latest passport-sized photograph",
        "Address proof (Bank statement, electricity/water bill – not older than 2 months)",
        "Digital Signature Certificate (DSC) – Required for e-signing incorporation forms",
      ],
    },
    {
      icon: <PersonOutlineIcon sx={{ fontSize: 50, color: BrandColor }} />,
      title: "For the Nominee",
      items: [
        "PAN Card & Aadhaar Card",
        "Government-issued ID & Address Proof",
        "Recent passport-sized photograph",
        "Signed Consent Letter to act as the nominee",
      ],
    },
    {
      icon: <LocationCityIcon sx={{ fontSize: 50, color: BrandColor }} />,
      title: "For the Registered Office",
      items: [
        "Ownership proof (if owned) OR Rent Agreement (if rented)",
        "No Objection Certificate (NOC) from the property owner (for rented spaces)",
        "Recent utility bill (electricity, water, gas) as address proof",
      ],
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: BrandColor,
        color: "#fff",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
      }}
    >
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        justifyContent="space-between"
        wrap="nowrap"            // keep both columns on one row (md+)
      >
        {/* LEFT: text (narrower, like your reference) */}
        <Grid item xs={12} md={3} zeroMinWidth sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 3, lineHeight: 1.2 }}
          >
            One Person Company (OPC) Registration
          </Typography>

          <Typography sx={{ mb: 3, fontSize: "1.1rem" }}>
            Register your Private Limited Company with Rekotax — experience fast
            setup, full legal <br /> compliance, expert documentation, and dedicated
            support to launch your <br /> business effortlessly.
          </Typography>

          <ul style={{ paddingLeft: "1rem", marginBottom: "1.5rem" }}>
            <li>
              Company Registered in Just <strong>7–10 Days</strong>
            </li>
            <li>
              <strong>End-to-End Documentation:</strong> Name Approval, MOA & AOA
            </li>
            <li>
              <strong>Complete Incorporation Kit:</strong> COI, DIN, DSC, PAN & TAN
            </li>
            <li>
              <strong>Trusted</strong> by Entrepreneurs, Backed by Industry Experts
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
              ml: { md: 2 },                 // small gutter on desktop
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 3,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              maxWidth: 720,                 // keep a nice readable width
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


      <Box sx={{ py: { xs: 5, md: 10 }, px: { xs: -2, md: 8 }, backgroundColor: "#f5f7fb" }}>
        <Typography
          variant="h4"
          sx={{ color: BrandColor, fontWeight: 700, textAlign: "center", mb: 2 }}
        >
          Documents Required
        </Typography>
        <Typography
          sx={{
            mb: 6,
            maxWidth: 800,
            mx: "auto",
            color: "#555",
            fontSize: "1.05rem",
            textAlign: "center",
          }}
        >
          To register your OPC seamlessly, you’ll need to submit basic identity,
          address, and office-related documents.
        </Typography>

        {/* Force all three cards into one row */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          wrap="nowrap"
          sx={{
            flexWrap: { xs: "wrap", md: "nowrap" }, // wrap on small screens but not on md+
          }}
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
                <Box sx={{ mb: 2, textAlign: "center" }}>{card.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: BrandColor, mb: 2, textAlign: "center" }}
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
      </Box>


      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 8 },
          backgroundColor: "#f5f7fb",   // light grey background
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#6b7280",           // soft grey tone like in the screenshot
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.8rem" }, // responsive font size
            lineHeight: 1.3,
          }}
        >
          Simplified Process to Register Your <br /> OPC in India
        </Typography>

        <Typography
          sx={{
            color: "#4b5563",
            fontSize: { xs: "1rem", md: "1.15rem" },
            maxWidth: 800,
            mx: "auto",
          }}
        >
          Setting up your OPC is simpler than you think — especially with Rekotax
          guiding every step. <br />
          Here’s a streamlined breakdown of the entire process:
        </Typography>
      </Box>


      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 1, md: 2 }, backgroundColor: "#f4f6f8" }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              num: "1",
              title: "Reserve Company Name",
              desc: "Choose 3–6 unique name options that reflect your business. We’ll help you check availability and ensure it ends with “(OPC) Private Limited”."
            },
            {
              num: "2",
              title: "Get DSC & DIN",
              desc: "Apply for Digital Signature Certificate and Director Identification Number to sign and file incorporation forms online."
            },
            {
              num: "3",
              title: "Submit Incorporation Docs",
              desc: "Prepare and submit MOA, AOA, INC-3 (Nominee consent), INC-9 (Director declaration) using the SPICe+ form on the MCA portal."
            },
            {
              num: "4",
              title: "Pay Government Fees",
              desc: "Pay applicable government and stamp duties based on the state and authorized capital — we’ll calculate and manage this for you."
            },
            {
              num: "5",
              title: "Get Certificate of Incorporation",
              desc: "Registrar verifies your application and issues the Certificate of Incorporation (COI) with your unique CIN — you’re now legally registered!"
            },
            {
              num: "6",
              title: "Post-Incorporation Compliance",
              desc: "Open a current account, apply for PAN, TAN & GST, and set up accounting and compliance systems. We’ll guide you through everything."
            }
          ].map((step, index) => (
            <Grid
              item
              xs={12}
              md={4}   // force exactly 3 per row on md+
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                  p: 4,
                  width: "100%",
                  maxWidth: 320,
                  textAlign: "center",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
                  }
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: "#0f3d7c",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                  }}
                >
                  {step.num}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0f3d7c", mb: 1 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.95em", color: "#444", textAlign: "left", lineHeight: 1.6 }}
                >
                  {step.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>





      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#ffffff",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#6b7280",           // soft grey tone
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.8rem" },
            lineHeight: 1.3,
            textAlign: "center",        // ✅ center the text
          }}
        >
          Why Rekotax?
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {[
            {
              number: "1",
              text: "Fill our Registration Form & Make the Payment",
              arrow: true,
            },
            {
              number: "2",
              text: "Expert Will Call You & Receive All Necessary Documents",
              arrow: true,
            },
            {
              number: "3",
              text: "Will Create DSC & the DIN Number of Director",
              arrow: true,
            },
            {
              number: "4",
              text: "MOA and AOA Drafting & Submit",
              arrow: true,
            },
            {
              number: "5",
              text: "Your Documents will be Filed & Submitted to the ROC",
              arrow: true,
            },
            {
              number: "6",
              text: "Congratulations! You've registered your company. Certificates will be sent by post. 👍",
              arrow: false,
            },
          ].map((step, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4} // ensures exactly 3 per row on md+
              key={idx}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "#0f2555",
                  color: "#fff",
                  borderRadius: 4,
                  p: 3,
                  width: "100%",
                  maxWidth: 280,
                  height: 200,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: 16, lineHeight: 1.4, fontWeight: 500 }}
                >
                  {step.text}
                </Typography>

                {step.arrow && (
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
                  {step.number}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>


      <Box
        sx={{
          fontFamily: "'Open Sans', sans-serif",
          lineHeight: 1.7,
          maxWidth: 1400,
          mx: "auto",
          p: { xs: 2, md: 4 },
          backgroundColor: "#f4f6f8",
          color: "#333",
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: "#6b7280",           // soft grey tone
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.8rem" },
            lineHeight: 1.3,
            textAlign: "center",        // ✅ center the text
          }}
        >
          OPC Regstration: A Complete Guide
        </Typography>
        {/* Section 1 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h4" sx={{ color: "#0f3d7c", mb: 2 }}>
            What is One Person Company (OPC) Registration?
          </Typography>
          <Typography>
            One Person Company (OPC) is a unique business structure introduced under the Companies Act, 2013 that empowers a solo entrepreneur to incorporate a private limited company with limited liability. OPC blends the simplicity of sole proprietorship with the advantages of a corporate entity, including a distinct legal identity and reduced personal financial risk.
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
            Why Choose OPC?
          </Typography>
          <ul>
            <li>Operate as a single founder with full control</li>
            <li>Enjoy legal recognition and limited liability</li>
            <li>Gain higher credibility with clients, investors, and banks</li>
            <li>Easily scale into a Private Limited Company when required</li>
          </ul>
        </Box>

        {/* Section 3 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
            Types of OPC in India
          </Typography>
          <ul>
            <li><strong>OPC Limited by Shares:</strong> Liability limited to the unpaid amount on shares held.</li>
            <li><strong>OPC Limited by Guarantee with Share Capital:</strong> Liability includes unpaid share capital and a pre-decided guarantee amount.</li>
            <li><strong>OPC Limited by Guarantee without Share Capital:</strong> Operates without share capital; liability limited to guarantee only.</li>
            <li><strong>Unlimited OPC with Share Capital:</strong> Offers share capital but does not limit personal liability; higher risk.</li>
            <li><strong>Unlimited OPC without Share Capital:</strong> High-risk model with unlimited personal liability and no share issuance.</li>
          </ul>
        </Box>

        {/* Section 4 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
            Key Characteristics of an OPC
          </Typography>
          <ul>
            <li><strong>Sole Ownership, Full Control:</strong> One person holds 100% ownership and makes all decisions.</li>
            <li><strong>Nominee Appointment is Mandatory:</strong> Ensures business continuity.</li>
            <li><strong>Limited Liability:</strong> Personal assets are protected.</li>
            <li><strong>Separate Legal Entity:</strong> Company is legally distinct from the owner.</li>
            <li><strong>Professional Image:</strong> Adds credibility with "(OPC) Private Limited" tag.</li>
            <li><strong>Swift Decision-Making:</strong> No board needed for decisions.</li>
            <li><strong>Basic Compliance:</strong> Requires 2 board meetings annually, 90 days apart.</li>
            <li><strong>Bank Loan Friendly:</strong> Easier access to funding and credit.</li>
            <li><strong>Scalable:</strong> Can convert to Private Limited Company.</li>
            <li><strong>Tax Smart:</strong> Enjoy deductions and corporate tax benefits.</li>
            <li><strong>Leadership with Expertise:</strong> Appoint up to 15 directors.</li>
            <li><strong>Exclusive Ownership Rule:</strong> One OPC per person; nominee in others allowed.</li>
          </ul>
        </Box>

        {/* Section 5 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
            Benefits of OPC Registration
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Limited Liability Protection</Typography>
          <ul>
            <li>Personal savings and assets are safe from company debts.</li>
            <li>Encourages entrepreneurship with lower financial risks.</li>
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }}>Enhanced Business Credibility</Typography>
          <ul>
            <li>Improves trust with clients, suppliers, and investors.</li>
            <li>Legally structured and professionally managed.</li>
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }}>Complete Operational Control</Typography>
          <ul>
            <li>Make fast decisions independently.</li>
            <li>Quickly adapt to market changes.</li>
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }}>Tax & Financial Benefits</Typography>
          <ul>
            <li>Corporate tax rates and deductions available.</li>
            <li>Depreciation benefits lower taxable income.</li>
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }}>Easy Access to Credit & Capital</Typography>
          <ul>
            <li>Easier to open accounts and secure loans.</li>
            <li>Ready for funding and conversion to Pvt Ltd.</li>
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }}>Business Continuity & Legacy Planning</Typography>
          <ul>
            <li>Nominee ensures continuity in the founder's absence.</li>
            <li>Supports long-term growth and succession.</li>
          </ul>
        </Box>

        {/* Section 6 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
            Post-Registration Compliance
          </Typography>
          <ul>
            <li><strong>Annual Filing:</strong> File returns and financials with MCA.</li>
            <li><strong>Board Meetings:</strong> At least two per financial year.</li>
            <li><strong>Accounting Standards:</strong> Maintain proper books and registers.</li>
            <li><strong>Tax Filing:</strong> Annual income tax return and applicable TDS.</li>
            <li><strong>GST Filing:</strong> Monthly or quarterly returns (if registered).</li>
          </ul>
        </Box>

        {/* Section 7 */}
        <Box sx={{ backgroundColor: "#fff", p: 3, mb: 4, borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" sx={{ color: "#0f3d7c", mb: 2, borderBottom: "2px solid #0f3d7c", pb: 1 }}>
            Certificate of Incorporation: Your Legal Identity
          </Typography>
          <Typography>The Certificate of Incorporation (COI) from MCA includes:</Typography>
          <ul>
            <li>Company Identification Number (CIN)</li>
            <li>Date of Incorporation</li>
            <li>Company name and registration details</li>
          </ul>
          <Typography>You’ll need the COI to:</Typography>
          <ul>
            <li>Open a current bank account</li>
            <li>Apply for government licenses</li>
            <li>Enter into contracts</li>
            <li>Build brand trust and legitimacy</li>
          </ul>
        </Box>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto", my: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#6b7280",           // soft grey tone
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.8rem" },
            lineHeight: 1.3,
            bgcolor: "#fff",
            textAlign: "center",        // ✅ center the text
          }}
        >
          Comparisions
        </Typography>
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: { xs: "13px", sm: "15px" },
            tableLayout: "fixed",
            bgcolor: "#fff", // table background
            minWidth: { xs: 800, md: "100%" },
            "& th, & td": {
              border: "1px solid #ddd",
              p: "12px 15px",
              textAlign: "center",
              wordWrap: "break-word",
            },
            "& thead th": {
              backgroundColor: "#0f3d7c",
              color: "#fff", // white text for header
              fontWeight: "bold",
            },
            "& tbody td": {
              color: "#000", // force dark visible text
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
              color: "#000", // dark text for first column
            },
            "& tbody td:nth-of-type(3)": {
              backgroundColor: "rgba(15,61,124,0.10)", // highlight OPC column
              color: "#000", // keep text visible
            },
          }}
        >

          <Box component="thead">
            <Box component="tr">
              <Box component="th"> </Box>
              <Box component="th">Private Limited Company</Box>
              <Box component="th">One Person Company</Box>
              <Box component="th">Limited Liability Partnership</Box>
              <Box component="th">Partnership Firm</Box>
              <Box component="th">Proprietorship Firm</Box>
            </Box>
          </Box>

          <Box component="tbody">
            <Box component="tr">
              <Box component="td">Act</Box>
              <Box component="td">Companies Act, 2013</Box>
              <Box component="td">Companies Act, 2013</Box>
              <Box component="td">Limited Liability Partnership Act, 2008</Box>
              <Box component="td">Indian Partnership Act, 1932</Box>
              <Box component="td">No specified Act</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Registration Requirement</Box>
              <Box component="td">Mandatory</Box>
              <Box component="td">Mandatory</Box>
              <Box component="td">Mandatory</Box>
              <Box component="td">Optional</Box>
              <Box component="td">No</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Number of members</Box>
              <Box component="td">2 – 200</Box>
              <Box component="td">Only 1</Box>
              <Box component="td">2 – Unlimited</Box>
              <Box component="td">2 – 50</Box>
              <Box component="td">Only 1</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Separate Legal Entity</Box>
              <Box component="td">Yes</Box>
              <Box component="td">Yes</Box>
              <Box component="td">Yes</Box>
              <Box component="td">No</Box>
              <Box component="td">No</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Liability Protection</Box>
              <Box component="td">Limited</Box>
              <Box component="td">Limited</Box>
              <Box component="td">Limited</Box>
              <Box component="td">Unlimited</Box>
              <Box component="td">Unlimited</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Statutory Audit</Box>
              <Box component="td">Mandatory</Box>
              <Box component="td">Mandatory</Box>
              <Box component="td">Dependent</Box>
              <Box component="td">Not mandatory</Box>
              <Box component="td">Not mandatory</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Ownership Transferability</Box>
              <Box component="td">Yes</Box>
              <Box component="td">No</Box>
              <Box component="td">Yes</Box>
              <Box component="td">No</Box>
              <Box component="td">No</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Uninterrupted Existence</Box>
              <Box component="td">Yes</Box>
              <Box component="td">Yes</Box>
              <Box component="td">Yes</Box>
              <Box component="td">No</Box>
              <Box component="td">No</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Foreign Participation</Box>
              <Box component="td">Allowed</Box>
              <Box component="td">Not Allowed</Box>
              <Box component="td">Allowed</Box>
              <Box component="td">Not Allowed</Box>
              <Box component="td">Not Allowed</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Tax Rates</Box>
              <Box component="td">Moderate</Box>
              <Box component="td">Moderate</Box>
              <Box component="td">High</Box>
              <Box component="td">High</Box>
              <Box component="td">Low</Box>
            </Box>

            <Box component="tr">
              <Box component="td">Statutory Compliance</Box>
              <Box component="td">High</Box>
              <Box component="td">Moderate</Box>
              <Box component="td">Moderate</Box>
              <Box component="td">Less</Box>
              <Box component="td">Less</Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* FAQ Section */}
   <Box sx={{ bgcolor: "#eef2f7", py: { xs: 4, md: 6 }, px: { xs: 2, md: 0 } }}>
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          bgcolor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          p: { xs: 2, md: 3 },
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#0f2555", fontWeight: 700, textAlign: "center", mb: 2 }}
        >
          Frequently Asked Questions (FAQs)
        </Typography>

        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Box
              key={idx}
              sx={{
                borderBottom: "1px solid #e6e9ef",
                py: 2,
              }}
            >
              <Box
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 600, color: "#0f2555" }}
                >
                  {faq.q}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#0f2555",
                    width: 24,
                    textAlign: "center",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {isOpen ? "−" : "+"}
                </Typography>
              </Box>

              <Collapse in={isOpen} timeout="auto" unmountOnExit={false}>
                <Box
                  sx={{
                    mt: 1.5,
                    bgcolor: "#fafbff",
                    border: "1px solid #e9ecf5",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "0.95rem", color: "#111" }}>
                    {faq.a}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Box>
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
