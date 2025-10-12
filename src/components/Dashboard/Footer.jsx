import React from "react";
import { Box, Grid, Typography, Link, Divider, Stack } from "@mui/material";

const headSx = {
  fontWeight: 400,
  letterSpacing: 0.6,
  mb: 0.7,
  fontSize: { xs: 12, md: 14 },
  textTransform: "uppercase",
};

const linkSx = {
  display: "block",
  fontSize: { xs: 12, sm: 12, md: 14 },
  lineHeight: 1.9,
  opacity: 0.95,
  color: "#B5B7BB",
  textUnderlineOffset: 3,
  "&:hover": { opacity: 1 },
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000",
        color: "#fff",
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 8 },
        mx: "calc(50% - 50vw)",   // ← make footer span edge-to-edge
        width: "100vw",
        px: { xs: 2, sm: 3, md: 0 },  // side space on mobile/tablet only
   boxSizing: "border-box",
        // px: { xs: 2.5, sm: 3, md: 4 },
      }}
    >
      {/* Centered container */}
      <Box sx={{ maxWidth: 1200, mx: "auto"}}>
        <Grid
          container
          columnSpacing={{ xs: 0, md: 6 }}
          rowSpacing={{ xs: 4, md: 0 }}
          alignItems="flex-start"
          // keep two columns side-by-side on md and up
          sx={{ ["@media (min-width:900px)"]: { flexWrap: "nowrap" } }}
        >
          {/* LEFT: logo + pitch */}
          <Grid item xs={12} md={4} lg={3} zeroMinWidth>
            <Box
              component="img"
              src="/rekotaxlogoNew.svg"
              alt="Rekotax logo"
              sx={{ height: { xs: 36, md: 40 }, mb: { xs: 1.5, md: 2 } }}
            />
            <Typography
              sx={{
                opacity: 0.9,
                mt: 1,
                fontSize: { xs: 12, sm: 13, md: 14 },
                lineHeight: 1.7,
              }}
            >
              Rekotax helps founders and businesses
              launch, stay compliant, and scale with <br />
              confidence - one partner for registrations, <br />
              taxation, and outsourced finance.
            </Typography>
          </Grid>

          {/* RIGHT: all footer sections */}
          <Grid item xs={12} md={8} lg={9} zeroMinWidth>
            {/* Top band: Start + Other registrations + Pillars */}
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {/* Start your new business */}
              <Grid item xs={10} sm={6} md={4}>
                <Typography sx={headSx}>Start your new business</Typography>
                <Link href="/plc-registration" underline="hover" sx={linkSx}>Private Limited Company</Link>
                <Link href="/opc-registration" underline="hover" sx={linkSx}>One Person Company (OPC)</Link>
                <Link href="/llp-registration" underline="hover" sx={linkSx}>Limited Liability Partnership (LLP)</Link>
                <Link href="/partnership-firm" underline="hover" sx={linkSx}>Partnership Firm</Link>
                <Link href="/sole-proprietorship" underline="hover" sx={linkSx}>Sole Proprietorship</Link>
                <Link href="/section-and-company" underline="hover" sx={linkSx}>Section 8 Company</Link>
                <Link href="/public-company" underline="hover" sx={linkSx}>Public Limited Company</Link>
              </Grid>

              {/* Other regulatory registrations */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Other  registrations</Typography>
                <Link href="/gst-registration" underline="hover" sx={linkSx}>GST Registration</Link>
                <Link href="/msme" underline="hover" sx={linkSx}>MSME/Udyam Registration</Link>
                <Link href="/import-export-code" underline="hover" sx={linkSx}>Import Export Code (IEC)</Link>
                <Link href="/shops-and-establishment" underline="hover" sx={linkSx}>Shops &amp; Establishment</Link>
                <Link href="/professional-tax" underline="hover" sx={linkSx}>Professional Tax</Link>
                <Link href="/fssai" underline="hover" sx={linkSx}>FSSAI/Food License</Link>
                <Link href="/trademark" underline="hover" sx={linkSx}>Trade License</Link>
              </Grid>

              {/* Compliance */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Compliance</Typography>
                <Link href="/roc-compliance" underline="hover" sx={linkSx}>MCA/ROC Annual Filings</Link>
                <Link href="/gst-returns" underline="hover" sx={linkSx}>GST Returns &amp; Reconciliations</Link>
                <Link href="/tds" underline="hover" sx={linkSx}>TDS/TCS Filings</Link>
                <Link href="/payroll-compliance" underline="hover" sx={linkSx}>Payroll &amp; PF/ESI</Link>
                <Link href="/accounting" underline="hover" sx={linkSx}>Accounting &amp; Books Closure</Link>
                <Link href="/secretarial" underline="hover" sx={linkSx}>Company Secretarial Support</Link>
              </Grid>

              {/* Taxation */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Taxation</Typography>
                <Link href="/it-returns" underline="hover" sx={linkSx}>Corporate &amp; Individual ITR</Link>
                <Link href="/tax-planning" underline="hover" sx={linkSx}>Tax Planning &amp; Advisory</Link>
                <Link href="/advance-tax" underline="hover" sx={linkSx}>Advance Tax &amp; TDS Management</Link>
                <Link href="/litigation" underline="hover" sx={linkSx}>GST/Income Tax Notices</Link>
                <Link href="/transfer-pricing" underline="hover" sx={linkSx}>Transfer Pricing (as applicable)</Link>
              </Grid>

              {/* Outsourcing */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Outsourcing</Typography>
                <Link href="/virtual-cfo" underline="hover" sx={linkSx}>Virtual CFO Services</Link>
                <Link href="/bookkeeping" underline="hover" sx={linkSx}>Managed Bookkeeping</Link>
                <Link href="/compliance-desk" underline="hover" sx={linkSx}>Compliance Desk </Link>
                <Link href="/payroll" underline="hover" sx={linkSx}>End-to-End Payroll</Link>
                <Link href="/reporting" underline="hover" sx={linkSx}>MIS &amp; Board Reporting</Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Business Advisory</Typography>
                <Link href="/virtual-cfo" underline="hover" sx={linkSx}>Virtual CFO Services</Link>
                <Link href="/bookkeeping" underline="hover" sx={linkSx}>Managed Bookkeeping</Link>
                <Link href="/compliance-desk" underline="hover" sx={linkSx}>Compliance Desk (SLA based)</Link>
                <Link href="/payroll" underline="hover" sx={linkSx}>End-to-End Payroll</Link>
                <Link href="/reporting" underline="hover" sx={linkSx}>MIS &amp; Board Reporting</Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Company</Typography>
                <Link href="/about" underline="hover" sx={linkSx}>About Us</Link>
                <Link href="#principle" underline="hover" sx={linkSx}>Our Mission</Link>
                <Link href="#principle" underline="hover" sx={linkSx}>Our Vision</Link>
                <Link href="#principle" underline="hover" sx={linkSx}>Our Approach</Link>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Resources</Typography>
                <Link href="/nic-codes" underline="hover" sx={linkSx}>NIC Codes</Link>
                <Link href="/compliance-checklists" underline="hover" sx={linkSx}>Compliance Checklists</Link>
                <Link href="/stamp-duty" underline="hover" sx={linkSx}>Stamp Duty Guides</Link>
                <Link href="/blogs" underline="hover" sx={linkSx}>Blog &amp; Insights</Link>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={headSx}>Tools</Typography>
                <Link href="/tools/company-name-search" underline="hover" sx={linkSx}>Company Name Search</Link>
                <Link href="/tools/trademark-search" underline="hover" sx={linkSx}>Trademark Search</Link>
                <Link href="/tools/domain-search" underline="hover" sx={linkSx}>Domain Search</Link>
                <Link href="/tools/search-gstin-using-pan" underline="hover" sx={linkSx}>Search GSTIN using PAN</Link>
                <Link href="/tools/document-generator" underline="hover" sx={linkSx}>Document Generator</Link>
                <Link href="/templates" underline="hover" sx={linkSx}>Templates</Link>
              </Grid>
            </Grid>

            {/* Lower band: Company | Resources | Tools */}

            <Grid container spacing={{ xs: 3, md: 4 }}>

            </Grid>
          </Grid>
        </Grid>

        {/* Divider + bottom bar below... */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: { xs: 3, md: 4 } }} />
        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1.5, md: 0 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ pt: 1, pb: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: { xs: 12.5, sm: 13, md: 14 },
              opacity: 0.85,
            }}
          >
            © 2025 - VAMSAG CONSULTING PRIVATE LIMITED. ALL RIGHTS RESERVED
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            flexWrap="wrap"
          >
            <Link
              href="/terms-and-conditions"
              underline="hover"
              color="inherit"
              sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.95 }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy-policy"
              underline="hover"
              color="inherit"
              sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.95 }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund-policy"
              underline="hover"
              color="inherit"
              sx={{ fontSize: { xs: 12.5, sm: 13, md: 14 }, opacity: 0.95 }}
            >
              Refund Policy
            </Link>
          </Stack>
        </Stack>

      </Box>

    </Box>
  );
}
