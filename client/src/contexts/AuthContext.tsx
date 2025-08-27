// AuthContext.tsx
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
  }) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeUser = (rawUser: any): User => {
    if (!rawUser) return rawUser;
    return { ...rawUser, _id: rawUser._id || rawUser.id };
  };

  useEffect(() => {
    console.log("🔄 [AuthContext] Checking localStorage...");

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      const parsedUser = normalizeUser(JSON.parse(storedUser));
      if (!parsedUser._id) {
        console.error("❌ [AuthContext] No _id found in parsed user!");
        setIsLoading(false);
        return;
      }

      setUser(parsedUser);
      console.log("👤 [AuthContext] Loaded user from localStorage:", parsedUser);

      if (token) {
        console.log("🌐 Fetching fresh user from backend with ID:", parsedUser._id);
        fetch(`http://localhost:5000/api/users/${parsedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(async (res) => {
            console.log("📡 Backend response status:", res.status);

            // 🚨 FIX: Handle stale user IDs
            if (res.status === 404) {
              console.warn("⚠️ [AuthContext] Stale user in localStorage. Clearing it...");
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setUser(null);
              return;
            }

            const freshUser = await res.json();
            console.log("📡 Backend response JSON:", freshUser);

            if (!res.ok) {
              console.error("❌ [AuthContext] Failed to refresh user. Clearing storage...");
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setUser(null);
              return;
            }

            const normalized = normalizeUser(freshUser);
            localStorage.setItem("user", JSON.stringify(normalized));
            setUser(normalized);
            console.log("✅ [AuthContext] User refreshed from backend:", normalized);
          })
          .catch((err) => {
            console.error("🚨 [AuthContext] Error refreshing user:", err);
          })
          .finally(() => setIsLoading(false));
      } else {
        console.warn("⚠️ [AuthContext] No token found - skipping backend refresh");
        setIsLoading(false);
      }
    } else {
      console.warn("⚠️ [AuthContext] No stored user in localStorage");
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("🔑 [AuthContext] Attempting login for:", email);
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("📡 Login response:", res.status, data);

      if (!res.ok) throw new Error(data.error || "Login failed");

      const userWithId = normalizeUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userWithId));
      setUser(userWithId);
      console.log("✅ [AuthContext] Login successful:", userWithId);
    } catch (err) {
      console.error("🚨 [AuthContext] Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    console.log("📝 [AuthContext] Registering user:", userData.email);
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("📡 Register response:", res.status, data);

      if (!res.ok) throw new Error(data.error || "Signup failed");

      const userWithId = normalizeUser(data.user);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(userWithId));
      setUser(userWithId);
      console.log("✅ [AuthContext] Registration successful:", userWithId);
    } catch (err) {
      console.error("🚨 [AuthContext] Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) {
      console.warn("⚠️ [AuthContext] updateUserProfile called with no user");
      return;
    }

    const userId = user._id;
    const token = localStorage.getItem("token");
    console.log("✏️ [AuthContext] Updating profile for user:", userId, updates);

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      console.log("📡 Update response:", res.status, data);

      if (!res.ok) throw new Error(data.error || "Update failed");

      const updatedUser = normalizeUser(data.user);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      console.log("✅ [AuthContext] User profile updated:", updatedUser);
    } catch (err) {
      console.error("🚨 [AuthContext] Update failed:", err);
    }
  };

  const logout = () => {
    console.log("🚪 [AuthContext] Logging out:", user?.email);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, updateUserProfile, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
