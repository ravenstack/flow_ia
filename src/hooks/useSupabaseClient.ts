import { useMemo } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

interface UseSupabaseClientResult {
  supabase: SupabaseClient<Database> | null;
  error: string | null;
}

let cachedClient: SupabaseClient<Database> | null = null;
let cachedError: string | null = null;

const initializeClient = (): void => {
  if (cachedClient || cachedError) {
    return;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    cachedError =
      "Não foi possível configurar a conexão com o Supabase. Verifique as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no painel do Vercel.";
    return;
  }

  try {
    const authConfig = {
      persistSession: true,
      autoRefreshToken: true,
      ...(typeof window !== "undefined" && window.localStorage
        ? { storage: window.localStorage }
        : {}),
    } as const;

    cachedClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: authConfig,
    });
  } catch (error) {
    console.error("Failed to initialize Supabase client", error);
    cachedError =
      "Não foi possível configurar a conexão com o Supabase. Verifique as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no painel do Vercel.";
  }
};

export const useSupabaseClient = (): UseSupabaseClientResult => {
  return useMemo(() => {
    initializeClient();
    return {
      supabase: cachedClient,
      error: cachedError,
    };
  }, []);
};
