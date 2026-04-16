import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, UserRound } from "lucide-react";
import myPhoto from "../../assets/bagus-prasetya.jpeg";
import Container from "../layout/Container";
import Badge from "../ui/Badge";
import { siteData } from "../../data/siteData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(200,169,107,0.18),_transparent_28%),linear-gradient(135deg,#f7f3eb_0%,#eef1ed_100%)] py-12 lg:py-4">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#0F3D3A_1px,transparent_1px),linear-gradient(to_bottom,#0F3D3A_1px,transparent_1px)] [background-size:80px_80px]" />

      <Container className="relative grid items-center gap-10 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge>Educational Portfolio</Badge>
            <h1 className="text-luxury-gradient mt-5 max-w-5xl font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl 2xl:text-8xl">
              Membangun pembelajaran yang lebih{" "}
              <span className="text-brand-green italic">terarah, bernilai,</span> dan relevan di era digital.
            </h1>

            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={siteData.brand.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Konsultasi Sekarang
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 px-6 py-3.5 text-sm font-semibold text-brand-dark transition hover:bg-white/60"
              >
                <UserRound size={18} aria-hidden="true" />
                Lihat Profil
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full lg:max-w-[54svh] xl:max-w-[58svh]">
            <img
              src={myPhoto}
              alt="Potret Bagus Prastya"
              className="block h-full w-full object-contain object-center"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
