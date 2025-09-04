import { baseApi } from "@/redux/baseApi";
import type { AppResponse } from "@/types/AppResponse";

export interface IAgentSummaryResponse {
  totalCashInAmount: number;
  totalCashInCount: number;
  totalCashOutAmount: number;
  totalCashOutCount: number;
  totalCommissionsAmount: number;
  totalTransactionsAmount: number;
  totalTransactionsCount: number;
}

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
    getAgentSummary: builder.query<AppResponse<IAgentSummaryResponse>, void>({
      query: () => ({
        url: "/agents/summary",
        method: "GET",
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
    getAgentCommission: builder.query({
      query: (params) => ({
        url: "agents/commissions",
        method: "GET",
        params,
      }),
      providesTags: ["COMMISSIONS"],
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
  useGetAgentSummaryQuery,
  useGetAgentWalletQuery,
  useGetAgentTransactionQuery,
  useGetAgentCommissionQuery,
  useUpdateAgentProfileMutation,
} = userApi;
