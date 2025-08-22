import { lazy } from "react";


const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));


const authRoutes = {
  path: "/auth",
  Component: AuthLayout,
  children: [
    { path: "login", Component: Login },
    { path: "register", Component: Register },
  ],
};

export default authRoutes;
