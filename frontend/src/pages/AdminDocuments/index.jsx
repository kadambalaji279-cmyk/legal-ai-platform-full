import { FileText } from "lucide-react";
import AdminSection from "../Admin/AdminSection";
export default function AdminDocuments() {
  return <AdminSection title="My Documents" icon={FileText} description="A searchable table of every document processed platform-wide will live here once the admin API is connected." />;
}
