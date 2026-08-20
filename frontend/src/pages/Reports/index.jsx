import { useState } from "react";
import toast from "react-hot-toast";
import { Download, Printer, FileType2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";

// Mirrors the sections a real generated report would have — swap the
// static copy below for the actual per-document analysis payload once
// the Spring Boot report-generation endpoint exists.
const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "risk", label: "Risk Analysis" },
  { id: "fairness", label: "Fairness Analysis" },
  { id: "missing", label: "Missing Clauses" },
  { id: "recommendations", label: "Recommendations" },
];

const REPORT = {
  fileName: "Flat_Purchase_Pune.pdf",
  generatedOn: "16 Jul 2026",
  summary:
    "This property sale agreement transfers ownership for ₹42,00,000. Overall Risk Score: 78/100 (High). Fairness Score: 35/100 (Unfair). 3 mandatory clauses are missing.",
  risk:
    "Primary risk drivers: excessive 5%/month penalty and one-sided termination rights favouring the Vendor. Composite score of 78 falls in the Critical zone.",
  fairness:
    "80% of enforceable rights rest with the Vendor while the Purchaser carries 75% of the obligations — a significant imbalance for a fairness score below 40.",
  missing:
    "Refund/Return Clause, Dispute Resolution Mechanism, and Rent Escalation Clause are absent from this agreement.",
  recommendations:
    "Negotiate a capped penalty rate, request a refund clause, and add a dispute-resolution mechanism before signing.",
};

function handleExport(kind) {
  // Frontend-only for now — wire up to a real PDF/DOCX export endpoint
  // (or a client-side generator) once the backend exists.
  toast.success(`${kind} export started — ${REPORT.fileName}`);
}

function Reports() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  function scrollToSection(id) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Report Generation</h1>
            <p className="mt-1 text-slate-500">{REPORT.fileName}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          {/* Report sections jump-menu */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Report Sections
              </p>
              <nav className="mt-2 flex flex-col gap-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeSection === s.id
                        ? "bg-royal/10 text-royal"
                        : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="royal" className="w-full" onClick={() => handleExport("PDF")}>
                <Download size={16} /> Export PDF
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleExport("Word")}>
                <FileType2 size={16} /> Export Word
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => window.print()}>
                <Printer size={16} /> Print
              </Button>
            </div>
          </div>

          {/* Printed-report-style preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="border-b border-slate-200 pb-6 text-center">
              <h2 className="text-2xl font-bold text-navy">Legal Analysis Report</h2>
              <p className="mt-1 text-sm text-slate-500">
                {REPORT.fileName} · Generated {REPORT.generatedOn}
              </p>
            </div>

            <section id="summary" className="scroll-mt-24 border-b border-slate-100 py-6">
              <h3 className="font-semibold text-navy">1. Summary</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{REPORT.summary}</p>
            </section>

            <section id="risk" className="scroll-mt-24 border-b border-slate-100 py-6">
              <h3 className="font-semibold text-navy">2. Risk Analysis</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{REPORT.risk}</p>
            </section>

            <section id="fairness" className="scroll-mt-24 border-b border-slate-100 py-6">
              <h3 className="font-semibold text-navy">3. Fairness Analysis</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{REPORT.fairness}</p>
            </section>

            <section id="missing" className="scroll-mt-24 border-b border-slate-100 py-6">
              <h3 className="font-semibold text-navy">4. Missing Clauses</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{REPORT.missing}</p>
            </section>

            <section id="recommendations" className="scroll-mt-24 py-6">
              <h3 className="font-semibold text-navy">5. Recommendations</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{REPORT.recommendations}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
