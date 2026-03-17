import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, getSession, signIn as signInService, signOut as signOutService, signUp as signUpService } from "../services/authService";
import { hasSupabase, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const current = await getSession();
      if (!mounted) return;
      setSession(current);
      if (current?.user?.id) {
        const prof = await getProfile(current.user.id);
        if (mounted) setProfile(prof);
      }
      setLoading(false);
    }

    load();

    if (hasSupabase && supabase) {
      const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user?.id) {
          const prof = await getProfile(newSession.user.id);
          setProfile(prof);
        } else {
          setProfile(null);
        }
      });
      return () => {
        mounted = false;
        listener.subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => ({
    session,
    profile,
    loading,
    async signIn(email, password) {
      const result = await signInService(email, password);
      return result;
    },
    async signUp(email, password, role, displayName) {
      const result = await signUpService(email, password, role, displayName);
      return result;
    },
    async signOut() {
      await signOutService();
      setSession(null);
      setProfile(null);
    }
  }), [session, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
