import { Roles } from "@/constants/Roles";
import AddAdmin from "@/pages/superAdmin/AddAdmin";
import ManageAdmin from "@/pages/superAdmin/ManageAdmin";
import SystemSettings from "@/pages/superAdmin/SystemSettings";
import type { TRoute } from "@/types/TRoute";
import { Settings, ShieldUser, UserPlus } from "lucide-react";

export const superAdminRoutes: TRoute[] = [
  {
    icon: UserPlus,
    Component: AddAdmin,
    label: "Add Admin",
    path: "admin/add-admin",
    roles: [Roles.SUPER_ADMIN],
  },
  {
    icon: ShieldUser,
    Component: ManageAdmin,
    label: "Manage Admin",
    path: "admin/manage-admin",
    roles: [Roles.SUPER_ADMIN],
  },

  {
    icon: Settings,
    Component: SystemSettings,
    label: "System Settings",
    path: "admin/system-settings",
    roles: [Roles.SUPER_ADMIN],
  },
];
