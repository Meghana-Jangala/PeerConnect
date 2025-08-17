import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university: string;
    major: string;
  }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock current user for demonstration
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const mockUser: User = {
        id: "1",
        email: "alex.chen@mit.edu",
        password: "",
        firstName: "Alex",
        lastName: "Chen",
        university: "MIT",
        major: "Computer Science",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        coins: 1285,
        reputation: 2840,
        canTeach: ["JavaScript", "React", "Python", "Data Structures"],
        wantToLearn: ["Machine Learning", "Operating Systems", "Blockchain"],
        bio: "Passionate about coding and helping others learn programming.",
        badges: ["JavaScript Master", "Active Helper"],
        createdAt: new Date(),
      };
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock login - in real app, make API call
    setTimeout(() => {
      const mockUser: User = {
        id: "1",
        email,
        password: "",
        firstName: "Alex",
        lastName: "Chen",
        university: "MIT",
        major: "Computer Science",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        coins: 1285,
        reputation: 2840,
        canTeach: ["JavaScript", "React", "Python", "Data Structures"],
        wantToLearn: ["Machine Learning", "Operating Systems", "Blockchain"],
        bio: "Passionate about coding and helping others learn programming.",
        badges: ["JavaScript Master", "Active Helper"],
        createdAt: new Date(),
      };
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university: string;
    major: string;
  }) => {
    setIsLoading(true);
    // Mock registration - in real app, make API call
    setTimeout(() => {
      const mockUser: User = {
        id: "1",
        email: userData.email,
        password: "",
        firstName: userData.firstName,
        lastName: userData.lastName,
        university: userData.university,
        major: userData.major,
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        coins: 0,
        reputation: 0,
        canTeach: [],
        wantToLearn: [],
        bio: "",
        badges: [],
        createdAt: new Date(),
      };
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
