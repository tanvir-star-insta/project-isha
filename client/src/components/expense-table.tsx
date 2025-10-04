import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge, ExpenseStatus } from "./status-badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Expense {
  id: string;
  employeeName: string;
  employeeInitials: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  status: ExpenseStatus;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onViewExpense: (id: string) => void;
}

export function ExpenseTable({ expenses, onViewExpense }: ExpenseTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} data-testid={`row-expense-${expense.id}`}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {expense.employeeInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{expense.employeeName}</span>
                </div>
              </TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell className="text-muted-foreground">{expense.date}</TableCell>
              <TableCell className="text-right font-mono font-medium">
                {expense.currency} {expense.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <StatusBadge status={expense.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewExpense(expense.id)}
                  data-testid={`button-view-${expense.id}`}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
