import type {
  Roles,
  TransactionReference,
  TransactionStatus,
  TransactionType,
} from "@/constants/enums";
import type { IAccount } from "./IAccount";

export interface ITransaction {
  _id?: string;
  from?: IAccount;
  fromModel?: Roles;

  to?: IAccount;
  toModel?: Roles;

  type: TransactionType;

  amount: number;
  charge: number;
  commission: number;

  transactionId: string;
  agent?: IAccount;
  status: TransactionStatus;

  reference?: TransactionReference;
  notes?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
