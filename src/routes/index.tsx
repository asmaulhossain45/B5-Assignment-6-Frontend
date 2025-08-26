import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router";

const NotFound = lazy(() => import("@/pages/public/NotFound"));
const Unauthorized = lazy(() => import("@/pages/public/Unauthorized"));
const PublicLayout = lazy(() => import("@/components/layouts/PublicLayout"));
const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));
const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);

import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { agentRoutes } from "./agentRoutes";
import { adminRoutes } from "./adminRoutes";
import { superAdminRoutes } from "./superAdminRoutes";
import getRoleFromCookie from "@/utils/getRoleFromCookie";
import { Roles } from "@/constants/Roles";
import { generateRoutes } from "@/utils/generateRoutes";

export const dashboardRedirect = () => {
  const userRole: Roles | null = getRoleFromCookie();

  if (!userRole) return redirect("/auth/login");

  switch (userRole) {
    case Roles.USER:
      return redirect("/dashboard/user/overview");
    case Roles.AGENT:
      return redirect("/dashboard/agent/overview");
    case Roles.ADMIN:
      return redirect("/dashboard/admin/overview");
    case Roles.SUPER_ADMIN:
      return redirect("/dashboard/admin/overview");
    default:
      return redirect("/unauthorized");
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: publicRoutes,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: authRoutes,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        loader: dashboardRedirect,
      },
      ...generateRoutes([
        ...userRoutes,
        ...agentRoutes,
        ...adminRoutes,
        ...superAdminRoutes,
      ]),
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
