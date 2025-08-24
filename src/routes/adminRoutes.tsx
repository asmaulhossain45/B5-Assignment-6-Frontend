import { Roles } from "@/constants/Roles";
import type { TRoute } from "@/types/TRoute";
import { CreditCard, Home, HomeIcon, User, UserCheck, UserCog, Users } from "lucide-react";

export const adminRoutes: TRoute[] = [
  {
    icon: HomeIcon,
    Component: Home,
    label: "Overview",
    path: "admin/overview",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
    {
    icon: User,
    Component: Home,
    label: "Profile",
    path: "admin/profile",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: Users,
    Component: Home,
    label: "Manage Users",
    path: "admin/manage-users",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: UserCheck,
    Component: Home,
    label: "Manage Agents",
    path: "admin/manage-agents",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: CreditCard,
    Component: Home,
    label: "Transactions",
    path: "admin/transactions",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: UserCog,
    Component: Home,
    label: "Profile Management",
    path: "admin/profile-management",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
];
