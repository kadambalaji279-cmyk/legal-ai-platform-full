function RadarChart({ axes, max = 100, size = 220, color = "#2563EB" }) {
  const center = size / 2;
  const radius = size / 2 - 34;
  const angleFor = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;

  const pointFor = (i, value) => {
    const r = (Math.min(value, max) / max) * radius;
    const angle = angleFor(i);
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  const polygonPoints = axes.map((a, i) => pointFor(i, a.value).join(",")).join(" ");
  const rings = [0.33, 0.66, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Balance radar chart">
      {rings.map((r) => (
        <polygon
          key={r}
          points={axes
            .map((_, i) => {
              const angle = angleFor(i);
              return `${center + radius * r * Math.cos(angle)},${center + radius * r * Math.sin(angle)}`;
            })
            .join(" ")}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={1}
        />
      ))}

      {axes.map((_, i) => {
        const angle = angleFor(i);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="#E2E8F0"
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={polygonPoints}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={2}
      />
      {axes.map((a, i) => {
        const [x, y] = pointFor(i, a.value);
        return <circle key={a.label} cx={x} cy={y} r={3} fill={color} />;
      })}

      {axes.map((a, i) => {
        const angle = angleFor(i);
        const lx = center + (radius + 20) * Math.cos(angle);
        const ly = center + (radius + 20) * Math.sin(angle);
        return (
          <text
            key={a.label}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500"
            fontSize="11"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

export default RadarChart;
