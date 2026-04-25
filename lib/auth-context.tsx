'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from './api';
import { User, UserRole, AuthContextType } from './types';

export type { User, UserRole };

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
      // Call backend logout API - this clears HTTP-only cookies (accessToken, refreshToken)
      await authApi.logout();
    } catch (error) {
      // Even if API call fails, still proceed with logout
      console.error('Logout API error:', error);
    } finally {
      // Always clear localStorage token and user state
      localStorage.removeItem('br_access_token');
      setUser(null);

      // Note: HTTP-only cookies are cleared by the server via res.clearCookie()
      // We cannot directly delete them from JavaScript for security reasons
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

  const loginWithGoogle = async (idToken: string) => {
    try {
      const response = await authApi.googleAuth(idToken);
      // Save token to localStorage for persistence
      if (response.accessToken) {
        localStorage.setItem('br_access_token', response.accessToken);
      }
      setUser(response.user);
      return response.user;
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
    loginWithGoogle,
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
