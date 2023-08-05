// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null); // add this


  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem('token'));
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedIn(true);
    setCurrentUser(user);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const AutoContext = createContext();
