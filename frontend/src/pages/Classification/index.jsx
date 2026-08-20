import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import EmptyState from "../../components/EmptyState";

const CLAUSES = [
  { id: "c1", type: "Payment", confidence: 94, text: "The Purchaser shall pay the Vendor a total consideration of Rs. 42,00,000 in three instalments as per Schedule A." },
  { id: "c2", type: "Termination", confidence: 89, text: "Either party may terminate this agreement by providing 15 days written notice, provided that the Purchaser has defaulted on payment." },
  { id: "c3", type: "Penalty", confidence: 91, text: "In the event of delayed payment beyond 30 days, the Purchaser shall be liable to pay a penalty of 5% per month on the outstanding amount." },
  { id: "c4", type: "Deposit", confidence: 97, text: "The Purchaser has paid an advance deposit of Rs. 4,20,000, receipt of which is acknowledged by the Vendor." },
  { id: "c5", type: "Renewal", confidence: 76, text: "This agreement shall be governed by the laws of the state of Maharashtra." },
];

const TYPE_STYLES = {
  Payment: { badge: "bg-royal/10 text-royal", ring: "ring-royal/40" },
  Termination: { badge: "bg-danger/10 text-danger", ring: "ring-danger/40" },
  Penalty: { badge: "bg-amber/10 text-amber", ring: "ring-amber/40" },
  Deposit: { badge: "bg-brandgreen/10 text-brandgreen", ring: "ring-brandgreen/40" },
  Renewal: { badge: "bg-teal/10 text-teal", ring: "ring-teal/40" },
};

function Classification() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLAUSES;
    return CLAUSES.filter((c) => c.type.toLowerCase().includes(q) || c.text.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link to="/analysis" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-royal">
          <ChevronLeft size={15} /> Back to Analysis
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-navy">Clause Classification</h1>
        <p className="mt-1 text-slate-500">Flat_Purchase_Pune.pdf · {CLAUSES.length} clauses classified</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Document Viewer</h2>
            <div className="mt-4 space-y-4 rounded-xl bg-slate-50 p-5">
              <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy">
                Agreement for Sale of Immovable Property
              </p>
              {CLAUSES.map((c, i) => {
                const style = TYPE_STYLES[c.type];
                const selected = selectedId === c.id;
                return (
                  <p
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selected}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedId(c.id)}
                    className={`cursor-pointer rounded-lg px-2 py-1 text-sm leading-relaxed transition-all ${selected ? `bg-white ring-2 ${style.ring}` : "hover:bg-white/70"}`}
                  >
                    <span className="font-medium text-navy">Clause {i + 1}: </span>
                    <span className="text-slate-600">{c.text}</span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Classified Clauses</h2>

            <div className="relative mt-4">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clauses (e.g. penalty, notice period)"
                aria-label="Search clauses"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-royal focus:ring-2 focus:ring-royal/20"
              />
            </div>

            <div className="mt-4 max-h-[520px] space-y-3 overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <EmptyState icon={Search} title="No clauses match your search" description="Try a different keyword like “penalty” or “termination”." />
              ) : (
                filtered.map((c) => {
                  const style = TYPE_STYLES[c.type];
                  const selected = selectedId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${selected ? `border-transparent bg-white ring-2 ${style.ring}` : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>{c.type}</span>
                        <span className="text-xs text-slate-400">{c.confidence}% confidence</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        &ldquo;{c.text.length > 90 ? c.text.slice(0, 90) + "…" : c.text}&rdquo;
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classification;
