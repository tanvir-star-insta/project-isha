import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, ExpenseStatus } from "./status-badge";
import { Calendar, Receipt, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ExpenseCardProps {
  id: string;
  employeeName: string;
  employeeInitials: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  status: ExpenseStatus;
  description?: string;
  onView?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

export function ExpenseCard({
  id,
  employeeName,
  employeeInitials,
  amount,
  currency,
  category,
  date,
  status,
  description,
  onView,
  onApprove,
  onReject,
  showActions = false,
}: ExpenseCardProps) {
  return (
    <Card data-testid={`card-expense-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{employeeInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{employeeName}</p>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-2xl font-semibold font-mono">
            {currency} {amount.toLocaleString()}
          </p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Receipt className="h-3 w-3" />
            ID: {id}
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onView}
            data-testid={`button-view-${id}`}
          >
            View Details
          </Button>
          {status === "pending" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onApprove}
                data-testid={`button-approve-${id}`}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onReject}
                data-testid={`button-reject-${id}`}
              >
                Reject
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
