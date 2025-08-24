import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Topbar from "./Topbar";
import type { TRoute } from "@/types/TRoute";

type Props = {
  routes: TRoute[];
};

const DashboardLayout = ({ routes }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar routes={routes} />
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
