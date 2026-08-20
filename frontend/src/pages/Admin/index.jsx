import AdminLayout from "../../layout/AdminLayout";
import GaugeRing from "../../components/GaugeRing";
import Badge from "../../components/Badge";

const KPIS = [
  { label: "Total Users", value: "4,812", tone: "text-royal" },
  { label: "Documents Processed", value: "48,120", tone: "text-teal" },
  { label: "Avg. Risk Score", value: "61.4", tone: "text-amber" },
  { label: "Model Accuracy (F1)", value: "0.87", tone: "text-brandgreen" },
];

const MONTHLY = [
  { month: "Feb", value: 22 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 41 },
  { month: "May", value: 58 },
  { month: "Jun", value: 76 },
  { month: "Jul", value: 90 },
];

const ACTIVITY = [
  { user: "rohan.patil@gmail.com", action: "Uploaded document", status: "success", time: "2 min ago" },
  { user: "system", action: "InLegalBERT model retrained", status: "info", time: "1 hr ago" },
  { user: "priya.k@gmail.com", action: "Asked Q&A question", status: "success", time: "3 hr ago" },
  { user: "system", action: "OCR fallback triggered (Tesseract)", status: "warning", time: "5 hr ago" },
];

const STATUS_LABEL = { success: "Success", info: "Info", warning: "Warning" };

function AdminOverview() {
  const maxValue = Math.max(...MONTHLY.map((m) => m.value));

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-navy">Admin Panel</h1>
      <p className="mt-1 text-slate-500">Platform-wide analytics &amp; model performance</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{k.label}</p>
            <p className={`mt-2 text-2xl font-bold ${k.tone}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-navy">Document Analytics (Monthly)</h2>
          <div className="mt-6 flex h-40 items-end justify-between gap-3">
            {MONTHLY.map((m, i) => {
              const isLast = i === MONTHLY.length - 1;
              return (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-sm font-bold text-navy">{m.value}</span>
                  <div className="flex w-full flex-1 items-end">
                    <div className={`w-full rounded-t-md ${isLast ? "bg-teal" : "bg-royal"}`} style={{ height: `${(m.value / maxValue) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="self-start font-semibold text-navy">Model Performance</h2>
          <div className="mt-6">
            <GaugeRing value={87} label="F1 Score" color="#22C55E" size={140} />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-navy">Recent Activity</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-2 pr-4">User</th>
                <th className="pb-2 pr-4">Action</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((a, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-none">
                  <td className="py-3 pr-4 text-sm text-slate-600">{a.user}</td>
                  <td className="py-3 pr-4 text-sm font-medium text-navy">{a.action}</td>
                  <td className="py-3 pr-4"><Badge variant={a.status}>{STATUS_LABEL[a.status]}</Badge></td>
                  <td className="py-3 text-sm text-slate-400">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOverview;
