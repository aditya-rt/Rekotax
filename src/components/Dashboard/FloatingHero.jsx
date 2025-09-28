import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function FloatingHero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const root = heroRef.current;
    const img = imgRef.current;
    if (!root || !img) return;

    // Smooth floating for chips using Web Animations API
    const boxes = Array.from(root.querySelectorAll(".floating-box"));
    const anims = [];

    function animateBox(el, delay = 0) {
      let x = 0, y = 0;
      let cancelled = false;

      const loop = () => {
        if (cancelled) return;
        const newX = Math.random() * 120 - 60;
        const newY = Math.random() * 120 - 60;
        const duration = 5000 + Math.random() * 2000;

        const a = el.animate(
          [{ transform: `translate(${x}px, ${y}px)` }, { transform: `translate(${newX}px, ${newY}px)` }],
          { duration, easing: "ease-in-out", fill: "forwards", delay }
        );
        anims.push(a);
        a.onfinish = () => {
          x = newX; y = newY; loop();
        };
      };
      loop();

      return () => { cancelled = true; };
    }

    const cancels = boxes.map((b, i) => animateBox(b, i * 600));

    // Tilt + zoom on image
    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * 10;
      const rotateY = ((x - cx) / cx) * 10;
      img.style.transform = `scale(1.08) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const onLeave = () => { img.style.transform = "scale(1) rotateX(0) rotateY(0)"; };

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      anims.forEach(a => { try { a.cancel(); } catch {} });
      cancels.forEach(fn => fn && fn());
    };
  }, []);

  return (
    <Box
      ref={heroRef}
      component="section"
      className="rk-hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        py: 5,
        px: 2,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Keep font link in public/index.html ideally - included here for portability */}
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <Box component="style">{`
        .rk-hero, .rk-hero * { font-family: 'Open Sans', sans-serif; }
        .hero-content { position: relative; z-index: 0; display:flex; flex-direction:column; align-items:center; justify-content:center; perspective: 1000px; }
        .consultant-img {
          max-width: 480px; width: 100%; height: auto; margin: 20px auto; border-radius: 10%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          transition: transform 0.15s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        .floating-box {
          position: absolute;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(15px) saturate(180%);
          -webkit-backdrop-filter: blur(15px) saturate(180%);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          padding: 10px 16px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.22);
          white-space: nowrap;
          transition: transform .4s ease, box-shadow .4s ease, background .4s ease;
          z-index: 2;
        }
        .floating-box:hover { transform: scale(1.15) rotate(2deg); box-shadow: 0 16px 40px rgba(0,0,0,0.35); background: rgba(255,255,255,0.3); }
        .box1 { top: 18%; left: 10%; }
        .box2 { top: 22%; right: 12%; }
        .box3 { bottom: 18%; left: 12%; }
        .box4 { bottom: 22%; right: 10%; }
        .box5 { top: 6%; left: 50%; transform: translateX(-50%); }
        @media (max-width: 768px) {
          .floating-box { font-size: 0.85rem; padding: 10px 16px; }
          .consultant-img { max-width: 300px; }
        }
      `}</Box>

      {/* Hero content */}
      <Box className="hero-content">
        <Box
          component="img"
          ref={imgRef}
          src="https://assets.zyrosite.com/YbNBaBJoByTgZjMa/team-collaboration-meeting-A85MNR9e0XHV62lV.jpg"
          alt="Company-Registration"
          className="consultant-img"
          sx={{ display: "block" }}
        />
      </Box>

      {/* Floating chips */}
      <Box className="floating-box box1">Startup Registration</Box>
      <Box className="floating-box box2">Compliance</Box>
      <Box className="floating-box box3">Taxation</Box>
      <Box className="floating-box box4">Accounting</Box>
      <Box className="floating-box box5">FEMA</Box>
    </Box>
  );
}
