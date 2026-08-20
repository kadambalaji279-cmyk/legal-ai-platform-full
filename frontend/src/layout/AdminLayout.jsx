import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
