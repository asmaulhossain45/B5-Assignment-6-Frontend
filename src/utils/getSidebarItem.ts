import { Roles } from "@/constants/Roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { agentRoutes } from "@/routes/agentRoutes";
import { superAdminRoutes } from "@/routes/superAdminRoutes";
import { userRoutes } from "@/routes/userRoutes";

export const getSidebarItme = ( role:Roles) => {
    console.log(role);
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
