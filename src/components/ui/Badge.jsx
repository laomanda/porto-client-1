export default function Badge({ children }) {
  return (
    <span className="relative inline-flex overflow-hidden rounded-full border border-brand-gold/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(247,243,235,0.92)_52%,rgba(243,237,226,0.94)_100%)] px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(15,61,58,0.08)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-full border border-white/60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-[1px] h-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_100%)]"
      />
      <span className="relative inline-flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-[linear-gradient(180deg,#d9bc88_0%,#c8a96b_100%)] shadow-[0_0_0_3px_rgba(200,169,107,0.12)]"
        />
        <span className="[font-family:var(--font-ui-premium)] text-[0.72rem] font-bold uppercase tracking-[0.24em] text-brand-green">
          {children}
        </span>
      </span>
    </span>
  );
}
