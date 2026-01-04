import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuth() {
  const { user, session, setUser, setSession, isAuthenticated } =
    useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email! }
          : null
      );
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email! }
          : null
      );
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession]);

  return { user, session, isAuthenticated, loading };
}
