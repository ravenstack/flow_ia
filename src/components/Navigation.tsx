import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client.ts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  TrendingUp,
  Brain,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  FolderSearch,
  LayoutDashboard,
  LogOut,
  BarChart3,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

const navItems = [
  { path: "/dashboard", label: "Início", icon: Home },
  { path: "/processos", label: "Processos", icon: FolderSearch },
  { 
    path: "/dashboards", 
    label: "Dashboards", 
    icon: LayoutDashboard,
    submenu: [
      { path: "/analise-estrategica", label: "Análise Estratégica", icon: BarChart3 },
      { path: "/performance", label: "Performance", icon: CheckCircle2 },
      { path: "/ml-vme", label: "ML & VME", icon: Brain },
      { path: "/dashboard-executivo", label: "Dashboard Executivo", icon: TrendingUp },
      { path: "/roi", label: "ROI & Estratégia", icon: DollarSign },
      { path: "/analise-risco", label: "Análise de Risco", icon: AlertTriangle },
    ]
  },
];

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dashboardsOpen, setDashboardsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserEmail(session?.user?.email || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/landing");
  };

  const isDashboardActive = navItems
    .find((item) => item.path === "/dashboards")
    ?.submenu?.some((sub) => location.pathname === sub.path);

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo className="h-10" />
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground mr-2">{userEmail}</span>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              if (item.submenu) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setDashboardsOpen(true)}
                    onMouseLeave={() => setDashboardsOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isDashboardActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                    {dashboardsOpen && (
                      <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-card shadow-lg">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={cn(
                                "flex items-center space-x-2 px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg",
                                isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-foreground hover:bg-secondary"
                              )}
                            >
                              <SubIcon className="h-4 w-4" />
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
