import { baseApi } from "@/redux/baseApi";
import type { AppResponse } from "@/types/AppResponse";
import type { IWallet } from "@/types/IWallet";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (params) => ({
        url: "/users/me",
        method: "GET",
        params,
      }),
      providesTags: ["CURRENT_USER"],
    }),

    getUserWallet: builder.query<AppResponse<IWallet>, void>({
      query: () => ({
        url: "/users/wallet",
        method: "GET",
      }),
      providesTags: ["WALLETS"],
    }),

    getUserTransaction: builder.query({
      query: (params) => ({
        url: "users/transactions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTIONS"],
    }),

    getLiveSearchUser: builder.query({
      query: (params) => ({
        url: "users/live-search",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/users/me`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["CURRENT_USER"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserWalletQuery,
  useGetUserTransactionQuery,
  useGetLiveSearchUserQuery,
  useUpdateUserProfileMutation,
} = userApi;
