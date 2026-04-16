'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from './api';

export type UserRole = 'student' | 'owner' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  universityRollNo?: string;
  bankDetails?: any;
  profilePicUrl?: string;
  isStudentVerified?: boolean;
  studentEmail?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (role: 'student' | 'owner', data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      // Save token to localStorage for persistence
      if (response.accessToken) {
        localStorage.setItem('br_access_token', response.accessToken);
      }
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      // Clear token from localStorage
      localStorage.removeItem('br_access_token');
      setUser(null);
    } catch (error) {
      // Even if API call fails, clear local user and token
      localStorage.removeItem('br_access_token');
      setUser(null);
    }
  };

  const register = async (role: 'student' | 'owner', data: any) => {
    try {
      let response;
      if (role === 'student') {
        response = await authApi.registerStudent(data);
      } else {
        response = await authApi.registerOwner(data);
      }

      // Save token if returned
      if (response.accessToken) {
        localStorage.setItem('br_access_token', response.accessToken);
        setUser(response.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
