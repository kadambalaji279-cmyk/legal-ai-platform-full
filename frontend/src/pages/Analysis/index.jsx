import { Link, useLocation } from "react-router-dom";
import { Download, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import GaugeRing from "../../components/GaugeRing";

const RESULT = {
  fileName: "Flat_Purchase_Pune.pdf",
  processedAgo: "2 hours ago",
  clausesClassified: 12,
  riskScore: 78,
  fairnessScore: 35,
  missingClauses: 3,
  totalClauses: 12,
  documentType: "Property Sale",
  summary:
    "This property sale agreement transfers ownership for ₹42,00,000 with possession within 90 days. Penalty clauses impose a 5% charge for delayed payment, and termination rights favour the seller.",
  insights: [
    { icon: AlertTriangle, tone: "danger", text: "Refund clause is absent — buyer has no protection if the deal falls through." },
    { icon: AlertTriangle, tone: "amber", text: "Termination rights are one-sided in favour of the seller." },
    { icon: CheckCircle2, tone: "brandgreen", text: "Registration charge allocation is clearly defined." },
  ],
  riskBreakdown: [
    { label: "Penalty Severity", value: 82, tone: "bg-danger" },
    { label: "Unilateral Termination Rights", value: 70, tone: "bg-amber" },
    { label: "Missing Refund Protection", value: 65, tone: "bg-amber" },
    { label: "Excessive Charges", value: 40, tone: "bg-teal" },
  ],
};

const KPI_TONE = { danger: "text-danger", amber: "text-amber", brandgreen: "text-brandgreen" };

function KpiCard({ label, value, icon: Icon, tone = "text-navy", to }) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
        {Icon && <Icon size={16} className={tone} />}
      </div>
      <p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p>
    </>
  );

  const className =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all" +
    (to ? " hover:-translate-y-0.5 hover:shadow-md hover:border-royal/30" : "");

  return to ? (
    <Link to={to} className={className}>{content}</Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

function Analysis() {
  const { state } = useLocation();
  const fileName = state?.fileName || RESULT.fileName;
  const riskBand = RESULT.riskScore >= 75 ? "High Risk" : RESULT.riskScore >= 50 ? "Medium Risk" : "Low Risk";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Analysis Result — {fileName}</h1>
            <p className="mt-1 text-sm text-slate-500">
              Processed {RESULT.processedAgo} · {RESULT.clausesClassified} clauses classified
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button variant="outline"><Download size={16} /> Export</Button>
            <Button variant="royal">View Full Report</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard label="Risk Score" value={`${RESULT.riskScore}/100`} tone="text-danger" to="/analysis/risk" />
          <KpiCard label="Fairness Score" value={`${RESULT.fairnessScore}/100`} tone="text-amber" to="/analysis/fairness" />
          <KpiCard label="Missing Clauses" value={`${RESULT.missingClauses} of ${RESULT.totalClauses}`} icon={AlertTriangle} tone="text-navy" to="/analysis/missing-clauses" />
          <KpiCard label="Document Type" value={RESULT.documentType} icon={FileText} tone="text-navy" to="/analysis/classification" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Link to="/analysis/risk" className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-danger/30 hover:shadow-md">
            <h2 className="self-start font-semibold text-navy">Risk Gauge</h2>
            <div className="mt-6 mb-2">
              <GaugeRing value={RESULT.riskScore} label={riskBand.split(" ")[0]} color="#EF4444" size={140} />
            </div>
            <span className="mt-2 text-xs font-medium text-slate-400 group-hover:text-danger">View full breakdown →</span>
          </Link>

          <Link to="/analysis/fairness" className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber/30 hover:shadow-md">
            <h2 className="self-start font-semibold text-navy">Fairness Meter</h2>
            <div className="mt-6 mb-2">
              <GaugeRing value={RESULT.fairnessScore} label="Unfair" color="#F59E0B" size={140} />
            </div>
            <span className="mt-2 text-xs font-medium text-slate-400 group-hover:text-amber">View full breakdown →</span>
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Document Summary</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{RESULT.summary}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">AI Insights</h2>
            <ul className="mt-4 space-y-3">
              {RESULT.insights.map(({ icon: Icon, tone, text }, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <Icon size={16} className={`mt-0.5 shrink-0 ${KPI_TONE[tone]}`} />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Risk Breakdown</h2>
            <div className="mt-4 space-y-4">
              {RESULT.riskBreakdown.map(({ label, value, tone }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-navy">{label}</span>
                    <span className="text-slate-500">{value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
