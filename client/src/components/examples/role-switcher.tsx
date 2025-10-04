import { useState } from "react";
import { RoleSwitcher } from "../role-switcher";

export default function RoleSwitcherExample() {
  const [role, setRole] = useState<"admin" | "manager" | "employee">("admin");

  return (
    <div className="p-4">
      <RoleSwitcher currentRole={role} onRoleChange={setRole} />
      <p className="mt-4 text-sm text-muted-foreground">
        Current role: <strong>{role}</strong>
      </p>
    </div>
  );
}
