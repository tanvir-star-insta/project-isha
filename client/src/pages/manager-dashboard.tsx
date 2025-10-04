import { StatCard } from "@/components/stat-card";
import { ExpenseCard } from "@/components/expense-card";
import { Clock, CheckCircle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockPendingExpenses = [
  {
    id: "EXP-001",
    employeeName: "Sarah Johnson",
    employeeInitials: "SJ",
    amount: 245.50,
    currency: "USD",
    category: "Travel",
    date: "Jan 15, 2024",
    status: "pending" as const,
    description: "Flight to client meeting",
  },
  {
    id: "EXP-003",
    employeeName: "Emily Davis",
    employeeInitials: "ED",
    amount: 450.00,
    currency: "USD",
    category: "Office Supplies",
    date: "Jan 13, 2024",
    status: "pending" as const,
    description: "New laptop for development",
  },
];

const mockTeamExpenses = [
  {
    id: "EXP-002",
    employeeName: "Mike Chen",
    employeeInitials: "MC",
    amount: 89.99,
    currency: "USD",
    category: "Meals",
    date: "Jan 14, 2024",
    status: "approved" as const,
    description: "Team lunch",
  },
];

export default function ManagerDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Review and approve your team's expenses
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Pending Approvals"
          value="2"
          icon={Clock}
        />
        <StatCard
          title="Approved This Month"
          value="18"
          icon={CheckCircle}
        />
        <StatCard
          title="Team Members"
          value="12"
          icon={Users}
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" data-testid="tab-pending">
            Pending Approvals
          </TabsTrigger>
          <TabsTrigger value="team" data-testid="tab-team">
            Team Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requires Your Approval</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {mockPendingExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  {...expense}
                  showActions={true}
                  onView={() => console.log("View expense:", expense.id)}
                  onApprove={() => console.log("Approved:", expense.id)}
                  onReject={() => console.log("Rejected:", expense.id)}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Expense History</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {mockTeamExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  {...expense}
                  onView={() => console.log("View expense:", expense.id)}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
