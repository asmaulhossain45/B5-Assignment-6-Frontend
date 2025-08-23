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
import { NavLink } from "react-router";

interface Props {
  role: Roles;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  className?: string;
}

const userLinks = [
  {
    path: "/profile",
    label: "Profile",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
  },
];

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
          {userLinks.map((item, index) => (
            <DropdownMenuItem key={index}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
