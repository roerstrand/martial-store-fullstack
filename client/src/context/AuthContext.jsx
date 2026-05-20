import { createContext, useContext, useState } from "react";
import { logout as logoutService } from "../services/authService";

//Skapa en react context som senare i filen fylls med bärden med provider
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

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
