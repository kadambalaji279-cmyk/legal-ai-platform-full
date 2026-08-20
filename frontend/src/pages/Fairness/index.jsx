import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import GaugeRing from "../../components/GaugeRing";
import BarChart from "../../components/BarChart";
import RadarChart from "../../components/RadarChart";

const FAIRNESS = {
  fileName: "Flat_Purchase_Pune.pdf",
  score: 35,
  landlordRights: 8,
  tenantRights: 2,
  rightsVsObligations: [
    { label: "Vendor Rights", value: 80, color: "bg-royal" },
    { label: "Vendor Oblig.", value: 30, color: "bg-royal/40" },
    { label: "Buyer Rights", value: 20, color: "bg-teal/60" },
    { label: "Buyer Oblig.", value: 75, color: "bg-teal" },
  ],
  radar: [
    { label: "Rights", value: 80 },
    { label: "Penalties", value: 70 },
    { label: "Protections", value: 25 },
    { label: "Obligations", value: 65 },
    { label: "Flexibility", value: 35 },
  ],
  explanation:
    "This agreement is skewed in favour of the Vendor: 80% of enforceable rights (termination, penalty collection, forfeiture) rest with the Vendor, while the Purchaser carries 75% of the obligations (payment, timelines, registration cost). A fairness score below 40 indicates a significant imbalance that a citizen should renegotiate before signing.",
};

function Fairness() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link to="/analysis" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-royal">
          <ChevronLeft size={15} /> Back to Analysis
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-navy">Fairness Analysis</h1>
        <p className="mt-1 text-slate-500">Rights vs obligations distribution between both parties</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="self-start font-semibold text-navy">Fairness Score</h2>
            <div className="mt-6">
              <GaugeRing value={FAIRNESS.score} label="Unfair" color="#F59E0B" size={140} />
            </div>
            <p className="mt-8 text-sm text-slate-500">
              Landlord Rights: {FAIRNESS.landlordRights} &middot; Tenant Rights: {FAIRNESS.tenantRights}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Rights vs Obligations</h2>
            <div className="mt-6">
              <BarChart data={FAIRNESS.rightsVsObligations} />
            </div>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="self-start font-semibold text-navy">Balance Radar</h2>
            <div className="mt-4">
              <RadarChart axes={FAIRNESS.radar} color="#2563EB" size={200} />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-navy">AI Explanation</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{FAIRNESS.explanation}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">Imbalance Detected</span>
            <span className="rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">Renegotiation Recommended</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fairness;
