import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import Processing from "../pages/Processing";
import Analysis from "../pages/Analysis";
import Classification from "../pages/Classification";
import MissingClauses from "../pages/MissingClauses";
import Risk from "../pages/Risk";
import Fairness from "../pages/Fairness";
import Compare from "../pages/Compare";
import Chat from "../pages/Chat";
import Translation from "../pages/Translation";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import AdminOverview from "../pages/Admin";
import AdminDocuments from "../pages/AdminDocuments";
import AdminRiskReports from "../pages/AdminRiskReports";
import AdminFairnessReports from "../pages/AdminFairnessReports";
import AdminQaHistory from "../pages/AdminQaHistory";
import AdminAccount from "../pages/AdminAccount";
import FlowDiagram from "../pages/FlowDiagram";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/documents" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/classification" element={<Classification />} />
        <Route path="/analysis/missing-clauses" element={<MissingClauses />} />
        <Route path="/analysis/risk" element={<Risk />} />
        <Route path="/analysis/fairness" element={<Fairness />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/qa" element={<Chat />} />
        <Route path="/translate" element={<Translation />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/documents" element={<AdminDocuments />} />
        <Route path="/admin/risk-reports" element={<AdminRiskReports />} />
        <Route path="/admin/fairness-reports" element={<AdminFairnessReports />} />
        <Route path="/admin/qa-history" element={<AdminQaHistory />} />
        <Route path="/admin/account" element={<AdminAccount />} />
        <Route path="/flow" element={<FlowDiagram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
