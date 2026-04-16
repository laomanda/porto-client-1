import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../layout/Container";
import { siteData } from "../../data/siteData";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 relative py-24 text-white sm:scroll-mt-32 lg:scroll-mt-36 lg:py-32 overflow-hidden"
    >
      {/* Atmospheric decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-gold/[0.03] blur-[120px]"></div>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold-shimmer text-xs font-bold uppercase tracking-[0.3em] sm:text-sm"
          >
            Konsultasi & Kolaborasi
          </motion.p>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-luxury-gradient-light mt-6 max-w-4xl font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Siap membangun program dan pembelajaran yang lebih terarah?
          </motion.h2>

          {/* Decorative gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          ></motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base sm:leading-8"
          >
            Hubungi saya untuk diskusi lebih lanjut mengenai kebutuhan
            pembelajaran, pelatihan, atau pengembangan program edukasi.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Primary CTA — WhatsApp */}
            <a
              href={siteData.brand.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-gold px-8 py-4 text-sm font-semibold text-brand-green transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,169,107,0.3)] hover:-translate-y-0.5"
            >
              {/* Shimmer sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
              <span className="relative">Hubungi via WhatsApp</span>
              <ArrowUpRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
