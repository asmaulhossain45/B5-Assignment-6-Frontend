import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Topbar />
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
