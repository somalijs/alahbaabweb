'use client';
import React, { ReactNode } from 'react';
import { createContext, useState, useContext } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  data?: any; // Define a more specific type if needed
  message?: string;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

const defaultAuthState: AuthState = {
  isLoggedIn: false,
  data: null,
  message: '',
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({
  children,
  Auth,
}: {
  children: ReactNode;
  Auth?: AuthState;
}) => {
  const [auth, setAuth] = useState<AuthState>(Auth || defaultAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context?.auth;
};
export const useSetAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context?.setAuth;
};
