import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "CURRENT_USER",
    "USERS",
    "AGENTS",
    "ADMINS",
    "TRANSACTIONS",
    "WALLETS",
    "COMMISSIONS",
    "LIMITS",
  ],
  endpoints: () => ({}),
});
