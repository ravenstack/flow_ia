import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

interface UseSupabaseClientResult {
  supabase: SupabaseClient<Database> | null;
  error: string | null;
}

export const useSupabaseClient = (): UseSupabaseClientResult => {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    import("@/integrations/supabase/client")
      .then(({ supabase }) => {
        if (isMounted) {
          setSupabase(supabase);
        }
      })
      .catch((err) => {
        console.error("Failed to load Supabase client", err);
        if (isMounted) {
          setError(
            "Não foi possível configurar a conexão com o Supabase. Verifique as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no painel do Vercel."
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { supabase, error };
};
