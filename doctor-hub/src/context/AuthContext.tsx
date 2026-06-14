"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "PATIENT" | "DOCTOR";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const res = await axios.post("/api/auth/login", credentials);
    setUser(res.data.user);
  };

  const register = async (data: RegisterData) => {
    const res = await axios.post("/api/auth/register", data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
