import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

export const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: KPICardProps) => {
  const variantClasses = {
    default: "border-l-4 border-l-primary",
    success: "border-l-4 border-l-success",
    warning: "border-l-4 border-l-warning",
    destructive: "border-l-4 border-l-destructive",
  };

  return (
    <Card
      className={cn(
        "p-6 transition-all hover:shadow-lg",
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">{value}</h3>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "rounded-lg p-3",
              variant === "default" && "bg-primary/10 text-primary",
              variant === "success" && "bg-success/10 text-success",
              variant === "warning" && "bg-warning/10 text-warning",
              variant === "destructive" && "bg-destructive/10 text-destructive"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
};
