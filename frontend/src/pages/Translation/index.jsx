import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";

const CLAUSES = [
  {
    id: "deposit",
    label: "Clause 5 — Security Deposit Terms",
    en: "You may lose your security deposit if rent is paid more than 5 days late.",
    hi: "यदि किराया 5 दिन से अधिक देर से दिया गया, तो आप अपनी सुरक्षा जमा राशि खो सकते हैं।",
    hiConfidence: 93,
    mr: "जर भाडे 5 दिवसांपेक्षा जास्त उशिरा भरले तर तुमची सुरक्षा ठेव जाऊ शकते.",
    mrConfidence: 91,
  },
  {
    id: "notice",
    label: "Clause 2 — Notice Period",
    en: "Either party can end this agreement by giving 15 days written notice.",
    hi: "कोई भी पक्ष 15 दिन का लिखित नोटिस देकर यह समझौता समाप्त कर सकता है।",
    hiConfidence: 95,
    mr: "कोणताही पक्ष 15 दिवसांची लेखी नोटीस देऊन हा करार संपवू शकतो.",
    mrConfidence: 90,
  },
];

function ConfidenceBar({ value }) {
  return (
    <div className="mt-3">
      <p className="text-xs text-slate-400">Translation confidence: {value}%</p>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-teal" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Translation() {
  const [activeId, setActiveId] = useState(CLAUSES[0].id);
  const clause = CLAUSES.find((c) => c.id === activeId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Multilingual Translation</h1>
            <p className="mt-1 text-slate-500">{clause.label}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <select
              value={activeId}
              onChange={(e) => setActiveId(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-royal focus:ring-2 focus:ring-royal/20"
              aria-label="Select clause to translate"
            >
              {CLAUSES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <Button variant="royal"><Download size={16} /> Download</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">English</span>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{clause.en}</p>
            <ConfidenceBar value={100} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">हिंदी (Hindi)</span>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{clause.hi}</p>
            <ConfidenceBar value={clause.hiConfidence} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">मराठी (Marathi)</span>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{clause.mr}</p>
            <ConfidenceBar value={clause.mrConfidence} />
          </div>
        </div>

        <p className="mt-6 flex items-center gap-1.5 text-xs text-slate-400">
          <RefreshCw size={12} /> Translated with a legal-terminology glossary to preserve domain meaning.
        </p>
      </div>
    </div>
  );
}

export default Translation;
