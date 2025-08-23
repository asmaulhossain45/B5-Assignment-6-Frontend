import { Link, NavLink } from "react-router";
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
import { Roles } from "@/constants/Roles";
import { useState } from "react";

interface Props {
  user: boolean;
  navlinks: { path: string; label: string }[];
  children: React.ReactNode;
}

const MobileMenu = ({ children, user = false, navlinks }: Props) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    toast.success("Logout successful!");
  };
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
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
          {!user && (
            <Button>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}

          {user && (
            <div className="flex items-center justify-between gap-4">
              <ProfileDropdown role={Roles.USER} align="start" className="mb-2">
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
