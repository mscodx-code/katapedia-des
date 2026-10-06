import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'PLATFORM_SUPERADMIN' | 'TENANT_OWNER' | 'TENANT_ADMIN' | 'ANALYST' | 'VIEWER';
  roleLabel: string;
  avatar: string;
  tenantSlug: string;
  tenantName: string;
}

export const DEMO_USERS: UserSession[] = [
  {
    id: 'usr-001',
    name: 'Budi Santoso, M.Si',
    email: 'admin@katapedia.id',
    role: 'PLATFORM_SUPERADMIN',
    roleLabel: 'Platform Superadmin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029'
  },
  {
    id: 'usr-002',
    name: 'H. Ahmad Fauzi',
    email: 'dpp@pemilu2029.id',
    role: 'TENANT_ADMIN',
    roleLabel: 'DPP Tenant Admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029'
  },
  {
    id: 'usr-003',
    name: 'Siti Rahma',
    email: 'siti.rahma@katapedia.id',
    role: 'ANALYST',
    roleLabel: 'Senior Dept Analyst',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029'
  },
  {
    id: 'usr-004',
    name: 'Rangga Pradipta',
    email: 'rangga@caleg.id',
    role: 'VIEWER',
    roleLabel: 'Caleg (Viewer Only)',
    avatar: '/avatars/rangga.jpg',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029'
  }
];

interface AuthContextType {
  user: UserSession | null;
  loginAs: (user: UserSession) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginAs: () => {},
  logout: () => {},
  isAuthenticated: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('katapedia_auth_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default to Siti Rahma (Analyst) for seamless access if desired, or null
    return DEMO_USERS[2]; // Siti Rahma
  });

  const loginAs = (u: UserSession) => {
    setUser(u);
    localStorage.setItem('katapedia_auth_session', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('katapedia_auth_session');
  };

  return (
    <AuthContext.Provider value={{ user, loginAs, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
