import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        <main
          style={{
            padding: "30px",
            minHeight: "100vh",
            background: "#F8FAFC",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;