import { StatCard } from "@/components/stat-card";
import { ExpenseTable } from "@/components/expense-table";
import { DollarSign, Clock, Users, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserFormDialog } from "@/components/user-form-dialog";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockExpenses = [
  {
    id: "EXP-001",
    employeeName: "Sarah Johnson",
    employeeInitials: "SJ",
    amount: 245.50,
    currency: "USD",
    category: "Travel",
    date: "Jan 15, 2024",
    status: "pending" as const,
  },
  {
    id: "EXP-002",
    employeeName: "Mike Chen",
    employeeInitials: "MC",
    amount: 89.99,
    currency: "USD",
    category: "Meals",
    date: "Jan 14, 2024",
    status: "approved" as const,
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
  },
];

const mockManagers = [
  { id: "1", name: "David Smith" },
  { id: "2", name: "Lisa Wang" },
];

export default function AdminDashboard() {
  const [showUserDialog, setShowUserDialog] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage your organization's expenses and users
          </p>
        </div>
        <Button onClick={() => setShowUserDialog(true)} data-testid="button-create-user">
          <Plus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value="$45,231"
          icon={DollarSign}
          trend={{ value: "12%", isPositive: true }}
          currency
        />
        <StatCard
          title="Pending Approvals"
          value="23"
          icon={Clock}
        />
        <StatCard
          title="Active Employees"
          value="156"
          icon={Users}
        />
        <StatCard
          title="Approval Rate"
          value="94%"
          icon={TrendingUp}
          trend={{ value: "3%", isPositive: true }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseTable
            expenses={mockExpenses}
            onViewExpense={(id) => console.log("View expense:", id)}
          />
        </CardContent>
      </Card>

      <UserFormDialog
        open={showUserDialog}
        onOpenChange={setShowUserDialog}
        managers={mockManagers}
      />
    </div>
  );
}
