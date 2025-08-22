export const Roles = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  AGENT: "agent",
  USER: "user",
} as const;

export type Roles = typeof Roles[keyof typeof Roles];
