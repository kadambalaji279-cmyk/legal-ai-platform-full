import { useState } from "react";
import Navbar from "../../components/Navbar";

const VERSION_OPTIONS = [
  { id: "v1", label: "Loan_Contract_v1.pdf", date: "02 Jun 2026" },
  { id: "v2", label: "Loan_Contract_v2.pdf", date: "14 Jul 2026" },
];

const CLAUSES = [
  { label: "Clause 3", a: { text: "Penalty for delayed payment: ", highlight: "2% per month.", type: null }, b: { text: "Penalty for delayed payment: ", highlight: "5% per month.", type: "modified" } },
  { label: "Clause 5", a: { text: "Refund clause included in full.", highlight: null, type: null }, b: { text: "", highlight: "[Refund clause removed]", type: "removed" } },
  { label: "Clause 7", a: { text: "This agreement is valid for 12 months.", highlight: null, type: null }, b: { text: "This agreement is valid for 12 months and ", highlight: "auto-renews for 11 months.", type: "added" } },
];

const SUMMARY = [
  { type: "modified", label: "Penalty for delayed payment: 5% per month" },
  { type: "removed", label: "Refund clause removed entirely" },
  { type: "added", label: "New clause: Auto-renewal for 11 months added" },
];

const TYPE_STYLES = {
  modified: "bg-amber/20 text-amber-900",
  removed: "bg-danger/20 text-danger line-through decoration-danger/60",
  added: "bg-brandgreen/20 text-emerald-900",
};

const BADGE_STYLES = {
  modified: "bg-amber/10 text-amber",
  removed: "bg-danger/10 text-danger",
  added: "bg-brandgreen/10 text-brandgreen",
};

function Compare() {
  const [versionA, setVersionA] = useState(VERSION_OPTIONS[0].id);
  const [versionB, setVersionB] = useState(VERSION_OPTIONS[1].id);

  const docA = VERSION_OPTIONS.find((v) => v.id === versionA);
  const docB = VERSION_OPTIONS.find((v) => v.id === versionB);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-bold text-navy">Agreement Comparison</h1>
        <p className="mt-1 text-slate-500">{docA?.label} vs {docB?.label}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Version A</span>
            <select value={versionA} onChange={(e) => setVersionA(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-royal focus:ring-2 focus:ring-royal/20">
              {VERSION_OPTIONS.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Version B</span>
            <select value={versionB} onChange={(e) => setVersionB(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-royal focus:ring-2 focus:ring-royal/20">
              {VERSION_OPTIONS.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Version A — {docA?.date}
            </span>
            <div className="mt-4 space-y-3">
              {CLAUSES.map((c) => (
                <p key={c.label} className="text-sm leading-relaxed">
                  <span className="font-medium text-navy">{c.label}: </span>
                  <span className="text-slate-600">{c.a.text}</span>
                  {c.a.highlight && <span className="text-slate-600">{c.a.highlight}</span>}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">
              Version B — {docB?.date}
            </span>
            <div className="mt-4 space-y-3">
              {CLAUSES.map((c) => (
                <p key={c.label} className="text-sm leading-relaxed">
                  <span className="font-medium text-navy">{c.label}: </span>
                  <span className="text-slate-600">{c.b.text}</span>
                  {c.b.highlight && <span className={`rounded px-1 ${TYPE_STYLES[c.b.type]}`}>{c.b.highlight}</span>}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-navy">Comparison Summary</h2>
          <ul className="mt-4 space-y-3">
            {SUMMARY.map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${BADGE_STYLES[s.type]}`}>{s.type}</span>
                <span className="text-slate-600">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Compare;
