import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import StatsSection from "./components/sections/StatsSection";
import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <div className="bg-brand-ivory text-brand-dark antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <div className="bg-premium-dark relative">
          <ExpertiseSection />
          <ExperienceSection />
          <StatsSection />
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
