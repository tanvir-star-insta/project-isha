import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { ApprovalFlow } from "@/components/approval-flow";
import { ArrowLeft, Download } from "lucide-react";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockExpense = {
  id: "EXP-001",
  employeeName: "Sarah Johnson",
  employeeInitials: "SJ",
  amount: 245.50,
  currency: "USD",
  category: "Travel",
  date: "Jan 15, 2024",
  status: "pending" as const,
  description: "Flight to client meeting in New York",
  receipt: "https://via.placeholder.com/400x600/e5e7eb/6b7280?text=Receipt",
};

const mockApprovalSteps = [
  {
    id: "1",
    approverName: "David Smith",
    approverInitials: "DS",
    role: "Direct Manager",
    status: "approved" as const,
    comment: "Approved for business purposes",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    approverName: "Lisa Wang",
    approverInitials: "LW",
    role: "Finance Manager",
    status: "pending" as const,
  },
  {
    id: "3",
    approverName: "Robert Johnson",
    approverInitials: "RJ",
    role: "Director",
    status: "upcoming" as const,
  },
];

export default function ExpenseDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Expense Details</h1>
          <p className="text-sm text-muted-foreground">ID: {mockExpense.id}</p>
        </div>
        <StatusBadge status={mockExpense.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{mockExpense.employeeInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{mockExpense.employeeName}</p>
                  <p className="text-sm text-muted-foreground">Submitter</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-xl font-semibold font-mono">
                    {mockExpense.currency} {mockExpense.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="text-lg font-medium">{mockExpense.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-sm">{mockExpense.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={mockExpense.status} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{mockExpense.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
              <CardTitle>Receipt</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-download-receipt">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <img
                src={mockExpense.receipt}
                alt="Receipt"
                className="w-full rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <ApprovalFlow steps={mockApprovalSteps} />
        </div>
      </div>
    </div>
  );
}
