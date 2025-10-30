import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

interface UseSupabaseClientResult {
  supabase: SupabaseClient<Database> | null;
  error: string | null;
  loading: boolean;
}

const errorMessage =
  "Não foi possível configurar a conexão com o Supabase. Verifique as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no painel do Vercel.";

export const useSupabaseClient = (): UseSupabaseClientResult => {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadClient = async () => {
      try {
        const module = await import("@/integrations/supabase/client");
        if (!isMounted) {
          return;
        }

        setSupabase(module.supabase as SupabaseClient<Database>);
        setError(null);
      } catch (err) {
        console.error("Failed to load Supabase client", err);
        if (!isMounted) {
          return;
        }

        setSupabase(null);
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadClient();

    return () => {
      isMounted = false;
    };
  }, []);

  return { supabase, error, loading };
};
