import { FileText } from "lucide-react";
import Badge from "../Badge";

const RISK_VARIANT = {
  "High Risk": "high",
  "Medium Risk": "medium",
  "Low Risk": "low",
};

function DocumentCard({ name, type, status, riskScore, date, onClick }) {
  return (
    <tr
      onClick={onClick}
      className="cursor-pointer border-b border-slate-100 last:border-none hover:bg-slate-50"
    >
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2.5">
          <FileText size={16} className="shrink-0 text-danger" />
          <span className="text-sm font-medium text-navy">{name}</span>
        </div>
      </td>
      <td className="py-3 pr-4 text-sm text-slate-500">{type}</td>
      <td className="py-3 pr-4">
        <Badge variant={RISK_VARIANT[status] || "neutral"}>{status}</Badge>
      </td>
      <td className="py-3 pr-4 text-sm font-medium text-navy">{riskScore}</td>
      <td className="py-3 text-sm text-slate-500">{date}</td>
    </tr>
  );
}

export default DocumentCard;
