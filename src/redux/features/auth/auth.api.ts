import { Roles } from "@/constants/Roles";
import type { TCurrentUser } from "@/hooks/useCurrentUser";
import { baseApi } from "@/redux/baseApi";
import getRoleFromCookie from "@/utils/getRoleFromCookie";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginPayload) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["CURRENT_USER"],
    }),
    registerUser: builder.mutation({
      query: (data: RegisterPayload) => ({
        url: "/auth/register/user",
        method: "POST",
        data: data,
      }),
    }),
    registerAgent: builder.mutation({
      query: (data: RegisterPayload) => ({
        url: "/auth/register/agent",
        method: "POST",
        data: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["CURRENT_USER"],
    }),
    getCurrentUser: builder.query<{ data: TCurrentUser }, void>({
      query: () => {
        const role = getRoleFromCookie();
        let url = `/users/me`;
        if (role === Roles.AGENT) url = `/agents/me`;
        else if (role === Roles.ADMIN || role === Roles.SUPER_ADMIN)
          url = `/admins/me`;

        return { url, method: "GET" };
      },
      providesTags: ["CURRENT_USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useRegisterAgentMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
