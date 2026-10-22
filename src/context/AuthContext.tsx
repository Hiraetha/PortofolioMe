import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: { name?: string };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = 'portfolio_demo_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
      if (savedDemo) {
        const mockUser: AuthUser = JSON.parse(savedDemo);
        setUser(mockUser);
      }
    } catch (e) {
      console.debug('Failed to load demo auth session', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    // Static mode admin credentials
    if (email && password.length >= 6) {
      const mockUser: AuthUser = {
        id: 'admin-ibnu',
        email,
        user_metadata: { name: 'Ibnu Abi Ad-Dunya' },
      };

      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      return { error: null };
    }

    return { error: new Error('Password minimal 6 karakter.') };
  };

  const signOut = async () => {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
