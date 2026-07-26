import { RiskTier, tierStyle } from "@/lib/mockData";

export function RiskBadge({ tier, size = "md" }: { tier: RiskTier; size?: "sm" | "md" }) {
  const s = tierStyle[tier];
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${s.bg} ${s.text} ${padding}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
