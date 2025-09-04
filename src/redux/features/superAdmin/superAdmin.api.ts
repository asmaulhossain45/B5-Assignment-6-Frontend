import { baseApi } from "@/redux/baseApi";

export const superAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminList: builder.query({
      query: (params) => ({
        url: "/admins",
        method: "GET",
        params,
      }),
      providesTags: ["ADMINS"],
    }),
    getCommissionList: builder.query({
      query: (params) => ({
        url: "/commissions",
        method: "GET",
        params,
      }),
      providesTags: ["ADMINS"],
    }),
    getLimitList: builder.query({
      query: (params) => ({
        url: "/limits",
        method: "GET",
        params,
      }),
      providesTags: ["ADMINS"],
    }),
  }),
});

export const { useGetAdminListQuery } = superAdminApi;
