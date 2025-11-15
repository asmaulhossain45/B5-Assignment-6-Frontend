export const Roles = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  AGENT: "agent",
  USER: "user",
};

export type Roles = (typeof Roles)[keyof typeof Roles];

export const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
  DELETED: "deleted",
  SUSPENDED: "suspended",
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const ApprovalStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export type ApprovalStatus =
  (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

export const Gender = {
  MALE: "male",
  FEMALE: "female",
};

export type Gender = (typeof Gender)[keyof typeof Gender];

export const WalletType = {
  AGENT: "agent",
  SYSTEM: "system",
  PERSONAL: "personal",
};

export type WalletType = (typeof WalletType)[keyof typeof WalletType];

export const WalletStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];

export const TransactionStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REVERSED: "reversed",
};

export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];

export const TransactionType = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
  SEND_MONEY: "send-money",
  CASH_IN: "cash-in",
  CASH_OUT: "cash-out",
};

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionReference = {
  BANK: "bank",
  CARD: "card",
  WALLET: "wallet",
  AGENT: "agent",
};

export type TransactionReference =
  (typeof TransactionReference)[keyof typeof TransactionReference];
