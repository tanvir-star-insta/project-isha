import { StatCard } from "../stat-card";
import { DollarSign, Clock, Users, TrendingUp } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
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
  );
}
