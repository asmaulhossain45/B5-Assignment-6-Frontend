import { baseApi } from "@/redux/baseApi";
import type { AppResponse } from "@/types/AppResponse";

type AdminSummaryResponse = {
  totalUserCount: number;
  totalAgentCount: number;
  totalAdminCount: number;
  transactionCount: number;
  transactionVolume: number;
};

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: (params) => ({
        url: "/admins/users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),
    getAdminSummart: builder.query<AppResponse<AdminSummaryResponse>, void>({
      query: () => ({
        url: "/admins/summary",
        method: "GET",
      }),
    }),
    getAgentList: builder.query({
      query: (params) => ({
        url: "admins/agents",
        method: "GET",
        params,
      }),
      providesTags: ["AGENTS"],
    }),
    getWalletList: builder.query({
      query: (params) => ({
        url: "admins/wallets",
        method: "GET",
        params,
      }),
      providesTags: ["WALLETS"],
    }),
    getTransactionList: builder.query({
      query: (params) => ({
        url: "admins/transactions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ email, status }) => ({
        url: `/admins/users/${email}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["USERS", "AGENTS", "ADMINS"],
    }),
    updateWalletStatus: builder.mutation({
      query: ({ walletId, status }) => ({
        url: `/admins/wallets/${walletId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["WALLETS"],
    }),
    updateAgentApproval: builder.mutation({
      query: ({ email, approvalStatus }) => ({
        url: `admins/agents/${email}/approval`,
        method: "PATCH",
        data: { approvalStatus },
      }),
      invalidatesTags: ["AGENTS"],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: `/admins/me`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["CURRENT_USER"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetAdminSummartQuery,
  useGetAgentListQuery,
  useGetWalletListQuery,
  useGetTransactionListQuery,
  useUpdateUserStatusMutation,
  useUpdateWalletStatusMutation,
  useUpdateAgentApprovalMutation,
  useUpdateAdminProfileMutation,
} = adminApi;
