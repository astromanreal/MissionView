
'use client';

import React, { useState, useEffect, createContext, useContext, useCallback, useMemo, type ReactNode } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import type { CurrentUser, LoginFormData, SignupFormData } from '@/types/auth';
import { auth, db } from '@/lib/firebase';
import { createUserProfile, deleteUserAccount as deleteAccountAction } from '@/app/actions/auth';

interface AuthContextType {
  currentUser: CurrentUser | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  loading: boolean;
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuperUserAdmin, setIsSuperUserAdmin] = useState(false);

  useEffect(() => {
    // Only set up the listener if Firebase was initialized
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as Omit<CurrentUser, 'id'>;
          setCurrentUser({ id: user.uid, ...userData });
        } else {
          setCurrentUser({ id: user.uid, email: user.email!, username: user.displayName || 'New User', userType: 'user' });
        }
      } else {
        setCurrentUser(null);
        setFirebaseUser(null);
      }
      setLoading(false);
    });

     try {
      const superAdminMode = localStorage.getItem('isSuperUserAdmin') === 'true';
      setIsSuperUserAdmin(superAdminMode);
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      localStorage.removeItem('isSuperUserAdmin');
    }

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    if (!auth || !db) {
      return { success: false, message: 'Firebase is not configured on this site.' };
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = { id: user.uid, ...userDoc.data() } as CurrentUser;
        return { success: true, message: 'Login successful!', user: userData };
      } else {
        return { success: false, message: 'User profile not found in database.' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Invalid email or password.' };
    }
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    if (!auth) {
      return { success: false, message: 'Firebase is not configured on this site.' };
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      const newUserProfile: CurrentUser = {
        id: user.uid,
        email: data.email,
        username: data.username,
        userType: data.userType,
      };

      const profileResult = await createUserProfile(newUserProfile);

      if (!profileResult.success) {
        await deleteUser(user);
        return { success: false, message: `Signup failed: ${profileResult.message}` };
      }
      
      return { success: true, message: 'Account created successfully!', user: newUserProfile };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create account.' };
    }
  }, []);

  const logout = useCallback(() => {
    if (auth) {
        signOut(auth);
    }
    setIsSuperUserAdmin(false);
    localStorage.setItem('isSuperUserAdmin', 'false');
    window.location.href = '/login';
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!firebaseUser) {
      return { success: false, message: "No user is currently logged in." };
    }
    const result = await deleteAccountAction(firebaseUser.uid);
    if (result.success) {
       // onAuthStateChanged will handle the rest of the client-side cleanup.
    }
    return result;
  }, [firebaseUser]);
  
  const toggleAdminMode = useCallback(() => {
    setIsSuperUserAdmin(prev => {
      const newStatus = !prev;
      localStorage.setItem('isSuperUserAdmin', String(newStatus));
      return newStatus;
    });
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    firebaseUser,
    isAuthenticated: !!currentUser && !!firebaseUser,
    loading,
    isUser: currentUser?.userType === 'user',
    isScientist: currentUser?.userType === 'scientist',
    isAdmin: currentUser?.userType === 'admin',
    isSuperUserAdmin,
    login,
    signup,
    logout,
    toggleAdminMode,
    deleteAccount,
  }), [currentUser, firebaseUser, loading, isSuperUserAdmin, login, signup, logout, toggleAdminMode, deleteAccount]);

  return React.createElement(AuthContext.Provider, { value: contextValue }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
