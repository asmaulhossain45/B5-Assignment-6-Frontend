import type { Roles } from "@/constants/enums";
import type { ComponentType, ElementType } from "react";

export type TRoute = {
  path: string;
  label: string;
  roles: Roles[];
  icon: ElementType;
  Component: ComponentType;
};
