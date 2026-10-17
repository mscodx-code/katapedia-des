import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setStoredToken, getStoredToken } from './api';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'PLATFORM_SUPERADMIN' | 'DEPT_ADMIN' | 'ANALYST' | 'VIEWER' | string;
  roleLabel: string;
  avatar?: string | null;
  tenantId: string;
  tenantSlug: string;
  tenantName: string;
  isActive?: boolean;
}

export function getRoleLabel(role: string): string {
  switch (role) {
    case 'PLATFORM_SUPERADMIN':
      return 'Platform Super Admin';
    case 'DEPT_ADMIN':
      return 'Department Admin';
    case 'ANALYST':
      return 'Department Analyst';
    case 'VIEWER':
      return 'Viewer / Caleg';
    default:
      return role;
  }
}

export const DEMO_USERS: UserSession[] = [
  {
    id: 'usr-superadmin',
    name: 'Super Admin Katapedia',
    email: 'superadmin@katapedia.id',
    role: 'PLATFORM_SUPERADMIN',
    roleLabel: 'Platform Super Admin',
    avatar: null,
    tenantId: 'tenant-default',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029',
    isActive: true
  },
  {
    id: 'usr-deptadmin',
    name: 'H. Ahmad Fauzi (Admin)',
    email: 'admin@pemilu2029.id',
    role: 'DEPT_ADMIN',
    roleLabel: 'Department Admin',
    avatar: null,
    tenantId: 'tenant-default',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029',
    isActive: true
  },
  {
    id: 'usr-analyst',
    name: 'Siti Rahma (Analyst)',
    email: 'analyst@pemilu2029.id',
    role: 'ANALYST',
    roleLabel: 'Department Analyst',
    avatar: null,
    tenantId: 'tenant-default',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029',
    isActive: true
  },
  {
    id: 'usr-viewer',
    name: 'Rangga Pradipta (Caleg)',
    email: 'viewer@pemilu2029.id',
    role: 'VIEWER',
    roleLabel: 'Viewer / Caleg',
    avatar: null,
    tenantId: 'tenant-default',
    tenantSlug: 'pemilu-2029',
    tenantName: 'DPP Pemenangan Pemilu 2029',
    isActive: true
  }
];

interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; captchaToken?: string | null }) => Promise<void>;
  loginAs: (user: UserSession, token?: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  loginAs: () => {},
  logout: () => {},
  refreshUser: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('katapedia_auth_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    const currentToken = getStoredToken();
    if (!currentToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await api.getMe();
      const sessionUser: UserSession = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        roleLabel: getRoleLabel(data.user.role),
        avatar: data.user.avatarUrl,
        tenantId: data.tenant.id,
        tenantSlug: data.tenant.slug,
        tenantName: data.tenant.name,
        isActive: data.user.isActive
      };
      setUser(sessionUser);
      localStorage.setItem('katapedia_auth_session', JSON.stringify(sessionUser));
    } catch (err) {
      console.warn('Failed to refresh user session from token:', err);
      // Keep offline cache if network failure or clear if unauthorized
      if (!navigator.onLine) {
        // keep cached session
      } else {
        setStoredToken(null);
        setToken(null);
        setUser(null);
        localStorage.removeItem('katapedia_auth_session');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    const handleUnauthorized = () => {
      setStoredToken(null);
      setToken(null);
      setUser(null);
      localStorage.removeItem('katapedia_auth_session');
    };

    window.addEventListener('katapedia_unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('katapedia_unauthorized', handleUnauthorized);
    };
  }, [refreshUser]);

  const login = async (credentials: { email: string; password: string; captchaToken?: string | null }) => {
    setIsLoading(true);
    try {
      const result = await api.login(credentials);
      setStoredToken(result.token);
      setToken(result.token);

      const sessionUser: UserSession = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        roleLabel: getRoleLabel(result.user.role),
        avatar: result.user.avatarUrl,
        tenantId: result.tenant.id,
        tenantSlug: result.tenant.slug,
        tenantName: result.tenant.name,
        isActive: result.user.isActive
      };

      setUser(sessionUser);
      localStorage.setItem('katapedia_auth_session', JSON.stringify(sessionUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginAs = (u: UserSession, customToken?: string) => {
    setUser(u);
    localStorage.setItem('katapedia_auth_session', JSON.stringify(u));
    if (customToken) {
      setStoredToken(customToken);
      setToken(customToken);
    }
  };

  const logout = () => {
    api.logout().catch(() => {});
    setStoredToken(null);
    setToken(null);
    setUser(null);
    localStorage.removeItem('katapedia_auth_session');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        loginAs,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
