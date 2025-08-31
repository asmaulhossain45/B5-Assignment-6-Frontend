import { baseApi } from "@/redux/baseApi";

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
  }),
});

export const {
  useGetUserListQuery,
  useGetAgentListQuery,
  useGetWalletListQuery,
  useGetTransactionListQuery,
  useUpdateUserStatusMutation,
  useUpdateWalletStatusMutation,
} = adminApi;
