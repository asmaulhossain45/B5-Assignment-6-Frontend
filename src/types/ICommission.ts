import type { TransactionType } from "@/constants/enums";

export interface ICommission {
  _id?: string;
  charge: number;
  commission: number;
  type: TransactionType;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
