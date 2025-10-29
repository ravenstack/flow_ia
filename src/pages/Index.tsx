import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, AlertCircle, FolderSearch, LayoutDashboard, ArrowRight } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { AlertaArmadilha } from "@/components/AlertaArmadilha";
import { Link } from "react-router-dom";

const Index = () => {
  // Simulação de casos armadilha detectados
  const casosArmadilha = [
    {
      numeroProcesso: "0001234-56.2024.8.26.0100",
      valor: 250000,
      scoreA: 0.85,
      vmeOtimizado: 0.25,
    },
    {
      numeroProcesso: "0002345-67.2024.8.26.0200",
      valor: 180000,
      scoreA: 0.78,
      vmeOtimizado: 0.30,
    },
    {
      numeroProcesso: "0003456-78.2024.8.26.0300",
      valor: 320000,
      scoreA: 0.92,
      vmeOtimizado: 0.18,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Flow.IA
          </h1>
          <p className="text-xl text-muted-foreground">
            Plataforma Jurídica Inteligente com IA e Machine Learning
          </p>
        </div>

        {/* Alerta Proativo de Casos Armadilha */}
        <div className="mb-8">
          <AlertaArmadilha casos={casosArmadilha} />
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
            <Link to="/processos" className="block p-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                <FolderSearch className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Explorador de Processos
              </h2>
              <p className="mb-4 text-muted-foreground">
                Busque, filtre e analise processos jurídicos com ferramentas avançadas de pesquisa
              </p>
              <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                <span className="font-medium">Acessar</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </Card>

          <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
            <Link to="/analise-estrategica" className="block p-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                <LayoutDashboard className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Dashboards Analíticos
              </h2>
              <p className="mb-4 text-muted-foreground">
                Visualize métricas estratégicas, análise de riscos, ROI e performance através de dashboards interativos
              </p>
              <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                <span className="font-medium">Ver Dashboards</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </Card>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total de Processos"
            value="54.485"
            subtitle="Base completa"
            icon={Users}
            trend="up"
            variant="default"
          />
          <KPICard
            title="Casos Armadilha"
            value="8.742"
            subtitle="Alto Score A + Baixo VME"
            icon={AlertCircle}
            trend="down"
            variant="destructive"
          />
          <KPICard
            title="Casos Ouro"
            value="12.358"
            subtitle="Alto Score A + Alto VME"
            icon={TrendingUp}
            trend="up"
            variant="success"
          />
          <KPICard
            title="Casos Silenciosos"
            value="6.891"
            subtitle="Baixo Score A + Alto VME"
            icon={BarChart3}
            trend="up"
            variant="default"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Sobre o Flow.IA
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Flow.IA é uma solução completa para gestão e análise de processos jurídicos,
              desenvolvida para otimizar a tomada de decisões estratégicas através de dados e inteligência artificial.
            </p>
            <p>
              <strong className="text-foreground">Recursos principais:</strong>
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Explorador de Processos:</strong> Busca avançada e filtros
                inteligentes para localizar e analisar processos específicos
              </li>
              <li>
                <strong className="text-foreground">Machine Learning:</strong> Algoritmos avançados para previsão
                de resultados e estimativa de valores
              </li>
              <li>
                <strong className="text-foreground">Análise de Risco:</strong> Avaliação estatística detalhada
                do portfólio de processos
              </li>
              <li>
                <strong className="text-foreground">ROI e Estratégia:</strong> Dashboards executivos para
                planejamento e alocação de recursos
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
