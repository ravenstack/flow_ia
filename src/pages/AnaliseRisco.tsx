import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AlertTriangle, TrendingUp, Shield, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dados de risco por tribunal
const riscoTribunalData = [
  { tribunal: "STJ", pscore: 78.5, vme: 1250000, casos: 245 },
  { tribunal: "TJSP", pscore: 62.3, vme: 890000, casos: 3420 },
  { tribunal: "TRF-3", pscore: 71.2, vme: 1120000, casos: 856 },
  { tribunal: "TJRJ", pscore: 58.9, vme: 780000, casos: 1240 },
  { tribunal: "Outros", pscore: 45.6, vme: 520000, casos: 1759 },
];

// Dados de risco por assunto
const riscoAssuntoData = [
  { assunto: "Dano Moral", pscore: 82.1, casos: 1850 },
  { assunto: "Fornecimento de Água", pscore: 75.6, casos: 2340 },
  { assunto: "Tarifa Social", pscore: 68.4, casos: 980 },
  { assunto: "Cobrança Indevida", pscore: 71.9, casos: 1560 },
  { assunto: "Outros", pscore: 54.2, casos: 790 },
];

const categoriasFinalData = [
  { categoria: "Ouro Pesadelo", count: 892, percentual: 13.7, color: "hsl(var(--destructive))" },
  { categoria: "Risco Extremo", count: 456, percentual: 7.0, color: "hsl(var(--warning))" },
  { categoria: "Ouro Puro", count: 1124, percentual: 17.2, color: "hsl(var(--success))" },
  { categoria: "Alta Prioridade Comum", count: 4048, percentual: 62.1, color: "hsl(var(--accent))" },
];

const AnaliseRisco = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Análise Estatística Explicativa e Estratégia de Jurisprudência
          </h1>
          <p className="text-lg text-muted-foreground">
            Diagnóstico: Convergência do VME Final e P-Score (Risco Operacional)
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="P-Score Médio"
            value="64.7"
            subtitle="Risco estatístico"
            icon={AlertTriangle}
            variant="warning"
          />
          <KPICard
            title="Casos Alto Risco"
            value="1,348"
            subtitle="P-Score > P75"
            icon={Shield}
            variant="destructive"
          />
          <KPICard
            title="Ouro Puro"
            value="17.2%"
            subtitle="Baixo risco + Alto retorno"
            icon={TrendingUp}
            variant="success"
          />
          <KPICard
            title="Ouro Pesadelo"
            value="13.7%"
            subtitle="Alto risco + Alto retorno"
            icon={Target}
            variant="warning"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              P-Score Mediano por Tribunal
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Identificação de tribunais com maior risco estatístico
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riscoTribunalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="tribunal" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="pscore" name="P-Score Médio">
                  {riscoTribunalData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.pscore > 70 ? "hsl(var(--destructive))" : entry.pscore > 60 ? "hsl(var(--warning))" : "hsl(var(--success))"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riscoTribunalData.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-foreground">{item.tribunal}</span>
                  </div>
                  <Badge variant={item.pscore > 70 ? "destructive" : "secondary"}>
                    P-Score: {item.pscore.toFixed(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              Risco por Assunto Jurídico
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Assuntos com maior P-Score e volume de casos
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riscoAssuntoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="assunto" stroke="hsl(var(--muted-foreground))" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="pscore" name="P-Score Médio" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Categorias Estratégicas Finais (Integração VME e P-Score)
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Classificação final integrando risco estatístico (P-Score) e valor monetário esperado (VME)
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categoriasFinalData.map((item, index) => (
              <Card
                key={index}
                className="border-t-4 p-4"
                style={{ borderTopColor: item.color }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-foreground">{item.categoria}</h3>
                  <Badge style={{ backgroundColor: item.color, color: "white" }}>
                    {item.percentual.toFixed(1)}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{item.count.toLocaleString('pt-BR')}</p>
                <p className="mt-1 text-xs text-muted-foreground">casos identificados</p>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-l-destructive bg-destructive/5 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Ouro Pesadelo</span>
              </h3>
              <p className="text-sm text-foreground">
                <strong>Alto Risco (P-Score P75+) + Alto Retorno (VME Mediano+)</strong>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Casos críticos que exigem estratégia jurídica agressiva e monitoramento constante. 
                Alto potencial de ganho, mas com risco elevado de perda.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-l-warning bg-warning/5 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-warning">
                <Shield className="h-5 w-5" />
                <span>Risco Extremo de Perda</span>
              </h3>
              <p className="text-sm text-foreground">
                <strong>Alto Risco (P-Score P75+) + Baixo Retorno (VME abaixo de Q25)</strong>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Focar em contenção de danos e acordos. Não vale o esforço de litigância agressiva.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-l-success bg-success/5 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-success">
                <TrendingUp className="h-5 w-5" />
                <span>Ouro Puro</span>
              </h3>
              <p className="text-sm text-foreground">
                <strong>Baixo Risco (P-Score abaixo de Q25) + Alto Retorno (VME P75+)</strong>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Os casos ideais! Alto potencial de ganho com baixo risco. Prioridade máxima para maximização.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-l-accent bg-accent/5 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-accent">
                <Target className="h-5 w-5" />
                <span>Alta Prioridade Comum</span>
              </h3>
              <p className="text-sm text-foreground">
                <strong>Casos na Taxa de Mal sem alerta extremo</strong>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Gestão ativa padrão com monitoramento regular. Seguir protocolo estabelecido.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Recomendações Estratégicas por Granularidade
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-destructive/10 p-4">
              <h3 className="mb-2 font-semibold text-destructive">
                Foco Imediato: STJ + Dano Moral
              </h3>
              <p className="text-sm text-foreground">
                A combinação <strong>STJ + Dano Moral</strong> apresenta o maior P-Score (82.1) e alto VME. 
                Recomenda-se alocação de equipe jurídica especializada e revisão de precedentes recentes.
              </p>
            </div>

            <div className="rounded-lg bg-accent/10 p-4">
              <h3 className="mb-2 font-semibold text-accent">
                Monitoramento: TRF-3 + Fornecimento de Água
              </h3>
              <p className="text-sm text-foreground">
                Volume significativo (2,340 casos) com P-Score elevado (75.6). Avaliar possibilidade de 
                estratégia unificada ou precedente vinculante.
              </p>
            </div>

            <div className="rounded-lg bg-success/10 p-4">
              <h3 className="mb-2 font-semibold text-success">
                Oportunidade: Casos com Baixo P-Score e Alto VME
              </h3>
              <p className="text-sm text-foreground">
                Identificados <strong>1,124 casos "Ouro Puro"</strong> (17.2%) que representam baixo risco 
                com alto retorno. Priorizar para maximização de resultados.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnaliseRisco;
