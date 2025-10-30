import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { supabase, error: supabaseError } = useSupabaseClient();

  useEffect(() => {
    if (!supabase) {
      if (supabaseError) {
        setLoading(false);
      }
      return;
    }

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase, supabaseError]);

  if (supabaseError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Erro de configuração</h2>
          <p className="text-sm text-muted-foreground">{supabaseError}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};
