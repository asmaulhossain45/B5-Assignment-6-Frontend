import type { Roles } from "@/constants/Roles";
import { lazy, type ComponentType, type ElementType } from "react";
import { createBrowserRouter} from "react-router";

import { userRoutes } from "./userRoutes";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";

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
    children: [userRoutes],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
