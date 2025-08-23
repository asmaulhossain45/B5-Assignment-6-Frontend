import { Roles } from "@/constants/Roles";
import { lazy } from "react";

const Home = lazy(()=> import("@/pages/public/Home"));

export const userRoutes = {
  path: "user",
  roles: [Roles.USER],
  Component: Home,
  children: [{ path: "profile", Component: Home }],
};
