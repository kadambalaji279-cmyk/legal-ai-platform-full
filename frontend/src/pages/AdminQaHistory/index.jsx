import { MessageSquare } from "lucide-react";
import AdminSection from "../Admin/AdminSection";
export default function AdminQaHistory() {
  return <AdminSection title="Q&A History" icon={MessageSquare} description="Every question citizens have asked the Legal Q&A engine, for reviewing answer quality, will live here." />;
}
