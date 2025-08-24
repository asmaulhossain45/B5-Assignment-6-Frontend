import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { getRoutesByRole } from "./getRoutesByRole";
import { Roles } from "@/constants/Roles";
import type { TRoute } from "@/types/TRoute";
import { ProtectedRoute } from "./ProtectedRoute";

const NotFound = lazy(() => import("@/pages/public/NotFound"));
const Unauthorized = lazy(() => import("@/pages/public/Unauthorized"));
const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);

const userRole = Roles.SUPER_ADMIN;
const routes: TRoute[] = getRoutesByRole(userRole);

export const router = createBrowserRouter([
  publicRoutes,
  authRoutes,
  {
    path: "/dashboard",
    Component: () => <DashboardLayout routes={routes} />,
    children: [
      {
        index: true,
        Component: () => <Navigate to={`${userRole}/overview`} replace />,
      },
      ...routes.map((route) => ({
        path: route.path,
        Component: () => (
          <ProtectedRoute allowedRoles={route.roles} userRole={userRole}>
            <route.Component />
          </ProtectedRoute>
        ),
      })),
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
