import type {
  ApprovalStatus,
  Gender,
  Roles,
  UserStatus,
} from "@/constants/enums";

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

  approvalStatus: ApprovalStatus;
  reviewedBy?: {
    name: string;
    email: string;
  };
  reviewedAt?: Date;

  resetOtp?: string;
  verifyOtp?: string;
  resetOtpExpiryAt?: Date;
  verifyOtpExpiryAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
