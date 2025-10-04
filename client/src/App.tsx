import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { RoleSwitcher } from "@/components/role-switcher";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/admin-dashboard";
import ManagerDashboard from "@/pages/manager-dashboard";
import EmployeeDashboard from "@/pages/employee-dashboard";
import SubmitExpense from "@/pages/submit-expense";
import ApprovalRules from "@/pages/approval-rules";
import ExpenseDetail from "@/pages/expense-detail";
import { useState } from "react";

type UserRole = "admin" | "manager" | "employee";

function Router({ role }: { role: UserRole }) {
  return (
    <Switch>
      <Route path="/" component={role === "admin" ? AdminDashboard : role === "manager" ? ManagerDashboard : EmployeeDashboard} />
      <Route path="/submit" component={SubmitExpense} />
      <Route path="/rules" component={ApprovalRules} />
      <Route path="/expense/:id" component={ExpenseDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [currentPath] = useLocation();
  const [role, setRole] = useState<UserRole>("admin");

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar
                role={role}
                currentPath={currentPath}
                onNavigate={() => {}}
              />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between gap-4 p-4 border-b">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="flex items-center gap-4">
                    <RoleSwitcher currentRole={role} onRoleChange={setRole} />
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 overflow-auto">
                  <Router role={role} />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
