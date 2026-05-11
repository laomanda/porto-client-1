import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import StatsSection from "./components/sections/StatsSection";
import ProductSection from "./components/sections/ProductSection";
import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";

// Pages
import ProductDetailPage from "./components/pages/ProductDetailPage";
import PaymentPage from "./components/pages/PaymentPage";

export default function App() {
  const [view, setView] = useState("home"); // 'home', 'detail', 'payment'
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const navigateToDetail = (id) => {
    setSelectedProductId(id);
    setView("detail");
  };

  const navigateToPayment = () => {
    setView("payment");
  };

  const navigateToHome = () => {
    setView("home");
  };

  return (
    <div className="bg-brand-ivory text-brand-dark antialiased">
      <Navbar onHomeClick={navigateToHome} />
      
      <main>
        {view === "home" && (
          <>
            <HeroSection />
            <AboutSection />
            <div className="bg-premium-dark relative">
              <ExpertiseSection />
              <ExperienceSection />
              <StatsSection />
              <ProductSection onProductClick={navigateToDetail} />
              <CTASection />
            </div>
          </>
        )}

        {view === "detail" && (
          <ProductDetailPage 
            productId={selectedProductId} 
            onBack={navigateToHome}
            onBuy={navigateToPayment}
          />
        )}

        {view === "payment" && (
          <PaymentPage onBack={() => setView("detail")} />
        )}
      </main>

      <Footer />
    </div>
  );
}
