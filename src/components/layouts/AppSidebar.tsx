import { Link, NavLink, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import Logo from "@/assets/brand/Logo.png";
import { X } from "lucide-react";
import type { TRoute } from "@/types/TRoute";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CurrentUserAvatar } from "../ui/user-avatar";
import { getSidebarItme } from "@/utils/getSidebarItem";


const AppSidebar = () => {
  const {userRole} = useCurrentUser();
  const routes: TRoute[] = getSidebarItme(userRole)
  const pathname = useLocation().pathname;
  const {currentUser} = useCurrentUser();

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center justify-between">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="h-10 w-auto" />
        </Link>

        <SidebarTrigger className="md:hidden">
          <X />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="border-y">
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route, index) => {
                const isActive = pathname === `/dashboard/${route.path}`;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild size={"lg"} isActive={isActive}>
                      <NavLink to={route.path as string}>
                        <route.icon />
                        <span>{route.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-row items-center gap-2 overflow-hidden">
        <CurrentUserAvatar/>

        <div className="space-y-[2px]">
          <h6 className="text-sm font-semibold capitalize line-clamp-1">
            {currentUser?.name}
          </h6>
          <p className="description text-[10px] lowercase line-clamp-1">
            {currentUser?.email}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
