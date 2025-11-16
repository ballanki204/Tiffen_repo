import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatCard = ({
  title,
  value,
  change,
  icon,
  iconBg = "bg-primary/10",
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <Card className="shadow-card hover-card-hover transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{value}</h3>
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {isPositive && <ArrowUp className="h-4 w-4 text-success" />}
                {isNegative && (
                  <ArrowDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive && "text-success",
                    isNegative && "text-destructive"
                  )}
                >
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconBg)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};
