import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle2 } from "lucide-react";

const concentracaoData = [
  { metrica: "Casos", proporcao: 28.8, tipo: "Volume" },
  { metrica: "Valor (W_V)", proporcao: 42.09, tipo: "Impacto" },
  { metrica: "Risco/Custo (C)", proporcao: 37.74, tipo: "Impacto" },
];

const Performance = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Performance e Validação do Score
          </h1>
          <p className="text-lg text-muted-foreground">
            A Prova de que o Score Otimiza o Foco (Taxa de Mal)
          </p>
        </div>

        <Card className="mb-8 p-6">
          <div className="mb-6 flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Análise de Concentração (Validação)
              </h2>
              <p className="text-sm text-muted-foreground">
                Validação da eficácia do S_A ao isolar o maior impacto financeiro
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={concentracaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="metrica" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Percentual Total Concentrado', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="proporcao" fill="hsl(var(--primary))" name="Proporção (%)" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-success/10 p-6">
              <h3 className="mb-2 text-lg font-bold text-success">
                ✓ Conclusão: O Score é Validado!
              </h3>
              <p className="text-foreground">
                Focando em apenas <strong className="text-success">28.8% dos processos</strong> (A Taxa de Mal), 
                a gestão endereça mais de <strong className="text-success">40% do valor e risco</strong> da carteira.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-l-4 border-l-primary p-4">
                <p className="text-sm font-medium text-muted-foreground">Volume de Casos</p>
                <p className="mt-1 text-2xl font-bold text-foreground">28.8%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Fração mínima do portfólio
                </p>
              </Card>
              <Card className="border-l-4 border-l-success p-4">
                <p className="text-sm font-medium text-muted-foreground">Concentração de Valor</p>
                <p className="mt-1 text-2xl font-bold text-foreground">42.09%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Do valor total da carteira
                </p>
              </Card>
              <Card className="border-l-4 border-l-warning p-4">
                <p className="text-sm font-medium text-muted-foreground">Concentração de Risco</p>
                <p className="mt-1 text-2xl font-bold text-foreground">37.74%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Do risco/custo total
                </p>
              </Card>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            O Conceito da Taxa de Mal
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              A <strong className="text-primary">Taxa de Mal</strong> representa o menor conjunto de processos que 
              concentra a maior parte do risco e valor do portfólio. É o princípio de Pareto aplicado à gestão jurídica.
            </p>
            <p>
              Ao identificar e priorizar essa fração crítica (28.8%), a organização pode:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Alocar recursos estrategicamente</strong> - Concentrar advogados 
                seniores e especialistas nos casos de maior impacto
              </li>
              <li>
                <strong className="text-foreground">Reduzir custos operacionais</strong> - Automatizar ou simplificar 
                a gestão dos 71.2% restantes
              </li>
              <li>
                <strong className="text-foreground">Maximizar resultados</strong> - Aumentar as chances de sucesso nos 
                casos que realmente importam
              </li>
              <li>
                <strong className="text-foreground">Melhorar a tomada de decisão</strong> - Base em dados concretos, 
                não em intuição
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Performance;
