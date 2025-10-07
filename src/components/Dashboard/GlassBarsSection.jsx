import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

export default function GlassBarsSection() {
  const railRef = useRef(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const bars = Array.from(rail.querySelectorAll(".rk-bar"));
    const barsWrap = rail.querySelector(".rk-bars");

    // scale 0..20 → container height
    const yMax = 20;
    const finalValues = bars.map(b => parseFloat(b.dataset.target) || 0);
    const currentValues = bars.map(() => 0);
    const durations = 900, gaps = 260;

    function renderBars() {
      if (!barsWrap) return;
      const h = barsWrap.clientHeight || 0;
      const maxVal = yMax;
      bars.forEach((bar, i) => {
        const v = currentValues[i];
        const px = (v / maxVal) * h;
        bar.style.height = Math.max(0, Math.min(h, px)) + "px";
        if (v > 0.4) bar.classList.add("ready");
      });
    }

    function animate() {
      let i = 0;
      function step() {
        if (i >= bars.length) return;
        const start = performance.now();
        function frame(now) {
          const tRaw = Math.min(1, (now - start) / durations);
          const t = 1 - Math.pow(1 - tRaw, 3);
          currentValues[i] = finalValues[i] * t;
          renderBars();
          if (tRaw < 1) requestAnimationFrame(frame);
          else { i++; setTimeout(step, gaps); }
        }
        requestAnimationFrame(frame);
      }
      step();
    }

    const setup = () => { renderBars(); animate(); };

    // Start when visible
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          io.disconnect();
          setup();
        }
      });
    }, { threshold: 0.2 });

    io.observe(rail);

    // Recompute on resize
    const ro = new ResizeObserver(renderBars);
    if (barsWrap) ro.observe(barsWrap);
    window.addEventListener("resize", renderBars);

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", renderBars);
    };
  }, []);

  return (
    <Box component="section" className="rk-section" sx={{
      fontFamily: "'Open Sans', sans-serif",
      "& *": { fontFamily: "'Open Sans', sans-serif" },
      bgcolor: "#eef3ff",
      py: { xs: 5, sm: 6.5, md: 8 },
      px: { xs: 1.5, sm: 2.5, md: 3 },
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <Box component="style">{`
        :root{
          --rk-primary:#0f3d7c;
          --rk-text:#334155;
          --glass-bg:rgba(255,255,255,0.22);
          --glass-border:rgba(255,255,255,0.6)
        }
        .rk-section, .rk-bar, .rk-bar-inner, .rk-bar h3, .rk-bar p { font-family:'Open Sans', sans-serif; }

        .rk-stage{
          position:relative;
          max-width:1200px;
          margin:0 auto;
          background:#f8fafc;
          border-radius:22px;
          box-shadow:0 12px 40px rgba(15,61,124,.12);
          padding:18px
        }

        .rk-rail{position:relative;width:100%;height:clamp(360px, 50vw, 520px)}
        @media(max-width:900px){.rk-rail{height:clamp(340px, 60vh, 480px)}}
/* Mobile: make bars horizontally slidable */
@media (max-width: 600px) {
  .rk-bars{
    position: absolute;
    left: 16px; right: 16px; bottom: 16px; top: 52px;
    display: flex;                /* switch from grid to flex row */
    align-items: flex-end;
    gap: 12px;
    overflow-x: auto;             /* horizontal scroll */
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;/* snap to each card */
    scrollbar-width: none;        /* Firefox hide */
  }
  .rk-bars::-webkit-scrollbar{ display: none; } /* WebKit hide */

  .rk-bar{
    flex: 0 0 84%;               /* each card width on mobile */
    scroll-snap-align: center;   /* nice centered snap */
  }
}

        /* Title sits above bars so it never overlaps on small screens */
        .rk-heading{
          position:absolute;left:16px;right:16px;top:10px;z-index:2;
          text-align:center;font-weight:800;color:var(--rk-primary);
          font-size:clamp(18px, 2.6vw, 24px); letter-spacing:.2px;
          pointer-events:none
        }

        /* Bars container fills between top and bottom, responsive columns */
        .rk-bars{
          position:absolute;left:16px;right:16px;bottom:16px;top:62px;
          display:grid;align-items:end;gap:18px;z-index:1;
          grid-template-columns:repeat(4,1fr)
        }
        @media(max-width:900px){
          .rk-bars{grid-template-columns:repeat(2,1fr);gap:16px;top:56px}
        }
      /* Mobile: make bars horizontally slidable */
@media (max-width: 600px) {
  .rk-bars{
    position: absolute;
    left: 16px; right: 16px; bottom: 16px; top: 52px;
    display: flex;                /* switch from grid to flex row */
    align-items: flex-end;
    gap: 12px;
    overflow-x: auto;             /* horizontal scroll */
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;/* snap to each card */
    scrollbar-width: none;        /* Firefox hide */
  }
  .rk-bars::-webkit-scrollbar{ display: none; } /* WebKit hide */

  .rk-bar{
    flex: 0 0 84%;               /* each card width on mobile */
    scroll-snap-align: center;   /* nice centered snap */
  }
}


        .rk-bar{
          position:relative;border-radius:20px;
          background:linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.30));
          border:1px solid var(--glass-border);
          backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
          box-shadow:0 18px 40px rgba(15,61,124,.12), inset 0 1px 0 rgba(255,255,255,0.7);
          overflow:hidden;height:0;
          transition:height .9s cubic-bezier(.2,.8,.2,1), transform .5s ease, box-shadow .5s ease;
          display:flex;flex-direction:column;justify-content:flex-end
        }
        .rk-bar-inner{padding:16px 14px 14px 14px;display:flex;flex-direction:column;justify-content:flex-start;height:100%;box-sizing:border-box;transition:transform .4s ease}
        .rk-bar h3{margin:0 0 8px 0;font-size:18px;color:var(--rk-primary);font-weight:800;letter-spacing:.3px;transition:color .3s ease}
        .rk-bar p{margin:0;color:#475569;line-height:1.6;font-size:14px;opacity:0;transform:translateY(10px);transition:opacity .6s ease, transform .6s ease, color .3s ease}
        .rk-bar.ready p{opacity:1;transform:translateY(0)}
        .rk-bar:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 25px 60px rgba(15,61,124,.25), inset 0 1px 0 rgba(255,255,255,0.9)}
        .rk-bar:hover h3{color:#023691}
        .rk-bar:hover p{color:#1e293b}
        .rk-bar:hover .rk-bar-inner{transform:translateY(-4px)}

        /* subtle grid backdrop */
        .rk-grid{position:absolute;inset:14px;border-radius:16px;background-image:linear-gradient(#dfe9ff 1px,transparent 1px),linear-gradient(90deg,#dfe9ff 1px,transparent 1px);background-size:28px 28px;opacity:.75;pointer-events:none}

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .rk-bar, .rk-bar p, .rk-bar-inner { transition: none !important; }
        }
      `}</Box>

      <Box className="rk-stage">
        <Box className="rk-rail" ref={railRef}>
          <Typography className="rk-heading" component="h2">
            A Catalyst to India's Business Ecosystem
          </Typography>

          <Box className="rk-grid" />
          <Box id="rkBars" className="rk-bars">
            <Box className="rk-bar" data-target="8">
              <Box className="rk-bar-inner">
                <Typography component="h3">Launch</Typography>
                <Typography>
                  We help founders turn ideas into registered, compliant, and investor-ready businesses. From incorporation to essential registrations, your foundation is built for credibility and growth.
                </Typography>
              </Box>
            </Box>

            <Box className="rk-bar" data-target="10">
              <Box className="rk-bar-inner">
                <Typography component="h3">Build</Typography>
                <Typography>
                  As operations begin, we bring financial structure, accounting systems, and legal discipline that strengthen decision-making and ensure smooth day-to-day functioning.
                </Typography>
              </Box>
            </Box>

            <Box className="rk-bar" data-target="14">
              <Box className="rk-bar-inner">
                <Typography component="h3">Growth</Typography>
                <Typography>
                  When your business starts scaling, we provide strategic advisory, Virtual CFO insights, and compliance automation—helping you expand without losing control or clarity.
                </Typography>
              </Box>
            </Box>

            <Box className="rk-bar" data-target="18">
              <Box className="rk-bar-inner">
                <Typography component="h3">Scale-Up & Beyond</Typography>
                <Typography>
                  For mature and fast-growing companies, we enable corporate governance, global expansion, and investor reporting standards—so your business is always future-ready and globally compliant.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
