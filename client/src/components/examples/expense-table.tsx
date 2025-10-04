import { ExpenseTable } from "../expense-table";

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
    status: "rejected" as const,
  },
];

export default function ExpenseTableExample() {
  return (
    <div className="p-4">
      <ExpenseTable
        expenses={mockExpenses}
        onViewExpense={(id) => console.log("View expense:", id)}
      />
    </div>
  );
}
