import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, User } from "lucide-react";

type UserRole = "admin" | "manager" | "employee";

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles = [
  { value: "admin" as const, label: "Admin", icon: Shield, color: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  { value: "manager" as const, label: "Manager", icon: Users, color: "bg-chart-1/10 text-chart-1 border-chart-1/20" },
  { value: "employee" as const, label: "Employee", icon: User, color: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
];

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="flex items-center gap-2 p-4 bg-card border rounded-md">
      <span className="text-sm font-medium text-muted-foreground">Demo Mode:</span>
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <Button
            key={role.value}
            variant={currentRole === role.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onRoleChange(role.value)}
            data-testid={`button-role-${role.value}`}
            className="gap-2"
          >
            <Icon className="h-4 w-4" />
            {role.label}
          </Button>
        );
      })}
    </div>
  );
}
