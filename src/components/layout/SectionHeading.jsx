const alignments = {
  left: "text-left items-start",
  center: "text-center items-center",
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}) {
  const alignment = alignments[align] ?? alignments.left;
  const descriptionWidth = align === "center" ? "max-w-3xl" : "max-w-2xl";

  const titleColor = theme === "dark" ? "text-luxury-gradient-light" : "text-luxury-gradient";
  const descColor = theme === "dark" ? "text-white/80" : "text-brand-muted/90";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow ? (
        <p className="text-gold-shimmer text-xs font-bold uppercase tracking-[0.3em] sm:text-sm">
          {eyebrow}
        </p>
      ) : null}

      <h2 className={`${titleColor} mt-4 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl`}>
        {title}
      </h2>

      {description ? (
        <p className={`mt-6 text-base leading-relaxed sm:text-lg ${descColor} ${descriptionWidth}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
