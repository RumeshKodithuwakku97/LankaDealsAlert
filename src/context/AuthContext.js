import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock login function for testing
  const login = async (email, password) => {
    console.log('Login attempted:', email);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { email, uid: '123' };
        setCurrentUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading: false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;