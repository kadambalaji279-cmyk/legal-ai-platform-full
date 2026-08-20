import AdminLayout from "../../layout/AdminLayout";
import EmptyState from "../../components/EmptyState";

function AdminSection({ title, icon, description }) {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-navy">{title}</h1>
      <div className="mt-6">
        <EmptyState icon={icon} title={`${title} coming soon`} description={description} />
      </div>
    </AdminLayout>
  );
}

export default AdminSection;
