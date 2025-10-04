import { ApprovalFlow } from "../approval-flow";

const mockSteps = [
  {
    id: "1",
    approverName: "David Smith",
    approverInitials: "DS",
    role: "Direct Manager",
    status: "approved" as const,
    comment: "Approved for business purposes",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    approverName: "Lisa Wang",
    approverInitials: "LW",
    role: "Finance Manager",
    status: "pending" as const,
  },
  {
    id: "3",
    approverName: "Robert Johnson",
    approverInitials: "RJ",
    role: "Director",
    status: "upcoming" as const,
  },
];

export default function ApprovalFlowExample() {
  return (
    <div className="max-w-md p-4">
      <ApprovalFlow steps={mockSteps} />
    </div>
  );
}
