import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Stepper from "../../components/Stepper";

const STEPS = ["Upload", "OCR", "Clause Classification", "Risk Analysis", "Fairness Analysis", "Report Generation"];

const PREVIEW_LINES = [
  "AGREEMENT FOR SALE",
  "This deed of agreement is made between the Vendor and the Purchaser...",
  "Clause 1: Total Consideration Rs. 42,00,000.",
  "Clause 2: Possession shall be handed over within...",
  "Clause 3: Penalty for delayed payment...",
  "Clause 4: Registration charges shall be borne by...",
];

function Processing() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileName = state?.fileName || "Document.pdf";

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= STEPS.length) {
      const t = setTimeout(() => navigate("/analysis"), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentIndex((i) => i + 1), 1400);
    return () => clearTimeout(t);
  }, [currentIndex, navigate]);

  const progress = Math.round((currentIndex / STEPS.length) * 100);
  const activeStepLabel = STEPS[Math.min(currentIndex, STEPS.length - 1)];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-bold text-navy">Processing your document</h1>
        <p className="mt-1 text-slate-500">{fileName} · AI pipeline running</p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Stepper steps={STEPS} currentIndex={currentIndex} />

          <div className="mt-8 flex items-center justify-between text-sm">
            <span className="font-medium text-navy">
              Step {Math.min(currentIndex + 1, STEPS.length)} of {STEPS.length} · {activeStepLabel}
            </span>
            <span className="text-slate-500">{progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-royal to-teal transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Document Preview</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-5">
              {PREVIEW_LINES.map((line, i) => (
                <p key={i} className={`mb-2 text-sm leading-relaxed ${i === 0 ? "text-center font-semibold text-navy" : "text-slate-400"}`}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Processing Status</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {STEPS.map((step, i) => {
                const done = i < currentIndex;
                const running = i === currentIndex;
                return (
                  <li key={step} className="flex items-center justify-between py-3">
                    <span className="text-sm text-navy">{step}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${done ? "bg-brandgreen/10 text-brandgreen" : running ? "bg-royal/10 text-royal" : "bg-slate-100 text-slate-500"}`}>
                      {done ? "Done" : running ? "Running" : "Queued"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Processing;
