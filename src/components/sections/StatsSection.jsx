import { motion } from "framer-motion";
import Container from "../layout/Container";
import { siteData } from "../../data/siteData";

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[40px] border border-brand-gold/12 bg-white p-2 shadow-[0_20px_60px_rgba(15,61,58,0.06),0_0_0_1px_rgba(200,169,107,0.06)]"
        >
          {/* Decorative inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_top_right,rgba(200,169,107,0.06),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(15,61,58,0.04),transparent_50%)]"></div>

          <div className="relative flex flex-col md:flex-row">
            {siteData.stats.map((item, index) => (
              <div key={item.label} className="flex flex-1 flex-col md:flex-row">
                {/* Stat Segment */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
                  className="group relative flex flex-1 cursor-default flex-col items-center justify-center rounded-[32px] px-8 py-12 md:py-16 transition-all duration-500 hover:bg-brand-gold/[0.03]"
                >
                  {/* Hover backdrop glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.08),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <p className="relative text-luxury-gradient font-display text-7xl leading-none transition-transform duration-500 group-hover:-translate-y-1 md:text-8xl">
                    {item.value}
                  </p>
                  <p className="relative mt-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-green/70 transition-colors duration-300 group-hover:text-brand-gold sm:text-xs">
                    {item.label}
                  </p>
                </motion.div>

                {/* Divider (not after the last item) */}
                {index < siteData.stats.length - 1 && (
                  <>
                    {/* Vertical divider — desktop */}
                    <div className="my-auto hidden h-20 w-px bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent md:block"></div>
                    {/* Horizontal divider — mobile */}
                    <div className="mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent md:hidden"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}