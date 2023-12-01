import React, { useState } from "react";
import AuthContext from "../hooks/AuthContext";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (newToken, userId, admin) => {
    setIsLoggedIn(true);
    setToken(newToken);
    setUserId(userId);
    setAdmin(admin);

    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("admin", admin);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setAdmin(false);

    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, userId, admin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
