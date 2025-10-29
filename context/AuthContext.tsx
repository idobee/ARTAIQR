import * as React from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, hasSupabaseEnv } from '../services/supabaseClient';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = React.createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      if (!hasSupabaseEnv || !supabase) { setLoading(false); return; }
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
        setUser(s?.user ?? null);
      });
      unsub = () => subscription.unsubscribe();
    })();
    return () => unsub?.();
  }, []);

  const value: AuthCtx = {
    user,
    loading,
    login: async () => {
      if (!supabase) return;
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    },
    logout: async () => {
      if (!supabase) return;
      await supabase.auth.signOut();
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useAuth() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within an AuthProvider');
  return v;
}

