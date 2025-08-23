import { lazy } from "react";
import { Navigate } from "react-router";

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const VerifyOtp = lazy(() => import("@/pages/auth/VerifyOtp"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const ChangePassword = lazy(() => import("@/pages/auth/ChangePassword"));

export const authRoutes = {
  path: "/auth",
  Component: AuthLayout,
  children: [
    { index: true, element: <Navigate to="/auth/login" replace /> },
    { path: "login", Component: Login },
    { path: "register", Component: Register },
    { path: "forgot-password", Component: ForgotPassword },
    { path: "verify-otp", Component: VerifyOtp },
    { path: "reset-password", Component: ResetPassword },
    { path: "change-password", Component: ChangePassword },
  ],
};