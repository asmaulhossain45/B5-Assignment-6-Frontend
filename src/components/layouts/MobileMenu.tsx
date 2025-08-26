/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Logo from "../../assets/brand/Logo.png";
import { LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { baseApi } from "@/redux/baseApi";
import { useAppDispatch } from "@/redux/hook";

interface Props {
  navlinks: { path: string; label: string }[];
  children: React.ReactNode;
}

const MobileMenu = ({ children, navlinks }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { currentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);

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

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between border-b">
          <DrawerTitle>
            <img src={Logo} alt="logo" className="h-10 w-auto" />
          </DrawerTitle>
          <DrawerClose>
            <Button variant={"outline"} size={"icon"}>
              <X size={18} />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <nav className="flex flex-col">
          {navlinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn("border-b py-2 px-4", isActive && "")
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <DrawerFooter>
          {!currentUser && (
            <Button>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}

          {currentUser && (
            <div className="flex items-center justify-between gap-4">
              <ProfileDropdown layout="public" align="start" className="mb-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </ProfileDropdown>

              <DrawerClose>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </Button>
              </DrawerClose>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
