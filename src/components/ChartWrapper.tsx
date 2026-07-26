export function ChartWrapper({
  points,
  height = 120,
  color = "#0d9488",
}: {
  points: number[];
  height?: number;
  color?: string;
}) {
  const width = 300;
  const padding = 8;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((p - min) / range) * (height - padding * 2);
    return [x, y] as const;
  });

  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={color} />
      ))}
    </svg>
  );
}
