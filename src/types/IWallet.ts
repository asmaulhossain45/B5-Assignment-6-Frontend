import type { WalletStatus, WalletType } from "@/constants/enums";
import type { IAccount } from "./IAccount";

export interface IWallet {
  _id?: string;
  owner?: IAccount;
  balance: number;
  type: WalletType;
  status: WalletStatus;
  isSystem: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
