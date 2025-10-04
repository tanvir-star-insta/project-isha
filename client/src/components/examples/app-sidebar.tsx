import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export default function AppSidebarExample() {
  const [currentPath, setCurrentPath] = useState("/");

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-[600px] w-full">
        <AppSidebar role="admin" currentPath={currentPath} onNavigate={setCurrentPath} />
      </div>
    </SidebarProvider>
  );
}
