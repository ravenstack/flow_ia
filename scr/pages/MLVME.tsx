import { Card } from "@/components/ui/card";
import { Brain, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";

const categorias = [
  {
    nome: 'Casos "Ouro"',
    sa: "Alto",
    vme: "Alto",
    acao: "MITIGAÇÃO MÁXIMA / MAXIMIZAÇÃO",
    icon: TrendingUp,
    color: "success",
    descricao: "Casos de alta prioridade com alto retorno previsto pelo ML. Foco total da gestão.",
  },
  {
    nome: 'Casos "Armadilha"',
    sa: "Alto",
    vme: "Baixo",
    acao: "DEFESA PADRÃO / COBRANÇA MASSIVA",
    icon: AlertCircle,
    color: "warning",
    descricao: "Parecem importantes, mas o ML prevê baixo VME. Evitar esforço excessivo.",
  },
  {
    nome: 'Casos "Silenciosos"',
    sa: "Baixo",
    vme: "Alto",
    acao: "PROMOVER (Oportunidade de Ganho Rápido)",
    icon: TrendingDown,
    color: "accent",
    descricao: "Parecem irrelevantes, mas o ML prevê alto VME. Oportunidades escondidas!",
  },
];

const MLVME = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Machine Learning e VME Otimizado
          </h1>
          <p className="text-lg text-muted-foreground">
            Integrando a Probabilidade para o Ganho Monetário Líquido
          </p>
        </div>

        <Card className="mb-8 p-6">
          <div className="mb-6 flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Fórmula do VME Otimizado
              </h2>
              <p className="text-sm text-muted-foreground">
                Otimização pelo Machine Learning
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-primary/5 p-6">
            <p className="mb-4 text-foreground">
              O <strong>VME Score Otimizado</strong> ajusta o Score de Ação (S_A) pela Probabilidade 
              de Sucesso Legal, prevista pelo modelo de ML:
            </p>
            <div className="my-6 flex justify-center">
              <code className="rounded-lg bg-card p-4 text-lg font-mono border border-border">
                VME_Otimizado = S_A × (1 - P(Alto Risco Previsto))
              </code>
            </div>
            <div className="mt-4 rounded-lg bg-accent/10 p-4">
              <p className="text-sm text-foreground">
                <strong>Target do ML:</strong> Devido à ausência de dados de desfecho final, o ML previu 
                a P(Alto Risco) (proxy para a chance de perda), atingindo{" "}
                <strong className="text-accent">100% de acurácia</strong> na amostra de alta prioridade.
              </p>
            </div>
          </div>
        </Card>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            As Categorias Estratégicas
          </h2>
          <p className="mb-6 text-muted-foreground">
            O ML permite reclassificar os casos, identificando falhas na priorização tradicional:
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {categorias.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 border-t-4 ${
                    cat.color === "success"
                      ? "border-t-success"
                      : cat.color === "warning"
                      ? "border-t-warning"
                      : "border-t-accent"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">{cat.nome}</h3>
                    <div
                      className={`rounded-lg p-2 ${
                        cat.color === "success"
                          ? "bg-success/10"
                          : cat.color === "warning"
                          ? "bg-warning/10"
                          : "bg-accent/10"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          cat.color === "success"
                            ? "text-success"
                            : cat.color === "warning"
                            ? "text-warning"
                            : "text-accent"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">S_A (Bruto):</span>
                      <span className="font-semibold text-foreground">{cat.sa}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">VME (ML):</span>
                      <span className="font-semibold text-foreground">{cat.vme}</span>
                    </div>
                  </div>

                  <div
                    className={`mb-4 rounded-lg p-3 ${
                      cat.color === "success"
                        ? "bg-success/10"
                        : cat.color === "warning"
                        ? "bg-warning/10"
                        : "bg-accent/10"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{cat.acao}</p>
                  </div>

                  <p className="text-sm text-muted-foreground">{cat.descricao}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            O Valor do Machine Learning
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              A integração do Machine Learning transforma a priorização de casos de uma arte em uma ciência:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-destructive/10 p-4">
                <h3 className="mb-2 font-semibold text-destructive">🚫 Casos "Armadilha"</h3>
                <p className="text-sm text-foreground">
                  Casos que <strong>parecem importantes</strong> (S_A Alto), mas o ML prevê <strong>baixo VME</strong>. 
                  Sem o ML, recursos seriam desperdiçados aqui.
                </p>
              </div>
              <div className="rounded-lg bg-success/10 p-4">
                <h3 className="mb-2 font-semibold text-success">✨ Casos "Silenciosos"</h3>
                <p className="text-sm text-foreground">
                  Casos que <strong>parecem irrelevantes</strong> (S_A Baixo), mas o ML prevê <strong>alto VME</strong>. 
                  Oportunidades que passariam despercebidas!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MLVME;
