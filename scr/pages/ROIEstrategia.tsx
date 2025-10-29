import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingDown, TrendingUp, Zap } from "lucide-react";

// Dados de economia por categoria
const economiaData = [
  { categoria: "Casos Armadilha", economia: 1250000, percentual: 35 },
  { categoria: "Casos Secundários", economia: 1890000, percentual: 53 },
  { categoria: "Automação", economia: 428000, percentual: 12 },
];

const alocacaoData = [
  { recurso: "Advogados Seniores", tradicional: 100, otimizado: 28.5, economia: 71.5 },
  { recurso: "Tempo de Análise", tradicional: 100, otimizado: 35, economia: 65 },
  { recurso: "Custos Operacionais", tradicional: 100, otimizado: 42, economia: 58 },
];

const COLORS = {
  tradicional: "hsl(var(--destructive))",
  otimizado: "hsl(var(--success))",
  economia: "hsl(var(--accent))",
};

const ROIEstrategia = () => {
  const totalEconomia = economiaData.reduce((sum, item) => sum + item.economia, 0);
  const economiaAnual = totalEconomia * 12; // Projeção anual

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            ROI e Estratégia: O Valor Financeiro da IA
          </h1>
          <p className="text-lg text-muted-foreground">
            Análise Focada em Custo, Economia e Alocação Inteligente
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Retorno sobre o Investimento (ROI)
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <KPICard
              title="Economia Mensal Estimada"
              value={`R$ ${(totalEconomia / 1000000).toFixed(2)}M`}
              subtitle="Redução de custos operacionais"
              icon={DollarSign}
              variant="success"
            />
            <KPICard
              title="Projeção Anual"
              value={`R$ ${(economiaAnual / 1000000).toFixed(2)}M`}
              subtitle="Economia em 12 meses"
              icon={TrendingUp}
              variant="success"
            />
            <KPICard
              title="Casos Despriorizados"
              value="4,208"
              subtitle="64.5% do portfólio"
              icon={TrendingDown}
              variant="warning"
            />
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              Fontes de Economia
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Distribuição da economia estimada por categoria estratégica
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={economiaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percentual }) => `${categoria}: ${percentual}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="economia"
                >
                  <Cell fill="hsl(var(--destructive))" />
                  <Cell fill="hsl(var(--warning))" />
                  <Cell fill="hsl(var(--accent))" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {economiaData.map((item, index) => (
                <div key={index} className="flex justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-foreground">{item.categoria}</span>
                  <span className="text-sm font-bold text-success">
                    R$ {(item.economia / 1000).toLocaleString('pt-BR')}K
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              Otimização de Recursos
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Comparação: Alocação Tradicional vs. Otimizada por IA
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alocacaoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="recurso" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="tradicional" fill={COLORS.tradicional} name="Tradicional (%)" />
                <Bar dataKey="otimizado" fill={COLORS.otimizado} name="Otimizado (%)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 rounded-lg bg-success/10 p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-success" />
                <p className="text-sm font-semibold text-success">
                  Média de 65% de Redução na Alocação de Recursos
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Estratégia de Implementação
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border-l-4 border-l-success bg-success/5 p-4">
              <h3 className="mb-2 font-semibold text-success">
                ✓ Fase 1: Priorização Imediata (Mês 1-2)
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
                <li>Alocar equipe sênior exclusivamente aos 28.5% de Casos "Ouro"</li>
                <li>Implementar defesa padrão automatizada para Casos "Armadilha"</li>
                <li>Economia estimada: <strong>R$ 890K/mês</strong></li>
              </ul>
            </div>

            <div className="rounded-lg border-l-4 border-l-accent bg-accent/5 p-4">
              <h3 className="mb-2 font-semibold text-accent">
                ⚡ Fase 2: Automação e Escala (Mês 3-6)
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
                <li>Automatizar gestão de Casos "Secundários" (50.8% do portfólio)</li>
                <li>Promover Casos "Silenciosos" para captura de valor oculto</li>
                <li>Economia estimada adicional: <strong>R$ 1.2M/mês</strong></li>
              </ul>
            </div>

            <div className="rounded-lg border-l-4 border-l-primary bg-primary/5 p-4">
              <h3 className="mb-2 font-semibold text-primary">
                🚀 Fase 3: Otimização Contínua (Mês 6+)
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
                <li>Refinamento contínuo dos modelos de ML com novos dados</li>
                <li>Expansão para outras unidades e tipos de processo</li>
                <li>ROI projetado: <strong>450% em 12 meses</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-primary p-6 text-primary-foreground">
            <h3 className="mb-2 text-xl font-bold">Resultado Esperado</h3>
            <p className="text-lg">
              Investimento em IA de <strong>R$ 800K</strong> gerando economia anual de{" "}
              <strong>R$ {(economiaAnual / 1000000).toFixed(2)}M</strong>, resultando em um{" "}
              <strong className="text-2xl">ROI de 450%</strong> no primeiro ano de operação.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ROIEstrategia;
