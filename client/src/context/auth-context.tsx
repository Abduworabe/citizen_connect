import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole, mockUsers, User } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to null (logged out) or a specific user for dev speed
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    const mockUser = mockUsers.find(u => u.role === role);
    if (mockUser) {
      setUser(mockUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
