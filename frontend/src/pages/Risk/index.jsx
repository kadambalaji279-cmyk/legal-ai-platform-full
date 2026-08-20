import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import GaugeRing from "../../components/GaugeRing";
import BarChart from "../../components/BarChart";

const RISK = {
  fileName: "Flat_Purchase_Pune.pdf",
  score: 78,
  distribution: [
    { label: "Penalty", value: 82, color: "bg-danger" },
    { label: "Termination", value: 70, color: "bg-amber" },
    { label: "Refund", value: 65, color: "bg-amber" },
    { label: "Charges", value: 40, color: "bg-teal" },
    { label: "Renewal", value: 22, color: "bg-brandgreen" },
  ],
  factors: [
    { factor: "Excessive Penalty (5%/month)", severity: "High", impact: 88 },
    { factor: "One-sided Termination Rights", severity: "High", impact: 82 },
    { factor: "No Refund Protection", severity: "Medium", impact: 60 },
    { factor: "Delayed Possession Risk", severity: "Medium", impact: 55 },
    { factor: "Standard Registration Terms", severity: "Low", impact: 20 },
  ],
  highRiskClause:
    "...the Purchaser shall be liable to pay a penalty of 5% per month on the outstanding amount — this rate is significantly above the 1–2% typically considered fair.",
};

const SEVERITY_TONE = { High: "text-danger", Medium: "text-amber", Low: "text-brandgreen" };

function riskZone(score) {
  if (score >= 75) return "Critical Zone";
  if (score >= 50) return "High Zone";
  if (score >= 25) return "Medium Zone";
  return "Low Zone";
}

function Risk() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link to="/analysis" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-royal">
          <ChevronLeft size={15} /> Back to Analysis
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-navy">Risk Analysis</h1>
        <p className="mt-1 text-slate-500">{RISK.fileName}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="self-start font-semibold text-navy">Composite Risk Meter</h2>
            <div className="mt-6">
              <GaugeRing value={RISK.score} label={riskZone(RISK.score).split(" ")[0]} color="#EF4444" size={160} />
            </div>
            <div className="mt-8 flex w-full justify-between text-xs font-medium text-slate-400">
              <span>0</span>
              <span className="text-brandgreen">Low</span>
              <span className="text-amber">Med</span>
              <span className="text-danger">High</span>
              <span>100</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Risk Distribution</h2>
            <div className="mt-6">
              <BarChart data={RISK.distribution} />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-navy">Risk Factors</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="pb-2 pr-4">Factor</th>
                  <th className="pb-2 pr-4">Severity</th>
                  <th className="pb-2">Impact</th>
                </tr>
              </thead>
              <tbody>
                {RISK.factors.map((f) => (
                  <tr key={f.factor} className="border-b border-slate-100 last:border-none">
                    <td className="py-3 pr-4 text-sm font-medium text-navy">{f.factor}</td>
                    <td className={`py-3 pr-4 text-sm font-semibold ${SEVERITY_TONE[f.severity]}`}>{f.severity}</td>
                    <td className="py-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${f.severity === "High" ? "bg-danger" : f.severity === "Medium" ? "bg-amber" : "bg-brandgreen"}`}
                          style={{ width: `${f.impact}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-danger bg-danger/5 p-5">
          <h2 className="font-semibold text-danger">High-Risk Clause Highlighted</h2>
          <p className="mt-2 text-sm italic text-slate-700">&ldquo;{RISK.highRiskClause}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

export default Risk;
