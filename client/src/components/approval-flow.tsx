import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, X, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ApprovalStep {
  id: string;
  approverName: string;
  approverInitials: string;
  role: string;
  status: "pending" | "approved" | "rejected" | "upcoming";
  comment?: string;
  timestamp?: string;
}

interface ApprovalFlowProps {
  steps: ApprovalStep[];
}

export function ApprovalFlow({ steps }: ApprovalFlowProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Approval Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-4">
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-12 h-full w-0.5 bg-border" />
              )}
              <div className="relative">
                <Avatar
                  className={`h-10 w-10 ring-2 ${
                    step.status === "approved"
                      ? "ring-chart-2"
                      : step.status === "rejected"
                      ? "ring-chart-4"
                      : step.status === "pending"
                      ? "ring-chart-3"
                      : "ring-border"
                  }`}
                >
                  <AvatarFallback>{step.approverInitials}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ${
                    step.status === "approved"
                      ? "bg-chart-2"
                      : step.status === "rejected"
                      ? "bg-chart-4"
                      : step.status === "pending"
                      ? "bg-chart-3"
                      : "bg-muted"
                  }`}
                >
                  {step.status === "approved" && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                  {step.status === "rejected" && (
                    <X className="h-3 w-3 text-white" />
                  )}
                  {step.status === "pending" && (
                    <Clock className="h-3 w-3 text-white" />
                  )}
                  {step.status === "upcoming" && (
                    <User className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{step.approverName}</p>
                    <p className="text-sm text-muted-foreground">{step.role}</p>
                  </div>
                  {step.timestamp && (
                    <span className="text-xs text-muted-foreground">
                      {step.timestamp}
                    </span>
                  )}
                </div>
                {step.comment && (
                  <p className="text-sm text-muted-foreground italic">
                    "{step.comment}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
