import * as React from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, hasSupabaseEnv } from '../services/supabaseClient';
const { createContext, useContext, useState, useEffect } = React;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasSupabaseEnv || !supabase) { setLoading(false); return; }

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription?.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    login: async () => { if (supabase) await supabase.auth.signInWithOAuth({ provider: 'google' }); },
    logout: async () => { if (supabase) await supabase.auth.signOut(); },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

