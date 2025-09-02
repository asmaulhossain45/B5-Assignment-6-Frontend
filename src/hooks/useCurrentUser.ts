import type { Roles } from "@/constants/enums";
import { useGetCurrentUserQuery } from "@/redux/features/auth/auth.api";
import type { IAccount } from "@/types/IAccount";
import { getRole } from "@/utils/role";
import { skipToken } from "@reduxjs/toolkit/query";

export const useCurrentUser = () => {
  const role: Roles | null = getRole();
  const { data, isLoading, isError, error } = useGetCurrentUserQuery(
    role ? undefined : skipToken
  );

  return {
    currentUser: data?.data as IAccount,
    userRole: data?.data?.role as Roles,
    userLoading: isLoading,
    userError: isError,
    userErrorData: error,
  };
};
