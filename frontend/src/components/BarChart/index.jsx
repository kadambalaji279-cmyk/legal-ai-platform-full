function BarChart({ data, max = 100, height = 160 }) {
  return (
    <div className="flex items-end justify-between gap-3" style={{ height }}>
      {data.map(({ label, value, color }) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-sm font-bold text-navy">{value}</span>
          <div className="flex w-full flex-1 items-end">
            <div
              className={`w-full rounded-t-md ${color}`}
              style={{ height: `${Math.min(value, max) / max * 100}%` }}
            />
          </div>
          <span className="text-center text-xs text-slate-500">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
