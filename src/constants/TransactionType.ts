export const TransactionType = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  AGENT: "agent",
  USER: "user",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];
