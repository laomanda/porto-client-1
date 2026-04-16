import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";
import { siteData } from "../../data/siteData";

export default function ExperienceSection() {
  const handleMouseMove = (e, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="experience"
      className="scroll-mt-28 py-20 text-white sm:scroll-mt-32 lg:scroll-mt-36 lg:py-28 relative"
    >
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Pengalaman"
          title="Perjalanan profesional yang membentuk kualitas layanan dan pendekatan belajar."
          theme="dark"
        />

        <div className="mt-16 md:mt-24 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[39px] sm:left-[319px] lg:left-[379px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block"></div>

          <div className="space-y-12 md:space-y-20 relative z-10">
            {siteData.experiences.map((exp, index) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col sm:flex-row gap-6 md:gap-14"
              >
                {/* Timeline Axis & Year */}
                <div className="relative sm:w-[320px] lg:w-[380px] flex-shrink-0 flex items-center sm:block sm:pr-16 sm:text-right sm:pt-8 overflow-visible">
                  {/* Glowing Node */}
                  <div className="absolute sm:-right-[5px] top-1/2 sm:top-[2.75rem] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-gold/30 ring-[6px] ring-transparent transition-all duration-500 group-hover:bg-brand-gold group-hover:ring-brand-gold/20 group-hover:scale-150 z-20 hidden sm:block shadow-[0_0_15px_rgba(200,169,107,0)] group-hover:shadow-[0_0_20px_rgba(200,169,107,0.6)]"></div>
                  
                  {/* Mobile Node / Accent */}
                  <div className="w-2 h-2 flex-shrink-0 rounded-full bg-brand-gold/50 mr-4 sm:hidden"></div>

                  <p className="text-gold-shimmer font-display text-4xl sm:text-4xl lg:text-5xl font-bold tracking-tight whitespace-nowrap transition-transform duration-500 sm:group-hover:-translate-x-2">
                    {exp.year}
                  </p>
                </div>

                {/* Detail Card */}
                <div 
                   onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                   className="glass-card-dark relative flex-1 rounded-[32px] p-8 md:p-10 lg:p-12 transition-all duration-500 sm:group-hover:-translate-y-2 shadow-[0_15px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/5 group-hover:border-white/10"
                >
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white/95 group-hover:text-white transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <p className="mt-3 text-brand-gold text-xs sm:text-sm tracking-[0.2em] uppercase font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {exp.company}
                  </p>
                  <div className="mt-6 mb-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                  <p className="text-sm sm:text-base leading-relaxed text-white/70 group-hover:text-white/85 transition-colors duration-300">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
