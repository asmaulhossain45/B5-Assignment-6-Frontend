import { cn } from "@/lib/utils";
import { Link, Outlet } from "react-router";
import Logo from "@/assets/brand/Logo.png";
import { ThemeToggle } from "../common/ThemeToggle";

const AuthLayout = () => {
  return (
    <>
      <header className={cn("border-b py-3", "bg-muted/70 backdrop-blur-3xl")}>
        <nav className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="h-10 w-auto" />
          </Link>

          <ThemeToggle />
        </nav>
      </header>

      <main
        className={cn(
          "min-h-[calc(100vh-65px)] py-7 lg:py-14 flex items-center justify-center px-4 md:px-8"
        )}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
