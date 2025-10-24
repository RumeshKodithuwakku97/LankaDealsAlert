import React, { createContext, useState, useEffect, useContext } from 'react';
import { firebaseAuth } from '../services/firebaseAuth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, displayName) => {
    const result = await firebaseAuth.register(email, password, displayName);
    return result;
  };

  const login = async (email, password) => {
    const result = await firebaseAuth.login(email, password);
    return result;
  };

  const logout = async () => {
    const result = await firebaseAuth.logout();
    setUser(null);
    return result;
  };

  const value = {
    user,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};