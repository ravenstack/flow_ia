import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Processos from "./pages/Processos";
import AnaliseEstrategica from "./pages/AnaliseEstrategica";
import Performance from "./pages/Performance";
import MLVME from "./pages/MLVME";
import DashboardExecutivo from "./pages/DashboardExecutivo";
import ROIEstrategia from "./pages/ROIEstrategia";
import AnaliseRisco from "./pages/AnaliseRisco";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navigation />
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/processos"
            element={
              <ProtectedRoute>
                <Navigation />
                <Processos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analise-estrategica"
            element={
              <ProtectedRoute>
                <Navigation />
                <AnaliseEstrategica />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance"
            element={
              <ProtectedRoute>
                <Navigation />
                <Performance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ml-vme"
            element={
              <ProtectedRoute>
                <Navigation />
                <MLVME />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-executivo"
            element={
              <ProtectedRoute>
                <Navigation />
                <DashboardExecutivo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roi"
            element={
              <ProtectedRoute>
                <Navigation />
                <ROIEstrategia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analise-risco"
            element={
              <ProtectedRoute>
                <Navigation />
                <AnaliseRisco />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
