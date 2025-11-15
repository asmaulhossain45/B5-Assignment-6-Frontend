import type { Roles, TransactionType } from "@/constants/enums";

export type ILimit = {
  _id?: string;
  type: TransactionType;
  role: Roles;
  minAmount: number;
  maxAmount: number;
  dailyLimit?: number;
  weeklyLimit?: number;
  monthlyLimit?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
