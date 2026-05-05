import { motion } from "framer-motion";
import { BookOpen, Languages, Lightbulb } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";
import { siteData } from "../../data/siteData";

const iconMap = {
  book: BookOpen,
  language: Languages,
  meditation: Lightbulb,
};

export default function ProductSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-20 lg:py-28 bg-premium-dark overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl -z-10" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Program Unggulan"
          title="Layanan Pembelajaran Berkualitas"
          description="Pilih program yang sesuai dengan kebutuhan dan tujuan pengembangan diri Anda bersama instruktur berpengalaman."
          theme="dark"
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {siteData.products.map((product) => {
            const IconComponent = iconMap[product.icon];

            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group h-full"
              >
                <div className="relative h-full rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm p-7 transition-all duration-400 hover:border-brand-gold/20 hover:bg-gradient-to-br hover:from-white/8 hover:to-white/4 hover:-translate-y-1 flex flex-col overflow-hidden">
                  
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Icon Section */}
                  <div className="mb-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-400 group-hover:border-brand-gold/30 group-hover:bg-brand-gold/8">
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 text-white/70 group-hover:text-brand-gold transition-colors duration-400" />
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow">
                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight group-hover:text-white transition-colors duration-300">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/65 leading-relaxed group-hover:text-white/75 transition-colors duration-300 mb-6">
                      {product.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mb-5 h-px bg-gradient-to-r from-white/5 via-white/10 to-white/5" />

                  {/* Bottom Section - Price & Button */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Price */}
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-white/50 mb-1">
                        Harga
                      </p>
                      <p className="font-display text-lg font-bold text-brand-gold group-hover:text-yellow-300 transition-colors duration-300">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button className="relative flex-shrink-0 px-5 py-2 rounded-lg bg-white/8 border border-white/15 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 transition-all duration-300 hover:bg-white/12 hover:border-brand-gold/30 hover:text-white group/btn">
                      Daftar
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
