import type { Gender, UserStatus } from "@/constants/enums";

export interface IAccount {
  _id?: string;

  name: string;
  email: string;

  dob?: Date;
  phone?: string;
  gender?: Gender;
  location?: {
    division: string;
    district: string;
    address: string;
  };

  status: UserStatus;
  isVerified: boolean;

  resetOtp?: string;
  verifyOtp?: string;
  resetOtpExpiryAt?: Date;
  verifyOtpExpiryAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
