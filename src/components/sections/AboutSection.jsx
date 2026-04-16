import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  BookMarked,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../layout/SectionHeading";
import { siteData } from "../../data/siteData";

const highlightIcons = [
  GraduationCap,
  BookMarked,
  BadgeCheck,
  Sparkles,
];

const slideThemes = [
  {
    accent: "15 118 110",
    accentSoft: "45 212 191",
    accentWarm: "200 169 107",
    accentBadge: "13 84 78",
  },
  {
    accent: "79 109 71",
    accentSoft: "163 202 115",
    accentWarm: "212 191 128",
    accentBadge: "58 90 52",
  },
  {
    accent: "184 134 33",
    accentSoft: "245 197 66",
    accentWarm: "224 177 89",
    accentBadge: "133 93 24",
  },
  {
    accent: "170 95 63",
    accentSoft: "244 163 98",
    accentWarm: "222 177 130",
    accentBadge: "124 66 43",
  },
];

const SWIPE_DISTANCE_THRESHOLD = 72;
const SWIPE_VELOCITY_THRESHOLD = 420;
const AUTOPLAY_DELAY_MS = 5000;

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const totalSlides = siteData.about.highlights.length;
  const activeItem = siteData.about.highlights[activeSlide];
  const ActiveIcon = highlightIcons[activeSlide % highlightIcons.length];
  const activeTheme = slideThemes[activeSlide % slideThemes.length];
  const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 22 };
  const revealTransition = { duration: shouldReduceMotion ? 0 : 0.6 };
  const slideTransition = {
    duration: shouldReduceMotion ? 0 : 0.32,
    ease: [0.22, 1, 0.36, 1],
  };
  const slideMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
      }
    : {
        initial: { opacity: 0, x: slideDirection > 0 ? 52 : -52 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: slideDirection > 0 ? -52 : 52 },
      };

  const handleSlideDragEnd = (_, info) => {
    if (
      info.offset.x <= -SWIPE_DISTANCE_THRESHOLD ||
      info.velocity.x <= -SWIPE_VELOCITY_THRESHOLD
    ) {
      setSlideDirection(1);
      setActiveSlide((current) => (current + 1) % totalSlides);
      return;
    }

    if (
      info.offset.x >= SWIPE_DISTANCE_THRESHOLD ||
      info.velocity.x >= SWIPE_VELOCITY_THRESHOLD
    ) {
      setSlideDirection(-1);
      setActiveSlide((current) => (current - 1 + totalSlides) % totalSlides);
    }
  };

  useEffect(() => {
    if (shouldReduceMotion || totalSlides < 2) {
      return undefined;
    }

    const autoplayId = window.setInterval(() => {
      setSlideDirection(1);
      setActiveSlide((current) => (current + 1) % totalSlides);
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(autoplayId);
    };
  }, [shouldReduceMotion, totalSlides]);

  const aboutThemeStyle = {
    "--about-accent-rgb": activeTheme.accent,
    "--about-accent-soft-rgb": activeTheme.accentSoft,
    "--about-accent-warm-rgb": activeTheme.accentWarm,
    "--about-accent-badge-rgb": activeTheme.accentBadge,
  };

  return (
    <section
      id="about"
      className="scroll-mt-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(247,243,235,0.96)_100%)] py-20 sm:scroll-mt-32 lg:scroll-mt-36 lg:py-28"
    >
      <Container>
        <div className="grid gap-10 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
          <motion.div
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={revealTransition}
            className="xl:sticky xl:top-28"
          >
            <SectionHeading
              eyebrow="Tentang"
              title="Pembelajaran yang jernih, hangat, dan punya arah."
              description={siteData.about.intro}
            />
          </motion.div>

          <motion.article
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              ...revealTransition,
              delay: shouldReduceMotion ? 0 : 0.06,
            }}
            className="about-shell p-8 sm:p-10"
            style={aboutThemeStyle}
          >
            <div className="about-shell-orbs" aria-hidden="true">
              <span className="about-shell-orb about-shell-orb-primary" />
              <span className="about-shell-orb about-shell-orb-secondary" />
              <span className="about-shell-orb about-shell-orb-tertiary" />
            </div>

            <div className="flex items-start justify-between gap-5">
              <div className="max-w-xl">
                <p className="text-gold-shimmer text-[0.7rem] font-bold uppercase tracking-[0.25em]">
                  Nilai & Pendekatan
                </p>
                <h3 className="about-shell-title mt-2 font-display text-[2.2rem] leading-[1.1] sm:text-[2.6rem]">
                  {siteData.brand.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
                  {siteData.about.description}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="about-slide-viewport mt-1 sm:mt-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeItem.label}
                    initial={slideMotion.initial}
                    animate={slideMotion.animate}
                    exit={slideMotion.exit}
                    transition={slideTransition}
                    drag={shouldReduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={handleSlideDragEnd}
                    className="about-slide-card p-6 sm:p-7"
                  >
                    <div className="about-slide-card-glow" aria-hidden="true" />

                    <div className="flex items-start gap-4">
                      <div className="about-slide-card-badge">
                        <ActiveIcon size={20} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-gold-shimmer text-[0.65rem] font-bold uppercase tracking-[0.2em] sm:text-[0.75rem]">
                          {activeItem.label}
                        </p>
                        <h4 className="mt-2 font-display text-2xl leading-tight text-brand-dark sm:text-[2.4rem]">
                          {activeItem.title}
                        </h4>
                      </div>
                    </div>

                    <div className="my-6 h-px bg-[linear-gradient(90deg,rgba(15,61,58,0)_0%,rgba(15,61,58,0.12)_18%,rgba(200,169,107,0.2)_50%,rgba(15,61,58,0.12)_82%,rgba(15,61,58,0)_100%)]" />

                    <p className="max-w-2xl text-sm leading-8 text-brand-muted sm:text-base">
                      {activeItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
