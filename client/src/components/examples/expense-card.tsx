import { ExpenseCard } from "../expense-card";

export default function ExpenseCardExample() {
  return (
    <div className="max-w-md p-4 space-y-4">
      <ExpenseCard
        id="EXP-001"
        employeeName="Sarah Johnson"
        employeeInitials="SJ"
        amount={245.50}
        currency="USD"
        category="Travel"
        date="Jan 15, 2024"
        status="pending"
        description="Flight to client meeting"
        showActions={true}
        onView={() => console.log("View expense")}
        onApprove={() => console.log("Approved")}
        onReject={() => console.log("Rejected")}
      />
      <ExpenseCard
        id="EXP-002"
        employeeName="Mike Chen"
        employeeInitials="MC"
        amount={89.99}
        currency="USD"
        category="Meals"
        date="Jan 14, 2024"
        status="approved"
        description="Team lunch"
        onView={() => console.log("View expense")}
      />
    </div>
  );
}
