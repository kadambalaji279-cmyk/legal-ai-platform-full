import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#0F172A",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
