import { Roles } from "@/constants/Roles";
import type { TRoute } from "@/types/TRoute";
import {
  CreditCard,
  Home,
  HomeIcon,
  List,
  ListCheck,
  PlusCircle,
  User,
  UserCog,
} from "lucide-react";

export const agentRoutes: TRoute[] = [
  {
    icon: HomeIcon,
    Component: Home,
    label: "Overview",
    path: "agent/overview",
    roles: [Roles.AGENT],
  },
  {
    icon: User,
    Component: Home,
    label: "Profile",
    path: "agent/profile",
    roles: [Roles.AGENT],
  },
  {
    icon: PlusCircle,
    Component: Home,
    label: "Add Money",
    path: "agent/add-money",
    roles: [Roles.AGENT],
  },
  {
    icon: CreditCard,
    Component: Home,
    label: "Withdraw Money",
    path: "agent/withdraw-money",
    roles: [Roles.AGENT],
  },
  {
    icon: List,
    Component: Home,
    label: "Transactions",
    path: "agent/transactions",
    roles: [Roles.AGENT],
  },
  {
    icon: ListCheck,
    Component: Home,
    label: "Commissions",
    path: "agent/commissions",
    roles: [Roles.AGENT],
  },
  {
    icon: UserCog,
    Component: Home,
    label: "Profile Management",
    path: "agent/profile-management",
    roles: [Roles.AGENT],
  },
];
