import { Roles } from "@/constants/enums";
import ManageWallets from "@/pages/admin/ManageWallets";
import AddAdmin from "@/pages/superAdmin/AddAdmin";
import ManageAdmin from "@/pages/superAdmin/ManageAdmin";
import SystemSettings from "@/pages/superAdmin/SystemSettings";
import type { TRoute } from "@/types/TRoute";
import { CreditCard, Settings, ShieldUser, UserPlus } from "lucide-react";

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
    icon: CreditCard,
    Component: ManageWallets,
    label: "Manage Wallets",
    path: "admin/wallets",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: Settings,
    Component: SystemSettings,
    label: "System Settings",
    path: "admin/system-settings",
    roles: [Roles.SUPER_ADMIN],
  },
];
