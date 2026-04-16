import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";
import { siteData } from "../../data/siteData";

export default function ExpertiseSection() {
  const handleMouseMove = (e, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-20 text-white lg:py-28 relative">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Keahlian Utama"
          title="Fondasi keilmuan dan strategi yang membentuk arah pembelajaran."
          description="Setiap bidang difokuskan agar pembelajaran tidak berhenti di teori, tetapi bergerak ke arah yang lebih aplikatif dan berdampak."
          theme="dark"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteData.expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              className="glass-card-dark group rounded-[32px] p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="pointer-events-none absolute -right-6 -top-10 z-0 select-none opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08]">
                <span className="font-display text-[12rem] font-bold leading-none text-white">
                  {index + 1}
                </span>
              </div>

              <div className="relative z-10">
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-500 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30">
                  <p className="text-gold-shimmer text-sm font-bold tracking-[0.2em]">
                    0{index + 1}
                  </p>
                </div>
                
                <h3 className="font-display text-2xl text-white/95 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70 group-hover:text-white/85 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}