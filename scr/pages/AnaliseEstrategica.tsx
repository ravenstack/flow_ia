import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, AlertTriangle } from "lucide-react";

const concentracaoData = [
  { metrica: "Casos", proporcao: 28.8, tipo: "Volume" },
  { metrica: "Valor (W_V)", proporcao: 42.09, tipo: "Impacto" },
  { metrica: "Risco/Custo (C)", proporcao: 37.74, tipo: "Impacto" },
];

const classificacaoData = [
  { name: "Alta Prioridade", value: 28.8, color: "hsl(var(--success))" },
  { name: "Média Prioridade", value: 35.2, color: "hsl(var(--warning))" },
  { name: "Baixa Prioridade", value: 36.0, color: "hsl(var(--muted))" },
];

const AnaliseEstrategica = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Dashboard de Análise Estratégica 📊
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore, filtre e descubra os insights do seu portfólio de processos
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total de Casos"
            value="45,280"
            subtitle="Processos analisados"
            icon={Users}
            variant="default"
          />
          <KPICard
            title="Valor Total"
            value="R$ 2.4B"
            subtitle="Portfólio completo"
            icon={DollarSign}
            variant="success"
          />
          <KPICard
            title="Alta Prioridade"
            value="28.8%"
            subtitle="Taxa de Mal"
            icon={AlertTriangle}
            variant="warning"
          />
          <KPICard
            title="Score Médio"
            value="67.3"
            subtitle="Actionability Score"
            icon={TrendingUp}
            variant="default"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              Análise de Concentração
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Validação da eficácia do Score ao isolar o maior impacto financeiro
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={concentracaoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="metrica" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="proporcao" fill="hsl(var(--primary))" name="Proporção (%)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 rounded-lg bg-success/10 p-4">
              <p className="text-sm font-medium text-success">
                ✓ Score Validado! Focando em apenas 28.8% dos processos, a gestão endereça mais de 40% do valor e risco da carteira.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              Distribuição de Prioridades
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Classificação estratégica do portfólio de processos
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classificacaoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classificacaoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Metodologia do Score de Ação
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-primary">
                Quando a empresa é Ré (Foco no RISCO)
              </h3>
              <div className="rounded-lg bg-destructive/10 p-4">
                <code className="text-sm text-foreground">
                  S_A = Valor da Causa × Complexidade
                </code>
                <p className="mt-2 text-xs text-muted-foreground">
                  Prioriza casos com alto risco de perda financeira
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-success">
                Quando a empresa é Autora (Foco no RETORNO)
              </h3>
              <div className="rounded-lg bg-success/10 p-4">
                <code className="text-sm text-foreground">
                  S_A = Valor da Causa - Complexidade
                </code>
                <p className="mt-2 text-xs text-muted-foreground">
                  Prioriza casos com maior retorno líquido esperado
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-accent/10 p-4">
            <p className="text-sm text-foreground">
              <strong>Resultado:</strong> O Score de Ação (S_A) identifica automaticamente os casos que exigem 
              atenção imediata, seja para mitigar riscos ou maximizar retornos.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnaliseEstrategica;
