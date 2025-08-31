import type { Roles } from "@/constants/enums";
import { useGetCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { getRole } from "@/utils/role";
import { skipToken } from "@reduxjs/toolkit/query";

export type TCurrentUser = {
  name: string;
  email: string;
  dob?: Date;
  phone?: string;
  role: Roles;
  //   gender?: Gender;
  //   location?: ILocation;
  //   status: UserStatus;
  isVerified?: boolean;
};

export const useCurrentUser = () => {
  const role: Roles | null = getRole();
  const { data, isLoading, isError, error } = useGetCurrentUserQuery(
    role ? undefined : skipToken
  );

  return {
    currentUser: data?.data as TCurrentUser,
    userRole: data?.data?.role as Roles,
    userLoading: isLoading,
    userError: isError,
    userErrorData: error,
  };
};
