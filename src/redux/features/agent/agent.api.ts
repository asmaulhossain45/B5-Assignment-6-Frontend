import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentProfile: builder.query({
      query: (params) => ({
        url: "/agents/me",
        method: "GET",
        params,
      }),
      providesTags: ["CURRENT_USER"],
    }),
    getAgentWallet: builder.query({
      query: (params) => ({
        url: "/agents/wallet",
        method: "GET",
        params,
      }),
      providesTags: ["WALLETS"],
    }),
    getAgentTransaction: builder.query({
      query: (params) => ({
        url: "agents/transactions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
    }),
    updateAgentProfile: builder.mutation({
      query: (data) => ({
        url: `/agents/me`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["CURRENT_USER"],
    }),
  }),
});

export const {
  useGetAgentProfileQuery,
  useGetAgentWalletQuery,
  useGetAgentTransactionQuery,
  useUpdateAgentProfileMutation,
} = userApi;
