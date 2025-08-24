import { Roles } from "@/constants/Roles";
import { userRoutes } from "./userRoutes";
import { agentRoutes } from "./agentRoutes";
import { adminRoutes } from "./adminRoutes";
import { superAdminRoutes } from "./superAdminRoutes";

export const getRoutesByRole = (role: Roles) => {
  switch (role) {
    case Roles.USER:
      return userRoutes;
    case Roles.AGENT:
      return agentRoutes;
    case Roles.ADMIN:
      return adminRoutes;
    case Roles.SUPER_ADMIN:
      return [...adminRoutes, ...superAdminRoutes];
    default:
      return [];
  }
};
