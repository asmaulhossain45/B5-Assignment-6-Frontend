import type { Gender, Roles, UserStatus } from "@/constants/enums";

export interface IAccount {
  _id?: string;

  name: string;
  businessName?: string;
  email: string;

  dob?: Date;
  phone?: string;
  gender?: Gender;

  role: Roles;

  location?: {
    division: string;
    district: string;
    address: string;
  };

  status: UserStatus;
  isVerified: boolean;

  isApproved: boolean;
  approvedBy?: {
    name: string;
    email: string;
  };
  approvedAt?: Date;

  resetOtp?: string;
  verifyOtp?: string;
  resetOtpExpiryAt?: Date;
  verifyOtpExpiryAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
