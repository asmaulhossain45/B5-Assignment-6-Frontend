import type { TRoute } from "@/types/TRoute";
import ProtectedRoute from "./ProtectedRoute";

export const generateRoutes = (routes: TRoute[]) => {
  return routes.flatMap((items) => ({
    path: items.path,
    Component: () => <ProtectedRoute allowedRoles={items.roles} Component={items.Component} />,
  }));
};
