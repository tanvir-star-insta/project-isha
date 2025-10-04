import { StatCard } from "@/components/stat-card";
import { ExpenseCard } from "@/components/expense-card";
import { DollarSign, Clock, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const mockMyExpenses = [
  {
    id: "EXP-004",
    employeeName: "John Doe",
    employeeInitials: "JD",
    amount: 125.00,
    currency: "USD",
    category: "Meals",
    date: "Jan 16, 2024",
    status: "pending" as const,
    description: "Client dinner meeting",
  },
  {
    id: "EXP-005",
    employeeName: "John Doe",
    employeeInitials: "JD",
    amount: 350.00,
    currency: "USD",
    category: "Travel",
    date: "Jan 10, 2024",
    status: "approved" as const,
    description: "Hotel stay for conference",
  },
  {
    id: "EXP-006",
    employeeName: "John Doe",
    employeeInitials: "JD",
    amount: 45.00,
    currency: "USD",
    category: "Office Supplies",
    date: "Jan 8, 2024",
    status: "rejected" as const,
    description: "Personal items",
  },
];

export default function EmployeeDashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your expense submissions
          </p>
        </div>
        <Button onClick={() => setLocation("/submit")} data-testid="button-submit-expense">
          <FileText className="h-4 w-4 mr-2" />
          Submit Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Pending Reimbursement"
          value="$125"
          icon={Clock}
          currency
        />
        <StatCard
          title="Approved This Month"
          value="$350"
          icon={CheckCircle}
          currency
        />
        <StatCard
          title="Total Submitted"
          value="$520"
          icon={DollarSign}
          currency
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Expenses</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockMyExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              onView={() => console.log("View expense:", expense.id)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
