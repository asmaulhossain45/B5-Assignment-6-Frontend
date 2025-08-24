import type { Roles } from "@/constants/Roles";
import { Navigate } from "react-router";

type Props = {
  userRole: Roles;
  allowedRoles: Roles[];
  children: React.ReactNode;
};

export const ProtectedRoute = ({ userRole, allowedRoles, children }: Props) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
