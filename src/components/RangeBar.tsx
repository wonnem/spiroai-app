export function RangeBar({
  label,
  value,
  unit,
  min,
  max,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}) {
  const span = max - min;
  const pct = Math.max(0, Math.min(100, ((value - min) / span) * 100));
  const inRange = value >= min && value <= max;

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {value.toFixed(1)} {unit}{" "}
          <span className="text-slate-400">
            (normal {min.toFixed(1)}–{max.toFixed(1)})
          </span>
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
        <div
          className={`h-2 rounded-full ${inRange ? "bg-emerald-500" : "bg-amber-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
