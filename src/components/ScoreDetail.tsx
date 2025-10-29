import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface ScoreDetailProps {
  scoreA: number;
  vmeOtimizado?: number;
  categoria?: "ouro" | "armadilha" | "silencioso" | "padrao";
  valor?: number;
  showDetails?: boolean;
}

export const ScoreDetail = ({
  scoreA,
  vmeOtimizado,
  categoria,
  valor,
  showDetails = false,
}: ScoreDetailProps) => {
  const getCategoriaInfo = () => {
    if (!categoria) {
      // Auto-detectar categoria baseado no scoreA
      if (scoreA >= 0.7 && (!vmeOtimizado || vmeOtimizado >= 0.7)) {
        return {
          nome: "Ouro",
          icon: TrendingUp,
          color: "success",
          bgColor: "bg-success/10",
          borderColor: "border-success",
          textColor: "text-success",
        };
      } else if (scoreA >= 0.7 && vmeOtimizado && vmeOtimizado < 0.4) {
        return {
          nome: "Armadilha",
          icon: AlertCircle,
          color: "warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning",
          textColor: "text-warning",
        };
      } else if (scoreA < 0.4 && vmeOtimizado && vmeOtimizado >= 0.7) {
        return {
          nome: "Silencioso",
          icon: TrendingDown,
          color: "accent",
          bgColor: "bg-accent/10",
          borderColor: "border-accent",
          textColor: "text-accent",
        };
      }
    }

    const categoriaMap = {
      ouro: {
        nome: "Ouro",
        icon: TrendingUp,
        color: "success",
        bgColor: "bg-success/10",
        borderColor: "border-success",
        textColor: "text-success",
      },
      armadilha: {
        nome: "Armadilha",
        icon: AlertCircle,
        color: "warning",
        bgColor: "bg-warning/10",
        borderColor: "border-warning",
        textColor: "text-warning",
      },
      silencioso: {
        nome: "Silencioso",
        icon: TrendingDown,
        color: "accent",
        bgColor: "bg-accent/10",
        borderColor: "border-accent",
        textColor: "text-accent",
      },
    };

    return categoria ? categoriaMap[categoria] : null;
  };

  const catInfo = getCategoriaInfo();
  const Icon = catInfo?.icon;

  if (!showDetails) {
    return (
      <div className="flex items-center space-x-2">
        <Badge
          className={cn(
            catInfo?.bgColor,
            catInfo?.textColor,
            catInfo?.borderColor,
            "border"
          )}
        >
          {catInfo ? catInfo.nome : scoreA >= 0.7 ? "Alto" : scoreA >= 0.4 ? "Médio" : "Baixo"}
        </Badge>
      </div>
    );
  }

  return (
    <Card className={cn("p-4 border-l-4", catInfo?.borderColor)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            {Icon && (
              <div className={cn("rounded-lg p-2", catInfo?.bgColor)}>
                <Icon className={cn("h-4 w-4", catInfo?.textColor)} />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Categoria
              </p>
              <p className={cn("text-lg font-bold", catInfo?.textColor)}>
                {catInfo?.nome || "Padrão"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Score Bruto (S_A)</p>
              <p className="text-sm font-semibold text-foreground">
                {(scoreA * 100).toFixed(1)}%
              </p>
            </div>
            {vmeOtimizado !== undefined && (
              <div>
                <p className="text-xs text-muted-foreground">VME Otimizado</p>
                <p className="text-sm font-semibold text-foreground">
                  {(vmeOtimizado * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          {valor && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">Valor Estimado</p>
              <p className="text-sm font-bold text-foreground">
                {valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
