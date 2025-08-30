import type { IAccount } from "./IAccount";
import { Roles } from "@/constants/enums";

export interface IAgent extends IAccount {
  role: typeof Roles.AGENT;
  wallet: string;
  businessName: string;
}
