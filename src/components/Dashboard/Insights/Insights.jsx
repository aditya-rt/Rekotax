// InsightsCarousel.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Footer from "../Footer";
import ContactSection from "../ContactSection";
import ClientTestimonials from "../ClientTestimonials";
import blog1 from "../../../Data/Blog/blog1";
import blog2 from "../../../Data/Blog/blog2";
import blog3 from "../../../Data/Blog/blog3";


// Demo data - replace with your API/props
// const ITEMS = [
//   // { title: "Spotting India’s PRIME innovation moment", excerpt: "The theme of this report, PRIME: Promoting Resilient, Inclusive Manufacturing & Employment, reflects the urgent need to build a...", tag: "Industry", readTime: "4 minute read", image: "/who1.png", href: "#" },
//   // { title: "Wheelwatch", excerpt: "Wheelwatch brings you a sharp quarterly view of the changing contours of the automotive industry.", tag: "Industry", readTime: "4 minute read", image: "/who2.png", href: "#" },
//   // { title: "The business imperative for Agentic AI", excerpt: "Agentic AI enables businesses to operate efficiently by automating front, middle and back-office functions, including customer...", tag: "Industry", readTime: "4 minute read", image: "/who2.png", href: "#" },
//   // { title: "Global Capability Centers (GCCs)", excerpt: "Deloitte offers service portfolio to bring innovation, deliver value, and lead the evolution of GCCs from resource centers to Centers of...", tag: "Collection", readTime: "6 minute read", image: "/who3.png", href: "#" },
//   // { title: "India Budget Highlights", excerpt: "Top changes impacting businesses and consumers this fiscal...", tag: "Tax", readTime: "5 minute read", image: "/who1.png", href: "#" },
//   // { title: "ESG and Compliance in 2025", excerpt: "How mid-market firms can keep pace with evolving ESG norms...", tag: "ESG", readTime: "3 minute read", image: "/who2.png", href: "#" },
// ];

const ALL_BLOGS = [...blog1, ...blog2,...blog3];
const ITEMS = ALL_BLOGS.map(b => ({
  title: b.title,
  excerpt: b.excerpt,
  tag: b.tag || "Insight",
  // readTime: b.readTime || "5 minute read",
  image: b.image,
  href: `/insights/${b.slug}`,
}));

const safeHref = (href) => (href && href !== "#" ? href : undefined);

