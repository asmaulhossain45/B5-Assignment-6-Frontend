import { Roles } from "@/constants/enums";
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminProfile from "@/pages/admin/AdminProfile";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManageUsers from "@/pages/admin/ManageUsers";
import ProfileManagement from "@/pages/admin/ProfileManagement";
import TransactionHistory from "@/pages/admin/TransactionHistory";
import type { TRoute } from "@/types/TRoute";
import {
  HandCoins,
  HomeIcon,
  User,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";

export const adminRoutes: TRoute[] = [
  {
    icon: HomeIcon,
    Component: AdminOverview,
    label: "Overview",
    path: "admin/overview",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: User,
    Component: AdminProfile,
    label: "Profile",
    path: "admin/profile",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: Users,
    Component: ManageUsers,
    label: "Manage Users",
    path: "admin/manage-users",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: UserCheck,
    Component: ManageAgents,
    label: "Manage Agents",
    path: "admin/manage-agents",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: HandCoins,
    Component: TransactionHistory,
    label: "Transactions History",
    path: "admin/transactions",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    icon: UserCog,
    Component: ProfileManagement,
    label: "Profile Management",
    path: "admin/profile-management",
    roles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
];
