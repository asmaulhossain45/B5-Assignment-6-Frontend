import { Roles } from "@/constants/Roles";
import type { TCurrentUser } from "@/hooks/useCurrentUser";
import { baseApi } from "@/redux/baseApi";
import { getRole } from "@/utils/role";

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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["CURRENT_USER"],
    }),
    sendResetOtp: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/auth/send-reset-otp",
        method: "POST",
        data: data,
      }),
    }),
    verifyResetOtp: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        data: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { email: string; otp: string; newPassword: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: data,
      }),
    }),
    sendVerifyOtp: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/send-verify-otp",
        method: "POST",
      }),
    }),
    verifyAccount: builder.mutation({
      query: (data: { otp: string }) => ({
        url: "/auth/verify-account",
        method: "POST",
        data: data,
      }),
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
    registerAdmin: builder.mutation({
      query: (data: RegisterPayload) => ({
        url: "/auth/register/admin",
        method: "POST",
        data: data,
      }),
    }),
    getCurrentUser: builder.query<{ data: TCurrentUser }, void>({
      query: () => {
        const role = getRole();

        let url = "";
        switch (role) {
          case Roles.USER:
            url = "/users/me";
            break;
          case Roles.AGENT:
            url = "/agents/me";
            break;
          case Roles.ADMIN:
          case Roles.SUPER_ADMIN:
            url = "/admins/me";
            break;
          default:
            url = "";
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["CURRENT_USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,

  useSendResetOtpMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,

  useSendVerifyOtpMutation,
  useVerifyAccountMutation,

  useRegisterUserMutation,
  useRegisterAgentMutation,
  useRegisterAdminMutation,

  useGetCurrentUserQuery,
} = authApi;