export default function Insights({

  items = ITEMS,
  showExtras = true,
  showArrows = true,
}) {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));   // <600
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));       // >=900
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));       // >=1536
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  // Responsive items per view
  const itemsPerView = isXlUp ? 4 : isMdUp ? 3 : isSm ? 2 : 1;

  const [start, setStart] = useState(0);

  const maxStart = Math.max(0, items.length - itemsPerView);
  const canPrev = start > 0;
  const canNext = start < maxStart;

  useEffect(() => {
    if (start > maxStart) setStart(maxStart);
  }, [maxStart, start]);

  const arrowSx = {
    bgcolor: "#fff",
    border: "1px solid #e8edf6",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    "&:hover": { bgcolor: "#f8fafc" },
    width: 38,
    height: 38,
    "& .MuiSvgIcon-root": { fontSize: 18, color: "#111827" },
    "&:focus-visible": {
      outline: "2px solid #3b82f6",
      outlineOffset: 2,
    },
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!canPrev) return;
    setStart((s) => s - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!canNext) return;
    setStart((s) => s + 1);
  };

  const cardWidthPct = 100 / itemsPerView;
  const translate = useMemo(() => `-${start * cardWidthPct}%`, [start, cardWidthPct]);

  return (
    <Box
      component="section"

      sx={{
        fontFamily: "'Open Sans', sans-serif",
        // (optional hard-force)
        "& *": { fontFamily: "'Open Sans', sans-serif" },
        bgcolor: "#fff",
        // py: { xs: 5, sm: 6.5, md: 8 },
        // px: { xs: 1.5, sm: 2.5, md: 3 },
        position: "relative",
        overflowX: "hidden",
      }}

    >

      <Box
        component="section"
        sx={{
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: "52vh", md: "60vh" },
          bgcolor: "transparent",
          backgroundImage: `
    radial-gradient(1000px 600px at 76% 60%, rgba(2,54,145,0.20), rgba(2,54,145,0) 60%),
    radial-gradient(800px 420px at 20% 10%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%),
    linear-gradient(118deg, #0f2555 0%, #023691 100%)
  `,
          backgroundBlendMode: "screen, normal, normal",
          backgroundRepeat: "no-repeat",

          // *** offset for fixed navbar ***
          pt: { xs: 12, md: 14 }, // 12*8=96px, 14*8=112px
          mt: 0,
        }}

      >
        {/* inner container */}
        <Box
          sx={{
            maxWidth: 1280,
            mx: "auto",
            px: { xs: 2, sm: 3, md: 6 },
            // py: { xs: 6, md: 10 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: { md: -0.5 },
              // big, elegant headline
              fontSize: { xs: 28, sm: 40, md: 56, lg: 64 },

            }}
          >
            The latest from Rekotax
          </Typography>

          <Typography
            sx={{
              mt: { xs: 1.5, md: 0.5 },
              fontSize: { xs: 16, sm: 20, md: 24 },
              opacity: 0.9,
            }}
          >
            Blog & Insights 
          </Typography>
        </Box>
      </Box>


      {/* Slightly smaller container for laptops */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: 1100, lg: 1200, xl: 1280 },
          mx: "auto",
          position: "relative",
        }}
      >
        {/* <Typography
          component="h2"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: { xs: 24, sm: 32, md: 40 },
            lineHeight: 1.15,
            color: "#111827",
            mb: { xs: 3, sm: 4.5 },
          }}
        >
          {title}
        </Typography> */}

        {/* Viewport */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {/* Track */}
          <Box
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: `calc(100% / ${itemsPerView})`,
              gap: { xs: 1.25, sm: 2, md: 2.5 }, // a bit tighter
              transform: `translateX(${translate})`,
              transition: "transform 400ms ease",
              pb: 1,
              mt:6,
              minWidth: "100%",
            }}
            aria-live="polite"
          >
            {items.map((it, i) => (
              <Box key={i} sx={{ minWidth: 0 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e6ebf2",
                    display: "flex",
                    flexDirection: "column",
                    // Consistent modest heights on laptop sizes
                    minHeight: { xs: 0, md: 300, lg: 310 },
                  }}
                >
                  <CardActionArea
                    href={safeHref(it.href)}
                    onClick={(e) => {
                      if (!safeHref(it.href)) e.preventDefault();
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "stretch",
                      flexDirection: "column",
                      height: "100%",
                      "&:hover .thumb": { transform: "translateY(-2px)" },
                    }}
                  >
                    <CardContent
                      sx={{

                        pt: { xs: 1.5, sm: 2, md: 2 },
                        pb: 0,
                        px: { xs: 1.5, sm: 2, md: 2 },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#111827",
                          mb: 0.75,
                          fontSize: { xs: 15.5, sm: 17, md: 18 },
                        }}
                      >
                        {it.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#4b5563",
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: { xs: 54, sm: 60, md: 60 }, // keep compact
                          lineHeight: 1.6,
                          fontSize: { xs: 13, sm: 13.5, md: 14 },
                        }}
                      >
                        {it.excerpt}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#111827",
                          fontWeight: 600,
                          fontSize: { xs: 11.5, sm: 12, md: 12.5 },
                          mb: 1.5,
                        }}
                      >
                        {it.tag} <span style={{ color: "#9ca3af" }}>|</span>{" "}
                        <span style={{ color: "#4b5563", fontWeight: 500 }}>
                          {it.readTime}
                        </span>
                      </Typography>
                    </CardContent>

                    {/* Thumbnail - shallower on md+ to reduce card height */}
                    <Box
                      className="thumb"
                      sx={{
                        mt: 1.5,
                        mx: { xs: 1.5, sm: 2 },
                        mb: 2,
                        borderRadius: 2,
                        overflow: "hidden",
                        transition: "transform .2s ease",
                        position: "relative",
                        width: "calc(100% - 24px)",
                        // height: 0,
                        // pb: { xs: "60%", sm: "56%", md: "50%" }, // 5:2.5-ish on md+
                        // backgroundColor: "#000",
                        aspectRatio: { xs: "3 / 2", sm: "16 / 9", md: "21 / 9" },
                      }}
                    >
                      <Box
                        component="img"
                        src={it.image}
                        alt={it.title}
                        width={800}
                        height={450}
                        sx={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        loading="lazy"
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Controls */}
        {showArrows && (isMdUp ? (
          <>
            <IconButton
              aria-label="Previous"
              onClick={handlePrev}
              disabled={!canPrev}
              sx={{
                ...arrowSx,
                position: "absolute",
                top: "50%",
                left: { md: "-24px", lg: "-32px" }, // slightly tighter
                transform: "translateY(-50%)",
                opacity: canPrev ? 1 : 0.4,
                pointerEvents: canPrev ? "auto" : "none",
                zIndex: 2,
              }}
            >
              <ArrowBackIosNewRoundedIcon />
            </IconButton>

            <IconButton
              aria-label="Next"
              onClick={handleNext}
              disabled={!canNext}
              sx={{
                ...arrowSx,
                position: "absolute",
                top: "50%",
                right: { md: "-24px", lg: "-32px" },
                transform: "translateY(-50%)",
                opacity: canNext ? 1 : 0.4,
                pointerEvents: canNext ? "auto" : "none",
                zIndex: 2,
              }}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </>
        ) : (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.25,
            }}
          >
            <IconButton
              aria-label="Previous"
              onClick={handlePrev}
              disabled={!canPrev}
              sx={arrowSx}
            >
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
            <IconButton
              aria-label="Next"
              onClick={handleNext}
              disabled={!canNext}
              sx={arrowSx}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      {showExtras && (
        <>
          <Box sx={{ mt: 8, mx: 0 }} ref={aboutRef}>
            <ClientTestimonials fullBleed />
          </Box>
          <Box sx={{ mt: 0, mx: -6 }} ref={aboutRef}>
            <ContactSection />
          </Box>
          <Box sx={{ mt: 0, mx: 0 }} ref={footerRef}>
            <Footer />
          </Box>
        </>
      )}

    </Box>
  );
}
