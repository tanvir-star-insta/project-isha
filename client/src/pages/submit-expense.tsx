import { SubmitExpenseForm } from "@/components/submit-expense-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function SubmitExpense() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Submit New Expense</h1>
          <p className="text-sm text-muted-foreground">
            Upload your receipt and we'll auto-fill the details using OCR
          </p>
        </div>
      </div>

      <SubmitExpenseForm
        onSubmit={(data) => {
          console.log("Expense submitted:", data);
          setLocation("/");
        }}
      />
    </div>
  );
}
