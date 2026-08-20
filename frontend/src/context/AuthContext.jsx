import { createContext, useContext, useState } from "react";

// Frontend-only auth flag. Swap the login()/logout() bodies for real
// calls to the Spring Boot auth API (store the returned token, decode
// the user, etc.) once the backend is wired up — every consumer of
// useAuth() elsewhere in the app stays unchanged.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
