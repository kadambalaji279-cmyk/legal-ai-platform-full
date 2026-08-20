import { Loader2 } from "lucide-react";

function Loader({ size = 18, label = "Loading", showLabel = false, className = "" }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 text-slate-500 ${className}`}
    >
      <Loader2 size={size} className="animate-spin" aria-hidden="true" />
      <span className={showLabel ? "text-sm" : "sr-only"}>{label}</span>
    </span>
  );
}

export default Loader;
