import { cn } from "@/lib/utils";
import { ThemeToggle } from "../common/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import ProfileDropdown from "./ProfileDropdown";
import { CurrentUserAvatar } from "../ui/user-avatar";

const Topbar = () => {
  return (
    <header
      className={cn(
        "sticky top-0 flex items-center justify-between z-50",
        "bg-sidebar py-3 border-b px-4 md:px-8"
      )}
    >
      <SidebarTrigger />

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <ProfileDropdown layout="dashboard" className="mt-4">
          <CurrentUserAvatar />
        </ProfileDropdown>
      </div>
    </header>
  );
};

export default Topbar;
