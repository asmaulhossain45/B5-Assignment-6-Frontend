import { baseApi } from "@/redux/baseApi";
import type { AppResponse } from "@/types/AppResponse";
import type { ICommission } from "@/types/ICommission";

export const commissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommission: builder.query<AppResponse<ICommission[]>, void>({
      query: () => ({
        url: "/commissions",
        method: "GET",
      }),
      providesTags: ["COMMISSIONS"],
    }),

    getSingleCommission: builder.query({
      query: (type) => ({
        url: `/commissions/${type}`,
        method: "GET",
      }),
      providesTags: ["COMMISSIONS"],
    }),

    createCommission: builder.mutation({
      query: (data) => ({
        url: "/commissions",
        method: "POST",
        data,
      }),
      invalidatesTags: ["COMMISSIONS"],
    }),

    updateCommission: builder.mutation({
      query: ({ type, data }) => ({
        url: `/commissions/${type}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["COMMISSIONS"],
    }),

    toggleCommission: builder.mutation({
      query: (type) => ({
        url: `/commissions/toggle-status/${type}`,
        method: "PATCH",
      }),
      invalidatesTags: ["COMMISSIONS"],
    }),

    deleteCommission: builder.mutation({
      query: (type) => ({
        url: `/commissions/${type}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COMMISSIONS"],
    }),
  }),
});

export const {
  useGetAllCommissionQuery,
  useGetSingleCommissionQuery,
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
  useToggleCommissionMutation,
  useDeleteCommissionMutation,
} = commissionApi;
