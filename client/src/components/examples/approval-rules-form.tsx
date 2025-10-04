import { ApprovalRulesForm } from "../approval-rules-form";

export default function ApprovalRulesFormExample() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ApprovalRulesForm
        onSubmit={(data) => console.log("Approval rule saved:", data)}
      />
    </div>
  );
}
