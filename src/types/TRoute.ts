import type { Roles } from "@/constants/Roles";
import type { ComponentType, ElementType } from "react";

export type TRoute = {
  path: string;
  label: string;
  roles: Roles[];
  icon: ElementType;
  Component: ComponentType;
};
