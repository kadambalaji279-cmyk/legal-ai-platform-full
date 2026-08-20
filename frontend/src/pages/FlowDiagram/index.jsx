import { ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";

const STEPS = ["Landing", "Login", "Upload", "OCR", "Classification", "Risk", "Fairness", "Q&A", "Report Download"];

function FlowDiagram() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-bold text-navy">Complete User Flow Diagram</h1>
        <p className="mt-1 text-slate-500">End-to-end citizen journey through the platform</p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex min-w-max items-start gap-2">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-start">
                <div className="flex w-28 flex-col items-center gap-2 text-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal text-sm font-bold text-white">{i + 1}</span>
                  <span className="text-xs font-medium text-navy">{step}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={18} className="mt-2.5 shrink-0 text-slate-300" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-navy">Flow Narrative</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            A citizen lands on the homepage and signs in or registers →
            uploads a legal document (PDF or scan) → the OCR engine
            extracts clean text → clauses are classified by type → Risk
            and Fairness analysis run in parallel with missing-clause
            detection → the citizen reviews the dashboard, asks
            follow-up questions via the Legal Q&amp;A chat, and finally
            downloads a structured report in their preferred language.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FlowDiagram;
