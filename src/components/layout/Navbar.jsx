import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Handshake,
  MessageCircle,
  UserRound,
} from "lucide-react";
import Container from "./Container";
import { siteData } from "../../data/siteData";

const NAV_OBSERVER_MARGIN = "-35% 0px -45% 0px";
const NAV_OBSERVER_THRESHOLDS = [0, 0.15, 0.3, 0.45, 0.6];
const noop = () => {};

const navItems = [
  {
    href: "#about",
    label: "Tentang",
    sectionId: "about",
    icon: UserRound,
  },
  {
    href: "#experience",
    label: "Pengalaman",
    sectionId: "experience",
    icon: BriefcaseBusiness,
  },
  {
    href: "#contact",
    label: "Contact",
    sectionId: "contact",
    icon: Handshake,
  },
];


function BrandMonogram() {
  return (
    <div className="brand-monogram">
      <span
        aria-hidden="true"
        className="brand-monogram-inner"
      />
      <span
        aria-hidden="true"
        className="brand-monogram-gloss"
      />
      <span
        aria-hidden="true"
        className="brand-monogram-shadow"
      >
        B
      </span>
      <span className="brand-monogram-text">
        B
      </span>
    </div>
  );
}

export default function Navbar({ onHomeClick }) {
  const [activeSection, setActiveSection] = useState(navItems[0].sectionId);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const railRef = useRef(null);
  const itemRefs = useRef(new Map());

  const setItemRef = (sectionId, node) => {
    if (node) {
      itemRefs.current.set(sectionId, node);
      return;
    }

    itemRefs.current.delete(sectionId);
  };

  const syncActiveSection = useEffectEvent((nextSection) => {
    startTransition(() => {
      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );
    });
  });

  const handleNavItemClick = (sectionId) => {
    if (onHomeClick) onHomeClick();
    startTransition(() => {
      setActiveSection((current) =>
        current === sectionId ? current : sectionId,
      );
    });
  };

  const updateSlider = useEffectEvent(() => {
    const activeItem = itemRefs.current.get(activeSection);
    const rail = railRef.current;

    if (!activeItem || !rail) {
      setSliderStyle((current) =>
        current.ready
          ? { left: current.left, width: current.width, ready: false }
          : current,
      );
      return;
    }

    const nextLeft = activeItem.offsetLeft;
    const nextWidth = activeItem.offsetWidth;

    setSliderStyle((current) => {
      if (
        current.left === nextLeft &&
        current.width === nextWidth &&
        current.ready
      ) {
        return current;
      }

      return {
        left: nextLeft,
        width: nextWidth,
        ready: true,
      };
    });
  });

  useEffect(() => {
    let frameId = 0;

    const scheduleSliderUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        updateSlider();
      });
    };

    scheduleSliderUpdate();
    window.addEventListener("resize", scheduleSliderUpdate);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && railRef.current) {
      resizeObserver = new ResizeObserver(() => {
        scheduleSliderUpdate();
      });
      resizeObserver.observe(railRef.current);
    }

    document.fonts?.ready
      ?.then(() => {
        scheduleSliderUpdate();
      })
      .catch(noop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleSliderUpdate);
      resizeObserver?.disconnect();
    };
  }, [activeSection]);

  useEffect(() => {
    const getFallbackSection = () => {
      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;

      if (nearPageBottom) {
        return navItems.at(-1)?.sectionId ?? navItems[0].sectionId;
      }

      const scrollMarker = window.scrollY + window.innerHeight * 0.38;
      let nextSection = navItems[0].sectionId;

      for (const item of navItems) {
        const section = document.getElementById(item.sectionId);
        if (section && scrollMarker >= section.offsetTop) {
          nextSection = item.sectionId;
        }
      }

      return nextSection;
    };

    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const visibleSections = new Map();
    const syncFallbackSection = () => {
      if (visibleSections.size > 0) {
        return;
      }

      syncActiveSection(getFallbackSection());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
            return;
          }

          visibleSections.delete(entry.target.id);
        });

        if (visibleSections.size > 0) {
          const [nextSection] = [...visibleSections.entries()].sort(
            (left, right) => right[1] - left[1],
          )[0];
          syncActiveSection(nextSection);
          return;
        }

        syncFallbackSection();
      },
      {
        rootMargin: NAV_OBSERVER_MARGIN,
        threshold: NAV_OBSERVER_THRESHOLDS,
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", syncFallbackSection, { passive: true });
    syncFallbackSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncFallbackSection);
    };
  }, []);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <Container className="flex justify-center">
        <div className="navbar-shell w-full max-w-5xl">
          <div className="navbar-shell-overlay" />

          <div className="relative flex items-center justify-between px-3 py-2 sm:px-4 lg:px-6">
            {/* Left: Brand */}
            <button 
              onClick={onHomeClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <BrandMonogram />
              <div className="hidden md:block text-left">
                <h1 className="navbar-brand-title">
                  {siteData.brand.name}
                </h1>
              </div>
            </button>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <div
                ref={railRef}
                className="navbar-segmented relative flex items-center gap-1 p-1"
              >
                <div
                  className="navbar-segmented-slider pointer-events-none absolute inset-y-1 rounded-full"
                  style={{
                    width: `${sliderStyle.width}px`,
                    transform: `translateX(${sliderStyle.left}px)`,
                    opacity: sliderStyle.ready ? 1 : 0,
                  }}
                />

                {navItems.map((item) => (
                  <a
                    key={item.sectionId}
                    ref={(node) => setItemRef(item.sectionId, node)}
                    href={item.href}
                    onClick={() => handleNavItemClick(item.sectionId)}
                    className={`navbar-segmented-link ${
                      activeSection === item.sectionId
                        ? "navbar-segmented-link-active"
                        : ""
                    }`}
                  >
                    <item.icon
                      size={14}
                      strokeWidth={2}
                      className="shrink-0"
                    />
                    <span className="hidden xl:inline">{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>

            {/* Right: CTA & Mobile Nav */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Nav for Medium screens (tablet) */}
              <nav className="hidden md:flex lg:hidden items-center mr-2">
                <div className="flex gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.sectionId}
                      href={item.href}
                      onClick={() => handleNavItemClick(item.sectionId)}
                      className={`p-2 rounded-full transition-colors ${
                        activeSection === item.sectionId
                          ? "bg-brand-green/10 text-brand-green"
                          : "text-brand-muted hover:bg-brand-green/5"
                      }`}
                      title={item.label}
                    >
                      <item.icon size={18} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </nav>

              <a
                href={siteData.brand.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="navbar-cta group"
              >
                <MessageCircle
                  size={16}
                  strokeWidth={2}
                  className="shrink-0"
                />
                <span className="hidden sm:inline">Konsultasi</span>
                <ArrowUpRight
                  size={14}
                  className="navbar-cta-arrow hidden sm:block"
                />
              </a>
            </div>
          </div>

          {/* Mobile Bottom Nav (Compact Chips) */}
          <div className="md:hidden border-t border-brand-green/5 px-4 py-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
              {navItems.map((item) => (
                <a
                  key={item.sectionId}
                  href={item.href}
                  onClick={() => handleNavItemClick(item.sectionId)}
                  className={`flex-1 min-w-[90px] py-1.5 rounded-full text-center text-xs font-medium transition-all ${
                    activeSection === item.sectionId
                      ? "bg-brand-green text-white shadow-sm"
                      : "bg-white/50 text-brand-muted"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
