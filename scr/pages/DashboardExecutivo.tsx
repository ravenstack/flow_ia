import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Award, AlertTriangle, Eye, Package } from "lucide-react";

// Dados simulados baseados no código Python
const casosData = [
  { nome: "Caso A-1234", actionability: 85, vme: 1250000, categoria: "Casos \"Ouro\"", magnitude: 8.5 },
  { nome: "Caso B-5678", actionability: 78, vme: 980000, categoria: "Casos \"Ouro\"", magnitude: 8.2 },
  { nome: "Caso C-9012", actionability: 82, vme: -450000, categoria: "Casos \"Armadilha\"", magnitude: 7.8 },
  { nome: "Caso D-3456", actionability: 88, vme: -320000, categoria: "Casos \"Armadilha\"", magnitude: 7.5 },
  { nome: "Caso E-7890", actionability: 35, vme: 890000, categoria: "Casos \"Silenciosos\"", magnitude: 8.0 },
  { nome: "Caso F-2345", actionability: 28, vme: 720000, categoria: "Casos \"Silenciosos\"", magnitude: 7.7 },
  { nome: "Caso G-6789", actionability: 55, vme: 120000, categoria: "Casos \"Secundários\"", magnitude: 6.5 },
  { nome: "Caso H-0123", actionability: 48, vme: -80000, categoria: "Casos \"Secundários\"", magnitude: 6.2 },
];

const categoriaColors = {
  "Casos \"Ouro\"": "hsl(var(--success))",
  "Casos \"Armadilha\"": "hsl(var(--destructive))",
  "Casos \"Silenciosos\"": "hsl(var(--accent))",
  "Casos \"Secundários\"": "hsl(var(--muted))",
};

const eficienciaData = [
  { categoria: "Casos \"Ouro\"", contagem: 1856, share: 28.5 },
  { categoria: "Casos \"Armadilha\"", contagem: 892, share: 13.7 },
  { categoria: "Casos \"Silenciosos\"", contagem: 456, share: 7.0 },
  { categoria: "Casos \"Secundários\"", contagem: 3316, share: 50.8 },
];

const DashboardExecutivo = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Dashboard Executivo: Visão Estratégica
          </h1>
          <p className="text-lg text-muted-foreground">
            Análise de Portfólio com VME Descontado e Categorização Estratégica
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Casos Analisados"
            value="6,520"
            subtitle="Portfólio ativo"
            icon={Package}
            variant="default"
          />
          <KPICard
            title="VME Médio"
            value="R$ 487K"
            subtitle="Valor Monetário Esperado"
            icon={Award}
            variant="success"
          />
          <KPICard
            title="Tempo Médio"
            value="18.3 meses"
            subtitle="Previsão de duração"
            icon={Eye}
            variant="warning"
          />
          <KPICard
            title="Casos Ouro"
            value="28.5%"
            subtitle="Alta prioridade + Alto VME"
            icon={AlertTriangle}
            variant="success"
          />
        </div>

        <Card className="mb-8 p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Mapa Estratégico de Casos
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Visualização do Actionability Score vs VME Descontado no Tempo (Bolhas = Magnitude)
          </p>
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="actionability"
                name="Actionability Score"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: 'Actionability Score (Original)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                type="number"
                dataKey="vme"
                name="VME Descontado"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: 'VME Descontado (R$)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: any, name: string) => {
                  if (name === "VME Descontado") {
                    return [`R$ ${Number(value).toLocaleString('pt-BR')}`, name];
                  }
                  return [value, name];
                }}
              />
              <Scatter data={casosData} fill="#8884d8">
                {casosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoriaColors[entry.categoria as keyof typeof categoriaColors]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-success/10 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-success">
                <Award className="h-5 w-5" />
                <span>Casos "Ouro" (Quadrante Superior Direito)</span>
              </h3>
              <p className="text-sm text-foreground">
                Alto Actionability + VME Positivo Alto = <strong>Foco máximo em mitigação e maximização</strong>
              </p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Casos "Armadilha" (Quadrante Superior Direito Negativo)</span>
              </h3>
              <p className="text-sm text-foreground">
                Alto Actionability + VME Negativo = <strong>Defesa padrão, evitar esforço excessivo</strong>
              </p>
            </div>
            <div className="rounded-lg bg-accent/10 p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-accent">
                <Eye className="h-5 w-5" />
                <span>Casos "Silenciosos" (Quadrante Inferior Direito)</span>
              </h3>
              <p className="text-sm text-foreground">
                Baixo Actionability + VME Alto = <strong>Oportunidades escondidas a promover</strong>
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 flex items-center space-x-2 font-semibold text-muted-foreground">
                <Package className="h-5 w-5" />
                <span>Casos "Secundários"</span>
              </h3>
              <p className="text-sm text-foreground">
                Gestão passiva ou automação = <strong>Minimizar recursos alocados</strong>
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Distribuição de Eficiência por Categoria
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {eficienciaData.map((item, index) => {
              const color = 
                item.categoria === "Casos \"Ouro\"" ? "success" :
                item.categoria === "Casos \"Armadilha\"" ? "destructive" :
                item.categoria === "Casos \"Silenciosos\"" ? "warning" : "default";
              
              return (
                <Card key={index} className={`border-l-4 p-4 ${
                  color === "success" ? "border-l-success" :
                  color === "destructive" ? "border-l-destructive" :
                  color === "warning" ? "border-l-warning" : "border-l-muted"
                }`}>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.categoria}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {item.contagem.toLocaleString('pt-BR')}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.share.toFixed(1)}% do total
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg bg-primary/10 p-6">
            <h3 className="mb-2 text-lg font-bold text-primary">
              Insight Executivo
            </h3>
            <p className="text-foreground">
              A estratégia de categorização revela que <strong>28.5% dos casos (Ouro)</strong> merecem atenção executiva imediata, 
              enquanto <strong>50.8% (Secundários)</strong> podem ser geridos com automação e processos padronizados, 
              liberando recursos para os casos críticos.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardExecutivo;
