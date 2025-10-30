import { useMemo } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

interface UseSupabaseClientResult {
  supabase: SupabaseClient<Database> | null;
  error: string | null;
}

let cachedClient: SupabaseClient<Database> | null = null;
let cachedError: string | null = null;

const buildMissingEnvMessage = (missingVars: string[]) =>
  `Não foi possível configurar a conexão com o Supabase. Defina ${missingVars.join(
    " e ",
  )} no painel do Vercel.`;

const initializeSupabaseClient = (): UseSupabaseClientResult => {
  if (cachedClient || cachedError) {
    return { supabase: cachedClient, error: cachedError };
  }

  if (typeof window === "undefined") {
    cachedError =
      "O cliente do Supabase só pode ser inicializado no navegador.";
    return { supabase: null, error: cachedError };
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const missingVars: string[] = [];
  if (!supabaseUrl) missingVars.push("VITE_SUPABASE_URL");
  if (!supabaseKey) missingVars.push("VITE_SUPABASE_PUBLISHABLE_KEY");

  if (missingVars.length > 0) {
    cachedError = buildMissingEnvMessage(missingVars);
    console.error(cachedError);
    return { supabase: null, error: cachedError };
  }

  try {
    cachedClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    cachedError = null;
    return { supabase: cachedClient, error: null };
  } catch (error) {
    console.error("Failed to initialize Supabase client", error);
    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao criar o cliente do Supabase.";
    cachedError = `Não foi possível inicializar o Supabase: ${message}`;
    cachedClient = null;
    return { supabase: null, error: cachedError };
  }
};

export const useSupabaseClient = (): UseSupabaseClientResult => {
  return useMemo(() => initializeSupabaseClient(), []);
};
