import type { IAccount } from "./IAccount";
import {Roles} from "@/constants/enums"

export interface IAdmin extends IAccount {
    role: typeof Roles.SUPER_ADMIN | typeof Roles.SUPER_ADMIN
}