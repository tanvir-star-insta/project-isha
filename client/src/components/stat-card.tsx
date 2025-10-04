import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  currency?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, currency }: StatCardProps) {
  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <p className={`text-2xl font-semibold ${currency ? 'font-mono' : ''}`}>
            {value}
          </p>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? "text-chart-2" : "text-chart-4"
              }`}
            >
              {trend.isPositive ? "+" : ""}{trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
