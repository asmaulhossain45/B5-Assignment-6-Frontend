import type { IAccount } from "./IAccount";
import {Roles} from "@/constants/enums"

export interface IUser extends IAccount {
    role: typeof Roles.USER
    wallet: string
}