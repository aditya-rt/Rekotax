// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Home from "./components/Dashboard/Home";
import Navbar from "./components/Navbar/Navbar";
import GstRegistration from "./components/Registration/OtherRegulatory/GSTRegistration/GstRegistration";
import LutRegistration from "./components/Registration/OtherRegulatory/LUTRegistration/LutRegistration";
import ImportExportCode from "./components/Registration/OtherRegulatory/ImportExportCode/ImportExportCode";
import OPCRegistrationHero from "./components/Registration/StartNewBusiness/OPC/Opc";
import Plc from "./components/Registration/StartNewBusiness/PrivateLimitedCompany/Plc";
import Llp from "./components/Registration/StartNewBusiness/LLP/Llp";
import SectionAndCompany from "./components/Registration/StartNewBusiness/SectionAndCompany/SectionAndCompany";
import Partnershipfirm from "./components/Registration/StartNewBusiness/PartnershipFirm/Partnershipfirm";
import SoleProprietorship from "./components/Registration/StartNewBusiness/SoleProprietorship/SoleProprietorship";
import PublicCompany from "./components/Registration/StartNewBusiness/PublicCompany/PublicCompany";
import NidhiCompany from "./components/Registration/StartNewBusiness/NidhiCompany/NidhiCompany";
import ProducerCompany from "./components/Registration/StartNewBusiness/ProducerCompany/ProducerCompany";
import ClientTestimonials from "./components/Dashboard/ClientTestimonials";
import PrincipleAndApproach from "./components/Dashboard/PrincipleAndApproach";
import WhyRekotax from "./components/Dashboard/WhyRekotax";
import Insights from "./components/Dashboard/Insights/Insights"
import ShopsAndEstablishment from "./components/Registration/OtherRegulatory/ShopsAndEstablishment/ShopsAndEstablishment";
import StartupIndia from "./components/Registration/OtherRegulatory/StartupIndia/StartUpIndia";
import Msme from "./components/Registration/OtherRegulatory/MSME/Msme";
import Trademark from "./components/Registration/OtherRegulatory/TradeMark/Trademark";
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';
import Fssai from "./components/Registration/OtherRegulatory/FSSAI/Fssai";
import OtherRegistration from "./components/Registration/OtherRegulatory/OtherRegistrations/OtherRegistration";
import ProfessionalTax from "./components/Registration/OtherRegulatory/ProfessionalTax/ProfessionalTax";
import Contact from "./components/Navbar/Contact";
import EightyG from "./components/Registration/OtherRegulatory/12A/EightyGRegistration";
import BlogDetails from "./components/Dashboard/Insights/BlogDetails";
import About from "./components/Dashboard/AboutUs/About";
import TermsAndConditions from "./components/Dashboard/TermsAndConditions";
import PrivacyPolicy from "./components/Dashboard/PrivacyPolicy";
import RefundPolicy from "./components/Dashboard/RefundPolicy";
import PvtLimitedCompliance from "./components/Compilance/PvtLimitedCompliance";
import LLPCompliance from "./components/Compilance/CompilanceForLLP";
import Section8Compilance from "./components/Compilance/CompilanceForSection8";

function SmartHideNavbar({ children }) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  // useEffect(() => {
  //   const onScroll = () => {
  //     const y = window.scrollY || 0;
  //     const goingDown = y > lastY.current;
  //     const atTop = y < 10;

  //     // near bottom?
  //     const docH = document.documentElement.scrollHeight;
  //     const winH = window.innerHeight;
  //     const nearBottom = y + winH > docH - 10;

  //     if (atTop || nearBottom) {
  //       setVisible(true);               // always show at very top & at footer
  //     } else {
  //       setVisible(!goingDown);         // show when scrolling up, hide when down
  //     }

  //     lastY.current = y;
  //   };
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1300,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 240ms ease",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SmartHideNavbar>
        <Navbar />
      </SmartHideNavbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gst-registration" element={<GstRegistration />} />
        <Route path="/lut-registration" element={<LutRegistration />} />
        <Route path="/import-export-code" element={<ImportExportCode />} />
        <Route path="/opc-registration" element={<OPCRegistrationHero />} />
        <Route path="/plc-registration" element={<Plc />} />
        <Route path = "/llp-registration" element={<Llp />} />
        <Route path = "/section-and-company" element={<SectionAndCompany />} />
        <Route path = "/partnership-firm" element={<Partnershipfirm />} />
        <Route path = "/sole-proprietorship" element={<SoleProprietorship />} />
        <Route path = "/public-company" element={<PublicCompany />} />
        <Route path = "/nidhi-company" element={<NidhiCompany />} />
        <Route path = "/producer-company" element={<ProducerCompany />} />
        <Route path ="/client-testimonials" element = {<ClientTestimonials/>}/>
        <Route path="/principles-and-approach" element={<PrincipleAndApproach />} />
        <Route path="/why-rekotax" element={<WhyRekotax />} />
        <Route path="/insights-blog" element={<Insights showArrows={false}/>} />
        <Route path="/shops-and-establishment" element={<ShopsAndEstablishment/>}/>
        <Route path="/startup-india" element={<StartupIndia/>} />
        <Route path="/msme" element={<Msme/>}/>
        <Route path="/fssai" element={<Fssai/>}/>
        <Route path="/trademark" element={<Trademark/>}/>
        <Route path="/other-registration" element={<OtherRegistration/>}/>
        <Route path="/professional-tax" element={<ProfessionalTax/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/eighty-g-registration" element={<EightyG/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/refund-policy" element={<RefundPolicy/>}/>
        <Route path="/privtate-limited-compliance" element={<PvtLimitedCompliance/>}/>
        <Route path="/llp-compliance" element={<LLPCompliance/>}/>
        <Route path="section8-compilance" element={<Section8Compilance/>}/>

        <Route path="/insights/:slug" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}
  