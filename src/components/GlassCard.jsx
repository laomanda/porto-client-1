export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-white/40 bg-white/60 p-6 shadow-[0_10px_40px_rgba(15,61,58,0.08)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}