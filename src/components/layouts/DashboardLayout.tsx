import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import Topbar from "./Topbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Loading from "@/pages/public/Loading";
import AppSidebar from "./AppSidebar";


const DashboardLayout = () => {
  const {userLoading} = useCurrentUser();

  if (userLoading) return <Loading type="page" size="lg" />;

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
