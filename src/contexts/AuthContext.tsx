import React, { createContext, useContext, useEffect, useState } from 'react';
import rbacSpec from '../../rbac_specification.json';

export type RoleName = keyof typeof rbacSpec.roles | string;

type User = {
  id?: string;
  name: string;
  email: string;
  role: RoleName;
  token?: string;
  username?: string;
};

type AuthContextValue = {
  user: User | null;
  login: (payload: { email: string; password: string; role?: RoleName; remember?: boolean }) => Promise<User>;
  logout: () => void;
  hasAccess: (moduleName: string, action: string) => boolean;
  roles: string[];
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('hrpms_user');
      if (raw) return JSON.parse(raw) as User;
    } catch (e) {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('hrpms_user', JSON.stringify(user));
    else localStorage.removeItem('hrpms_user');
  }, [user]);

  const login = async ({ email, password: _password, role, remember }: { email: string; password: string; role?: RoleName; remember?: boolean }) => {
    // Dummy auth: any email/password allowed (password param is kept for API parity)
    const assignedRole = role || (email.includes('@') ? 'Employee' : 'Employee');
    const token = `fake-token-${Date.now()}`;
    const username = email.split('@')[0];
    const u: User = { 
      id: `user-${Date.now()}`, 
      name: username, 
      username,
      email, 
      role: assignedRole, 
      token 
    };
    setUser(u);
    if (remember) {
      localStorage.setItem('hrpms_user', JSON.stringify(u));
    }
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrpms_user');
  };

  const hasAccess = (moduleName: string, action: string) => {
    if (!user) return false;
    const roles: any = rbacSpec.roles || {};
    const roleSpec = roles[user.role];
    if (!roleSpec) return false;
    const modules = roleSpec.modules || {};
    // try exact match then fuzzy match by startsWith
    const exact = modules[moduleName];
    if (exact && exact.includes(action)) return true;
    // try find module key that startsWith the moduleName's number or text
    const foundKey = Object.keys(modules).find((k) => k.toLowerCase().includes(moduleName.toLowerCase()));
    if (foundKey) {
      return modules[foundKey].includes(action);
    }
    return false;
  };

  const roles = Object.keys((rbacSpec as any).roles || {});

  return <AuthContext.Provider value={{ user, login, logout, hasAccess, roles }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
