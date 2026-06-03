import { createContext, useContext, useState, useEffect } from "react";
import { logout as logoutService, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return;
    getCurrentUser()
      .then((userData) => setUser(userData))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
      });
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={[user, token, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth custom hook för att slippa impoertera AuthContext och useContext i varje komponent
export const useAuth = () => useContext(AuthContext);
