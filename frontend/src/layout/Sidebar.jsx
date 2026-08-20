import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  TrendingUp,
  Scale,
  MessageSquare,
  UserCog,
} from "lucide-react";

const ADMIN_LINKS = [
  { label: "Overview", to: "/admin", icon: LayoutGrid, end: true },
  { label: "My Documents", to: "/admin/documents", icon: FileText },
  { label: "Risk Reports", to: "/admin/risk-reports", icon: TrendingUp },
  { label: "Fairness Reports", to: "/admin/fairness-reports", icon: Scale },
  { label: "Q&A History", to: "/admin/qa-history", icon: MessageSquare },
  { label: "Account", to: "/admin/account", icon: UserCog },
];

function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white sm:block">
      <nav className="flex flex-col gap-1 p-4">
        {ADMIN_LINKS.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-royal/10 text-royal"
                  : "text-slate-600 hover:bg-slate-50 hover:text-navy"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
