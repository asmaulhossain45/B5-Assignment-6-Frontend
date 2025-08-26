/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { type ElementType } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router";
import { LayoutDashboard, LogOut, ShieldX } from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CurrentUserAvatar } from "../ui/user-avatar";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { baseApi } from "@/redux/baseApi";

interface Props {
  layout: "dashboard" | "public";
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  className?: string;
}

const dropdownLinks: Record<
  string,
  { icon: ElementType; path: string; label: string }[]
> = {
  public: [
    {
      icon: LayoutDashboard,
      path: "/dashboard",
      label: "Dashboard",
    },
  ],
  dashboard: [
    {
      icon: LayoutDashboard,
      path: "/",
      label: "Home",
    },
  ],
};

const ProfileDropdown = ({
  children,
  layout = "public",
  align = "end",
  className,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { currentUser } = useCurrentUser();

  const email = currentUser?.email;

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await logout().unwrap();
      dispatch(baseApi.util.resetApiState());
      toast.success("Logout successful!", { id: toastId });
      navigate("/auth/login");
    } catch (error) {
      toast.error("Logout failed!", { id: toastId });
    }
  };

  const handleVerifyAccount = () => {
    toast.success("OTP sent successfully!");
    navigate("/auth/verify-otp", {
      state: { email: email, action: "verifyAccount" },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("max-w-64 w-full", className)}
        align={align}
      >
        <DropdownMenuGroup className="flex flex-col items-center p-2">
          <CurrentUserAvatar />

          <h4 className="text-base font-semibold mt-1">{currentUser?.name}</h4>
          <span className="text-xs">{currentUser?.email}</span>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {dropdownLinks[layout].map((item, index) => (
            <DropdownMenuItem key={index}>
              <NavLink to={item.path} className={cn("flex items-center gap-2")}>
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {!currentUser?.isVerified && (
          <DropdownMenuItem onClick={handleVerifyAccount}>
            <ShieldX size={16} />
            <span>Verify Account</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
