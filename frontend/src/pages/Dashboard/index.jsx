import { Link } from "react-router-dom";
import {
  Upload,
  MessageSquare,
  GitCompareArrows,
  FileBarChart2,
  TrendingUp,
  FileText,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import StatCard from "../../components/StatCard";
import DocumentCard from "../../components/DocumentCard";
import EmptyState from "../../components/EmptyState";

const RECENT_DOCUMENTS = [
  { name: "Rental_Agreement_Andheri.pdf", type: "Rental", status: "High Risk", riskScore: "78/100", date: "12 Jul 2026" },
  { name: "HDFC_Loan_Contract.pdf", type: "Loan", status: "Medium Risk", riskScore: "54/100", date: "09 Jul 2026" },
  { name: "Offer_Letter_Infosys.pdf", type: "Employment", status: "Low Risk", riskScore: "22/100", date: "03 Jul 2026" },
  { name: "Flat_Purchase_Pune.pdf", type: "Property", status: "High Risk", riskScore: "81/100", date: "28 Jun 2026" },
];

const ACTIVITY = [
  { icon: Upload, title: "Uploaded Flat_Purchase_Pune.pdf", time: "2 hours ago" },
  { icon: TrendingUp, title: "Risk report generated (81/100)", time: "2 hours ago" },
  { icon: MessageSquare, title: 'Asked: "What is the notice period?"', time: "Yesterday" },
  { icon: GitCompareArrows, title: "Compared two loan contract versions", time: "3 days ago" },
];

const QUICK_ACTIONS = [
  { icon: Upload, title: "Upload Document", description: "Analyse a new agreement", to: "/upload" },
  { icon: MessageSquare, title: "Ask Legal Question", description: "Get grounded answers", to: "/qa" },
  { icon: GitCompareArrows, title: "Compare Agreements", description: "Spot version changes", to: "/compare" },
  { icon: FileBarChart2, title: "View Reports", description: "Download past analyses", to: "/reports" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-navy to-secondary px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-300">
              Here's what's happening with your documents this week.
            </p>
          </div>
          <Button as={Link} to="/upload" variant="teal" className="shrink-0">
            <Upload size={16} /> New Upload
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <StatCard key={action.title} {...action} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy">Recent Documents</h2>
              <Link to="/documents" className="text-sm font-medium text-royal hover:underline">
                View all
              </Link>
            </div>

            <div className="mt-4 overflow-x-auto">
              {RECENT_DOCUMENTS.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No documents yet"
                  description="Upload your first agreement to see risk, fairness, and clause insights here."
                  action={
                    <Button as={Link} to="/upload" variant="royal">
                      <Upload size={16} /> Upload a document
                    </Button>
                  }
                />
              ) : (
                <table className="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <th className="pb-2 pr-4 font-semibold">Document</th>
                      <th className="pb-2 pr-4 font-semibold">Type</th>
                      <th className="pb-2 pr-4 font-semibold">Status</th>
                      <th className="pb-2 pr-4 font-semibold">Risk Score</th>
                      <th className="pb-2 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_DOCUMENTS.map((doc) => (
                      <DocumentCard key={doc.name} {...doc} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Activity Timeline</h2>
            <ul className="mt-4 space-y-5">
              {ACTIVITY.map(({ icon: Icon, title, time }, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal/10 text-royal">
                    <Icon size={14} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-navy">{title}</p>
                    <p className="text-xs text-slate-400">{time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
