import type { Roles } from "@/constants/Roles";
import { lazy, type ComponentType, type ElementType } from "react";
import { createBrowserRouter } from "react-router";

import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import Login from "@/pages/auth/Login";

const NotFound = lazy(() => import("@/pages/public/NotFound"));
const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);

export type Route = {
  path: string;
  Component?: ComponentType | ElementType;
  children?: Route[];
  roles?: Roles[];
};

export const router = createBrowserRouter([
  publicRoutes,
  authRoutes,
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [{ path: "profile", Component: Login }],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
