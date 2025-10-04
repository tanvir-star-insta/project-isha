import { SubmitExpenseForm } from "../submit-expense-form";

export default function SubmitExpenseFormExample() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <SubmitExpenseForm
        onSubmit={(data) => console.log("Form submitted:", data)}
      />
    </div>
  );
}
