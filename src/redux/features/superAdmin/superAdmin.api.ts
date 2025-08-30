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
  }),
});

export const { useGetAdminListQuery } = superAdminApi;
