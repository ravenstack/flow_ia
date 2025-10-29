import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CasoArmadilha {
  numeroProcesso: string;
  valor: number;
  scoreA: number;
  vmeOtimizado: number;
}

interface AlertaArmadilhaProps {
  casos: CasoArmadilha[];
}

export const AlertaArmadilha = ({ casos }: AlertaArmadilhaProps) => {
  const navigate = useNavigate();
  const totalValor = casos.reduce((sum, caso) => sum + caso.valor, 0);

  if (casos.length === 0) return null;

  return (
    <Alert className="border-warning bg-warning/5 border-l-4 border-l-warning">
      <AlertCircle className="h-5 w-5 text-warning" />
      <AlertTitle className="text-warning font-bold flex items-center justify-between">
        <span>⚠️ ALERTA: {casos.length} Casos "Armadilha" Detectados</span>
        <span className="text-sm font-normal">
          Risco Financeiro: {totalValor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </AlertTitle>
      <AlertDescription className="mt-3 space-y-3">
        <p className="text-foreground">
          <strong>Ação Imediata Requerida:</strong> Estes casos possuem alto Score
          de Ação (S_A) mas baixo VME Otimizado, indicando que parecem importantes
          mas o ML prevê baixo retorno. Evite investir recursos excessivos.
        </p>
        
        <div className="rounded-lg bg-background p-3 space-y-2">
          {casos.slice(0, 3).map((caso, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0"
            >
              <span className="font-mono text-xs">{caso.numeroProcesso}</span>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  S_A: <strong className="text-foreground">{(caso.scoreA * 100).toFixed(0)}%</strong>
                </span>
                <span className="text-muted-foreground">
                  VME: <strong className="text-warning">{(caso.vmeOtimizado * 100).toFixed(0)}%</strong>
                </span>
                <span className="text-foreground font-semibold">
                  {caso.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          ))}
          {casos.length > 3 && (
            <p className="text-xs text-muted-foreground pt-2">
              + {casos.length - 3} casos adicionais
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/processos?categoria=armadilha")}
            className="bg-warning hover:bg-warning/90"
          >
            Ver Todos os Casos Armadilha
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            Configurar Alertas
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
