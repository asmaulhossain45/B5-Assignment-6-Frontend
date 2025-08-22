import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Roles } from "@/constants/Roles";

interface Props {
  role: Roles;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  className?: string;
}

const ProfileDropdown = ({
  children,
  role = Roles.USER,
  align = "end",
  className,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className)} align={align}>
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>{role}</DropdownMenuItem>
          <DropdownMenuItem>Ballance</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
