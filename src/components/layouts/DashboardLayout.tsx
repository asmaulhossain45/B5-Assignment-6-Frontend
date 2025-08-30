import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import Topbar from "./Topbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Loading from "@/pages/public/Loading";
import AppSidebar from "./AppSidebar";

const DashboardLayout = () => {
  const { userLoading } = useCurrentUser();

  if (userLoading) return <Loading type="page" size="lg" />;

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="p-4 pb-0 md:p-8 md:pb-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
