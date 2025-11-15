import { baseApi } from "@/redux/baseApi";
import type { AppResponse } from "@/types/AppResponse";
import type { ILimit } from "@/types/ILimit";

export const limitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLimit: builder.query<AppResponse<ILimit[]>, void>({
      query: () => ({
        url: "/limits",
        method: "GET",
      }),
      providesTags: ["LIMITS"],
    }),

    getSingleLimit: builder.query({
      query: ({ type, role }) => ({
        url: `/limits/${type}/${role}`,
        method: "GET",
      }),
      providesTags: ["LIMITS"],
    }),

    createLimit: builder.mutation({
      query: (data) => ({
        url: "/limits",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["LIMITS"],
    }),

    updateLimit: builder.mutation({
      query: ({ type, role, data }) => ({
        url: `/limits/${type}/${role}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["LIMITS"],
    }),

    toggleLimit: builder.mutation({
      query: ({ type, role }) => ({
        url: `/limits/toggle-status/${type}/${role}`,
        method: "PATCH",
      }),
      invalidatesTags: ["LIMITS"],
    }),

    deleteLimit: builder.mutation({
      query: ({ type, role }) => ({
        url: `/limits/${type}/${role}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LIMITS"],
    }),
  }),
});

export const {
  useGetAllLimitQuery,
  useGetSingleLimitQuery,
  useCreateLimitMutation,
  useUpdateLimitMutation,
  useToggleLimitMutation,
  useDeleteLimitMutation,
} = limitApi;
