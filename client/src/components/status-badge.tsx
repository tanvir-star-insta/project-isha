import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

export type ExpenseStatus = "pending" | "approved" | "rejected" | "processing";

interface StatusBadgeProps {
  status: ExpenseStatus;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  processing: {
    label: "Processing",
    icon: AlertCircle,
    className: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`${config.className} gap-1`}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
