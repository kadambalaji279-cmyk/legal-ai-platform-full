import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert, Lightbulb, ChevronLeft } from "lucide-react";
import Navbar from "../../components/Navbar";

const CHECKLIST = [
  { label: "Notice Period Clause", present: true },
  { label: "Security Deposit Terms", present: true },
  { label: "Refund / Return Clause", present: false },
  { label: "Maintenance Responsibility", present: true },
  { label: "Dispute Resolution Mechanism", present: false },
  { label: "Termination Conditions", present: true },
  { label: "Rent Escalation Clause", present: false },
  { label: "Registration & Stamp Duty", present: true },
];

const missingCount = CHECKLIST.filter((c) => !c.present).length;

function MissingClauses() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link to="/analysis" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-royal">
          <ChevronLeft size={15} /> Back to Analysis
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-navy">Missing Clause Detection</h1>
        <p className="mt-1 text-slate-500">Flat_Purchase_Pune.pdf</p>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-amber/10 px-5 py-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p className="font-semibold text-navy">{missingCount} mandatory clauses are missing from this agreement</p>
            <p className="mt-0.5 text-sm text-amber">This may leave you legally unprotected in a dispute.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-semibold text-navy">Mandatory Clause Checklist</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {CHECKLIST.map((item) => (
                <li key={item.label} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-2.5">
                    {item.present ? (
                      <CheckCircle2 size={18} className="shrink-0 text-brandgreen" aria-hidden="true" />
                    ) : (
                      <XCircle size={18} className="shrink-0 text-danger" aria-hidden="true" />
                    )}
                    <span className="text-sm font-medium text-navy">{item.label}</span>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.present ? "bg-brandgreen/10 text-brandgreen" : "bg-danger/10 text-danger"}`}>
                    {item.present ? "Present" : "Missing"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-danger/20 bg-danger/5 p-6">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-danger" aria-hidden="true" />
                <h2 className="font-semibold text-danger">Risk Impact</h2>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Without a Refund Clause, you may lose your entire deposit even
                for a technical default. Missing Dispute Resolution means
                costly civil court is your only option.
              </p>
            </div>

            <div className="rounded-2xl border border-royal/20 bg-royal/5 p-6">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-royal" aria-hidden="true" />
                <h2 className="font-semibold text-royal">Recommendation</h2>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Request the landlord add a refund-timeline clause and an
                arbitration clause before signing. Suggested wording is
                available in your report.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissingClauses;
