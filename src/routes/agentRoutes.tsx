import { Roles } from "@/constants/Roles";
import AgentAddMoney from "@/pages/agent/AgentAddMoney";
import AgentCommission from "@/pages/agent/AgentCommission";
import AgentOverview from "@/pages/agent/AgentOverview";
import AgentProfile from "@/pages/agent/AgentProfile";
import AgentTransaction from "@/pages/agent/AgentTransaction";
import AgentWithdraw from "@/pages/agent/AgentWithdraw";
import ProfileManagement from "@/pages/agent/ProfileManagement";
import type { TRoute } from "@/types/TRoute";
import {
  CreditCard,
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
    Component: AgentOverview,
    label: "Overview",
    path: "agent/overview",
    roles: [Roles.AGENT],
  },
  {
    icon: User,
    Component: AgentProfile,
    label: "Profile",
    path: "agent/profile",
    roles: [Roles.AGENT],
  },
  {
    icon: PlusCircle,
    Component: AgentAddMoney,
    label: "Add Money",
    path: "agent/add-money",
    roles: [Roles.AGENT],
  },
  {
    icon: CreditCard,
    Component: AgentWithdraw,
    label: "Withdraw Money",
    path: "agent/withdraw-money",
    roles: [Roles.AGENT],
  },
  {
    icon: List,
    Component: AgentTransaction,
    label: "Transactions",
    path: "agent/transactions",
    roles: [Roles.AGENT],
  },
  {
    icon: ListCheck,
    Component: AgentCommission,
    label: "Commissions",
    path: "agent/commissions",
    roles: [Roles.AGENT],
  },
  {
    icon: UserCog,
    Component: ProfileManagement,
    label: "Profile Management",
    path: "agent/profile-management",
    roles: [Roles.AGENT],
  },
];
