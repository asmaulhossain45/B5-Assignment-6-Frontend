import type { Roles } from "@/constants/Roles";
import { useGetCurrentUserQuery } from "@/redux/features/auth/auth.api";

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
  const { data, isLoading, isError, error, refetch } = useGetCurrentUserQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    currentUser: data?.data as TCurrentUser,
    userRole: data?.data?.role as Roles,
    userLoading: isLoading,
    userError: isError,
    userErrorData: error,
    refetchCurrentUser: refetch,
  };
};
