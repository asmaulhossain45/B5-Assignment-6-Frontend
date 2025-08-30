import { Roles } from "@/constants/Roles";
import type { TRoute } from "@/types/TRoute";
import UserOverview from "@/pages/user/UserOverview";
import UserProfile from "@/pages/user/UserProfile";
import UserDeposit from "@/pages/user/UserDeposit";
import UserWithdraw from "@/pages/user/UserWithdraw";
import UserSendMoney from "@/pages/user/UserSendMoney";
import UserTransaction from "@/pages/user/UserTransaction";
import ProfileManagement from "@/pages/user/ProfileManagement";
import {
  CreditCard,
  HandCoins,
  HomeIcon,
  List,
  PlusCircle,
  User,
  UserCog,
} from "lucide-react";

export const userRoutes: TRoute[] = [
  {
    icon: HomeIcon,
    Component: UserOverview,
    label: "Overview",
    path: "user/overview",
    roles: [Roles.USER],
  },
  {
    icon: User,
    Component: UserProfile,
    label: "Profile",
    path: "user/profile",
    roles: [Roles.USER],
  },
  {
    icon: PlusCircle,
    Component: UserDeposit,
    label: "Deposit Money",
    path: "user/deposit-money",
    roles: [Roles.USER],
  },
  {
    icon: CreditCard,
    Component: UserWithdraw,
    label: "Withdraw Money",
    path: "user/withdraw-money",
    roles: [Roles.USER],
  },
  {
    icon: HandCoins,
    Component: UserSendMoney,
    label: "Send Money",
    path: "user/send-money",
    roles: [Roles.USER],
  },
  {
    icon: List,
    Component: UserTransaction,
    label: "Transactions",
    path: "user/transactions",
    roles: [Roles.USER],
  },
  {
    icon: UserCog,
    Component: ProfileManagement,
    label: "Profile Management",
    path: "user/profile-management",
    roles: [Roles.USER],
  },
];
