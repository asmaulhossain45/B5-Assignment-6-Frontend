import { Roles } from "@/constants/Roles";
import type { TRoute } from "@/types/TRoute";
import {
  CreditCard,
  HomeIcon,
  List,
  PlusCircle,
  User,
  UserCog,
} from "lucide-react";

export const userRoutes: TRoute[] = [
  {
    icon: HomeIcon,
    Component: HomeIcon,
    label: "Overview",
    path: "user/overview",
    roles: [Roles.USER],
  },
  {
    icon: User,
    Component: HomeIcon,
    label: "Profile",
    path: "user/profile",
    roles: [Roles.USER],
  },
  {
    icon: PlusCircle,
    Component: HomeIcon,
    label: "Deposit Money",
    path: "user/deposit-money",
    roles: [Roles.USER],
  },
  {
    icon: CreditCard,
    Component: HomeIcon,
    label: "Withdraw Money",
    path: "user/withdraw-money",
    roles: [Roles.USER],
  },
  {
    icon: List,
    Component: HomeIcon,
    label: "Transactions",
    path: "user/transactions",
    roles: [Roles.USER],
  },
  {
    icon: UserCog,
    Component: HomeIcon,
    label: "Profile Management",
    path: "user/profile-management",
    roles: [Roles.USER],
  },
];
