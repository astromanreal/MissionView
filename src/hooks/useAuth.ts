
'use client';

import React, { useState, useEffect, createContext, useContext, useCallback, useMemo, type ReactNode } from 'react';
import type { CurrentUser, LoginFormData, SignupFormData } from '@/types/auth';
import { login as loginAction, signup as signupAction, deleteAccount as deleteAccountAction } from '@/app/actions/auth';

interface AuthContextType {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isUser: boolean;
  isScientist: boolean;
  isAdmin: boolean;
  isSuperUserAdmin: boolean;
  login: (data: LoginFormData) => Promise<{ success: boolean; message: string; user?: CurrentUser }>;
  signup: (data: SignupFormData) => Promise<{ success: boolean; message: string; user?: CurrentUser }>;
  logout: () => void;
  toggleAdminMode: () => void;
  deleteAccount: () => Promise<{ success: boolean; message: string; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isSuperUserAdmin, setIsSuperUserAdmin] = useState(false); // Simple toggle for admin page access

  useEffect(() => {
    // On initial load, try to load user from localStorage
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      const superAdminMode = localStorage.getItem('isSuperUserAdmin') === 'true';
      setIsSuperUserAdmin(superAdminMode);
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isSuperUserAdmin');
    }
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    const result = await loginAction(data);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      localStorage.setItem('currentUser', JSON.stringify(result.user));
    }
    return result;
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    const result = await signupAction(data);
    if (result.success && result.user) {
      // Auto-login the user after successful signup
      setCurrentUser(result.user);
      localStorage.setItem('currentUser', JSON.stringify(result.user));
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Also turn off admin mode on logout
    setIsSuperUserAdmin(false);
    localStorage.setItem('isSuperUserAdmin', 'false');
    // Push to login to prevent being on a protected page after logout
    window.location.href = '/login';
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!currentUser) {
      return { success: false, message: "No user is currently logged in." };
    }
    const result = await deleteAccountAction(currentUser.id);
    if (result.success) {
      // If deletion is successful on the server, log the user out on the client.
      logout();
    }
    return result;
  }, [currentUser, logout]);
  
  const toggleAdminMode = useCallback(() => {
    setIsSuperUserAdmin(prev => {
      const newStatus = !prev;
      localStorage.setItem('isSuperUserAdmin', String(newStatus));
      return newStatus;
    });
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    isAuthenticated: !!currentUser,
    isUser: currentUser?.userType === 'user',
    isScientist: currentUser?.userType === 'scientist',
    isAdmin: currentUser?.userType === 'admin',
    isSuperUserAdmin,
    login,
    signup,
    logout,
    toggleAdminMode,
    deleteAccount,
  }), [currentUser, isSuperUserAdmin, login, signup, logout, toggleAdminMode, deleteAccount]);

  return React.createElement(AuthContext.Provider, { value: contextValue }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
