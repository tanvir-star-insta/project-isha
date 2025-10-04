import { ApprovalRulesForm } from "@/components/approval-rules-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const mockRules = [
  {
    id: "1",
    name: "Standard Expenses",
    range: "$0 - $500",
    steps: "Manager → Finance",
    status: "active" as const,
  },
  {
    id: "2",
    name: "High Value Expenses",
    range: "$500 - $5000",
    steps: "Manager → Finance → Director",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Executive Expenses",
    range: "$5000+",
    steps: "Finance → CFO → CEO",
    status: "active" as const,
  },
];

export default function ApprovalRules() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Approval Rules</h1>
          <p className="text-sm text-muted-foreground">
            Configure approval workflows based on expense amounts
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Active Rules</h2>
            <Button size="sm" data-testid="button-add-rule">
              <Plus className="h-4 w-4 mr-1" />
              Add Rule
            </Button>
          </div>

          {mockRules.map((rule) => (
            <Card key={rule.id} data-testid={`card-rule-${rule.id}`}>
              <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-base">{rule.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{rule.range}</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-chart-2/10 text-chart-2 border-chart-2/20"
                >
                  {rule.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Approval Flow</p>
                  <p className="text-sm font-mono">{rule.steps}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    data-testid={`button-edit-${rule.id}`}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-testid={`button-delete-${rule.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <ApprovalRulesForm
            onSubmit={(data) => console.log("Rule created:", data)}
          />
        </div>
      </div>
    </div>
  );
}
