import { createContext, useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  fetchMe
} from "../services/auth.service.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // When App loads, try to get user from cookies
  useEffect(() => {
    const loadUser = async () => {
      try {
        // We first try to get user from backend (/auth/me)
        const { user: me } = await fetchMe();
        setUser(me);
        localStorage.setItem('user', JSON.stringify(me));
      } catch {
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Normal Login
  const login = async (email, password) => {
    const { user } = await loginService(email, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Normal Sign Up
  const register = async (name, email, password) => {
    const res = await registerService(name, email, password);
    console.log(res);
    // Here we could make the user already log in after succesfull sign up, but we want them to re-use the password for verification in case they forget.
  };

  // Logout
  const logout = async () => {
    await logoutService(); // backend clears cookie
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};