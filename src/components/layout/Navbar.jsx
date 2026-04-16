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
const NAV_ICON_SIZE = 15;
const NAV_ICON_STROKE_WIDTH = 1.9;
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

function WaveLayer({ className, path, fill }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

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

export default function Navbar() {
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
    <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-0">
      <Container className="relative">
        <div className="navbar-shell">
          <div className="navbar-shell-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden pointer-events-none">
            <WaveLayer
              className="navbar-wave navbar-wave-primary navbar-wave-primary-layer"
              fill="rgba(15, 61, 58, 0.1)"
              path="M0 120L40 112C80 104 160 88 240 82.7C320 77 400 83 480 101.3C560 120 640 152 720 157.3C800 163 880 141 960 117.3C1040 93 1120 67 1200 58.7C1280 51 1360 61 1400 66.7L1440 72V220H1400C1360 220 1280 220 1200 220C1120 220 1040 220 960 220C880 220 800 220 720 220C640 220 560 220 480 220C400 220 320 220 240 220C160 220 80 220 40 220H0Z"
            />
            <WaveLayer
              className="navbar-wave navbar-wave-secondary navbar-wave-secondary-layer"
              fill="rgba(200, 169, 107, 0.16)"
              path="M0 144L34.3 136C68.6 128 137 112 206 109.3C274.3 107 343 117 411 128C480 139 549 149 617 144C685.7 139 754 117 823 96C891.4 75 960 53 1029 58.7C1097.1 64 1166 96 1234 114.7C1302.9 133 1371 139 1406 141.3L1440 144V220H1406C1371 220 1303 220 1234 220C1166 220 1097 220 1029 220C960 220 891 220 823 220C754 220 686 220 617 220C549 220 480 220 411 220C343 220 274 220 206 220C137 220 69 220 34 220H0Z"
            />
          </div>

          <div className="relative flex flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <BrandMonogram />
                <div className="min-w-0 hidden sm:block">
                  <h1 className="navbar-brand-title">
                    {siteData.brand.name}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={siteData.brand.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="navbar-cta group"
                >
                  <MessageCircle
                    size={NAV_ICON_SIZE + 1}
                    strokeWidth={NAV_ICON_STROKE_WIDTH}
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">Konsultasi</span>
                  <ArrowUpRight
                    size={NAV_ICON_SIZE + 1}
                    className="navbar-cta-arrow"
                  />
                </a>
              </div>
            </div>

            {/* Desktop segmented nav */}
            <nav className="hidden md:flex justify-center mt-3">
              <div
                ref={railRef}
                className="navbar-segmented relative inline-flex items-center gap-1 rounded-full p-1.5"
              >
                <div
                  className="navbar-segmented-slider pointer-events-none absolute inset-y-1.5 rounded-full"
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
                    aria-current={
                      activeSection === item.sectionId ? "page" : undefined
                    }
                    className={`navbar-segmented-link ${
                      activeSection === item.sectionId
                        ? "navbar-segmented-link-active"
                        : ""
                    }`}
                  >
                    <item.icon
                      size={NAV_ICON_SIZE}
                      strokeWidth={NAV_ICON_STROKE_WIDTH}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile chips nav */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
              {navItems.map((item) => (
                <a
                  key={item.sectionId}
                  href={item.href}
                  onClick={() => handleNavItemClick(item.sectionId)}
                  aria-current={
                    activeSection === item.sectionId ? "page" : undefined
                  }
                  className={`navbar-mobile-chip flex-1 whitespace-nowrap text-center text-xs sm:text-sm ${
                    activeSection === item.sectionId
                      ? "navbar-mobile-chip-active"
                      : "navbar-mobile-chip-inactive"
                  }`}
                >
                  <item.icon
                    size={NAV_ICON_SIZE - 1}
                    strokeWidth={NAV_ICON_STROKE_WIDTH}
                    className="mr-1 inline-block align-[-2px]"
                    aria-hidden="true"
                  />
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
