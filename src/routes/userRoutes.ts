import { Roles } from "@/constants/Roles";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/public/Home"));

export const userRoutes = {
  path: "user",
  roles: [Roles.USER],
  Component: Home,
  children: [{ path: "profile", Component: Home }],
};

/**
1. Overview
2. Profile
3. Deposit money (via agent cash-in simulation)
4. Withdraw money
5. Send money to another user (search by phone/email)
6. Transaction history with: Pagination, Filtering by type/date range
7. Profile management — update name, phone, and password
*/
