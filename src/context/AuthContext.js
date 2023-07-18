import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Function to handle user signup
  const handleSignup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        handleLogin,
        handleSignup,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
