import { createContext, useState, useEffect } from "react";
import { login as loginService } from "../services/auth.service.js";
import { setAuthToken } from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setAuthToken(storedToken);
    }
  }, []);;

  const login = async (email, password) => {
    const { token, user } = await loginService(email, password);

    setToken(token);
    setUser(user);

    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};