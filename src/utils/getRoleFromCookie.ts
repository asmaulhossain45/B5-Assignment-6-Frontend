import type { Roles } from "@/constants/Roles";

const getRoleFromCookie = (): Roles | null => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("role="));
    
  if (!cookie) return null;

  return cookie.split("=")[1] as Roles;
};

export default getRoleFromCookie;
