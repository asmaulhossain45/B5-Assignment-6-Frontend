import Topbar from "./Topbar";
import { Outlet } from "react-router";
import AppSidebar from "./AppSidebar";
import Loading from "@/pages/public/Loading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

const DashboardLayout = () => {
  const { userLoading } = useCurrentUser();

if (userLoading) return <Loading type="page" size="lg" />

  return (
    <SidebarProvider className="w-full">
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex flex-1 flex-col p-4 md:p-6 min-h-[calc(100vh-65px)]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
