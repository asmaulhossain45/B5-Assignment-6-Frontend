import type { Roles } from "@/constants/Roles";

const ROLE_KEY = "role";

export const setRole = (role: Roles) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = (): Roles | null => {
  const role = localStorage.getItem(ROLE_KEY);
  return role as Roles;
};

export const removeRole = () => {
  localStorage.removeItem(ROLE_KEY);
};
