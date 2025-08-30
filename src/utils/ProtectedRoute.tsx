import { Navigate } from "react-router";
import type { ComponentType } from "react";
import Loading from "@/pages/public/Loading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { Roles } from "@/constants/enums";

type Props = {
  allowedRoles: Roles[];
  Component: ComponentType;
};

const ProtectedRoute = ({ Component, allowedRoles }: Props) => {
  const { currentUser, userRole, userLoading } = useCurrentUser();

  if (userLoading) return <Loading type="page" size="lg" />;

  if (!userLoading && !currentUser) return <Navigate to="/auth/login" />;

  if (!allowedRoles.includes(userRole!)) return <Navigate to="/unauthorized" />;

  return <Component />;
};

export default ProtectedRoute;
