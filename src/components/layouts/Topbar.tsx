import { cn } from "@/lib/utils";
import { ThemeToggle } from "../common/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import ProfileDropdown from "./ProfileDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Roles } from "@/constants/Roles";

const Topbar = () => {
  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "bg-sidebar py-3 border-b px-4 md:px-8"
      )}
    >
      <SidebarTrigger />

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <ProfileDropdown role={Roles.USER} className="mt-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </ProfileDropdown>
      </div>
    </header>
  );
};

export default Topbar;
