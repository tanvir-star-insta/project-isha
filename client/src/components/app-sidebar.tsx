import {
  LayoutDashboard,
  Receipt,
  Users,
  Settings,
  FileText,
  CheckSquare,
  GitBranch,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type UserRole = "admin" | "manager" | "employee";

interface AppSidebarProps {
  role: UserRole;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const menuItems = {
  admin: [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "All Expenses", url: "/expenses", icon: Receipt },
    { title: "Users", url: "/users", icon: Users },
    { title: "Approval Rules", url: "/rules", icon: GitBranch },
    { title: "Reports", url: "/reports", icon: FileText },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  manager: [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Pending Approvals", url: "/approvals", icon: CheckSquare },
    { title: "Team Expenses", url: "/team-expenses", icon: Receipt },
    { title: "My Expenses", url: "/my-expenses", icon: FileText },
  ],
  employee: [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "My Expenses", url: "/my-expenses", icon: Receipt },
    { title: "Submit Expense", url: "/submit", icon: FileText },
  ],
};

const roleColors = {
  admin: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  manager: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  employee: "bg-chart-2/10 text-chart-2 border-chart-2/20",
};

export function AppSidebar({ role, currentPath, onNavigate }: AppSidebarProps) {
  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Receipt className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">ExpenseFlow</span>
            <Badge variant="outline" className={`${roleColors[role]} text-xs w-fit`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.url)}
                    isActive={currentPath === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@company.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
