import { Roles } from "@/constants/Roles";
import type { TRoute } from "@/types/TRoute";
import { Home, Settings, ShieldUser, UserPlus } from "lucide-react";

export const superAdminRoutes: TRoute[] = [
  {
    icon: UserPlus,
    Component: Home,
    label: "Add Admin",
    path: "admin/add-admin",
    roles: [Roles.SUPER_ADMIN],
  },
  {
    icon: ShieldUser,
    Component: Home,
    label: "Manage Admin",
    path: "admin/manage-admin",
    roles: [Roles.SUPER_ADMIN],
  },

  {
    icon: Settings,
    Component: Home,
    label: "System Settings",
    path: "admin/system-settings",
    roles: [Roles.SUPER_ADMIN],
  },
];
