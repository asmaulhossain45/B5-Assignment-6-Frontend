import { cn } from "@/lib/utils";
import { ThemeToggle } from "../common/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";

const Topbar = () => {
  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "bg-sidebar py-3 border-b px-4 md:px-8"
      )}
    >
      <SidebarTrigger />

      <ThemeToggle />
    </header>
  );
};

export default Topbar;
