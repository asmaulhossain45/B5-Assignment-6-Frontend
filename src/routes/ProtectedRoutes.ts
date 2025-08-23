import type { Roles } from "@/constants/Roles";
import { Navigate } from "react-router;

import { useSelector } from "react-redux";

type Props = {
  roles?: Roles[];
  children: React.ReactNode;
};

export const ProtectedRoute = ({ roles, children }: Props) => {
  const userRole: Roles | undefined = useSelector(
    (state: RootState) => state.auth.user?.role
  );

  if (!userRole) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};
